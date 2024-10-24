import NextAuth from "next-auth";
import { connectToDB } from "@/lib/mongoDB";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                await connectToDB();

                const user = await User.findOne({ email: credentials?.email });

                if (!user) {
                    throw new Error("No user found");
                }

                const isMatchedPassword = bcrypt.compare(
                    credentials?.password,
                    user.password
                );

                if (!isMatchedPassword) {
                    throw new Error("Invalid password");
                }

                return user;
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
})

