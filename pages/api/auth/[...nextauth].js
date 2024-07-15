import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PW = process.env.ADMIN_PASSWORD;

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_FRONT_ID,
      clientSecret: process.env.GOOGLE_FRONT_SECRET
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (email === ADMIN_EMAIL && password === ADMIN_PW) {
          return { id: 1, name: 'Admin', email: ADMIN_EMAIL };
        }
        return null;
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt', 
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
