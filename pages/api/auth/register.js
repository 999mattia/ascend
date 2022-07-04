import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { getAllProducts } from "../../../lib/api";
import { register } from "../../../lib/api";

const prisma = new PrismaClient();
const mqtt = require("mqtt");

var client = mqtt.connect("mqtt://10.0.10.88:1883");

export default async function handler(req, res) {
  let user = JSON.parse(req.body);

  const sameName = await prisma.users.findMany({
    where: {
      username: user.username,
    },
  });
  if (sameName[0] != undefined) {
    if (sameName[0].username == user.username) {
      res.status(500).json({ status: 500, message: "User already exists" });
      res.end();
    }
  } else {
    bcrypt.hash(user.password, 10, async (err, hash) => {
      if (err) {
        res.status(500).json({ message: "Error while hashing password" });
      } else {
        user.password = hash;
        const registeredUser = await prisma.users.create({
          data: user,
        });

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

        client.publish("users", `${user.username} registered (${datetime})`);

        res.status(201).json(registeredUser);
      }
    });
  }
}
