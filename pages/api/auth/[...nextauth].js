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
                console.log("Received:", credentials);

                if (
                    credentials.username === "john" &&
                    credentials.password === "test"
                ) {
                    return {
                        id: 1,
                        name: "john",
                        email: "john123@gmail.com",
                    };
                }

                console.log("Login failed");
                return null;
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: "test",
});
