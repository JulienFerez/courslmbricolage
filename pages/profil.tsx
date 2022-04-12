// import React from "react";

// const profil = () => {
//   return <div>profil</div>;
// };

// export default profil;

import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Image from "next/image";
import { getSession } from "@auth0/nextjs-auth0";

// const session = getSession(req, res);
// console.log(session);

export default function Profile(props) {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div className="containerHomePage">
        <h1>Mon profil</h1>

        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
}
export const getServerSideProps = withPageAuthRequired();
function req(req: any, res: any) {
  throw new Error("Function not implemented.");
}

function res(req: any, res: any) {
  throw new Error("Function not implemented.");
}
