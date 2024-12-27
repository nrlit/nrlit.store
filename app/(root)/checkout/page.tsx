import { CheckoutForm } from "@/components/checkout-form";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const email = user?.primaryEmailAddress?.emailAddress ?? "";

  return (
    <>
      <SignedIn>
        <div className="container mx-auto py-10">
          <h1 className="text-3xl font-bold mb-2">Checkout</h1>
          <p className="text-gray-600 mb-6">Complete your purchase</p>
          <CheckoutForm email={email} />
        </div>
      </SignedIn>
      <SignedOut>
        <div className="container mx-auto py-10">
          <h1 className="text-3xl font-bold mb-2">Checkout</h1>
          <p className="text-gray-600 mb-6">Please sign in to continue</p>
        </div>
      </SignedOut>
    </>
  );
}
