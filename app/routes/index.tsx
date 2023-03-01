import { Link, useLoaderData } from "@remix-run/react";
import Helmet from "react-helmet";
import { homeQuery } from "~/queries/home.query";
import { datoQuerySubscription } from "~/lib/datocms.server";
import type { LoaderArgs } from "@remix-run/node";
import { useQuerySubscription } from "react-datocms";

export async function loader({ request }: LoaderArgs) {
  return datoQuerySubscription({
    request,
    query: homeQuery,
  });
}

export default function Index() {
  const { datoQuerySubscription } = useLoaderData();

  const {
    data: { home },
  } = useQuerySubscription(datoQuerySubscription);

  console.log({ home });

  // temp
  const loaded = true;

  return (
    <div>
      <Helmet>
        <body className={loaded ? "home loaded" : "home"} />
      </Helmet>

      <h1>Yo!</h1>
      {/*{heroData && <Hero hero={heroData} />}*/}
      {/*{aboutData && <About about={aboutData} />}*/}
      {/*{whatido && <What whatido={whatido} />}*/}
    </div>
  );
}
