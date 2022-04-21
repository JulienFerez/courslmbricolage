import React from "react";
import Layout from "../components/Layout";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { getSession, useUser } from "@auth0/nextjs-auth0";
import { getDatabase } from "../src/database";

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
}: any) => {
  const session = getSession(req, res);
  const email = session?.user.email;

  const mongodb = await getDatabase();

  const allUsers = await mongodb
    .collection("users")
    .find({ email: email })
    .toArray();

  const users = await JSON.parse(JSON.stringify(allUsers));

  return {
    props: {
      users: users,
    },
  };
};

const contact = ({ users }) => {
  const { user, error, isLoading } = useUser();

  if (user) {
    if (users[0]?.email === user.email) {
      return (
        <Layout user={users} title="Contact">
          {/* <h1>users</h1> */}
          <div className="containerContact">
            <h1>Assistance technique</h1>
            <span className="underline"></span>
            <h3>Un problème, une question ? Contacter nos experts</h3>

            <Image
              width={800}
              height={500}
              src="/images/assistanceTechnique.jpg"
              alt="pageAssistance.jpg"
            />
            <div className="container">
              <div className="Element">
                <PhoneIcon />
                <h5>Assistance technique</h5>
                <p>Appelez-nous au 0810 634 634</p>
              </div>
              <div className="Element">
                <MailIcon />
                <h5>Email</h5>
                <p>
                  Envoyez-nous vos questions <br />
                  campus@leroymerlin.fr
                </p>
              </div>
            </div>
          </div>
        </Layout>
      );
    } else {
      return (
        <Layout user={user} title="Contact">
          {/* <h1>user mais pas users</h1> */}
          <div className="containerContact">
            <h1>Assistance technique</h1>
            <span className="underline"></span>
            <h3>Un problème, une question ? Contacter nos experts</h3>

            <Image
              width={800}
              height={500}
              src="/images/assistanceTechnique.jpg"
              alt="pageAssistance.jpg"
            />
            <div className="container">
              <div className="Element">
                <PhoneIcon />
                <h5>Assistance technique</h5>
                <p>Appelez-nous au 0810 634 634</p>
              </div>
              <div className="Element">
                <MailIcon />
                <h5>Email</h5>
                <p>
                  Envoyez-nous vos questions <br />
                  campus@leroymerlin.fr
                </p>
              </div>
            </div>
          </div>
        </Layout>
      );
    }
  } else {
    return (
      <Layout user={undefined} title="Contact">
        {/* <h1>non user</h1> */}
        <div className="containerContact">
          <h1>Assistance technique</h1>
          <span className="underline"></span>
          <h3>Un problème, une question ? Contacter nos experts</h3>

          <Image
            width={800}
            height={500}
            src="/images/assistanceTechnique.jpg"
            alt="pageAssistance.jpg"
          />
          <div className="container">
            <div className="Element">
              <PhoneIcon />
              <h5>Assistance technique</h5>
              <p>Appelez-nous au 0810 634 634</p>
            </div>
            <div className="Element">
              <MailIcon />
              <h5>Email</h5>
              <p>
                Envoyez-nous vos questions <br />
                campus@leroymerlin.fr
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
};

export default contact;
