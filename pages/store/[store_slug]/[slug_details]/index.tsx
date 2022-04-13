import React from "react";
import Navbar from "../../../../components/Navbar";
import { GetServerSideProps } from "next";
import { getDatabase } from "../../../../src/database";
import ReactPlayer from "react-player";

import Image from "next/image";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params;
  console.log("slug", slug);

  const mongodb = await getDatabase();

  const cours = await mongodb
    .collection("category")
    .find({ name: `${slug.store_slug}` })
    .toArray();

  const coursString = await JSON.parse(JSON.stringify(cours));

  return {
    props: {
      coursString: coursString,
      slug: slug,
    },
  };
};
const category = ({ coursString, slug }) => {
  console.log("tutoString--------------------", coursString);
  return (
    <>
      <Navbar user={undefined} />
      <div>
        {coursString[0].cours.map((element: any) => {
          if (element.title === slug.slug_details) {
            return (
              <div>
                <div className="ContainerTuto" key={element.title}>
                  <h3>{element.title}</h3>
                  <div className="ContainerTutoDescription">
                    {element.description}
                  </div>
                  <div className="ContainerTutoDescription">
                    <img src={element.image} />
                  </div>
                </div>
                <div className="ContainerTutoDescription">{element.prix}</div>
                <div className="ContainerTutoButton">
                  <button>Page Précédente</button>
                  <button>Retour aux catégories</button>
                  <button>Home Page</button>
                </div>
              </div>
            );
          } else {
            <>toto</>;
          }
        })}
      </div>
    </>
  );
};

export default category;
