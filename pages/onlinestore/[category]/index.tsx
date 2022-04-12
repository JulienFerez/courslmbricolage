import React from "react";
import Navbar from "../../../components/Navbar";
import { GetServerSideProps } from "next";
import { getDatabase } from "../../../src/database";
import { elementTypeAcceptingRef } from "@mui/utils";
import Image from "next/image";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params.category;
  console.log(context.params.category);
  console.log("slug-------------------------", slug);

  return {
    props: {
      category: slug,
    },
  };
};
const category = ({ category }) => {
  return <>Les tutos de {category}</>;
};

export default category;
