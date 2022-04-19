import React from "react";
import Layout from "../../../../components/Layout";
import { GetServerSideProps } from "next";
import { getDatabase } from "../../../../src/database";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params;

  const mongodb = await getDatabase();

  const cours = await mongodb
    .collection("category")
    .find({ name: `${slug.store_slug}` })
    .toArray();

  const coursString = await JSON.parse(JSON.stringify(cours));

  return {
    props: {
      coursString: coursString,
      slug: slug,
    },
  };
};

export default withPageAuthRequired(function Profile({
  coursString,
  slug,
  user,
}) {
  const [form, setForm] = React.useState("");

  return (
    <Layout user={user} title={slug.slug_details}>
      <div>
        {coursString[0].cours.map((element: any) => {
          if (element.title === slug.slug_details) {
            return (
              <div>
                <div className="ContainerTuto" key={element.title}>
                  <div className="ContainerTutoDescription">
                    {element.description}
                  </div>
                  <div className="ContainerTutoDescription">
                    <img width={200} height={200} src={element.image} />
                  </div>

                  <div>
                    <form method="POST" action="/api/updateCart">
                      {element.creneaux.map((slot, index) => {
                        return (
                          <div key={index}>
                            <input
                              type="radio"
                              name="creneau"
                              value={`{"day": "${slot.day}", "hours": "${slot.hours}", "id_prof": "${slot.id_prof}", "email": "${user.email}", "title":"${element.title}", "desc":"${element.description}", "imgURL":"${element.image}", "price":"${element.prix}"}`}
                              onChange={(e) => setForm(slot)}
                            ></input>

                            {slot.day}
                            {slot.hours}
                            {slot.id_prof}
                          </div>
                        );
                      })}
                      <input type="submit" value="Envoyer" />
                    </form>
                    <button onClick={() => console.log(form)}>Bouton </button>
                  </div>
                </div>

                <div className="ContainerTutoDescription">{element.prix} €</div>
                <div className="ContainerTutoButton">
                  <Link href={`/store/${slug.store_slug}`} passHref={true}>
                    <button>Page Précédente</button>
                  </Link>
                  <Link href="/store" passHref={true}>
                    <button>Retour aux catégories</button>
                  </Link>
                  <Link href="/" passHref={true}>
                    <button>Home Page</button>
                  </Link>
                  <Link href="/validation" passHref={true}>
                    <button>Valider</button>
                  </Link>
                </div>
              </div>
            );
          } else {
            <>toto</>;
          }
        })}
      </div>
    </Layout>
  );
});
