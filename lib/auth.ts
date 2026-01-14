import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcrypt";
import connectDB from "@/lib/mongodb";
import { z } from "zod";

const loginSchema = z.object({
  username: z
    .string()
    .min(6, { message: "Username must be at least 6 characters" })
    .max(15, { message: "Username must be at most 15 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error(
            JSON.stringify({
              // global error to throw in login page
              global: ["Username and password are required"],
            })
          );
        }
        // Validate the input against the schema
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) {
          const schemaErrors = parsed.error.flatten().fieldErrors;
          throw new Error(JSON.stringify(schemaErrors));
        }

        await connectDB();
        const user = await User.findOne({ username: credentials.username });

        if (!user)
          throw new Error(
            JSON.stringify({
              // global error to throw in login page
              global: ["Username or password is wrong"],
            })
          );

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid)
          throw new Error(
            JSON.stringify({
              global: ["Username or password is wrong"],
            })
          );
        // Return only the ID
        return {
          id: user._id.toString(),
        };
      },
    }),
  ],
  session: {
    maxAge: 24 * 60 * 60,
    strategy: "jwt",
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Store only the user ID
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string; // Only keep the ID in session
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
