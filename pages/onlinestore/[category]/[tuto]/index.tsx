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

  const tuto = await mongodb
    .collection("category")
    .find({ name: `${slug.category}` })
    .toArray();

  const tutoString = await JSON.parse(JSON.stringify(tuto));

  return {
    props: {
      tutoString: tutoString,
      slug: slug,
    },
  };
};
const category = ({ tutoString, slug }) => {
  console.log("tutoString--------------------", tutoString);
  return (
    <>
      <Navbar user={undefined} />
      <div>
        {tutoString[0].tutotest.map((element: any) => {
          if (element.title === slug.tuto) {
            return (
              <div>
                <div className="ContainerTuto" key={element.title}>
                  <h3>{element.title}</h3>
                  <div className="ContainerTutoDescription">
                    {element.description}
                  </div>
                  <div className="ContainerTutoVideo">
                    <ReactPlayer url={element.urlvideo} />
                  </div>
                  <div className="ContainerTutoButton">
                    <button>Page Précédente</button>
                    <button>Retour aux catégories</button>
                    <button>Home Page</button>
                  </div>
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
