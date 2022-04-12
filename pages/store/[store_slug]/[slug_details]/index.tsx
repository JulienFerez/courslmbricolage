import React from "react";
import Navbar from "../../../../components/Navbar";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Image from "next/image";
import Link from "next/link";
import { UserProvider, useUser } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = await context.params;
  // console.log(slug);

  // appel à la db avec le slug
  return {
    props: {
      slug: slug,
    },
  };
};

export default withPageAuthRequired(function Profile({ user, slug }) {
  return (
    <>
      <Navbar user={user} />
      <div>COUCOU</div>
      <div>Mon slug est : {slug.slug_details}</div>
    </>
  );
});
