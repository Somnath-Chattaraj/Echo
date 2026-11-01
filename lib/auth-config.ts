const productionOrigin = "https://echo.somnathc.xyz";

type AuthEnvironment = {
  NODE_ENV?: string;
  BETTER_AUTH_URL?: string;
};

export function getAuthConfig(env: AuthEnvironment = {
  NODE_ENV: process.env.NODE_ENV,
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
}) {
  const baseURL = new URL(
    env.BETTER_AUTH_URL ||
      (env.NODE_ENV === "production" ? productionOrigin : "http://localhost:3000"),
  ).origin;

  return {
    baseURL,
    // Keep the migrated domain trusted even while deployment settings are updated.
    // Other origins remain subject to Better Auth's CSRF checks.
    trustedOrigins: Array.from(new Set([
      baseURL,
      ...(env.NODE_ENV === "production" ? [productionOrigin] : []),
    ])),
  };
}
