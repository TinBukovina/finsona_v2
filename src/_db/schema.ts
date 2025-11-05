import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  boolean,
  decimal,
  integer,
  primaryKey,
  pgEnum,
  uuid,
} from "drizzle-orm/pg-core";
import { AdapterAccountType } from "next-auth/adapters";

// Enums
export const accountTypeEnum = pgEnum("account_type", [
  "CASH",
  "CARD",
  "SAVINGS",
  "CUSTOM",
]);
export const transactionTypeEnum = pgEnum("transaction_type", [
  "INCOME",
  "EXPENSE",
  "TRANSFER",
]);
export const budgetCategoryTypeEnum = pgEnum("budget_category_type", [
  "INCOME",
  "EXPENSE",
]);

// Auth

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  passwordHash: text("passwordHash"),
  image: text("image"),
  baseCurrencyId: integer("base_currency_id").references(() => currencies.id),
  numberFormat: varchar("number_format", { length: 20 })
    .default("1.234,56")
    .notNull(),
  dateFormat: varchar("date_format", { length: 20 })
    .default("dd.MM.yyyy")
    .notNull(),
  theme: varchar("theme", { length: 10 }).default("light").notNull(),
  language: varchar("language", { length: 5 }).default("en").notNull(),
});

export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const accounts = pgTable(
  "accounts",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export type SelectAccount = typeof accounts.$inferSelect;
export type InsertAccount = typeof accounts.$inferInsert;

export const sessions = pgTable("sessions", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export type SelectSession = typeof sessions.$inferSelect;
export type InsertSession = typeof sessions.$inferInsert;

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({ compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }) }),
);

export type SelectVerificationToken = typeof verificationTokens.$inferSelect;
export type InsertVerificationToken = typeof verificationTokens.$inferInsert;

// Data
export const currencies = pgTable("currencies", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 3 }).notNull().unique(),
  name: varchar("name", { length: 50 }).notNull(),
  symbol: varchar("symbol", { length: 5 }).notNull(),
});

export type SelectCurrency = typeof currencies.$inferSelect;
export type InsertCurrency = typeof currencies.$inferInsert;

export const userAccounts = pgTable("user_accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
  type: accountTypeEnum("type").notNull(),
  balance: decimal("balance", { precision: 15, scale: 2 })
    .default("0.00")
    .notNull(),
  currencyId: integer("currency_id")
    .notNull()
    .references(() => currencies.id),
});

export type SelectUserAccount = typeof userAccounts.$inferSelect;
export type InsertUserAccount = typeof userAccounts.$inferInsert;

export const passwordResetTokens = pgTable("password_reset_tokens", {
  id: uuid("id").defaultRandom().primaryKey(),
  token: text("token").notNull().unique(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export type SelectPasswordResetToken = typeof passwordResetTokens.$inferSelect;
export type InsertPasswordResetToken = typeof passwordResetTokens.$inferInsert;

export const transactions = pgTable("transactions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  description: text("description"),
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  type: transactionTypeEnum("type").notNull(),
  transactionDate: timestamp("transaction_date").defaultNow().notNull(),
  fromAccountId: uuid("from_account_id").references(() => userAccounts.id, {
    onDelete: "set null",
  }),
  toAccountId: uuid("to_account_id").references(() => userAccounts.id, {
    onDelete: "set null",
  }),
  budgetItemId: uuid("budget_item_id").references(() => budgetItems.id, {
    onDelete: "set null",
  }),
  goalId: uuid("goal_id").references(() => goals.id, {
    onDelete: "set null",
  }),
  excludeFromStats: boolean("exclude_from_stats").default(false).notNull(),
  isRecurring: boolean("is_recurring").default(false),
  recurrenceRule: varchar("recurrence_rule", { length: 100 }),
  location: varchar("location", { length: 255 }),
  imageUrl: varchar("image_url", { length: 255 }),
});

export type SelectTransaction = typeof transactions.$inferSelect;
export type InsertTransaction = typeof transactions.$inferInsert;

export const goals = pgTable("goals", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 150 }).notNull(),
  targetAmount: decimal("target_amount", { precision: 15, scale: 2 }).notNull(),
  currentAmount: decimal("current_amount", { precision: 15, scale: 2 })
    .default("0.00")
    .notNull(),
  targetDate: timestamp("target_date"),
});

export type SelectGoal = typeof goals.$inferSelect;
export type InsertGoal = typeof goals.$inferInsert;

export const budgets = pgTable("budgets", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
  startDate: timestamp("start_date").defaultNow().notNull(),
  isActive: boolean("is_active").default(true).notNull(),
});

export type SelectBudget = typeof budgets.$inferSelect;
export type InsertBudget = typeof budgets.$inferInsert;

export const budgetItems = pgTable("budget_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  category: varchar("category", { length: 50 }).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  plannedAmount: decimal("planned_amount", { precision: 15, scale: 2 })
    .default("0.00")
    .notNull(),
});

export type SelectBudgetItem = typeof budgetItems.$inferSelect;
export type InsertBudgetItem = typeof budgetItems.$inferInsert;
