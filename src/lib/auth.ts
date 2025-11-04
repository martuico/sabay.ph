import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import prisma from "@/lib/prisma";
import resend from "./email";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [nextCookies()],
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }) => {
      if (user.email) {
        try {
          console.log("sending email to ", user.email);
          // @TODO: Update this to use actual email
          await resend.emails.send({
            from: "Sabay.PH <onboarding@resend.dev>",
            to: ["delivered@resend.dev", user.email],
            subject: "Account registration",
            html: `<p>Please go to this link to <a href="${url}">verify</a> ${token}</p>`,
          });
        } catch (e) {
          console.log("unable to send email - ", e);
        }
      }
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600, // 1 hour
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    async sendResetPassword(data, request) {
      // Send an email to the user with a link to reset their password
    },
  },
  //socialProviders: {
  //  google: {
  //    clientId: process.env.GOOGLE_CLIENT_ID!,
  //    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  //  },
  //  facebook: {
  //    clientId: process.env.FACEBOOK_CLIENT_ID!,
  //    clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
  //  },
  //},
  trustedOrigins: ["http://localhost:3001"],
});
