import { Suspense } from "react";
import CartPage from "@/modules/cart/pages/CartPage";

export default function cartRoutePage() {
   return (
    <Suspense fallback={<div>Loading...</div>}>
      <CartPage />
    </Suspense>
  );
}