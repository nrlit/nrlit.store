import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "./appwrite/config";
import { redirect } from "next/navigation";
import { ID } from "node-appwrite";

interface Auth {
  user: IUser | null;
  sessionCookie: ISessionCookie | null;
  getUser: () => Promise<IUser | null>;
  createSession: (formData: FormData) => Promise<void>;
  deleteSession: () => Promise<void>;
  createUser: (formData: FormData) => Promise<void>;
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
    "use server";
    const data = Object.fromEntries(formData);
    const { email, password } = data;

    try {
      const { account } = await createAdminClient();

      const session = await account.createEmailPasswordSession(
        email as string,
        password as string
      );

      (await cookies()).set("session", session.secret, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        expires: new Date(session.expire),
        path: "/",
      });

      redirect("/");
    } catch (error) {
      console.error(error);
      auth.user = null;
      auth.sessionCookie = null;
    }
  },

  deleteSession: async () => {
    "use server";
    auth.sessionCookie = (await cookies()).get("session") as ISessionCookie;

    try {
      const { account } = await createSessionClient(auth.sessionCookie.value);
      await account.deleteSession("current");
    } catch (error) {
      console.error(error);
      auth.user = null;
      auth.sessionCookie = null;
    }

    (await cookies()).delete("session");
    auth.user = null;
    auth.sessionCookie = null;
    redirect("/");
  },

  createUser: async (formData: FormData) => {
    "use server";
    const data = Object.fromEntries(formData);
    const { name, email, password } = data;

    try {
      const { account, databases } = await createAdminClient();

      const newUserAccount = await account.create(
        ID.unique(),
        email as string,
        password as string,
        name as string
      );

      if (!newUserAccount.$id) {
        throw new Error("User account not created");
      }

      const newUserData = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABSE!,
        process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION!,
        newUserAccount.$id,
        {
          id: newUserAccount.$id,
          name: name,
          email: email,
          password: password,
          lastOrder: null,
          totalSpent: 0,
          isAdmin: false,
        }
      );

      if (!newUserData) {
        throw new Error("User data not created");
      }

      const session = await account.createEmailPasswordSession(
        email as string,
        password as string
      );

      (await cookies()).set("session", session.secret, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        expires: new Date(session.expire),
        path: "/",
      });

      redirect("/");
    } catch (error) {
      console.error(error);
      auth.user = null;
      auth.sessionCookie = null;
    }
  },
};

export default auth;
