import { getDatabase } from "../../src/database";

export default async function handler(
  req: {
    query: {
      firstName: string;
      lastName: string;
      adress: string;
      city: string;
      tel: string;
      email: string;
    };
  },
  res: { redirect: (arg0: string, arg1: number) => void }
) {
  const mongodb = await getDatabase();

  const createUser = await mongodb.collection("users").insertOne({
    email: req.query.email,
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    adress: req.query.adress,
    city: req.query.city,
    tel: req.query.tel,
    admin: false,
    prof: false,
    wishTeacher: { demand: false, motivation: "" },
    panier: [],
    classBuy: [],
    class: [],
  });

  res.redirect("/store", 302);
}
