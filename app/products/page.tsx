import ProductsList from "../ProductsList";

export default async function ProductsPage() {
  const response = await fetch("http://localhost:3000/api/products");
  const products = await response.json();

  // Fetch user's cart.

  const cartResponse = await fetch("http://localhost:3000/api/users/2/cart", {
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const cartProducts = await cartResponse.json();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Products</h1>
      <ProductsList products={products} initialCartProducts={cartProducts} />
    </div>
  );
}
