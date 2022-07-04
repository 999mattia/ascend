import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();
const mqtt = require("mqtt");

var client = mqtt.connect("mqtt://10.0.10.88:1883");

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (req.method === "GET") {
    if (session) {
      if (session.user.name == "admin") {
        const messages = await prisma.messages.findMany();
        res.status(200).json(messages);
      } else {
        return res.status(403).json({ message: "This action is not allowed" });
      }
    } else {
      return res.status(403).json({ message: "This action is not allowed" });
    }
  } else if (req.method === "POST") {
    if (session) {
      let message = JSON.parse(req.body);

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

      message.createdAt = datetime;

      message.username = session.user.name;

      const savedMessage = await prisma.messages.create({
        data: message,
      });

      client.publish(
        "messages",
        `${message.username} posted: ${message.message} (${message.createdAt})`
      );

      res.status(201).json(savedMessage);
    } else {
      return res.status(403).json({ message: "This action is not allowed" });
    }
  }
}
