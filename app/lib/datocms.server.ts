import tiny from "tiny-json-http";
import { getSession } from "~/sessions";

export type CmsRequestType = {
  query: string;
  variables?: any;
  preview?: boolean;
};

export type CmsQuerySubscriptionType = {
  request: Request;
  query: string;
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
  ...gqlRequest
}: CmsQuerySubscriptionType) {
  const session = await getSession(request.headers.get("Cookie"));
  const previewEnabled = session.get("preview");

  return {
    datoQuerySubscription: previewEnabled
      ? {
          ...gqlRequest,
          preview: true,
          initialData: await load({ ...gqlRequest, preview: true }),
          token: process.env.DATOCMS_READONLY_TOKEN,
          environment: process.env.DATOCMS_ENVIRONMENT || null,
        }
      : {
          enabled: false,
          initialData: await load(gqlRequest),
        },
  };
}
