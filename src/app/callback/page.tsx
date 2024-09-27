import { Suspense } from "react";

import CallBack from "@/app/callback/CallBack";

const CallbackPage = () => {
  return (
    <Suspense fallback={<div>Verifying...</div>}>
      <CallBack />
    </Suspense>
  );
};

export default CallbackPage;
