import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import React from "react";
import { getDatabase } from "../src/database";

export const getServerSideProps: GetServerSideProps = async ({}: any) => {
  const mongodb = await getDatabase();
  const responseDispo = await mongodb
    .collection("disponibility")
    .find()
    .toArray();
  const dispo = await JSON.parse(JSON.stringify(responseDispo));

  const responseCategory = await mongodb.collection("test").find().toArray();
  const category = await JSON.parse(JSON.stringify(responseCategory));

  return {
    props: {
      dispo: dispo,
      category: category,
    },
  };
};

const CreateClass: NextPage<{ dispo: any; category: any }> = ({
  dispo,
  category,
}) => {
  const [dispos, setDispos] = React.useState("null");
  const [categories, setCategories] = React.useState("null");
  const [classes, setClasses] = React.useState("null");

  // console.log(category);
  return (
    <div>
      <main>
        {/* date dispo */}
        <label htmlFor="dispo">Choose a date</label>
        <select
          id="dispo"
          name="dispo"
          onChange={(e) => setDispos(e.currentTarget.value)}
        >
          <option value="null">veuillez selectionner</option>

          {dispo.map((element: any) => {
            return (
              <option value={element.day} key={element._id}>
                {element.day}
              </option>
            );
          })}
        </select>
        <p>{dispos}</p>
        {/* category */}
        <label htmlFor="category">Choose a category</label>
        <select
          id="category"
          name="category"
          onChange={(e) => setCategories(e.currentTarget.value)}
        >
          <option value="null">veuillez selectionner</option>

          {category.map((element: any) => {
            return (
              <option value={element.name} key={element._id}>
                {element.name}
              </option>
            );
          })}
        </select>
        <p>{categories}</p>
        {/* cours en fonction de la category */}

        <label htmlFor="class">Choose a class</label>
        <select
          id="class"
          name="class"
          onChange={(e) => {
            setClasses(e.currentTarget.value);
          }}
        >
          <option value="null">veuillez selectionner</option>
          {category.map((element: any) => {
            if (element.name === categories) {
              return element.cours.map((element: any, index: number) => {
                return (
                  <option
                    value={`${index}${element.nom}`}
                    key={index}
                    id={`index ${index}`}
                  >
                    {element.nom}
                  </option>
                );
              });
            }
          })}
        </select>
        <p>{classes}</p>
        {/* conditions pour afficher le bouton  */}
        {dispos !== "null" && categories !== "null" && classes !== "null" ? (
          <Link
            href={`/api/updateDB-Test?date=${dispos}&category=${categories}&class=${classes}`}
          >
            Valider
          </Link>
        ) : null}
      </main>
    </div>
  );
};
export default CreateClass;
