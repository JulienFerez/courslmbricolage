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
      <Layout user={user}>
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
          <Link href="/onlinestore" passHref={true}>
            <Image
              width={200}
              height={200}
              src="/images/tutoEnLigne.png"
              alt="tutoenligne"
            />
          </Link>

          {users[0]?._id !== undefined ? (
            <Link href="/store" passHref={true}>
              <Image
                width={200}
                height={200}
                src="/images/coursenmag.png"
                alt="coursenmag"
              />
            </Link>
          ) : (
            <Link href="/form" passHref={true}>
              <Image
                width={200}
                height={200}
                src="/images/coursenmag.png"
                alt="coursenmag"
              />
            </Link>
          )}

          <Link href="/contact" passHref={true}>
            <Image
              width={200}
              height={200}
              src="/images/assistance.png"
              alt="assistancetel"
            />
          </Link>
        </div>
      </Layout>
    );
  } else {
    // si l'utilisateur n'est pas connecté

    return (
      <Layout user={undefined}>
        <div className="containerHomePage">
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
          {/* pour acceder aux tutos */}
          <Link href="/onlinestore" passHref={true}>
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

          {/* pour acceder page contact  */}
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
      </Layout>
    );
  }
}

// {user ? (
//   <Link href="/store" passHref={true}>
//     <div>
//       <h1>USERRSSSSSSSSS</h1>
//       <Image
//         width={500}
//         height={500}
//         src="/images/coursenmag.png"
//         alt="coursenmag.png"
//       />
//       <h4>Nos cours en magasin</h4>
//     </div>
//   </Link>
// ) : (
// <Link href="api/auth/login" passHref={true}>
//   <div>
//     <Image
//       width={500}
//       height={500}
//       src="/images/coursenmag.png"
//       alt="coursenmag.png"
//     />
//     <h4>Nos cours en magasin</h4>
//   </div>
// </Link>
// )}
