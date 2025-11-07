import { createAuthClient } from "better-auth/client";
import type { AuthContext, BetterAuthPlugin } from "better-auth";

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
