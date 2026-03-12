// Route entry for /products.
// Route file stays tiny and renders module-owned page UI.
import ProductsPage from "@/modules/products/pages/ProductsPage";

export default function ProductsRoutePage() {
  return <ProductsPage />;
}
