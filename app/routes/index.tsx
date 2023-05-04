import { useLoaderData } from "@remix-run/react";
import Helmet from "react-helmet";
import { homeQuery } from "~/queries/home.query";
import { datoQuerySubscription } from "~/lib/datocms.server";
import type { LoaderArgs } from "@remix-run/node";
import { useQuerySubscription } from "react-datocms";
import { Hero } from "~/components/Hero";
import type { Home } from "~/types";

type PageData = {
  home: Home;
};

export async function loader({ request }: LoaderArgs) {
  return datoQuerySubscription({
    request,
    query: homeQuery,
  });
}

export default function Index() {
  const { datoQuerySubscription } = useLoaderData();
  const { data } = useQuerySubscription(datoQuerySubscription);

  const { home }: PageData = data;

  // console.log({ home });

  // temp
  const loaded = true;

  return (
    <div>
      <Helmet>
        <body className={loaded ? "home loaded" : "home"} />
      </Helmet>

      <Hero
        heading1={home.heading1}
        heading1Ja={home.heading1Ja}
        heading2={home.heading2}
        heading2Ja={home.heading2Ja}
      />

      {/*{aboutData && <About about={aboutData} />}*/}
      {/*{whatido && <What whatido={whatido} />}*/}
    </div>
  );
}
