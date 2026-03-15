import { Suspense } from "react";
import AuthCallbackClient from "./AuthCallbackClient";

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-2 border-[#D4380D] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[#8C6F5A] text-sm">Signing you in...</p>
          </div>
        </div>
      }
    >
      <AuthCallbackClient />
    </Suspense>
  );
}
