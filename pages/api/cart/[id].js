import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const id = req.query;
  const session = await getSession({ req });

  if (req.method == "GET") {
    const cart = await prisma.cart.findUnique({
      where: {
        id: id.id,
      },
    });
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } else if (req.method == "DELETE") {
      await prisma.cart.delete({
        where: {
          id: id.id,
        },
      });
      return res.status(200).end();
  } else if (req.method == "PATCH") {
      const cart = JSON.parse(req.body);
      const updatedCart = await prisma.cart.update({
        where: {
          id: id.id,
        },
        data: cart,
      });
      return res.status(200).json(updatedCart);
  }
}