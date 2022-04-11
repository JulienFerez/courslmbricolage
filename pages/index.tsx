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
        <div>
          <div>Welcome{user.name}</div>
          <Link href="/onlineStore" passHref={true}>
            <Image
              width={500}
              height={500}
              src="/images/tutoEnLigne.png"
              alt="tutoenligne"
            />
          </Link>
          {/* <Link href="">
          <Image src="coursdebricolagemag" alt="" />
        </Link>
        <Link href="">
          <Image src="assistancetel" alt="" />
        </Link> */}
        </div>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Navbar />

        <div>
          <Link href="/onlineStore" passHref={true}>
            <Image
              width={500}
              height={500}
              src="/images/tutoEnLigne.png"
              alt="tutoenligne"
            />
          </Link>
          {/* <Link href="">
          <Image src="coursdebricolagemag" alt="" />
        </Link>
        <Link href="">
          <Image src="assistancetel" alt="" />
        </Link> */}
        </div>
        <Footer />
      </>
    );
  }
}
