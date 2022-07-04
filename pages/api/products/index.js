import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (req.method === "GET") {
    const products = await prisma.products.findMany();
    res.status(200).json(products);
  } else if (req.method === "POST") {
    if (session.user.name == "admin") {
      const post = JSON.parse(req.body);

      post.price = parseInt(post.price);
      post.stock = parseInt(post.stock);

      const savedPost = await prisma.products.create({
        data: post,
      });

      res.status(201).json(savedPost);
    } else {
      return res.status(403).json({ message: "This action is not allowed" });
    }
  }
}
