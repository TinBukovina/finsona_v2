export const paths = {
  app: {
    root: "/app",
    auth: {
      signIn: "/app/auth/signin",
      signUp: "/app/auth/signup",
      resetPassword: (token: string) => `/app/auth/reset-password=${token}`,
      forgotPassword: "/app/auth/forgot-password",
      forgotPasswordConfirm: (token: string) =>
        `/app/auth/forgot-password/confirm?token=${token}`,
      emailLogin: "/app/auth/email-login",
      googleLogin: "/app/auth/google-login",
      appleLogin: "/app/auth/apple-login",
    },
    home: {
      root: "/app/home",
    },
    dashboard: {
      root: "/app/dashboard",
    },
    budget: {
      root: "/app/budget",
    },
    settings: {
      root: "/app/settings",
    },
  },
};
