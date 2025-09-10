import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (
                    credentials?.username === process.env.ADMIN_USER &&
                    credentials?.password === process.env.ADMIN_PASS
                ) {
                    // Возвращаем объект User с обязательным id
                    return {
                        id: "1", // обязательно строка
                        name: "Admin",
                        email: process.env.ADMIN_EMAIL || null,
                    };
                }
                return null; // если данные неверные
            },
        }),
    ],
    pages: {
        signIn: "/admin/login", // кастомная страница логина
    },
    session: {
        strategy: "jwt",
    },
});
