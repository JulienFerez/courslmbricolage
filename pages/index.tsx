import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout";

export default function Home(): any {
  const { user, error, isLoading } = useUser();
  if (user) {
    return (
      <Layout user={user}>
        <div className="containerHomePage">
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
          <Link href="/onlinestore" passHref={true}>
            <Image
              width={500}
              height={500}
              src="/images/tutoOnline.jpg"
              alt="tutoenligne"
            />
          </Link>
          {/* <h5>Tutos en ligne</h5> */}
          <Link href="/form" passHref={true}>
            <Image
              width={500}
              height={500}
              src="/images/coursenmag.png"
              alt="coursenmag"
            />
          </Link>
        </div>
        <div className="containerContact">
          <Link href="/contact" passHref={true}>
            <button className="boutonIndex">Notre assistance technique</button>
          </Link>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout user={undefined}>
        <div className="containerHomePage">
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
          {/* pour acceder aux tutos */}
          <Link href="/onlinestore" passHref={true}>
            <div>
              {" "}
              <Image
                width={500}
                height={500}
                src="/images/tutoOnline.jpg"
                alt="tutoenligne"
              />
              <h4>Nos tutos de bricolage en ligne</h4>
            </div>
          </Link>
          {/*pour acceder aux cours   */}
          <Link href="api/auth/login" passHref={true}>
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
        </div>
        {/* pour acceder page contact  */}
        <div className="containerContact">
          <Link href="/contact" passHref={true}>
            <button className="boutonIndex">Notre assistance technique</button>
          </Link>
        </div>
      </Layout>
    );
  }
}
