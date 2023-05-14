import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import {
  isRouteErrorResponse,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import {
  renderMetaTags,
  toRemixMeta,
  useQuerySubscription,
} from "react-datocms";
import globalStylesUrl from "./styles/app.css";
import { datoQuerySubscription } from "~/lib/datocms.server";
import { commonQuery } from "~/queries/common.query";
import { Alert } from "~/components/Alert";
import Header from "~/components/Header";
import { Footer } from "~/components/Footer";
import { PageProvider, usePageState } from "~/components/PageProvider";
import type { MetaRoot } from "~/types";
import type { ReactNode } from "react";
import type { PageState } from "~/components/PageProvider";

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
    useCache: true,
    query: commonQuery,
  });
}

function Document({
  children,
  title,
  preview,
}: {
  children: ReactNode;
  title?: string;
  preview?: boolean;
}) {
  const { site } = usePageState();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        {site && renderMetaTags([...site.favicon])}
      </head>

      <body>
        {preview ?? <Alert />}

        <Header />

        <main id="main" role="main">
          {children}
        </main>

        <Footer />

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  const { datoQuerySubscription } = useLoaderData();
  // console.log({ datoQuerySubscription });
  console.log(datoQuerySubscription.initialData);

  const {
    data: { site, menu },
  } = useQuerySubscription(datoQuerySubscription);
  const initialPageState: PageState = {
    site,
    menu,
  };

  const previewEnabled =
    datoQuerySubscription.enabled === undefined ||
    datoQuerySubscription.enabled === true;

  return (
    <PageProvider initialState={initialPageState}>
      <Document preview={previewEnabled}>
        <Outlet />
      </Document>
    </PageProvider>
  );
}

export function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    return (
      <Document title="Uh-oh!">
        <div>
          <h1>
            {error.status} {error.statusText}
          </h1>
          <p>{error.data}</p>
        </div>
      </Document>
    );
  } else if (error instanceof Error) {
    return (
      <Document title="Uh-oh!">
        <div>
          <h1>Ops, si è verificato un Errore.</h1>
          <p>{error.message}</p>
          <p>Per favore riporta questo errore a Marcello.</p>
          <pre>{error.stack}</pre>
        </div>
      </Document>
    );
  } else {
    return (
      <Document title="Uh-oh!">
        <h1>Unknown Error</h1>
      </Document>
    );
  }
}
