import React from "react";
import Layout from "../components/Layout";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import Image from "next/image";

const contact = ({ user }) => {
  return (
    <Layout user={user} title="Contact">
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
              Envoyez-nous votre question <br />
              campus@leroymerlin.fr
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default contact;
