import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { getSession } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import { getDatabase } from "../src/database";
import Layout from "../components/Layout";

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
}: any) => {
  const session = getSession(req, res);
  const email = session?.user.email;

  const mongodb = await getDatabase();

  // const usersResponse = await mongodb.collection("users").find().toArray();
  // const users = await JSON.parse(JSON.stringify(usersResponse));

  const users = await mongodb
    .collection("users")
    .find({ email: email })
    .toArray();

  const usersString = await JSON.parse(JSON.stringify(users));
  console.log("usersString", usersString);

  return {
    props: {
      users: usersString[0],
      email: email,
    },
  };
};

// user = user de useUser() ---- userS avec s correspond à la clé nommé users dans props

export default function Profile({ users }) {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Layout user={user} title="Profil">
      <div>
        <div>
          <h4>Récapitulatif Prof</h4>

          <p>{users.firstName}</p>
          <p>{users.lastName}</p>
          <p>{users.email}</p>
          <p>{users.adress}</p>
          <p>{users.city}</p>
          <p>{users.tel}</p>

          <h4>Mes prochains cours</h4>
          {users.classBuy.map((item: any) => {
            console.log(item);
            return (
              <div>
                <p>{item.id_prof}</p>
                <p>{item.day}</p>
                <p>{item.hours}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
