import tiny from "tiny-json-http";
import { getSession } from "~/sessions";
import kv from "@vercel/kv";

export type CmsRequestType = {
  query: string;
  variables?: any;
  preview?: boolean;
};

export type CmsQuerySubscriptionType = {
  request: Request;
  query: string;
  useCache?: boolean;
};

export async function load({ query, variables, preview }: CmsRequestType) {
  let endpoint = "https://graphql.datocms.com";

  if (process.env.DATOCMS_ENVIRONMENT) {
    endpoint += `/environments/${process.env.DATOCMS_ENVIRONMENT}`;
  }

  if (preview) {
    endpoint += `/preview`;
  }

  console.log("DEBUG ", endpoint, process.env.DATOCMS_ENVIRONMENT);

  try {
    const { body } = await tiny.post({
      url: endpoint,
      headers: {
        authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
      },
      data: {
        query,
        variables,
      },
    });

    if (body.errors) {
      console.error("Ouch! The query has some errors!", body.errors);
      throw body.errors;
    }

    return body.data;
  } catch (e) {
    console.error({ e });
    throw e;
  }
}

export async function datoQuerySubscription({
  request,
  useCache,
  ...gqlRequest
}: CmsQuerySubscriptionType) {
  const session = await getSession(request.headers.get("Cookie"));
  const previewEnabled = session.get("preview");

  // await kv.set("user_1_session", "session_token_value");
  // const session = await kv.get("user_1_session");

  let initialData;

  if (useCache) {
    console.log("datocms.server.ts, using cache");
    const cachedData = await kv.get("common");

    if (cachedData) {
      console.log("datocms.server.ts, cached data found!");
      initialData = cachedData;
    } else {
      console.log("datocms.server.ts, cached data NOT found!");
      initialData = previewEnabled
        ? await load({ ...gqlRequest, preview: true })
        : await load(gqlRequest);

      await kv.set("common", initialData);
      console.log("datocms.server.ts, cached data set!");
    }
  } else {
    initialData = previewEnabled
      ? await load({ ...gqlRequest, preview: true })
      : await load(gqlRequest);
  }

  return {
    datoQuerySubscription: previewEnabled
      ? {
          ...gqlRequest,
          preview: true,
          initialData,
          token: process.env.DATOCMS_READONLY_TOKEN,
          environment: process.env.DATOCMS_ENVIRONMENT || null,
        }
      : {
          enabled: false,
          initialData,
        },
  };
}
