import { getDatabase } from "../../src/utils/database";

export default async function handler(
  req: { body: { email: string } },
  res: { redirect: (arg0: string, arg1: number) => void }
) {
  const mongodb = await getDatabase();
  const user = await mongodb
    .db()
    .collection("test")
    .updateOne(
      { email: "emailTest" },
      {
        $set: {
          name: "toto",
        },
      }
    );

  res.redirect("/", 302);
}
