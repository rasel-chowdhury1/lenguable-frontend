import React, { Suspense } from "react";
import MyAccount from "./_components/MyAccount";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyAccount />
    </Suspense>
  );
};

export default page;
