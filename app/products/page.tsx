import ProductsList from "../ProductsList";

export const dynamic = "force-dynamic";
export default async function ProductsPage() {
  const response = await fetch(
    process.env.NEXTJS_APP_BASEURL! + "/api/products",
  );
  const products = await response.json();

  // Fetch user's cart.

  const cartResponse = await fetch(
    process.env.NEXTJS_APP_BASEURL + "/api/users/2/cart",
    {
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const cartProducts = await cartResponse.json();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Products</h1>
      <ProductsList products={products} initialCartProducts={cartProducts} />
    </div>
  );
}
