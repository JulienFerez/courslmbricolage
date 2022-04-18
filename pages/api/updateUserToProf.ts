import { getDatabase } from "../../src/database";

export default async function handler(
  req: {
    query: {
      email: string;
    };
  },

  res: { redirect: (arg0: string, arg1: number) => void }
) {
  const email = req.query.email;
  const mongodb = await getDatabase();

  const wishTeacherTrue = await mongodb.collection("users").updateOne(
    { email: email },
    {
      $set: {
        prof: true,
      },
    }
  );

  res.redirect("/profil", 302);
}
