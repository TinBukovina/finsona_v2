import { settingsSchema } from "@/_server/schemas/settings";
import { useCallback, useContext, useEffect, useState } from "react";
import { createContext } from "vm";
import z from "zod";

export type Settings = z.infer<typeof settingsSchema>;

// Default values
export const DEFAULT_SETTINGS: Settings = settingsSchema.parse({
  theme: "system",
});

// Types for context
type SettingsContextValueProps = {
  settings: Settings;
  isLoading: boolean;
  error: string | null;
  updateSettings: (partial: Partial<Settings>) => Promise<void>;
  resetSettings: () => Promise<void>;
};

// Creating context
const SettingsContext = createContext<SettingsContextValueProps | undefined>(
  undefined,
);

// Creating provider
type SettingsProviderProps = {
  userId: string;
  children: React.ReactNode;
};

export const SettingsProvider: React.FC<SettingsProviderProps> = ({
  userId,
  children,
}) => {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Helper functions
  const fetchSettingsFromAPI = useCallback(() => {}, []);
  const patchSettingsToAPI = useCallback(() => {}, []);

  useEffect(() => {
    let cancelled = true;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
      } catch (err: any) {
        console.error(err);
        if (!cancelled) {
          setError(
            err.message ?? "Error while catching settings data from API.",
          );
          setSettings(DEFAULT_SETTINGS);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [userId, fetchSettingsFromAPI]);

  const updateSettings = useCallback(
    async (partial: Partial<Settings>) => {
      setError(null);

      setSettings((prev) => ({
        ...prev,
        ...partial,
      }));

      try {
        const updated = await patchSettingsToAPI(userId, partial);

        setSettings(updated);
      } catch (err: any) {
        console.error(err);
        setError(err.message ?? "Error while updating settings.");

        try {
          const reloaded = await fetchSettingsFromAPI(userId);

          setSettings(reloaded);
        } catch (err: any) {
          console.error(err);
          setError(err.message ?? "Error while reloading settings.");
        }
      }
    },
    [userId, patchSettingsToAPI, fetchSettingsFromAPI],
  );

  const resetSettings = useCallback(async () => {
    try {
      const updated = await patchSettingsToAPI(userId, DEFAULT_SETTINGS);
      setSettings(updated);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? "Error while resetting settings.");
    }
  }, [userId, patchSettingsToAPI]);

  const value: SettingsContextValueProps = {
    settings,
    isLoading,
    error,
    updateSettings,
    resetSettings,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export function useSettings(): SettingsContextValueProps {
  const ctx = useContext(SettingsContext);

  if (!ctx) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }

  return ctx;
}
