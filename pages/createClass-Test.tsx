import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { getDatabase } from "../src/utils/database";

export const getServerSideProps: GetServerSideProps = async ({}: any) => {
  const mongodb = await getDatabase();
  const responseDispo = await mongodb
    .db()
    .collection("disponibility")
    .find()
    .toArray();
  const dispo = await JSON.parse(JSON.stringify(responseDispo));

  const responseCategory = await mongodb
    .db()
    .collection("category")
    .find()
    .toArray();
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
  const [dispos, setDispos] = React.useState("Date");
  const [categories, setCategories] = React.useState("Category");

  console.log(category);
  return (
    <div>
      <main>
        <label htmlFor="dispo">Choose a date</label>
        <select
          id="dispo"
          name="dispo"
          onChange={(e) => setDispos(e.currentTarget.value)}
        >
          {dispo.map((element: any) => {
            return (
              <option value={element.day} key={element._id}>
                {element.day}
              </option>
            );
          })}
        </select>
        <p>{dispos}</p>

        <label htmlFor="class">Choose a category</label>
        <select
          id="class"
          name="class"
          onChange={(e) => setCategories(e.currentTarget.value)}
        >
          {category.map((element: any) => {
            return (
              <option value={element.name} key={element._id}>
                {element.name}
              </option>
            );
          })}
        </select>
        <p>{categories}</p>
      </main>
    </div>
  );
};
export default CreateClass;
