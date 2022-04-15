import { getDatabase } from "../../src/database";

export default async function handler(
  req: { query: { date: string; category: string; class: string } },
  res: { redirect: (arg0: string, arg1: number) => void }
) {
  const index = req.query.class.charAt(0);
  const re = Number(index);
  const cours = req.query.class.slice(1);
  // console.log(index, cours);

  const mongodb = await getDatabase();

  const getArray = await mongodb
    .collection("category")
    .find({ name: req.query.category })
    .toArray();

  const category = await JSON.parse(JSON.stringify(getArray));
  const modifiedArray = category[0].cours;
  modifiedArray[index].creneaux.push({
    id_prof: "prof@t.com",
    day: req.query.date,
    hours: "egshsgfds",
  });

  const user = await mongodb.collection("category").updateOne(
    { name: req.query.category },
    {
      $set: {
        cours: modifiedArray,
      },
    }
  );

  console.log(modifiedArray[index].creneaux);

  res.redirect("/", 302);
}
