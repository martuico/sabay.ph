import { BetterAuthClientPlugin } from "better-auth";
import type { profilePlugin } from "./index";

type ProfileClientPlugin = typeof profilePlugin;

export const profileClientPlugin = () => {
  return {
    id: "birthdayPlugin",
    $InferServerPlugin: {} as ReturnType<ProfileClientPlugin>,
  } satisfies BetterAuthClientPlugin;
};
