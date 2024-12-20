import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserProfile,
} from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
        <SignedIn>
          <UserProfile  />
        </SignedIn>
      </div>
    </div>
  );
}
