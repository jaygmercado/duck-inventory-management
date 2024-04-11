/* eslint-disable camelcase */
import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import AzureADProvider from 'next-auth/providers/azure-ad';

import UserModel from '@/models/User';
import connectMongo from '@/utils/mongodb';
// import sendEmail from '@/utils/sendEmail';

async function refreshAccessToken(token: JWT) {
  try {
    const url = `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}/oauth2/v2.0/token`;

    const body = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID || '',
      client_secret: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_SECRET || '',
      scope: 'email openid profile User.Read offline_access',
      grant_type: 'refresh_token',
      ...(token.refreshToken && { refresh_token: token.refreshToken }),
    });

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      body,
    });

    const refreshedTokens = await response.json();
    if (!response.ok) throw refreshedTokens;

    return {
      ...token,
      accessToken: refreshedTokens.id_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: `${process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID}`,
      clientSecret: `${process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_SECRET}`,
      tenantId: `${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}`,
      authorization: {
        params: { scope: 'openid email profile User.Read  offline_access' },
      },
      httpOptions: { timeout: 10000 },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      await connectMongo();
      const foundUser = await UserModel.findOne({ email: user.email });
      if (foundUser === null) {
        await UserModel.create({
          name: user.name,
          email: user.email,
          image: user.image,
        });
        // await sendEmail(
        //   ['mrg2023@dlsud.edu.ph'],
        //   'New User',
        //   `${user.name} just signed up in Lasallian CodeSpace Portal`,
        // );
      }
      return true;
    },
    async jwt({ token, user, account }): Promise<JWT> {
      if (account && user) {
        return {
          accessToken: account.id_token,
          accessTokenExpires: account?.expires_at ? account.expires_at * 1000 : 0,
          refreshToken: account.refresh_token,
          user,
        };
      }

      if (Date.now() < token.accessTokenExpires - 100000 || 0) return token;

      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      await connectMongo();
      const foundUser = await UserModel.findOne({ email: token.user.email });
      if (session) {
        session.user = {...token.user, ...foundUser};
        session.error = token.error;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
