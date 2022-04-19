import { getSession, useUser } from "@auth0/nextjs-auth0";
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
  const usersResponse = await mongodb.collection("users").find().toArray();

  const users = await JSON.parse(JSON.stringify(usersResponse));

  return {
    props: {
      users: users,
      email: email,
    },
  };
};
// export default withPageAuthRequired(function Profile({ user, category }) {
//   return (

const Form: React.FC<{ users: any; email: string }> = ({ users, email }) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [adress, setAdress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [tel, setTel] = React.useState("");
  let stateTest = false;
  console.log(email);
  console.log(stateTest);

  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      stateTest = true;
    }
  }

  if (stateTest === true) {
    return (
      <div>
        <Layout user={users}>
          <br />
          <Link href="/store">
            <a className="buttonRedirectForm">
              <h3>
                Bienvenue sur notre site de réservation de cours en ligne,
                cliquez ici pour découvrir tous les univers disponibles
              </h3>
            </a>
          </Link>
          <br />
        </Layout>
      </div>
    );
  } else {
    return (
      <Layout user={users}>
        <>
          <form className="formForForm">
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="Prénom"
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Nom"
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                name="adress"
                placeholder="Adresse"
                required
                onChange={(e) => setAdress(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                name="city"
                placeholder="Ville"
                required
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                name="tel"
                placeholder="Téléphone"
                required
                onChange={(e) => setTel(e.target.value)}
              />
            </div>
          </form>
          <Link
            href={`/api/createUser?firstName=${firstName}&email=${email}&lastName=${lastName}&adress=${adress}&city=${city}&tel=${tel}`}
          >
            <a className="buttonSubmitForm">Envoyer</a>
          </Link>
        </>
      </Layout>
    );
  }
};

export default Form;
