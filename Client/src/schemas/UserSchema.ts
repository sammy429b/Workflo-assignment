import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .refine(
            (value) => /[a-zA-Z]/.test(value) && /[0-9]/.test(value) && /[!@#$%^&*]/.test(value),
            { message: "Password must contain at least one Capital letter, one number, and one special character" }
        ),
});

export const RegisterSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .refine(
            (value) => /[a-zA-Z]/.test(value) && /[0-9]/.test(value) && /[!@#$%^&*]/.test(value),
            { message: "Password must contain at least one Capital letter, one number, and one special character" }
        ),
    repassword: z.string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .refine(
            (value) => /[a-zA-Z]/.test(value) && /[0-9]/.test(value) && /[!@#$%^&*]/.test(value),
            { message: "Password must contain at least one Capital letter, one number, and one special character" }
        ),
})


export type Login = z.infer<typeof LoginSchema>;
export type Register = z.infer<typeof RegisterSchema>;