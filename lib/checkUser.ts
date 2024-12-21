import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const checkUser = async () => {
  const user = await currentUser();

  // check for current logged in clerk user
  if (!user) {
    return null;
  }

  const email = user.primaryEmailAddress?.emailAddress;

  if (!email) {
    throw new Error("User email not found");
  }

  // check if the user is already in the database by email or clerkUserId
  let dbUser = await db.user.findFirst({
    where: {
      OR: [{ email: email }, { clerkUserId: user.id }],
    },
  });

  if (dbUser) {
    // If user exists, update their information
    dbUser = await db.user.update({
      where: { id: dbUser.id },
      data: {
        clerkUserId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        email: email,
        username: user.username,
      },
    });
  } else {
    // If user doesn't exist, create a new user
    dbUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        email: email,
        username: user.username,
      },
    });
  }

  return dbUser;
};
