import { z } from "zod";

export const settingsSchema = z.object({
  name: z.string().min(1).max(100),
  theme: z.enum(["light", "dark", "system"]).default("system"),
  language: z.enum(["en"]).default("en"),
  numberFormat: z.string().min(1).default("1.234,56"),
  dateFormat: z.string().min(1).default("dd.MM.yyyy"),
  baseCurrencyId: z.number().int().positive().nullable().default(null),
});

export type SettingsInterface = z.infer<typeof settingsSchema>;

export const DEFAULT_SETTINGS: SettingsInterface = settingsSchema.parse({
  name: "User",
  theme: "light",
  language: "en",
  numberFormat: "1.234,56",
  dateFormat: "dd.MM.yyyy",
  baseCurrencyId: null,
});

// Partial update interfaces
export const settingsUpdatePartial = settingsSchema.partial();
export type SettingsUpdatePartialType = z.infer<typeof settingsUpdatePartial>;
