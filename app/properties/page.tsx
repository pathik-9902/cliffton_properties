import { Suspense } from "react";
import PropertiesClient from "./PropertiesClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <PropertiesClient />
    </Suspense>
  );
}