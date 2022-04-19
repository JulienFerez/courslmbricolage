import { getSession, useUser } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout";
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
  // console.log(users[0]._id);

  if (users[0]?._id !== undefined) {
    console.log("existe");
  } else {
    console.log("n'existe pas '");
  }

  return {
    props: {
      users: users,
    },
  };
};

export default function Home({ users }): any {
  const { user, error, isLoading } = useUser();
  // console.log(users);

  // si l'utilisateur est connecté
  if (user) {
    return (
      <Layout user={user} title="Et si vous appreniez à le faire vous même ?">
        <div className="containerHomePage">
          <p>
            Vous souhaitez peindre vos murs, poser un mitigeur, rénover ou poser
            un parquet, créer un objet par vous-même ? Vous hésitez à vous
            lancer ? Apprenez comme vous voulez et quand vous voulez : tutos et
            vidéos en ligne, cours en magasin, coaching avec un pro ou un
            bricoleur averti… vous avez tout pour réaliser vous-même vos
            travaux.
          </p>

          {/* <h1>Toutes les solutions pour apprendre à votre rythme</h1> */}
        </div>
        {/* Pour accéder aux tutos  */}
        <div className="imageHomePage">
          <Link href="/onlinestore" passHref={true}>
            <div>
              <Image
                className="pictureHomePage"
                width={300}
                height={300}
                src="/images/tutoOnline.jpg"
                alt="tutoenligne"
              />
              <p className="bandeauImageHome">Tuto en ligne</p>
            </div>
          </Link>
          {/* Pour accéder aux cours en magasin  */}
          {users[0]?._id !== undefined ? (
            <Link href="/store" passHref={true}>
              <div>
                <Image
                  className="pictureHomePage"
                  width={300}
                  height={300}
                  src="/images/coursEnMag.jpg"
                  alt="coursenmag"
                />
                <p className="bandeauImageHome">Cours en magasin</p>
              </div>
            </Link>
          ) : (
            <Link href="/form" passHref={true}>
              <div>
                <Image
                  className="pictureHomePage"
                  width={300}
                  height={300}
                  src="/images/coursEnMag.jpg"
                  alt="coursenmag"
                />
                <p className="bandeauImageHome">Cours en magasin</p>
              </div>
            </Link>
          )}
        </div>
        <div className="containerContact">
          <Link href="/contact" passHref={true}>
            <button className="boutonIndex">Notre assistance technique</button>
          </Link>
        </div>
      </Layout>
    );
  } else {
    // si l'utilisateur n'est pas connecté

    return (
      <Layout
        user={undefined}
        title="Et si vous appreniez à le faire vous même ?"
      >
        <div className="containerHomePage">
          <p>
            Vous souhaitez peindre vos murs, poser un mitigeur, rénover ou poser
            un parquet, créer un objet par vous-même ? Vous hésitez à vous
            lancer ? Apprenez comme vous voulez et quand vous voulez : tutos et
            vidéos en ligne, cours en magasin, coaching avec un pro ou un
            bricoleur averti… vous avez tout pour réaliser vous-même vos
            travaux.
          </p>
          {/* <h1>Toutes les solutions pour apprendre à votre rythme</h1> */}
        </div>

        <div className="imageHomePage">
          {/* pour acceder aux tutos */}
          <Link href="/onlinestore" passHref={true}>
            <div>
              {" "}
              <Image
                className="pictureHomePage"
                width={300}
                height={300}
                src="/images/tutoOnline.jpg"
                alt="tutoenligne"
              />
              <p className="bandeauImageHome">Tuto en ligne</p>
            </div>
          </Link>
          {/*pour acceder aux cours   */}
          <Link href="api/auth/login" passHref={true}>
            <div>
              <Image
                className="pictureHomePage"
                width={300}
                height={300}
                src="/images/coursEnMag.jpg"
                alt="coursenmag.png"
              />
              <p className="bandeauImageHome">Cours en magasin</p>
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
