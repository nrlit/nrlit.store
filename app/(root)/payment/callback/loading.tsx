import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';

export default function CallbackLoading() {
  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Processing Payment</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-8">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </CardContent>
      </Card>
    </div>
  );
}

