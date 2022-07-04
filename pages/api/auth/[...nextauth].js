import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const mqtt = require("mqtt");

var client = mqtt.connect("mqtt://10.0.10.88:1883");

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password",
        },
      },
      async authorize(credentials) {
        const users = await prisma.users.findMany();

        const filteredUsers = users.filter(
          (user) => user.username === credentials.username
        );

        const activeUser = filteredUsers[0];

        let result = false;

        if (activeUser != null) {
          result = await bcrypt.compare(
            credentials.password,
            activeUser.password
          );
        }

        if (result) {
          if (activeUser != null) {
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
              "users",
              `${credentials.username} signed in (${datetime})`
            );
            return {
              name: credentials.username,
            };
          } else {
            res.status(404).json({ message: "User not found" });
          }
        } else return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signIn",
  },
});
