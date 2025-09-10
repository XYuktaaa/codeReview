// import CredentialsProvider from "next-auth/providers/credentials";
// import { db } from "@/db";
// import { users } from "@/db/schema";
// import bcrypt from "bcryptjs";
// import { eq } from "drizzle-orm";

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: {},
//         password: {},
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null;

//         const user = await db
//           .select()
//           .from(users)
//           .where(eq(users.email, credentials.email))
//           .get();

//         if (!user) return null;

//         const isCorrect = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );

//         if (!isCorrect) return null;

//         return {
//           id: user.id,
//           email: user.email,
//         };
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
// };
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          console.log("➡️ AUTHORIZE CALLED");
          console.log("INPUT:", credentials);

          if (!credentials?.email || !credentials?.password) {
            console.log("❌ Missing email or password");
            return null;
          }

          // Fetch user
          const user = await db.select().from(users).where(eq(users.email, credentials.email));
          console.log("USER RESULT:", user);

          if (!user || user.length === 0) {
            console.log("❌ No user found");
            return null;
          }

          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user[0].password
          );

          console.log("PASSWORD MATCH:", isCorrectPassword);

          if (!isCorrectPassword) {
            console.log("❌ Wrong password");
            return null;
          }

          console.log("✅ LOGIN OK");
          return {
            id: user[0].id,
            email: user[0].email,
            name: user[0].name,
          };

        } catch (err) {
          console.error("🔥 AUTHORIZE ERROR:", err);
          throw err;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

