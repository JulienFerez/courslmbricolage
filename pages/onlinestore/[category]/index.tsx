import React from "react";
import Navbar from "../../../components/Navbar";
import { GetServerSideProps } from "next";
import { getDatabase } from "../../../src/database";
import ReactPlayer from "react-player";

import Image from "next/image";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params.category;

  const mongodb = await getDatabase();

  const category = await mongodb
    .collection("category")
    .find({ name: `${slug}` })
    .toArray();

  const tutoString = await JSON.parse(JSON.stringify(category));

  return {
    props: {
      tutoString: tutoString,
      slug: slug,
    },
  };
};
const category = ({ tutoString, slug }) => {
  return (
    <>
      <Navbar user={undefined} />
      <div className="containerList">
        {tutoString[0].tutotest.map((element) => {
          return (
            <div className="containerListElement" key={element.title}>
              <Link href={`/onlinestore/${slug}/${element.title}`}>
                <div className="">
                  <h4>{element.title}</h4>
                  <div className="containerListImage">
                    <img
                      src={element.image}
                      alt={element.title}
                      width={300}
                      height={300}
                    />
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default category;
