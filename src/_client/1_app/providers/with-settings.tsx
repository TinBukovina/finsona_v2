"use client";

import { trpc } from "@/_server/client";
import {
  DEFAULT_SETTINGS,
  type SettingsInterface,
} from "@/_server/schemas/settings";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// Types for context
type SettingsContextValueProps = {
  settings: SettingsInterface;
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
  updateSettings: (partial: Partial<SettingsInterface>) => Promise<void>;
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
  const { data, isLoading, error } = trpc.settings.get.useQuery(
    { userId },
    {
      initialData: DEFAULT_SETTINGS,
    },
  );

  const utils = trpc.useUtils();

  const updateMutation = trpc.settings.update.useMutation({
    onSuccess: (updatedSettings) => {
      utils.settings.get.setData({ userId }, updatedSettings);
    },
  });

  const updateSettings = async (partial: Partial<SettingsInterface>) => {
    await updateMutation.mutateAsync({
      userId,
      ...partial,
    });
  };

  const ctxValue: SettingsContextValueProps = {
    settings: data ?? DEFAULT_SETTINGS,
    isLoading,
    isUpdating: updateMutation.isPending,
    error: error ? error.message : null,
    updateSettings,
  };

  return (
    <SettingsContext.Provider value={ctxValue}>
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
