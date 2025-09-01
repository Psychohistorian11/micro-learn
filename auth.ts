import prismadb from "@/lib/prismadb";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [

    Google,

    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        if (res.ok) {
          return {
            id: data.user.id,
            name: data.user.username,
            email: data.user.email,
            image: data.user.profilePicture,
          };
        }
        return null;
      }
    })],


  callbacks: {
    async signIn({ user }) {

      try {
        const existingUser = await prismadb.user.findUnique({
          where: { email: user.email! },
        });

        if (!existingUser) {
          await prismadb.user.create({
            data: {
              username: user.name ?? user.email!.split("@")[0],
              email: user.email!,
              password: "",
              profilePicture: user.image ?? "",
              description: "Registrado con Google",
              role: "student",
            },
          });
        }

        return true;
      } catch (err) {
        console.error("Error registrando usuario con Google", err);
        return false;
      }
    },
    async jwt({ token, user }) {

      if (user) {
        token.sub = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;

      }
      return token;
    },
    async session({ session, token }) {

      session.user = {
        id: token.sub as string,
        name: token.name,
        email: token.email as string,
        image: token.picture,
        emailVerified: null
      };

      return session;
    },
  }
})

