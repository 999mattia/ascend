import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import { updateProduct, getProductById } from "../../../lib/api";

const prisma = new PrismaClient();

const mqtt = require("mqtt");
var client = mqtt.connect("mqtt://10.0.10.88:1883");

export default async function handler(req, res) {
  const session = await getSession({ req });

  let products = JSON.parse(req.body);

  let productNames = "";

  for (let i = 0; i < products.length; i++) {
    productNames += products[i].name += ", ";

    let product = await getProductById(products[i].id);
    product.stock--;

    const updatedProduct = await prisma.products.update({
      where: {
        id: product.id,
      },
      data: product,
    });
  }

  var currentdate = new Date();

  var datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

  client.publish(
    "orders",
    `${session.user.name} orderered: ${productNames} (${datetime})`
  );

  return res.status(200).json({ productNames: productNames });
}
