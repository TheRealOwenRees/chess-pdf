import { Suspense } from "react";

import CallBack from "@/app/callback/CallBack";

const CallbackPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallBack />
    </Suspense>
  );
};

export default CallbackPage;
