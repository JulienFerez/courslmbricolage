import Head from "next/head";
import Link from "next/link";
import React from "react";

const Layout = () => {
  return (
    <>
      <Head>
        <title>Leroy merlin cours de Bricolage</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <nav>
        <Link href="/">
          <button>Home</button>
        </Link>
        <Link href="/store">
          <button>Mon magasin</button>
        </Link>
        <Link href="/api/auth/login">
          <button>Se connecter</button>
        </Link>
        <Link href="/api/auth/logout">
          <button>Panier</button>
        </Link>
      </nav>
    </>
  );
};

export default Layout;
