import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <SignIn />
      </div>
    </div>
  );
}
