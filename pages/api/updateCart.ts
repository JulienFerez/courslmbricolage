import { getDatabase } from "../../src/database";
import { GetServerSideProps } from "next";
import { getSession, UserProvider, useUser } from "@auth0/nextjs-auth0";

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
}: any) => {
  const session = getSession(req, res);
  const email = session?.user.email;

  console.log("email", email);
  console.log(email);

  return {
    props: {
      email: email,
    },
  };
};
export default async function handler(
  req: {
    body: {
      creneau: any;
    };
  },

  res: { redirect: (arg0: string, arg1: number) => void },
  email
) {
  console.log("email", email);
  console.log({ email });
  const data = req.body.creneau;
  const dataParse = JSON.parse(data);

  const mongodb = await getDatabase();

  const users = await mongodb
    .collection("users")
    .find({ email: dataParse.email })
    .toArray();

  console.log(users);
}
