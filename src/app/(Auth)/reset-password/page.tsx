import { Suspense } from "react";
import ResetPassword from "./_components/ResetPassword";
export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div>...</div>}>
      <ResetPassword />
    </Suspense>
  );
}
