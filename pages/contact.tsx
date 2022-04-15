import React from "react";
import Layout from "../components/Layout";
import PhoneIcon from "@mui/icons-material/Phone";
import StorefrontIcon from "@mui/icons-material/Storefront";
import MailIcon from "@mui/icons-material/Mail";
import Image from "next/image";

const contact = ({ user }) => {
  return (
    <Layout user={user}>
      <h1>Assistance technique</h1>
      <h3>Notre réseau dexperts à votre service</h3>

      <Image
        width={500}
        height={500}
        src="/images/pageAssistance.jpeg"
        alt="pageAssistance.jpeg"
      />
      <div className="container">
        <div className="Element">
          <PhoneIcon />
          <h5>Assistance technique</h5>
          <p>Appelez-nous au 0810 634 634</p>
        </div>
        <div className="Element">
          <StorefrontIcon />
          <h5>Notre Magasin</h5>
          <p>Plan et horaire</p>
        </div>
        <div className="Element">
          <MailIcon />
          <h5>Email</h5>
          <p>
            Envoyez-nous votre question <br />
            Accéder au formulaire
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default contact;
