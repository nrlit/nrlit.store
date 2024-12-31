import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default async function PaymentSuccess({
  searchParams,
}: {
  searchParams: Promise<{ trxID: string; amount: string; paymentID: string }>;
}) {
  const { trxID, amount, paymentID } = await searchParams;

  if (!trxID || !amount || !paymentID) {
    redirect("/");
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-green-600">
            Payment Successful
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center py-8">
          <CheckCircle className="h-16 w-16 text-green-600 mb-4" />
          <p className="text-center">
            Your payment has been processed successfully.
          </p>
          <p className="text-center mt-2">Transaction ID: {trxID}</p>
          <p className="text-center">Amount: {amount} BDT</p>
          <p className="text-center">Payment ID: {paymentID}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <a href="/orders">View Your Orders</a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
