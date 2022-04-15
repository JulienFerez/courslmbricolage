import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import React from "react";
import Navbar from "../components/Navbar";
import { getDatabase } from "../src/database";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const mongodb = await getDatabase();

  const panier = await mongodb
    .collection("users")
    .find({ firstName: "Julien" })
    .toArray();

  const panierString = await JSON.parse(JSON.stringify(panier));
  console.log("panierString1", panierString);
  return {
    props: {
      panierString: panierString,
    },
  };
};
export default withPageAuthRequired(function Profile({ panierString, user }) {
  return (
    <>
      <Navbar user={user} />
      <div>
        {panierString.map((element: any) => {
          return (
            <div>
              <h4>Récapitulatif Utilisateur</h4>
              <p>{element.firstName}</p>
              <p>{element.lastName}</p>
              <p>{element.email}</p>
              <p>{element.adress}</p>
              <p>{element.city}</p>
              <p>{element.tel}</p>

              <h4>Panier</h4>
            </div>
          );
        })}
      </div>
    </>
  );
});
