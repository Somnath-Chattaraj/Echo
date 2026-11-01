import assert from "node:assert/strict";
import { test } from "node:test";
import { betterAuth } from "better-auth";
import { getAuthConfig } from "../lib/auth-config.ts";

const origin = "https://echo.somnathc.xyz";
const oldOrigin = "https://echo.somnath.site";
const secret = "echo-test-only-c56832ae0d29471192bdf6daee9e349c";

function makeAuth(config) {
  return betterAuth({
    ...config,
    secret,
    // With no external database Better Auth uses its in-memory adapter.
    socialProviders: {
      google: { clientId: "test-client", clientSecret: "test-secret" },
    },
    logger: { level: "error" },
  });
}

function socialRequest(requestOrigin = origin, callbackURL = "/dashboard") {
  return new Request(`${origin}/api/auth/sign-in/social`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: requestOrigin,
      // Regression: an existing cookie makes the old configuration reject users.
      Cookie: "better-auth.session_token=invalid-test-session",
    },
    body: JSON.stringify({ provider: "google", callbackURL, disableRedirect: true }),
  });
}

test("reproduces the deployed 403 with the previous domain", async () => {
  const response = await makeAuth({ baseURL: oldOrigin }).handler(socialRequest());
  assert.equal(response.status, 403);
  assert.equal((await response.json()).code, "INVALID_ORIGIN");
});

test("production defaults to the migrated domain, development to localhost", () => {
  assert.equal(getAuthConfig({ NODE_ENV: "production" }).baseURL, origin);
  assert.deepEqual(getAuthConfig({ NODE_ENV: "development" }).trustedOrigins, ["http://localhost:3000"]);
});

test("the new domain remains trusted during environment migration", async () => {
  const auth = makeAuth(getAuthConfig({ NODE_ENV: "production", BETTER_AUTH_URL: oldOrigin }));
  assert.equal((await auth.handler(socialRequest())).status, 200);
});

test("updated environment generates the exact new Google callback", async () => {
  const auth = makeAuth(getAuthConfig({ NODE_ENV: "production", BETTER_AUTH_URL: `${origin}/` }));
  const response = await auth.handler(socialRequest());
  assert.equal(response.status, 200);
  const url = new URL((await response.json()).url);
  assert.equal(url.hostname, "accounts.google.com");
  assert.equal(url.searchParams.get("redirect_uri"), `${origin}/api/auth/callback/google`);
});

test("untrusted origins and external callback URLs are still rejected", async () => {
  const auth = makeAuth(getAuthConfig({ NODE_ENV: "production" }));
  assert.equal((await auth.handler(socialRequest("https://attacker.example"))).status, 403);
  assert.equal((await auth.handler(socialRequest(origin, "https://attacker.example/dashboard"))).status, 403);
});
