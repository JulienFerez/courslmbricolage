import { getSession, useUser } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import { getDatabase } from "../src/database";

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
}: any) => {
  const session = getSession(req, res);
  const email = session?.user.email;

  const mongodb = await getDatabase();
  const usersResponse = await mongodb.collection("users").find().toArray();

  const users = await JSON.parse(JSON.stringify(usersResponse));

  return {
    props: {
      users: users,
      email: email,
    },
  };
};

const Form: React.FC<{ users: any; email: string }> = ({ users, email }) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [adress, setAdress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [tel, setTel] = React.useState("");
  let stateTest = false;
  console.log(email);
  console.log(stateTest);

  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      stateTest = true;
    }
  }

  // users.map((element: any) => {
  //   if (element.email === email) {
  //     setUserExist(true);
  //   }
  // });

  if (stateTest === true) {
    return (
      <div>
        <a href="/store">
          <button>go to store</button>
        </a>
      </div>
    );
  } else {
    return (
      <>
        <form>
          <div>
            <label htmlFor="firstName">Enter your firstName: </label>
            <input
              type="text"
              name="firstName"
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lastName">Enter your lastName: </label>
            <input
              type="text"
              name="lastName"
              required
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="adress">Enter your adress: </label>
            <input
              type="text"
              name="adress"
              required
              onChange={(e) => setAdress(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="city">Enter your city: </label>
            <input
              type="text"
              name="city"
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="tel">Enter your tel: </label>
            <input
              type="text"
              name="tel"
              required
              onChange={(e) => setTel(e.target.value)}
            />
          </div>
        </form>
        <Link
          href={`/api/createUser?firstName=${firstName}&email=${email}&lastName=${lastName}&adress=${adress}&city=${city}&tel=${tel}`}
        >
          <a>submit</a>
        </Link>
      </>
    );
  }
};

export default Form;
