"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Checkout = () => {
  const params = useSearchParams();

  const plan = params.get("plan");
  const price = params.get("price");

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-10">
        {/* LEFT — FORM */}
        <Card>
          <CardContent className="p-8 space-y-6">
            <h2 className="text-2xl font-bold">Student Details</h2>

            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input placeholder="Enter your name" />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input placeholder="Enter your email" />
            </div>

            <div className="space-y-2">
              <Label>Phone</Label>
              <Input placeholder="Enter phone number" />
            </div>

            {/* Stripe Card Placeholder */}
            <div className="space-y-2">
              <Label>Card Details</Label>
              <div className="border rounded-md p-4 text-gray-400">
                Stripe Card Element Here
              </div>
            </div>

            <Button className="w-full h-12 text-lg">Pay ${price}</Button>
          </CardContent>
        </Card>

        {/* RIGHT — ORDER SUMMARY */}
        <Card className="h-fit">
          <CardContent className="p-8 space-y-6">
            <h2 className="text-2xl font-bold">Order Summary</h2>

            <div className="flex justify-between">
              <span>{plan}</span>
              <span>${price}</span>
            </div>

            <div className="flex justify-between text-sm text-gray-500">
              <span>Tax</span>
              <span>$0</span>
            </div>

            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${price}</span>
            </div>

            <div className="text-sm text-gray-500">
              Secure payment powered by Stripe 🔒
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
