"use client";

import {
    EmailOutlined,
    LockOutlined,
    PersonOutline,
} from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import Image from "next/image";
import { login } from "@/actions/login";
import { registerUser } from "@/actions/register";

interface FormData {
    username?: string;
    email: string;
    password: string;
}

const AuthForm = ({ type }: { type: "register" | "login" }) => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues:
            type === "register"
                ? { username: "", email: "", password: "" }
                : { email: "", password: "" },
    });

    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        let res;

        if (type === "register") {
            try {
                res = await registerUser(data);
                if (res?.success) {
                    toast.success("Registration successful! Redirecting to login...");
                    router.push("/login");
                } else {
                    toast.error(res?.error || "Something went wrong during registration");
                }
            } catch (err) {
                console.error("Registration error:", err);
                toast.error("An unexpected error occurred. Please try again.");
            }
        }

        if (type === "login") {
            try {
                res = await login(data);
                if (res?.success) {
                    toast.success("Login successful! Redirecting...");
                    router.push("/");
                } else {
                    toast.error(res?.error || "Invalid credentials");
                }
            } catch (err) {
                console.error("Login error:", err);
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="auth">
            <div className="overlay">
                <div className="content">
                    <Image
                        width={500}
                        height={500}
                        src="/assets/logo.png"
                        alt="logo"
                        className="logo"
                    />

                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        {type === "register" && (
                            <>
                                <div className="input">
                                    <input
                                        {...register("username", {
                                            required: "Username is required",
                                            validate: (value: string | undefined) => {
                                                if (!value || value.length < 2) {
                                                    return "Username must be more than 1 character";
                                                }
                                                return true;
                                            },
                                        })}
                                        type="text"
                                        placeholder="Username"
                                        className="input-field"
                                    />
                                    <PersonOutline sx={{ color: "white" }} />
                                </div>
                                {errors.username && (<p className="error">{errors.username.message}</p>)}
                            </>
                        )}

                        <div className="input">
                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                        message: "Enter a valid email",
                                    },
                                })}
                                type="email"
                                placeholder="Email"
                                className="input-field"
                            />
                            <EmailOutlined sx={{ color: "white" }} />
                        </div>
                        {errors.email && <p className="error">{errors.email.message}</p>}

                        <div className="input">
                            <input
                                {...register("password", {
                                    required: "Password is required",
                                    validate: (value: string | undefined) => {
                                        if (
                                            !value ||
                                            value.length < 5 ||
                                            value.length > 20 ||
                                            !value.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/)
                                        ) {
                                            return "Password must be between 5 and 20 characters with at least one special character";
                                        }
                                        return true;
                                    },
                                })}
                                type="password"
                                placeholder="Password"
                                className="input-field"
                            />
                            <LockOutlined sx={{ color: "white" }} />
                        </div>
                        {errors.password && (<p className="error">{errors.password.message}</p>)}

                        <button className="button" type="submit">
                            {type === "register" ? "Join Free" : "Let's Watch"}
                        </button>
                    </form>

                    {type === "register" ? (
                        <Link href="/login">
                            <p className="link">Already have an account? Log In Here</p>
                        </Link>
                    ) : (
                        <Link href="/register">
                            <p className="link">Do not have an account? Register Here</p>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
