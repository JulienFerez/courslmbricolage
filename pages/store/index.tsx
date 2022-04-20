import React from "react";
import StoresLayout from "../../components/StoresLayout";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { getDatabase } from "../../src/database";
import { GetServerSideProps } from "next";

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
export default function StoreRayon({ users, category }): any {
  return (
    <StoresLayout title="Nos cours en magasins">
      <div className="containerElementCategory">
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
                  <span className="underline"></span>

                  <div>
                    <img width={100} height={100} src={element.image} alt="" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </StoresLayout>
  );
}
