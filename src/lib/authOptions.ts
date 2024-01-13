import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { Adapter } from "next-auth/adapters";
import { env } from "@/lib/env";
import { PrismaClient } from "@prisma/client";
import { prisma } from '@/lib/db/prisma'
import { mergeAnonymousCartIntoUserAccount } from "./db/carts"


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma as PrismaClient) as Adapter,
    providers: [
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID!,
            clientSecret: env.GOOGLE_CLIENT_SECRET!
        })
    ],

    callbacks: {
        session({ session, user }) {
            session.user.id = user.id
            return session;
        },
    },

    events: {
        async signIn({ user }) {
            await mergeAnonymousCartIntoUserAccount(user.id)
        },
    }
}