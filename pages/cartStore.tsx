import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { dividerClasses } from "@mui/material";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import Navbar from "../components/Navbar";
import { getDatabase } from "../src/database";

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
}: any) => {
  const session = getSession(req, res);
  const email = session?.user.email;
  const mongodb = await getDatabase();

  const panier = await mongodb
    .collection("users")
    .find({ email: email })
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
              {console.log({ element })}
              {element.panier.map((item: any) => {
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
          );
        })}
        <Link href={`/api/validClassBuy?email=${user.email}`} passHref={true}>
          Valider et payer
        </Link>
      </div>
    </>
  );
});
