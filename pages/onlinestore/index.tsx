import React from "react";
import Layout from "../../components/Layout";
import { GetServerSideProps } from "next";
import { getDatabase } from "../../src/database";
import Link from "next/link";
import { getSession, useUser } from "@auth0/nextjs-auth0";

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
}: any) => {
  const session = getSession(req, res);
  const email = session?.user.email;
  const mongodb = await getDatabase();

  const category = await mongodb.collection("category").find().toArray();

  const categoryString = await JSON.parse(JSON.stringify(category));

  const allUsers = await mongodb
    .collection("users")
    .find({ email: email })
    .toArray();

  const users = await JSON.parse(JSON.stringify(allUsers));
  return {
    props: {
      category: categoryString,
      users: users,
    },
  };
};

const onlineStore = ({ category, users }) => {
  const { user, error, isLoading } = useUser();
  if (user) {
    return (
      <Layout user={users} title="Nos tutos en ligne">
        <div className="containerElementCategory">
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

                    <span className="underline"></span>

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
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout user={undefined} title="Nos tutos en ligne">
        <div className="containerElementCategory">
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

                    <span className="underline"></span>

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
        </div>
      </Layout>
    );
  }
};

export default onlineStore;
