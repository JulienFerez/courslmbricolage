import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";
import { getDatabase } from "../src/database";

export const getServerSideProps: GetServerSideProps = async ({}: any) => {
  const mongodb = await getDatabase();
  const responseDispo = await mongodb
    .collection("disponibility")
    .find()
    .toArray();
  const dispo = await JSON.parse(JSON.stringify(responseDispo));

  const allUsers = await mongodb.collection("users").find().toArray();
  const user = await JSON.parse(JSON.stringify(allUsers));

  const responseCategory = await mongodb
    .collection("category")
    .find()
    .toArray();
  const category = await JSON.parse(JSON.stringify(responseCategory));

  return {
    props: {
      dispo: dispo,
      category: category,
      user: user,
    },
  };
};

const CreateClass: NextPage<{ dispo: any; category: any; user: any }> = ({
  dispo,
  category,
  user,
}) => {
  const [dispos, setDispos] = React.useState("null");
  const [categories, setCategories] = React.useState("null");
  const [classes, setClasses] = React.useState("null");

  // console.log(category);
  return (
    <Layout user={user} title="Create Class">
      <main className="mainForCreateClass">
        {/* date dispo */}
        {/* <label htmlFor="dispo">Choose a date</label> */}
        <div className="divForSelection">
          <select
            className="selectionCours"
            id="dispo"
            name="dispo"
            onChange={(e) => setDispos(e.currentTarget.value)}
          >
            <option value="null">Choisissez une date</option>

            {dispo.map((element: any) => {
              return (
                <option value={element.day} key={element._id}>
                  {element.day}
                </option>
              );
            })}
          </select>
        </div>
        {/* <p>{dispos}</p> */}
        {/* category */}
        {/* <label htmlFor="category">Choose a category</label> */}
        <div className="divForSelection">
          <select
            className="selectionCours"
            id="category"
            name="category"
            onChange={(e) => {
              setCategories(e.currentTarget.value);
              setClasses("null");
            }}
          >
            <option value="null">Choisissez une catégorie</option>

            {category.map((element: any) => {
              return (
                <option value={element.name} key={element._id}>
                  {element.name}
                </option>
              );
            })}
          </select>
        </div>
        {/* <p>{categories}</p> */}
        {/* cours en fonction de la category */}

        {/* <label htmlFor="class">Choose a class</label> */}
        <div className="divForSelection">
          <select
            className="selectionCours"
            id="class"
            name="class"
            onChange={(e) => {
              setClasses(e.currentTarget.value);
            }}
          >
            <option value="null">Choisissez un cours</option>
            {category.map((element: any) => {
              if (element.name === categories) {
                return element.cours.map((element: any, index: number) => {
                  return (
                    <option
                      value={`${index}${element.title}`}
                      key={index}
                      id={`index ${index}`}
                    >
                      {element.title}
                    </option>
                  );
                });
              }
            })}
          </select>
        </div>
        {/* <p>{classes}</p> */}
        {/* conditions pour afficher le bouton  */}
        {dispos !== "null" && categories !== "null" && classes !== "null" ? (
          <Link
            href={`/api/createClass?date=${dispos}&category=${categories}&class=${classes}`}
          >
            <button className="buttonSubmitForm">Valider</button>
          </Link>
        ) : (
          <button className="buttonSubmitForm pasValide">Valider</button>
        )}
      </main>
    </Layout>
  );
};
export default CreateClass;
