import { getDatabase } from "../../src/database";

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

  const cart = users[0];
  cart.panier.push(dataParse);

  const newClass = await mongodb
    .collection("users")
    .updateOne({ email: dataParse.email }, { $set: { panier: cart.panier } });

  console.log(users);
  res.redirect("/cartStore", 302);
}
