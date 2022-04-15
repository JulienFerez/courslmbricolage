import React from "react";
import Layout from "../../components/Layout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { getDatabase } from "../../src/database";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  const mongodb = await getDatabase();
  const category = await mongodb.collection("category").find().toArray();
  const categoryString = await JSON.parse(JSON.stringify(category));

  return {
    props: {
      category: categoryString,
    },
  };
};

export default withPageAuthRequired(function Profile({ user, category }) {
  return (
    <Layout user={user}>
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
    </Layout>
  );
});
