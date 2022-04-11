import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <div>
        <Link href="/onlineStore" passHref={true}>
          <Image
            width={500}
            height={500}
            src="/images/tutoEnLigne"
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
