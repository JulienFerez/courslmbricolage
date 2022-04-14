import React from "react";
import Navbar from "../../../components/Navbar";
import { GetServerSideProps } from "next";
import { getDatabase } from "../../../src/database";
import ReactPlayer from "react-player";

import Image from "next/image";
import Link from "next/link";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params;

  const mongodb = await getDatabase();

  const category = await mongodb
    .collection("category")
    .find({ name: `${slug.store_slug}` })
    .toArray();

  const coursString = await JSON.parse(JSON.stringify(category));

  return {
    props: {
      coursString: coursString,
      slug: slug,
    },
  };
};

export default withPageAuthRequired(function Profile({
  coursString,
  slug,
  user,
}) {
  return (
    <>
      <Navbar user={user} />
      <div className="containerList">
        {coursString[0].cours.map((element) => {
          return (
            <div className="containerListElement" key={element.title}>
              <Link href={`/store/${slug.store_slug}/${element.title}`}>
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
});
