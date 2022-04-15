import Head from "next/head";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const Layout = ({ user, children }): any => {
  return (
    <>
      <Head>
        <title>Leroy merlin cours de Bricolage</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <nav>
        <div className="container">
          <div className="Element1">
            <Link href="/" passHref={true}>
              <Image
                width={150}
                height={100}
                src="/images/logoCampus.png"
                alt="logoCampus.png"
              />
            </Link>
          </div>
          <div>Welcome {user?.name}</div>

          {user ? (
            <Link href="/profil" passHref={true}>
              <button>Mon Profil</button>
            </Link>
          ) : null}

          {user ? (
            <Link href="/api/auth/logout" passHref={true}>
              <button>Se déconnecter</button>
            </Link>
          ) : (
            <Link href="/api/auth/login" passHref={true}>
              <button>Se connecter</button>
            </Link>
          )}
          {user ? (
            <Link href="/cartStore" passHref={true}>
              <button>Panier</button>
            </Link>
          ) : null}
        </div>
      </nav>
      <div>{children}</div>
    </>
  );
};

export default Layout;
