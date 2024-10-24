import User from "@/models/User";
import { connectToDB } from "@/lib/mongoDB";
import {auth} from "@/auth";

export const fetchMyList = async () => {
    // Use `getServerSession` for server-side session retrieval
    const session = await auth();
    console.log(session)
    if (!session?.user?.email) {
        throw new Error("No user logged in");
    }

    await connectToDB();

    const user = await User.findOne({ email: session?.user?.email });

    if (!user) {
        throw new Error("No user found");
    }

    return user.favorites;
};
