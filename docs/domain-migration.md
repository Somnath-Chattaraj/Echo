# Move Echo to echo.somnathc.xyz

## Confirmed failure

On 1 November 2026 the new homepage returned HTTP 200 from Vercel. A Google sign-in request without cookies generated `redirect_uri=https://echo.somnath.site/api/auth/callback/google`. The same request with an invalid session cookie and `Origin: https://echo.somnathc.xyz` returned HTTP 403 with `INVALID_ORIGIN`. No real account credentials were used.

The deployed auth base URL still points to the old domain. Better Auth's origin protection rejects the new browser origin when cookies are present. Clearing cookies can hide the symptom, but does not fix the configuration or Google's callback.

## Repository changes

`lib/auth-config.ts` explicitly supplies the auth base URL. `BETTER_AUTH_URL` takes precedence; without it, production uses `https://echo.somnathc.xyz` and development uses `http://localhost:3000`. Production explicitly trusts the new domain during migration, even if the deployment still contains the old base URL. Other origins are not automatically trusted; origin and CSRF protections remain enabled. The client uses the browser's own origin.

The email login form now sends its input values and displays returned auth errors. Google sign-in also displays API errors and resets its loading state on failure.

## Vercel changes required

In the existing Echo project's **Settings → Environment Variables**:

1. Set `BETTER_AUTH_URL` to `https://echo.somnathc.xyz` for **Production**. This is essential even after the code fix: retaining the old value keeps Google's callback on the old domain.
2. If `BETTER_AUTH_BASE_URL` or `NEXT_PUBLIC_BETTER_AUTH_URL` exists with the old domain, remove the obsolete override or update it to the same URL. The current client does not need a public base-URL variable.
3. Keep `BETTER_AUTH_SECRET`, `DATABASE_URL`, `GOOGLE_CLIENT_ID`, and `GOOGLE_CLIENT_SECRET` unchanged. No secret rotation or database migration is needed for a domain change.
4. Redeploy the latest commit after saving the environment variables. Existing deployments do not receive changed variables.
5. Under **Settings → Domains**, confirm `echo.somnathc.xyz` belongs to this project and is assigned to Production. Its existing HTTPS homepage already works; no DNS change was shown to be necessary by the probe.

Keep Development set to `http://localhost:3000`. Preview deployments need a separately approved URL and matching OAuth settings if you intend to test Google login there; do not wildcard-trust every Vercel preview domain.

## Google OAuth changes required

In **Google Cloud Console → Google Auth Platform → Clients** (or **APIs & Services → Credentials**), edit the Web application OAuth client matching Vercel's `GOOGLE_CLIENT_ID`:

- Add this exact **Authorized redirect URI**: `https://echo.somnathc.xyz/api/auth/callback/google`.
- If the client has Authorized JavaScript origins, add `https://echo.somnathc.xyz` there too. The server callback URI above is the required setting for this flow.
- In the consent screen / Branding settings, update homepage/privacy/terms links that still reference the old domain. If Google requires an authorized domain, add the registrable domain `somnathc.xyz` and complete its ownership verification.
- If Google shows `403 access_denied` with the app in Testing, add the intended account as a test user or complete the appropriate publication process. This is separate from Echo's confirmed `INVALID_ORIGIN` error.

You can retain the old redirect URI temporarily while the old domain is still intentionally supported; remove it when retiring that domain.

## Other links

Update existing customer embed snippets to `https://echo.somnathc.xyz/embed/PROJECT_KEY`, plus portfolio/bookmark links. New snippets generated on the new domain already use the browser's current origin. No PostgreSQL or Gemini configuration change is required solely for this domain migration.

## Verify after redeployment

1. Open the new site, sign out if necessary, and sign in again. Old-domain cookies do not transfer to the new host.
2. Google sign-in should send `redirect_uri=https://echo.somnathc.xyz/api/auth/callback/google` and return to the new domain's dashboard.
3. Retry with an existing cookie: the new origin should no longer return `403 INVALID_ORIGIN`.
4. An unrelated Origin must still receive 403.

Local regression tests use in-memory auth state, not the production database:

```sh
node --test tests/auth-domain.test.mjs
```

Requires Node.js 22.18+ (or a newer supported release) for native TypeScript stripping. These tests exercise Better Auth 1.4.18's actual request handler, including the cookie-triggered failure, OAuth callback URL, and rejection of hostile origins/redirects.

References: [Better Auth options](https://better-auth.com/docs/reference/options), [Better Auth security](https://better-auth.com/docs/reference/security), [Vercel environment variables](https://vercel.com/docs/environment-variables), [Google web-server OAuth](https://developers.google.com/identity/protocols/oauth2/web-server).
