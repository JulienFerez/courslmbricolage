import { getDatabase } from "../../src/database";
import { GetServerSideProps } from "next";
import { UserProvider, useUser } from "@auth0/nextjs-auth0";

import ReactPlayer from "react-player";

import Image from "next/image";
import Link from "next/link";

export default async function handler(
  req: {
    body: {
      creneau: any;
    };
  },

  res: { redirect: (arg0: string, arg1: number) => void }
) {
  const data = req.body.creneau;
  console.log("dataz", data);
  const dataParse = JSON.parse(data);

  const mongodb = await getDatabase();

  const users = await mongodb
    .collection("users")
    .find({ email: dataParse.email })
    .toArray();

  console.log(users);
  res.redirect("/cartStore", 302);
}
