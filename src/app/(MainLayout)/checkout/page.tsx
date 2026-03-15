import { Suspense } from "react";
import Checkout from "./_components/Checkout";

const Page = () => {
  return (
    <Suspense fallback={<div>...</div>}>
      <Checkout />
    </Suspense>
  );
};

export default Page;
