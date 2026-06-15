import { Suspense } from "react";
import AdminLoginPage from "./AdminLoginClient";

export default function AdminLoginRoute() {
  const isProduction = process.env.NODE_ENV === "production";

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-primary-dark flex items-center justify-center text-white">
          Đang tải...
        </div>
      }
    >
      <AdminLoginPage isProduction={isProduction} />
    </Suspense>
  );
}
