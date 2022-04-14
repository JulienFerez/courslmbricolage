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
          // console.log("----ELEMENT----", element);
          // console.log("slug----", slug.slug_details);
          if (element.title === slug.slug_details) {
            return (
              <div>
                <div className="ContainerTuto" key={element.title}>
                  <h3>{element.title}</h3>
                  <div className="ContainerTutoDescription">
                    {element.description}
                  </div>
                  <div className="ContainerTutoDescription">
                    <img width={200} height={200} src={element.image} />
                  </div>

                  <div>
                    <form method="POST" action="">
                      {element.creneaux.map((slot, index) => {
                        return (
                          <div key={index}>
                            <input
                              type="radio"
                              name="creneau"
                              value={slot.day}
                            ></input>

                            {slot.day}
                            {slot.hours}
                            {slot.id_prof}
                          </div>
                        );
                      })}
                    </form>
                  </div>

                  <input type="submit" value="Envoyer" />
                </div>
                <div className="ContainerTutoDescription">{element.prix}</div>
                <div className="ContainerTutoButton">
                  <Link href={`/store/${slug.store_slug}`} passHref={true}>
                    <button>Page Précédente</button>
                  </Link>
                  <Link href="/store" passHref={true}>
                    <button>Retour aux catégories</button>
                  </Link>
                  <Link href="/" passHref={true}>
                    <button>Home Page</button>
                  </Link>
                  <Link href="/validation" passHref={true}>
                    <button>Valider</button>
                  </Link>
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
