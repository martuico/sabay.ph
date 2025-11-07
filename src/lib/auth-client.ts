import { createAuthClient } from "better-auth/react";
import { profileClientPlugin } from "./plugins/profile-plugin/client";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  plugins: [profileClientPlugin()],
});

export const { signIn, signOut, signUp, useSession } = authClient;
