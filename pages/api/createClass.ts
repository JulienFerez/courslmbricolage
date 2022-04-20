import { getDatabase } from "../../src/database";

export default async function handler(
  req: {
    query: { date: string; category: string; class: string; email: string };
  },
  res: { redirect: (arg0: string, arg1: number) => void }
) {
  const index = req.query.class.charAt(0);
  const re = Number(index);
  const cours = req.query.class;

  const mongodb = await getDatabase();

  const getArray = await mongodb
    .collection("category")
    .find({ name: req.query.category })
    .toArray();

  const category = await JSON.parse(JSON.stringify(getArray));
  const modifiedArray = category[0].cours;
  modifiedArray[index].creneaux.push({
    id_prof: req.query.email,
    day: req.query.date,
    hours: "18h - 20h",
    class: req.query.class,
  });

  const categoryDB = await mongodb.collection("category").updateOne(
    { name: req.query.category },
    {
      $set: {
        cours: modifiedArray,
      },
    }
  );

  const getUserClass = await mongodb
    .collection("users")
    .find({ email: req.query.email })
    .toArray();

  const classUser = await JSON.parse(JSON.stringify(getUserClass));
  const modifiedClassUser = classUser[0].class;

  console.log("TEST", classUser);

  modifiedClassUser.push({
    id_prof: req.query.email,
    day: req.query.date,
    hours: "18h - 20h",
    class: req.query.class,
  });

  const userDB = await mongodb.collection("users").updateOne(
    { email: req.query.email },
    {
      $set: {
        class: modifiedClassUser,
      },
    }
  );

  res.redirect("/", 302);
}
