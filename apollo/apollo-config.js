/*
data in schema.json generated with this query:

query IntrospectionQuery {
  __schema {
    queryType {
      name
    }
    mutationType {
      name
    }
    subscriptionType {
      name
    }
    types {
      ...FullType
    }
    directives {
      name
      description
      locations
      args {
        ...InputValue
      }
    }
  }
}

fragment FullType on __Type {
  kind
  name
  description
  fields(includeDeprecated: true) {
    name
    description
    args {
      ...InputValue
    }
    type {
      ...TypeRef
    }
    isDeprecated
    deprecationReason
  }
  inputFields {
    ...InputValue
  }
  interfaces {
    ...TypeRef
  }
  enumValues(includeDeprecated: true) {
    name
    description
    isDeprecated
    deprecationReason
  }
  possibleTypes {
    ...TypeRef
  }
}

fragment InputValue on __InputValue {
  name
  description
  type {
    ...TypeRef
  }
  defaultValue
}

fragment TypeRef on __Type {
  kind
  name
  ofType {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
              }
            }
          }
        }
      }
    }
  }
}

*/

/* old query: (doesn't work)
query {
  __schema {
    types {
      name
      kind
      possibleTypes {
        name
        description
      }
    }
  }
}
*/

// import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
// import schema from './schema.json';
// const fragmentMatcher = new IntrospectionFragmentMatcher({
//   introspectionQueryResultData: schema
// });
//
// export default ({ req, app }) => {
//   return {
//     httpEndpoint: 'https://graphql.datocms.com',
//     getAuth: () => 'Bearer 4ea46ef94c23e12045c7f20bf32ed9',
//     tokenName: 'apollo-token',
//     cache: new InMemoryCache({ fragmentMatcher })
//   };
// };


// import { InMemoryCache } from 'apollo-cache-inmemory';
// import mockData from './mock-cache/mock';
// const cache = new InMemoryCache();
//
// cache.writeData({
//   data: mockData
// });

export default function (context) {
  return {
    httpEndpoint: 'https://graphql.datocms.com',
    getAuth: () => `Bearer ${process.env.NUXT_ENV_DATO_CMS_TOKEN}`,
    // cache
    // // Local Schema
    // typeDefs = undefined,
    // // Local Resolvers
    // resolvers = undefined,
  };
}
