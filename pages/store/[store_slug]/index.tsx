import React from "react";
import Layout from "../../../components/Layout";
import { GetServerSideProps } from "next";
import { getDatabase } from "../../../src/database";
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
  const getAllUsers = await mongodb.collection("users").find().toArray();

  const allUsers = await JSON.parse(JSON.stringify(getAllUsers));

  return {
    props: {
      coursString: coursString,
      slug: slug,
      allUsers: allUsers,
    },
  };
};

export default withPageAuthRequired(function Profile({
  coursString,
  slug,
  user,
  allUsers,
}) {
  let users = null;

  allUsers.map((element: any) => {
    element.email === user?.email ? (users = element) : null;
  });
  return (
    <Layout user={[users]} title={slug.store_slug}>
      <div className="containerList">
        {coursString[0].cours.map((element) => {
          return (
            <div className="containerListElement" key={element.title}>
              <Link href={`/store/${slug.store_slug}/${element.title}`}>
                <div className="">
                  <h4>{element.title}</h4>
                  <span className="underline"></span>
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
      <div className="bouton">
        <Link href="/store">
          <a>
            <button className="boutonIndex">
              Retour aux différents cours magasin
            </button>
          </a>
        </Link>
      </div>
    </Layout>
  );
});
