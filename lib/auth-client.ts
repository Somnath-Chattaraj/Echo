import { createAuthClient } from "better-auth/react";

// Use the current browser origin; the server owns the canonical OAuth URL.
export const authClient = createAuthClient();
export const { signIn, signUp, useSession, signOut } = authClient;
