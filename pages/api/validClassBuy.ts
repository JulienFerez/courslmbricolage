import { getDatabase } from "../../src/database";

export default async function handler(
  req: {
    query: {
      email: String;
    };
  },

  res: { redirect: (arg0: string, arg1: number) => void }
) {
  const mongodb = await getDatabase();

  const users = await mongodb
    .collection("users")
    .find({ email: req.query.email })
    .toArray();

  const user = users[0];
  user.classBuy = [...user.classBuy, ...user.panier];
  user.panier = [];

  const newClass = await mongodb
    .collection("users")
    .updateOne(
      { email: req.query.email },
      { $set: { panier: user.panier, classBuy: user.classBuy } }
    );

  // console.log(users);
  // chnager redirection pour page remerciement paiement effectué blablabla !!!!!!!!!!!!!!!
  res.redirect("/", 302);
}
