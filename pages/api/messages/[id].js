import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const id = req.query;
  const session = await getSession({ req });

  if (req.method == "GET") {
    const message = await prisma.messages.findUnique({
      where: {
        id: id.id,
      },
    });
    if (message != null) {
      res.status(200).json(message);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  }
}
