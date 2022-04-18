import { getDatabase } from "../../src/database";

export default async function handler(
  req: {
    query: {
      email: string;
      motivation: string;
    };
  },

  res: { redirect: (arg0: string, arg1: number) => void }
) {
  const data = req.query.email;
  const motivation = req.query.motivation;
  const mongodb = await getDatabase();

  const users = await mongodb
    .collection("users")
    .find({ email: data })
    .toArray();
  console.log(users);

  users[0].wishTeacher.demand = true;

  console.log(users);

  const wishTeacherTrue = await mongodb
    .collection("users")
    .updateMany(
      { email: data },
      {
        $set: {
          "wishTeacher.demand": true,
          "wishTeacher.motivation": motivation,
        },
      }
    );

  res.redirect("/profil", 302);
}
