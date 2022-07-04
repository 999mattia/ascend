import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (req.method === "GET") {
    const cart = await prisma.cart.findMany();
    res.status(200).json(cart);
  } else if (req.method === "POST") {
    if (session) {
      const cart = JSON.parse(req.body);

      cart.userId = session.user.id;

      const savedCart = await prisma.cart.create({
        data: cart,
      });

      res.status(201).json(savedCart);
    } else {
      return res.status(403).json({ message: "This action is not allowed" });
    }
  }
}
