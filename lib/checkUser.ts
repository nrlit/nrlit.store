import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const checkUser = async () => {
  const user = await currentUser();

  // check for current logged in clerk user
  if (!user) {
    return null;
  }

  // check if the user is already in the database
  const loggedInUser = await db.user.findUnique({
    where: {
      clerkUserId: user.id,
    },
  });

  // if user in database return user
  if (loggedInUser) {
    return loggedInUser;
  }

  // if user not in database create user
  const newUser = await db.user.create({
    data: {
      clerkUserId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
      username: user.username,
    },
  });

  return newUser;
};
