export type RequestType = {
  query: string;
  variables?: any;
  preview?: boolean;
};

// eslint-disable-next-line import/prefer-default-export
export async function request({ query, variables, preview }: RequestType): Promise<any | null> {
  let endpoint = 'https://graphql.datocms.com';

  if (process.env.DATOCMS_ENVIRONMENT) {
    endpoint += `/environments/${process.env.DATOCMS_ENVIRONMENT}`;
  }

  if (preview) {
    endpoint += `/preview`;
  }

  // eslint-disable-next-line no-console
  console.log(endpoint);
  // eslint-disable-next-line no-console
  console.log(process.env.DATOCMS_API_TOKEN);

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`
    },
    body: JSON.stringify({
      query,
      variables
    })
  });
  const json = await res.json();

  if (json.errors) {
    console.error('Ouch! The query has some errors!');
    throw json.errors;
  }

  return json.data;
}
