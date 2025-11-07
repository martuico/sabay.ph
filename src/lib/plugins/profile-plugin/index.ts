import type { AuthContext, BetterAuthPlugin } from "better-auth";
import { createAuthClient } from "better-auth/client";

export const profilePlugin = () =>
  ({
    id: "profilePlugin",
    schema: {
      user: {
        fields: {
          firstName: {
            type: "string",
          },
          lastName: {
            type: "string",
          },
        },
        disableMigration: true,
        modelName: "User",
      },
    },
  }) satisfies BetterAuthPlugin;
