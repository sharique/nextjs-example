import { NextRequest } from "next/server";
import { connectToDb } from "@/app/api/db";

type Params = {
  id: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Params },
) {
  const { db } = await connectToDb();
  const { id } = await params;
  const userCart = await db.collection("carts").findOne({ userId: id });

  if (!userCart) {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const cartIds = userCart.cartIds;
  const cartProducts = await db
    .collection("products")
    .find({ id: { $in: cartIds } })
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
  const { db } = await connectToDb();

  const { id } = await params;
  const body: CartBody = await request.json();
  const productId = body.productId;

  const updatedCart = await db
    .collection("carts")
    .findOneAndUpdate(
      { id },
      { $push: { cartIds: productId } },
      { upsert: true, returnDocument: "after" },
    );

  const cartProducts = await db
    .collection("products")
    .find({ id: { $in: updatedCart.cartIds } })
    .toArray();

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
  const { db } = await connectToDb();
  const { id } = await params;
  const body = await request.json();
  const productId = body.productId;

  const updatedCart = await db
    .collection("carts")
    .findOneAndUpdate(
      { id },
      { $pull: { cartIds: productId } },
      { returnDocument: "after" },
    );
  if (!updatedCart) {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const cartProducts = await db
    .collection("products")
    .find({
      id: { $in: updatedCart.cartIds },
    })
    .toArray();

  return new Response(JSON.stringify(cartProducts), {
    status: 202,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
