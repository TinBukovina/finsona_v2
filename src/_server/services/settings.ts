import { users } from "@/_db/schema";
import {
  DEFAULT_SETTINGS,
  SettingsInterface,
  settingsSchema,
  settingsUpdatePartial,
  SettingsUpdatePartialType,
} from "../schemas/settings";
import { db } from "@/_db/drizzle";
import { eq } from "drizzle-orm";

export async function getUserSettings(
  userId: string,
): Promise<SettingsInterface> {
  const rows = await db
    .select({
      name: users.name,
      theme: users.theme,
      language: users.language,
      numberFormat: users.numberFormat,
      dateFormat: users.dateFormat,
      baseCurrencyId: users.baseCurrencyId,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (rows.length === 0) {
    return DEFAULT_SETTINGS;
  }

  const raw = rows[0];

  const normalizedSettings = {
    name: raw.name ?? DEFAULT_SETTINGS.name,
    theme: raw.theme ?? DEFAULT_SETTINGS.theme,
    language: raw.language ?? DEFAULT_SETTINGS.language,
    numberFormat: raw.numberFormat ?? DEFAULT_SETTINGS.numberFormat,
    dateFormat: raw.dateFormat ?? DEFAULT_SETTINGS.dateFormat,
    baseCurrencyId: raw.baseCurrencyId ?? DEFAULT_SETTINGS.baseCurrencyId,
  };

  return settingsSchema.parse(normalizedSettings);
}

export async function updateUserSettings(
  userId: string,
  settings: SettingsUpdatePartialType,
): Promise<SettingsInterface> {
  // Getting fields to update
  const parsedPartial = settingsUpdatePartial.parse(settings);

  // Getting current settings from user
  const current = await getUserSettings(userId);

  // Merging settings to update
  const merged = {
    ...current,
    ...parsedPartial,
  };

  // Validating merged settings
  const validated = settingsSchema.parse(merged);

  // Updating settings in db
  await db
    .update(users)
    .set({
      name: validated.name,
      theme: validated.theme,
      language: validated.language,
      numberFormat: validated.numberFormat,
      dateFormat: validated.dateFormat,
      baseCurrencyId: validated.baseCurrencyId,
    })
    .where(eq(users.id, userId));

  return validated;
}
