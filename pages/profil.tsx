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

  const usersString = await JSON.parse(JSON.stringify(users));
  // console.log("usersString", usersString);

  return {
    props: {
      users: usersString[0],
    },
  };
};

// user = user de useUser() ---- userS avec s correspond à la clé nommé users dans props

export default function Profile({ users }) {
  const [motivation, setMotivation] = React.useState("");
  const [clique, setClique] = React.useState(false);

  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  // console.log("-----users", users);
  if (!users.prof) {
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
            {users.wishTeacher.demand ? null : (
              <div>
                <h4>Demander à devenir professeur</h4>
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

// <div>
// <input
//   type="radio"
//   name="demande professeur"
//   value={"oui"}
// ></input>
// Je souhaite devenir professeur
// </div>

// </form>
// {console.log(motivation)}
// <Link
// href={`api/updateWishTeacher?email=${user.email}&motivation=${motivation}`}
// >
// <input type="submit" value="Envoyer" />
// </Link>
