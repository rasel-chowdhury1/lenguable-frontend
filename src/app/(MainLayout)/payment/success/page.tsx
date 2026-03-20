import { Suspense } from "react";
import Success from "./_components/Success";
export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div>...</div>}>
      <Success />
    </Suspense>
  );
}
