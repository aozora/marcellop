import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import {
  renderMetaTags,
  toRemixMeta,
  useQuerySubscription,
} from "react-datocms";
import globalStylesUrl from "./styles/app.css";
import { datoQuerySubscription } from "~/lib/datocms";
import { commonQuery } from "~/queries/common.query";
import type { MetaRoot } from "~/types";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: globalStylesUrl }];
};

export const meta = ({
  data: {
    datoQuerySubscription: {
      initialData: { site },
    },
  },
}: MetaRoot) => {
  return toRemixMeta([...site.favicon]);
};
// export const meta: MetaFunction = () => ({
//   charset: "utf-8",
//   title: "Marcello Palmitessa",
//   viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
// });

// type LoaderData = {
//   datoQuerySubscription: any
// }

export async function loader({ request }: LoaderArgs) {
  return datoQuerySubscription({
    request,
    query: commonQuery,
  });
}

export default function App() {
  const { datoQuerySubscription } = useLoaderData();

  const {
    data: { site },
  } = useQuerySubscription(datoQuerySubscription);
  const previewEnabled =
    datoQuerySubscription.enabled === undefined ||
    datoQuerySubscription.enabled === true;

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        {renderMetaTags([...site.favicon])}
      </head>
      <body>
        {/*{previewEnabled ?? <Alert/>}*/}
        <main id="main" role="main">
          <Outlet />
        </main>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
