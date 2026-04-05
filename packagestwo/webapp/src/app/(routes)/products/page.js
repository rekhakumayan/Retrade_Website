// Route entry for /products.
// Route file stays tiny and renders module-owned page UI.
export const dynamic = "force-dynamic";
import { Suspense } from "react";
import ProductsPage from "@/modules/products/pages/ProductsPage";

export default function ProductsRoutePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsPage />
    </Suspense>
  );
}
