import React from "react";
import Navbar from "../components/Navbar";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Image from "next/image";
import Link from "next/link";
import { UserProvider, useUser } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(function Profile({ user }) {
  return (
    <>
      <Navbar user={user} />
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
              <Link href="/contact" passHref={true}>
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
            <td className="Element1">
              <Image
                width={150}
                height={100}
                src="/images/logoCampus.png"
                alt="logoCampus.png"
              />
            </td>
            <td className="Element1">
              <Image
                width={150}
                height={100}
                src="/images/logoCampus.png"
                alt="logoCampus.png"
              />
            </td>
            <td className="Element1">
              <Image
                width={150}
                height={100}
                src="/images/logoCampus.png"
                alt="logoCampus.png"
              />
            </td>
            <td className="Element1">
              <Image
                width={150}
                height={100}
                src="/images/logoCampus.png"
                alt="logoCampus.png"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
});
