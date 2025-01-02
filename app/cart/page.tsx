import ShoppingCartList from "./ShoppingCartList";
export const dynamic = "force-dynamic";
export default async function CartPage() {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASEURL + "/api/users/2/cart",
    {
      cache: "no-cache",
    },
  );
  const cartProducts = await response.json();

  return <ShoppingCartList initialCartProducts={cartProducts} />;
}
