import { NextRequest } from "next/server";
import { products } from "@/app/product-data";
import { connectToDb } from "@/app/api/db";
type ShoppingCart = Record<string, string[]>;

const carts: ShoppingCart = {
  "1": ["123", "234"],
  "2": ["345", "456"],
  "3": ["234"],
};

type Params = {
  id: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Params },
) {
  const userId = await params.id;
  const { db } = await connectToDb();
  const userCart = await db.collection("carts").findOne({ userId });

  if (!userCart) {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const cartProducts = await db
    .collection("products")
    .find({ id: { $in: userCart.cartIds } })
    .toArray();

  return new Response(JSON.stringify(cartProducts), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

type CartBody = {
  productId: string;
};

export async function POST(
  request: NextRequest,
  { params }: { params: Params },
) {
  const userId = await params.id;
  const body: CartBody = await request.json();
  const productId = body.productId;

  carts[userId] = carts[userId] ? carts[userId].concat(productId) : [productId];
  const cartProducts = carts[userId].map((id) =>
    products.find((p) => p.id === id),
  );

  return new Response(JSON.stringify(cartProducts), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params },
) {
  const userId = await params.id;
  const body: CartBody = await request.json();
  const productId = body.productId;
  if (!carts[userId]) {
    carts[userId] = [];
  } else {
    carts[userId] = carts[userId].filter((id) => id !== productId);
  }
  return new Response(JSON.stringify(carts[userId]), {
    status: 202,
    headers: {
      "Content-Type": "application/json",
    },
  });
}