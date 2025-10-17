import { toast as sonnerToast } from "sonner";

type ToastOptions = Parameters<typeof sonnerToast>[1];

const successStyles: React.CSSProperties = {
  "--normal-bg":
    "color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))",
  "--normal-text": "light-dark(var(--color-green-600), var(--color-green-400))",
  "--normal-border":
    "light-dark(var(--color-green-600), var(--color-green-400))",
  "--border-radius": "999px",
} as React.CSSProperties;

const infoStyles: React.CSSProperties = {
  "--normal-bg":
    "color-mix(in oklab, light-dark(var(--color-sky-600), var(--color-sky-400)) 10%, var(--background))",
  "--normal-text": "light-dark(var(--color-sky-600), var(--color-sky-400))",
  "--normal-border": "light-dark(var(--color-sky-600), var(--color-sky-400))",
  "--border-radius": "999px",
} as React.CSSProperties;

const errorStyles: React.CSSProperties = {
  "--normal-bg":
    "color-mix(in oklab, var(--destructive) 10%, var(--background))",
  "--normal-text": "var(--destructive)",
  "--normal-border": "var(--destructive)",
  "--border-radius": "999px",
} as React.CSSProperties;

export const toast = {
  message: (message: string, options?: ToastOptions) => {
    sonnerToast(message, options);
  },

  success: (message: string, options?: ToastOptions) => {
    sonnerToast.success(message, {
      ...options,
      style: {
        ...successStyles,
        ...options?.style,
      },
    });
  },

  info: (message: string, options?: ToastOptions) => {
    sonnerToast.info(message, {
      ...options,
      style: {
        ...infoStyles,
        ...options?.style,
      },
    });
  },

  error: (message: string, options?: ToastOptions) => {
    sonnerToast.error(message, {
      ...options,
      style: {
        ...errorStyles,
        ...options?.style,
      },
    });
  },
};
