import React from "react";
import Navbar from "../../../components/Navbar";
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
      <div>Mon slug est : {slug.store_slug}</div>
      <table>
        <thead>
          <tr>
            <th colSpan={5}>
              <div>Quel est votre projet ?</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="Element1">
            <td>
              <Link href={`/store/${[slug.store_slug]}/A`} passHref={true}>
                {/* {`/games/${[slug.store_slug}}`} */}
                {/* Attention changer route contact à fiche catégorie avec slug  */}
                <button>
                  <a>
                    <Image
                      width={150}
                      height={100}
                      src="/images/logoCampus.png"
                      alt="logoCampus.png"
                    />
                  </a>
                </button>
              </Link>
            </td>
            <td>
              <Link href={`/store/${[slug.store_slug]}/B`} passHref={true}>
                {/* {`/games/${[element.slug]}`} */}
                {/* Attention changer route contact à fiche catégorie avec slug  */}
                <button>
                  <a>
                    <Image
                      width={150}
                      height={100}
                      src="/images/logoCampus.png"
                      alt="logoCampus.png"
                    />
                  </a>
                </button>
              </Link>
            </td>
            <td>
              <Link href={`/store/${[slug.store_slug]}/C`} passHref={true}>
                {/* {`/games/${[element.slug]}`} */}
                {/* Attention changer route contact à fiche catégorie avec slug  */}
                <button>
                  <a>
                    <Image
                      width={150}
                      height={100}
                      src="/images/logoCampus.png"
                      alt="logoCampus.png"
                    />
                  </a>
                </button>
              </Link>
            </td>
            <td>
              <Link href={`/store/${[slug.store_slug]}/D`} passHref={true}>
                {/* {`/games/${[element.slug]}`} */}
                {/* Attention changer route contact à fiche catégorie avec slug  */}
                <button>
                  <a>
                    <Image
                      width={150}
                      height={100}
                      src="/images/logoCampus.png"
                      alt="logoCampus.png"
                    />
                  </a>
                </button>
              </Link>
            </td>
            <td>
              <Link href={`/store/${[slug.store_slug]}/E`} passHref={true}>
                {/* {`/games/${[element.slug]}`} */}
                {/* Attention changer route contact à fiche catégorie avec slug  */}
                <button>
                  <a>
                    <Image
                      width={150}
                      height={100}
                      src="/images/logoCampus.png"
                      alt="logoCampus.png"
                    />
                  </a>
                </button>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
});
