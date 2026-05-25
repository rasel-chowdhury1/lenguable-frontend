/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Check, Sparkles, X } from "lucide-react";
import { PricingPackage } from "@/types";
import { useGetAllPackagesQuery } from "@/redux/features/packageApi";
import { usePurchaseMutation } from "@/redux/features/purchaseApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useValidateDiscountCodeMutation } from "@/redux/features/discountCodeApi";
import { useRouter } from "next/navigation";

export default function PricingPage() {
  const router = useRouter();
  const { data } = useGetAllPackagesQuery(undefined);
  const packages: PricingPackage[] = data?.data || [];

  const [purchase, { isLoading, originalArgs }] = usePurchaseMutation();
  const [validateDiscountCode] = useValidateDiscountCodeMutation();

  // Per-package discount code state
  const [discountCodes, setDiscountCodes] = useState<Record<string, string>>({});
  const [appliedCodes, setAppliedCodes] = useState<Record<string, boolean>>({});
  const [validatingId, setValidatingId] = useState<string | null>(null);

  const handleValidateCode = async (pkg: PricingPackage) => {
    const code = discountCodes[pkg._id!];
    if (!code?.trim()) return;

    setValidatingId(pkg._id!);
    try {
      await validateDiscountCode({
        code,
        packageId: pkg._id!,
      }).unwrap();

      setAppliedCodes((prev) => ({ ...prev, [pkg._id!]: true }));
      toast.success("Discount code applied!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Invalid code");
    } finally {
      setValidatingId(null);
    }
  };

  const handleRemoveCode = (pkgId: string) => {
    setAppliedCodes((prev) => ({ ...prev, [pkgId]: false }));
    setDiscountCodes((prev) => ({ ...prev, [pkgId]: "" }));
  };

  const handlePurchase = async (pkg: PricingPackage) => {
    try {
      const res = await purchase({
        packageId: pkg._id!,
        discountCode: appliedCodes[pkg._id!]
          ? discountCodes[pkg._id!]
          : undefined,
      }).unwrap();

      if (res?.data?.url) {
        window.location.href = res.data.url;
      } else {
        toast.error("Could not get payment link. Please try again.");
      }
    } catch (err: any) {
      // toast.error(err?.data?.message || "Purchase failed. Please try again.");
      router.push("/signup");
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
            <p className="font-semibold text-foreground">No packages available</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg) => {
              const isThisLoading =
                isLoading && originalArgs?.packageId === pkg._id;
              const isThisValidating = validatingId === pkg._id;
              const isCodeApplied = appliedCodes[pkg._id!];

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

                    {/* Price */}
                    <div className="mb-1">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        {finalPrice ? (
                          <>
                            <span className="text-4xl font-extrabold text-foreground tracking-tight">
                              ${finalPrice.toFixed(2)}
                            </span>
                            <span className="text-lg text-muted-foreground line-through">
                              ${pkg.price}
                            </span>
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

                      {pkg.perClassPrice && (
                        <p className="text-sm text-muted-foreground font-medium mt-1">
                          (${pkg.perClassPrice.toFixed(2)} per class)
                        </p>
                      )}

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

                      {/* ✅ Discount code input — shown for every package */}
                      <div className="mb-3">
                        {!isCodeApplied ? (
                          <div className="flex gap-2">
                            <Input
                              placeholder="Discount code"
                              value={discountCodes[pkg._id!] || ""}
                              onChange={(e) =>
                                setDiscountCodes((prev) => ({
                                  ...prev,
                                  [pkg._id!]: e.target.value,
                                }))
                              }
                              className="text-sm h-9"
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              className="shrink-0 h-9 text-xs px-3"
                              onClick={() => handleValidateCode(pkg)}
                              disabled={
                                isThisValidating ||
                                !discountCodes[pkg._id!]?.trim()
                              }
                            >
                              {isThisValidating ? <Spinner /> : "Apply"}
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 border border-green-200">
                            <Check className="w-3.5 h-3.5 text-green-600 shrink-0" />
                            <span className="text-xs text-green-600 font-medium flex-1">
                              Discount applied
                            </span>
                            <button
                              onClick={() => handleRemoveCode(pkg._id!)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>

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