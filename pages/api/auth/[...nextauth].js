// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  debug: true, // Enable debugging for development
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validEmail = process.env.AUTH_EMAIL;
        const validPassword = process.env.AUTH_PASSWORD;
        if (
          credentials.email === validEmail &&
          credentials.password === validPassword
        ) {
          return { id: 1, name: "User", email: validEmail };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        secure: true,
        sameSite: "lax", // Adjust if necessary (try "strict" if needed)
        path: "/",
        domain: ".expandmybrand.net", // This allows the cookie to be shared across subdomains
      },
    },
  },
});
