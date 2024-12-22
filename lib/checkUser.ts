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

  // Check if the user is an admin using the checkAdmin function
  const isUserAdmin: boolean = await checkAdmin();

  // Define the User type based on the model
  type User = {
    id: string;
    clerkUserId: string;
    email: string;
    name: string | null;
    username: string | null;
    imageUrl: string | null;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
  };

  // Check if the user already exists in the database by email or Clerk user ID
  let dbUser = await db.user.findFirst({
    where: {
      OR: [{ email: email }, { clerkUserId: user.id }],
    },
  });

  // Helper function to determine if user data has changed
  const hasUserDataChanged = (dbUser: User): boolean => {
    const userName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
    const userImageUrl = user.imageUrl ?? "";
    const userUsername = user.username ?? "";

    // console.log("Comparing user data:");
    // console.log("clerkUserId:", dbUser.clerkUserId, "=>", user.id);
    // console.log("name:", dbUser.name, "=>", userName);
    // console.log("imageUrl:", dbUser.imageUrl, "=>", userImageUrl);
    // console.log("email:", dbUser.email, "=>", email);
    // console.log("username:", dbUser.username, "=>", userUsername);
    // console.log("isAdmin:", dbUser.isAdmin, "=>", isUserAdmin);

    return (
      dbUser.clerkUserId !== user.id ||
      dbUser.name !== userName ||
      dbUser.imageUrl !== userImageUrl ||
      dbUser.email !== email ||
      dbUser.username !== userUsername ||
      dbUser.isAdmin !== isUserAdmin
    );
  };

  // If the user exists in the database, update their information if data has changed
  if (dbUser) {
    if (hasUserDataChanged(dbUser)) {
      console.log("Data has changed, updating the user.");
      try {
        dbUser = await db.user.update({
          where: { id: dbUser.id },
          data: {
            clerkUserId: user.id, // Update with current user ID
            name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(), // Update name
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
      console.log("Data has not changed, no update needed.");
    }
  } else {
    // If the user doesn't exist, create a new user in the database
    console.log("User does not exist, creating a new user.");
    try {
      dbUser = await db.user.create({
        data: {
          clerkUserId: user.id, // Set Clerk user ID
          name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(), // Set full name
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
