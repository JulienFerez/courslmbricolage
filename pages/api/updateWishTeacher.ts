import { getDatabase } from "../../src/database";

export default async function handler(
  req: {
    query: {
      email: any;
    };
  },

  res: { redirect: (arg0: string, arg1: number) => void }
) {
  const data = req.query.email;

  const mongodb = await getDatabase();

  const wishTeacherTrue = await mongodb
    .collection("users")
    .updateOne({ email: data }, { $set: { wishTeacher: true } });

  res.redirect("/profil", 302);
}
