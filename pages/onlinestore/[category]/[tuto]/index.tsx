import React from "react";
import Layout from "../../../../components/Layout";
import { GetServerSideProps } from "next";
import { getDatabase } from "../../../../src/database";
import ReactPlayer from "react-player";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

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
  const { user, error, isLoading } = useUser();
  return (
    <Layout user={user}>
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
                    <Link href={`/onlinestore/${slug.category}/`}>
                      <button>Retour aux différents cours</button>
                    </Link>

                    <Link href="/onlinestore">
                      <button>Retour aux différents rayon</button>
                    </Link>

                    <Link href="/">
                      <button>Home Page</button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          } else {
            null;
          }
        })}
      </div>
    </Layout>
  );
};

export default category;
