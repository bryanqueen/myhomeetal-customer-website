// app/api/auth/authConfig.ts
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      // Perform any necessary checks or operations here
      try {
        // Example: Check if the user's email is verified
        if (account.provider === 'google') {
          const { email } = user;
          // Perform your MongoDB operations or any other checks here
          // const userExists = await findUserInDatabase(email);
          // if (!userExists) {
          //   await createUserInDatabase(email, user.name);
          // }
        }
        // If all checks pass, allow sign-in
        return true;
      } catch (error) {
        console.error(error);
        // Deny sign-in in case of error
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
      }
      console.log(session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};
