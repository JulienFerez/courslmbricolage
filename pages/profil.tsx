import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { getSession } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import { getDatabase } from "../src/database";
import Layout from "../components/Layout";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
}: any) => {
  const session = getSession(req, res);
  const email = session?.user.email;

  const mongodb = await getDatabase();

  const users = await mongodb
    .collection("users")
    .find({ email: email })
    .toArray();

  const getAllUsers = await mongodb.collection("users").find().toArray();
  const allUsers = await JSON.parse(JSON.stringify(getAllUsers));
  console.log(allUsers);

  const usersString = await JSON.parse(JSON.stringify(users));

  return {
    props: {
      users: usersString[0],
      allUsers: allUsers,
    },
  };
};

export default function Profile({ users, allUsers }) {
  const [motivation, setMotivation] = React.useState("");
  const [clique, setClique] = React.useState(false);
  const [changeProf, setchangeProf] = React.useState(false);

  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  // si l'utilisateur est un admin
  if (users.admin) {
    return (
      <Layout user={user}>
        <div>
          <h4>Récapitulatif Utilisateur</h4>
          <p>{users.firstName}</p>
          <p>{users.lastName}</p>
          <p>{users.email}</p>
          <p>{users.adress}</p>
          <p>{users.city}</p>
          <p>{users.tel}</p>
          <h4>Demande pour etre profs</h4>
          {allUsers.map((element: any) => {
            return element.wishTeacher?.demand ? (
              <div>
                <h5>
                  {element.firstName} {element.lastName}
                </h5>
                <p>{element.wishTeacher.motivation}</p>

                {element.prof ? (
                  <h5>Demande acceptée </h5>
                ) : (
                  <Link href={`api/updateUserToProf?email=${element.email}`}>
                    <button
                      onClick={() => {
                        setchangeProf(true);
                      }}
                    >
                      Rendre prof
                    </button>
                  </Link>
                )}

                <br />
              </div>
            ) : null;
          })}
        </div>
      </Layout>
    );
    // si l'utilisateur est un prof
  } else if (!users.prof) {
    return (
      <Layout user={user}>
        <div>
          <div>
            <h4>Récapitulatif Utilisateur</h4>
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
            <h4>Demander à devenir professeur</h4>

            {users.wishTeacher.demand ? (
              <p>Votre demande est en cours de traitement. </p>
            ) : (
              <div>
                <form method="POST" action="api/updateWishTeacher">
                  <div>
                    <input
                      type="radio"
                      name="demande professeur"
                      value={"oui"}
                      onClick={() => {
                        setClique(true);
                      }}
                    ></input>{" "}
                    Je souhaite devenir professeur
                  </div>
                  <label htmlFor="firstName">Ecris ta motivation : </label>
                  <input
                    type="text"
                    name="tel"
                    required
                    onChange={(e) => setMotivation(e.target.value)}
                  />
                  {motivation !== "" && clique === true ? (
                    <Link
                      href={`api/updateWishTeacher?email=${user.email}&motivation=${motivation}`}
                    >
                      <input type="submit" value="Envoyer" />
                    </Link>
                  ) : null}
                </form>
              </div>
            )}
          </div>
        </div>
      </Layout>
    );
  } else {
    // si l'utilisateur n'est pas un prof
    return (
      <Layout user={user}>
        <div>
          <div>
            <h4>Récapitulatif Prof</h4>
            <p>{users.firstName}</p>
            <p>{users.lastName}</p>
            <p>{users.email}</p>
            <p>{users.adress}</p>
            <p>{users.city}</p>
            <p>{users.tel}</p>
            <h4>Cours à donner</h4>

            <Link href="/createClass">
              <button>Ajouter un cours</button>
            </Link>

            {users.class.map((item: any) => {
              console.log(item);
              return (
                <div>
                  <p>{item.id_prof}</p>
                  <p>{item.day}</p>
                  <p>{item.hours}</p>
                </div>
              );
            })}

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
}
