import { useUser } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import { getDatabase } from "../src/database";

export const getServerSideProps: GetServerSideProps = async () => {
  const mongodb = await getDatabase();
  const usersResponse = await mongodb.collection("users").find().toArray();

  const users = await JSON.parse(JSON.stringify(usersResponse));

  return {
    props: {
      users: users,
    },
  };
};

const Form = ({ users }) => {
  const { user, error, isLoading } = useUser();
  const [userExist, setUserExist] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [adress, setAdress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [tel, setTel] = React.useState("");

  user &&
    users.map((use: any) => {
      use.email === user.email ? setUserExist(true) : null;
    });

  if (!userExist) {
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
          href={`/api/createUser?firstName=${firstName}&lastName=${lastName}&adress=${adress}&city=${city}&tel=${tel}`}
        >
          <a>submit</a>
        </Link>
      </>
    );
  } else {
    return <div>Test</div>;
  }
};

export default Form;
