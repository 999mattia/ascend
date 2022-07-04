import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const id = req.query;
  const session = await getSession({ req });

  if (req.method == "GET") {
    const product = await prisma.products.findUnique({
      where: {
        id: id.id,
      },
    });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } else if (req.method == "DELETE") {
    if (session.user.name == "admin") {
      await prisma.products.delete({
        where: {
          id: id.id,
        },
      });
      return res.status(200).end();
    } else {
      res.status(403).json({ message: "This action in not allowed" });
    }
  } else if (req.method == "PATCH") {
    if (session.user.name == "admin") {
      const product = JSON.parse(req.body);
      product.price = parseInt(product.price);
      product.stock = parseInt(product.stock);
      const updatedProduct = await prisma.products.update({
        where: {
          id: id.id,
        },
        data: product,
      });
      return res.status(200).json(updatedProduct);
    } else {
      res.status(403).json({ message: "This action in not allowed" });
    }
  }
}
