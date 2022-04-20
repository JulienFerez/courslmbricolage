import React from "react";
import StoresLayout from "../../../../components/StoresLayout";
import { GetServerSideProps } from "next";
import { getDatabase } from "../../../../src/database";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params;

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
    <StoresLayout title={slug.tuto}>
      <div>
        {tutoString[0].tutotest.map((element: any) => {
          if (element.title === slug.tuto) {
            return (
              <div>
                <div className="ContainerTutoVideo">
                  <iframe
                    width="640"
                    height="360"
                    src={element.urlvideo}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="ContainerTuto" key={element.title}>
                  <div className="ContainerTutoDescription">
                    {element.description}
                  </div>

                  <div className="ContainerTutoButton">
                    <div className="boutonTuto">
                      <Link href={`/onlinestore/${slug.category}/`}>
                        <button className="boutonIndex">
                          Retour aux différents cours
                        </button>
                      </Link>
                      <Link href="/onlinestore">
                        <button className="boutonIndex">
                          Retour aux différentes catégories
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          } else {
            null;
          }
        })}
      </div>
    </StoresLayout>
  );
};

export default category;
