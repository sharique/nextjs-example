import ProductList from "../ProductList";
import { products } from "../produt-data";
export default function ProductsPage() {
  return (
    <>
      <h1>Products list</h1>
      <ProductList products={products} />
    </>
  );
}
