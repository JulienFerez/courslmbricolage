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
      use: usersString,
    },
  };
};

export default function Profile({ users, allUsers, use }) {
  const [motivation, setMotivation] = React.useState("");
  const [clique, setClique] = React.useState(false);
  const [changeProf, setchangeProf] = React.useState(false);

  // const { user, error, isLoading } = useUser();

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error.message}</div>;

  // si l'utilisateur est un admin
  if (users.admin) {
    return (
      <Layout user={use} title="Profil">
        <div className="infoProfil">
          <div className="infoUser">
            <h4>Informations Admin</h4>
            <span className="underline"></span>
            <p>
              <strong>Prénom : </strong>
              {users.firstName}
            </p>
            <p>
              <strong>Nom : </strong>
              {users.lastName}
            </p>
            <p>
              <strong>Email : </strong>
              {users.email}
            </p>
            <p>
              <strong>Adresse : </strong>
              {users.adress}
            </p>
            <p>
              <strong>Ville : </strong>
              {users.city}
            </p>
            <p>
              <strong>Téléphone : </strong>
              {users.tel}
            </p>
          </div>

          <div className="demandeProf">
            <h4>Demande pour être profs</h4>
            <span className="underline"></span>
            {allUsers.map((element: any) => {
              return element.wishTeacher?.demand ? (
                <div className="demande">
                  <h5>
                    {element.firstName} {element.lastName}
                  </h5>
                  <p>{element.wishTeacher.motivation}</p>

                  {element.prof ? (
                    <h5>Demande acceptée </h5>
                  ) : (
                    <Link href={`api/updateUserToProf?email=${element.email}`}>
                      <button
                        className="butonRendreProf"
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
        </div>
      </Layout>
    );

    // si l'utilisateur est un client
  } else if (!users.prof) {
    return (
      <Layout user={use} title="Profil">
        <div className="infoProfil">
          <div className="infoUser">
            <h4>Informations personelles</h4>
            <span className="underline"></span>
            <p>
              <strong>Prénom : </strong>
              {users.firstName}
            </p>
            <p>
              <strong>Nom : </strong>
              {users.lastName}
            </p>
            <p>
              <strong>Email : </strong>
              {users.email}
            </p>
            <p>
              <strong>Adresse : </strong>
              {users.adress}
            </p>
            <p>
              <strong>Ville : </strong>
              {users.city}
            </p>
            <p>
              <strong>Téléphone : </strong>
              {users.tel}
            </p>
          </div>
          <div className="containerProfil">
            <div className="CoursprisClient">
              <h4>Mes prochains cours</h4>
              <span className="underline"></span>
              {users.classBuy.map((item: any) => {
                console.log(item);
                return (
                  <div className="cours">
                    <p>{item.id_prof}</p>
                    <p>{item.day}</p>
                    <p>{item.hours}</p>
                  </div>
                );
              })}
            </div>
            <div className="devenirProf">
              <h4>Demander à devenir professeur</h4>
              <span className="underline"></span>
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
                    <br />
                    <label htmlFor="firstName">Ecris ta motivation : </label>
                    <input
                      type="text"
                      name="tel"
                      required
                      onChange={(e) => setMotivation(e.target.value)}
                    />

                    {motivation !== "" && clique === true ? (
                      <Link
                        href={`api/updateWishTeacher?email=${users.email}&motivation=${motivation}`}
                      >
                        <p>
                          <input
                            className="butonCreateClass"
                            type="submit"
                            value="Envoyer"
                          />
                        </p>
                      </Link>
                    ) : null}
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  } else {
    // si l'utilisateur est un prof
    return (
      <Layout user={use} title="Profil">
        <div className="infoProfil">
          <div className="infoUser">
            <h4>Informations Personelles</h4>
            <span className="underline"></span>
            <p>
              <strong>Prénom : </strong> {users.firstName}
            </p>
            <p>
              <strong>Nom : </strong> {users.lastName}
            </p>
            <p>
              <strong>Email : </strong>
              {users.email}
            </p>
            <p>
              <strong>Adresse : </strong> {users.adress}
            </p>
            <p>
              <strong>Ville : </strong>
              {users.city}
            </p>
            <p>
              <strong>Téléphone : </strong> {users.tel}
            </p>
          </div>

          <div className="containerProfil">
            <div className="giveClasse">
              <h4>Cours à donner</h4>
              <span className="underline"></span>

              <div className="Coursadonner">
                {users.class.map((item: any) => {
                  console.log(item);
                  return (
                    <div className="slotProfile">
                      <p>{item.class.slice(1)}</p>
                      <p>{item.day}</p>
                      <p>{item.hours}</p>
                    </div>
                  );
                })}
              </div>
              <Link href="/createClass">
                <button className="butonCreateClass">Ajouter un cours</button>
              </Link>
            </div>

            <div className="Courspris">
              <h4>Mes prochains cours</h4>
              <span className="underline"></span>
              {users.classBuy.map((item: any) => {
                console.log(item);
                return (
                  <div className="slotProfile">
                    <p>{item.id_prof}</p>
                    <p>{item.day}</p>
                    <p>{item.hours}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
