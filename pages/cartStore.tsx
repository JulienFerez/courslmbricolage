import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";
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
  let total: number = 0;
  if (panierString[0].panier.length > 0) {
    return (
      <Layout user={user} title="Panier">
        <div>
          {panierString[0].panier.map((item: any) => {
            total += Number(item.price);
            return (
              <div className="cartContainer">
                <div className="imgCart">
                  <img src={item.imgURL} alt="Photo du cours" />
                </div>
                <div className="pCart">
                  <h3>{item.title}</h3>
                  <h4>
                    {item.day}, {item.hours}
                  </h4>

                  <p>{item.desc}</p>
                  <p className="priceCart">{item.price} €</p>
                </div>
              </div>
            );
          })}
          <div className="price">
            <span></span>
            <h3 className="totalPrice">Prix total : {total} €</h3>
            <span></span>
          </div>

          <div className="buttonGrp">
            <div className="buttonCart">
              <Link href={`/api/validClassBuy?email=${user.email}`}>
                <div>
                  <a>Valider et payer</a>
                </div>
              </Link>
            </div>
            <div className="buttonCart">
              <Link href="/store">
                <a>Continuez vos achats</a>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout user={user} title="Panier">
        <p className="emptyCartP">
          Il semblerait que votre panier soit vide... est-il en construction ?
        </p>
        <div className="buttonCart">
          <Link href="/store">
            <a>Découvrez nos offres !</a>
          </Link>
        </div>
      </Layout>
    );
  }
});
