import React from "react";
import Layout from "../../../components/Layout";
import { GetServerSideProps } from "next";
import { getDatabase } from "../../../src/database";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params.category;

  const mongodb = await getDatabase();

  const category = await mongodb
    .collection("category")
    .find({ name: `${slug}` })
    .toArray();

  const tutoString = await JSON.parse(JSON.stringify(category));

  const getAllUsers = await mongodb.collection("users").find().toArray();

  const allUsers = await JSON.parse(JSON.stringify(getAllUsers));

  return {
    props: {
      tutoString: tutoString,
      slug: slug,
      allUsers: allUsers,
    },
  };
};
const category = ({ tutoString, slug, allUsers }) => {
  const { user, error, isLoading } = useUser();

  let users = null;

  allUsers.map((element: any) => {
    element.email === user?.email ? (users = element) : null;
  });

  if (user) {
    return (
      <Layout user={[users]} title={slug}>
        <div className="containerList">
          {tutoString[0].tutotest.map((element) => {
            return (
              <div className="containerListElement" key={element.title}>
                <Link href={`/onlinestore/${slug}/${element.title}`}>
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
          <Link href="/onlinestore">
            <a>
              <button className="boutonIndex">
                Retour aux différents rayon
              </button>
            </a>
          </Link>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout user={undefined} title={slug}>
        <div className="containerList">
          {tutoString[0].tutotest.map((element) => {
            return (
              <div className="containerListElement" key={element.title}>
                <Link href={`/onlinestore/${slug}/${element.title}`}>
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
          <Link href="/onlinestore">
            <a>
              <button className="boutonIndex">
                Retour aux différents rayon
              </button>
            </a>
          </Link>
        </div>
      </Layout>
    );
  }
};

export default category;
