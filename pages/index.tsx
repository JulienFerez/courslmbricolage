import { UserProvider, useUser } from "@auth0/nextjs-auth0";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";

export default function Home({ children }) {
  const { user, error, isLoading } = useUser();
  if (user) {
    return (
      <>
        <Navbar />
        <Image
          src="/images/homePage.png"
          alt="homePage.png"
          width={2000}
          height={500}
        />
        <h2>Tutos</h2>
        <p>
          Vous souhaitez peindre vos murs, poser un mitigeur, rénover ou poser
          un parquet, créer un objet par vous-même ? Vous hésitez à vous lancer
          ? Apprenez comme vous voulez et quand vous voulez : tutos et vidéos en
          ligne, cours en magasin, astuces et conseils DIY, coaching avec un pro
          ou un bricoleur averti… vous avez tout pour réaliser vous-même vos
          travaux.
        </p>

        <h1>Toutes les solutions pour apprendre à votre rythme</h1>
        <div>
          <div>Welcome{user.name}</div>
          <Link href="/onlineStore" passHref={true}>
            <Image
              width={200}
              height={200}
              src="/images/tutoEnLigne.png"
              alt="tutoenligne"
            />
          </Link>
          {/* <h5>Tutos en ligne</h5> */}
          <Link href="/store" passHref={true}>
            <Image
              width={200}
              height={200}
              src="/images/coursenmag.png"
              alt="coursenmag"
            />
          </Link>
          <Link href="/contact" passHref={true}>
            <Image
              width={200}
              height={200}
              src="/images/assistance.png"
              alt="assistancetel"
            />
          </Link>
        </div>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <div className="containerHomePage">
          <Navbar />
          <Image
            src="/images/homePage.png"
            alt="homePage.png"
            width={800}
            height={300}
          />

          <h2>Tutos</h2>
          <p>
            Vous souhaitez peindre vos murs, poser un mitigeur, rénover ou poser
            un parquet, créer un objet par vous-même ? Vous hésitez à vous
            lancer ? Apprenez comme vous voulez et quand vous voulez : tutos et
            vidéos en ligne, cours en magasin, astuces et conseils DIY, coaching
            avec un pro ou un bricoleur averti… vous avez tout pour réaliser
            vous-même vos travaux.
          </p>
          <h1>Toutes les solutions pour apprendre à votre rythme</h1>
        </div>

        <div className="container">
          <Link href="/onlineStore" passHref={true}>
            <div>
              <Image
                width={500}
                height={500}
                src="/images/tutoEnLigne.png"
                alt="tutoenligne"
              />
              <h4>Nos tutos de bricolage en ligne</h4>
            </div>
          </Link>

          <Link href="/store" passHref={true}>
            <div>
              <Image
                width={500}
                height={500}
                src="/images/coursenmag.png"
                alt="coursenmag.png"
              />
              <h4>Nos cours en magasin</h4>
            </div>
          </Link>
          <Link href="/contact" passHref={true}>
            <div>
              <Image
                width={500}
                height={500}
                src="/images/assistance.png"
                alt="assistance.png"
              />
              <h4>Notre assistance technique</h4>
            </div>
          </Link>
        </div>
        <Footer />
      </>
    );
  }
}
