import React from "react";
import Navbar from "../../components/Navbar";
import { GetServerSideProps } from "next";
import { getDatabase } from "../../src/database";
import { elementTypeAcceptingRef } from "@mui/utils";
import Image from "next/image";
import Link from "next/link";
import { truncate } from "fs";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const mongodb = await getDatabase();

  const category = await mongodb.collection("category").find().toArray();

  const categoryString = await JSON.parse(JSON.stringify(category));

  console.log(categoryString);

  return {
    props: {
      category: categoryString,
    },
  };
};

const onlineStore = ({ category, user }) => {
  console.log(category);
  return (
    <>
      <Navbar user={user} />
      <div className="containerCategory">
        {category.map((element: any) => {
          console.log(element);
          return (
            <Link
              href={`/onlinestore/${element.name}`}
              key="{element.name}"
              passHref={true}
            >
              <div className="elementCategory" key={element.name}>
                {element.name}
                <br />
                <br />
                <div>
                  <img
                    width={100}
                    height={100}
                    src={element.image}
                    alt="toto"
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default onlineStore;
