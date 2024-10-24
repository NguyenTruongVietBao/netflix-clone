'use server';

import bcrypt from "bcryptjs";
import User from "@/models/User";
import {connectToDB} from "@/lib/mongoDB";

export const registerUser = async (data: { username: string; email: string; password: string }) => {
    try {
        const {username, email, password } = data;

        await connectToDB();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { error: "Email already in use" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
        });

        await newUser.save();

        return { success: "Registration and login successful" };
    } catch {
        return { error: "Registration failed" };
    }
};
