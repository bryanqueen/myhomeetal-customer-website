import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt" as const,  // Explicitly asserting the type
  },

  callbacks: {
    async signIn({ user, account }) {
      // If you need to perform some operations during sign-in, uncomment and modify this block
      // if (account.provider === 'google') {
      //   const { email, name } = user;
      //   try {
      //     await mongoDbConnect();
      //     const gUserExists = await gUser.findOne({ email });
      //     if (!gUserExists) {
      //       const res = await fetch("http://localhost:3000/api/google", {
      //         method: "POST",
      //         headers: {
      //           "Content-Type":"application/json",
      //         },
      //         body: JSON.stringify({
      //           name,
      //           email
      //         }),
      //       });

      //       if (res.ok) {
      //         return user;
      //       }
      //     }
      //   } catch (error) {
      //     console.log(error);
      //   }
      // }

      // For credential-based sign-ins, return the user as-is
      return user;
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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
