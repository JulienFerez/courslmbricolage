import React from "react";
import Navbar from "../../components/Navbar";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Image from "next/image";
import Link from "next/link";
import { UserProvider, useUser } from "@auth0/nextjs-auth0";
import { getDatabase } from "../../src/database";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const mongodb = await getDatabase();
  const category = await mongodb.collection("category").find().toArray();
  const categoryString = await JSON.parse(JSON.stringify(category));

  // console.log(categoryString);

  return {
    props: {
      category: categoryString,
    },
  };
};

export default withPageAuthRequired(function Profile({ user, category }) {
  console.log("user", user);
  return (
    <>
      <Navbar user={user} />
      <div className="containerCategory">
        {category.map((element: any) => {
          // console.log(element);
          return (
            <Link
              href={`/store/${element.name}`}
              key="{element.name}"
              passHref={true}
            >
              <div className="elementCategory" key={element.name}>
                {element.name}
                <br />
                <br />
                <div>
                  <img width={100} height={100} src={element.image} alt="" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
});
