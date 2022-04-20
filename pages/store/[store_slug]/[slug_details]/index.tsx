import React from "react";
import StoresLayout from "../../../../components/StoresLayout";
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
    <StoresLayout user={user} title={slug.slug_details}>
      <div>
        {coursString[0].cours.map((element: any) => {
          if (element.title === slug.slug_details) {
            return (
              <div className="pageCours">
                <div className="ContainerCours" key={element.title}>
                  <div className="ContainerCoursImageDescription">
                    <div className="image">
                      <img width={200} height={200} src={element.image} />
                    </div>
                    <br />
                    <span className="underline"></span>
                    <div className="ContainerCoursDescription">
                      {element.description}
                    </div>
                  </div>

                  <div className="ContainerCoursSlot">
                    <form method="POST" action="/api/updateCart">
                      <h3>{element.title}</h3>
                      {element.prix} €<span className="underline"></span>
                      {element.creneaux.map((slot, index) => {
                        return (
                          <div key={index} className="slot">
                            <input
                              type="radio"
                              name="creneau"
                              id={`{"day": "${slot.day}", "hours": "${slot.hours}", "id_prof": "${slot.id_prof}", "email": "${user.email}", "title":"${element.title}", "desc":"${element.description}", "imgURL":"${element.image}", "price":"${element.prix}"}`}
                              value={`{"day": "${slot.day}", "hours": "${slot.hours}", "id_prof": "${slot.id_prof}", "email": "${user.email}", "title":"${element.title}", "desc":"${element.description}", "imgURL":"${element.image}", "price":"${element.prix}"}`}
                              onChange={(e) => setForm(slot)}
                            />
                            <div>
                              <label
                                htmlFor={`{"day": "${slot.day}", "hours": "${slot.hours}", "id_prof": "${slot.id_prof}", "email": "${user.email}", "title":"${element.title}", "desc":"${element.description}", "imgURL":"${element.image}", "price":"${element.prix}"}`}
                              >
                                {slot.id_prof}
                              </label>
                              <label
                                htmlFor={`{"day": "${slot.day}", "hours": "${slot.hours}", "id_prof": "${slot.id_prof}", "email": "${user.email}", "title":"${element.title}", "desc":"${element.description}", "imgURL":"${element.image}", "price":"${element.prix}"}`}
                              >
                                {slot.day}, {slot.hours}
                              </label>
                            </div>
                          </div>
                        );
                      })}
                      <input
                        type="submit"
                        value="Confirmer"
                        className="boutonSlot"
                      />
                    </form>
                  </div>
                </div>

                <div className="ContainerTutoButton">
                  <Link href="/store" passHref={true}>
                    <button className="boutonIndex">
                      Retour aux catégories
                    </button>
                  </Link>
                </div>
              </div>
            );
          } else {
            null;
          }
        })}
      </div>
    </StoresLayout>
  );
});
