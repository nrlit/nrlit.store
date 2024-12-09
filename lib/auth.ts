import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "../appwrite/config";
import { redirect } from "next/navigation";
import { ID } from "node-appwrite";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

interface IUser {
  $id: string;
  name: string;
  email: string;
}

interface ISessionCookie {
  value: string;
}

interface Auth {
  user: IUser | null;
  sessionCookie: ISessionCookie | null;
  getUser: () => Promise<IUser | null>;
  createSession: (
    formData: FormData
  ) => Promise<{ success: boolean; errors?: Record<string, string[]> }>;
  deleteSession: () => Promise<void>;
  createUser: (
    formData: FormData
  ) => Promise<{ success: boolean; errors?: Record<string, string[]> }>;
}

const auth: Auth = {
  user: null,
  sessionCookie: null,

  getUser: async () => {
    auth.sessionCookie = (await cookies()).get("session") as ISessionCookie;

    try {
      const { account } = await createSessionClient(auth.sessionCookie?.value);
      auth.user = await account.get();
    } catch (error) {
      console.error(error);
      auth.user = null;
      auth.sessionCookie = null;
    }

    return auth.user;
  },

  createSession: async (formData: FormData) => {
    const result = loginSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      return { success: false, errors: result.error.flatten().fieldErrors };
    }

    const { email, password } = result.data;

    try {
      const { account } = await createAdminClient();

      const session = await account.createEmailPasswordSession(email, password);

      (await cookies()).set("session", session.secret, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        expires: new Date(session.expire),
        path: "/",
      });

      return { success: true };
    } catch (error) {
      console.error(error);
      auth.user = null;
      auth.sessionCookie = null;
      return { success: false, errors: { _form: ["Invalid credentials"] } };
    }
  },

  deleteSession: async () => {
    auth.sessionCookie = (await cookies()).get("session") as ISessionCookie;

    try {
      const { account } = await createSessionClient(auth.sessionCookie.value);
      await account.deleteSession("current");
    } catch (error) {
      console.error(error);
    }

    (await cookies()).delete("session");
    auth.user = null;
    auth.sessionCookie = null;
    redirect("/");
  },

  createUser: async (formData: FormData) => {
    const result = registerSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      return { success: false, errors: result.error.flatten().fieldErrors };
    }

    const { name, email, password } = result.data;

    try {
      const { account, databases, users } = await createAdminClient();

      const newUserAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (!newUserAccount.$id) {
        throw new Error("User account not created");
      }

      const newUserData = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABSE!,
        process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION!,
        newUserAccount.$id,
        {
          userName: name,
          userEmail: email,
          userPassword: password,
          orders: [],
          totalSpent: 0,
          isAdmin: false,
        }
      );

      if (!newUserData.$id) {
        await users.delete(newUserAccount.$id);
        throw new Error("User data not created");
      }

      const session = await account.createEmailPasswordSession(email, password);

      (await cookies()).set("session", session.secret, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        expires: new Date(session.expire),
        path: "/",
      });

      return { success: true };
    } catch (error) {
      console.error(error);
      auth.user = null;
      auth.sessionCookie = null;
      return { success: false, errors: { _form: ["Failed to create user"] } };
    }
  },
};

export default auth;
