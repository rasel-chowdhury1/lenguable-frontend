/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Check, Sparkles } from "lucide-react";
import { PricingPackage } from "@/types";
import { useGetAllPackagesQuery } from "@/redux/features/packageApi";
import { usePurchaseMutation } from "@/redux/features/purchaseApi";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export default function PricingPage() {
  const { data } = useGetAllPackagesQuery(undefined);
  const packages: PricingPackage[] = data?.data || [];

  const [purchase, { isLoading, originalArgs }] = usePurchaseMutation();

  const handlePurchase = async (pkg: PricingPackage) => {
    try {
      const res = await purchase({ packageId: pkg._id! }).unwrap();

      if (res?.data?.url) {
        window.location.href = res.data.url;
      } else {
        toast.error("Could not get payment link. Please try again.");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Purchase failed. Please try again.");
    }
  };

  return (
    <div id="pricing" className="mt-40 py-20 bg-[#EEFEE4]">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Offerings
          </h2>
          <p className="text-gray-600">
            Flexible pricing to fit your learning goals
          </p>
        </div>

        {packages.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-lg border border-border flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-muted-foreground/40" />
            </div>
            <p className="font-semibold text-foreground">
              No packages available
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg) => {
              const isThisLoading =
                isLoading && originalArgs?.packageId === pkg._id;

              // Calculate discounted price
              const finalPrice =
                pkg.discount && pkg.discount > 0
                  ? pkg.price - (pkg.price * pkg.discount) / 100
                  : null;

              return (
                <div
                  key={pkg._id}
                  className={`relative flex flex-col rounded-xl border overflow-hidden transition-colors duration-200 bg-white
                  ${pkg.isMostPopular ? "border-[#A9F877]" : "border border-gray-100"}`}
                >
                  {pkg.isMostPopular && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-[#A9F877] text-white text-xs font-semibold px-3 py-1 rounded-bl-xl flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-3">
                      {pkg.name}
                    </h3>

                    <div className="mb-1">
                      {/* Price section */}
                      <div className="flex items-baseline gap-2 flex-wrap">
                        {finalPrice ? (
                          <>
                            {/* Discounted current price */}
                            <span className="text-4xl font-extrabold text-foreground tracking-tight">
                              ${finalPrice.toFixed(2)}
                            </span>
                            {/* Original price crossed out */}
                            <span className="text-lg text-muted-foreground line-through">
                              ${pkg.price}
                            </span>
                            {/* Discount badge */}
                            <span className="text-xs font-semibold bg-orange-400/10 text-orange-400 px-2 py-0.5 rounded-full">
                              {pkg.discount}% off
                            </span>
                          </>
                        ) : (
                          <span className="text-4xl font-extrabold text-foreground tracking-tight">
                            ${pkg.price}
                          </span>
                        )}
                      </div>

                      {/* Per class price */}
                      {pkg.perClassPrice && (
                        <p className="text-sm text-muted-foreground font-medium mt-1">
                          (${pkg.perClassPrice.toFixed(2)} per class)
                        </p>
                      )}

                      {/* Credits */}
                      <p className="text-sm font-semibold text-[#A9F877] mt-3">
                        {pkg.credits} Credit
                      </p>

                      {/* Features */}
                      <ul className="space-y-2 my-5">
                        {pkg.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <Check className="w-5 h-5 text-[#A9F877] mt-0.5 shrink-0" />
                            <span className="font-semibold">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        className="w-full mt-auto bg-[#A9F877] hover:bg-[#C1FF72] text-black"
                        onClick={() => handlePurchase(pkg)}
                        disabled={isThisLoading}
                      >
                        {isThisLoading ? <Spinner /> : "Choose Package"}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
