import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import checkAdmin from "@/lib/isAdmin";

export const checkUser = async () => {
  const user = await currentUser();

  // Ensure the user is logged in
  if (!user) {
    console.error("No user found");
    return null;
  }

  // Ensure email exists for the current user
  const email = user.primaryEmailAddress?.emailAddress;
  if (!email) {
    throw new Error("User email not found");
  }

  // Check if the user is an admin using the checkAdmin function (assumes it returns a boolean)
  const isUserAdmin: boolean = await checkAdmin();

  // Check if the user already exists in the database by email or Clerk user ID
  let dbUser = await db.user.findFirst({
    where: {
      OR: [{ email: email }, { clerkUserId: user.id }],
    },
  });

  // If the user exists in the database, update their information
  if (dbUser) {
    try {
      dbUser = await db.user.update({
        where: { id: dbUser.id },
        data: {
          clerkUserId: user.id, // Update with current user ID
          name: `${user.firstName} ${user.lastName}`, // Update name
          imageUrl: user.imageUrl ?? "", // Ensure imageUrl is never null
          email: email, // Update email
          username: user.username ?? "", // Ensure username is never null
          isAdmin: isUserAdmin, // Update isAdmin status
        },
      });
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Failed to update user");
    }
  } else {
    // If the user doesn't exist, create a new user in the database
    try {
      dbUser = await db.user.create({
        data: {
          clerkUserId: user.id, // Set Clerk user ID
          name: `${user.firstName} ${user.lastName}`, // Set full name
          imageUrl: user.imageUrl ?? "", // Ensure imageUrl is never null
          email: email, // Set email
          username: user.username ?? "", // Ensure username is never null
          isAdmin: isUserAdmin, // Set isAdmin status
        },
      });
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }

  return dbUser; // Return the user object
};
