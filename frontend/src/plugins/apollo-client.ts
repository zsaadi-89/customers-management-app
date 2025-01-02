import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          clients: {
            // Utiliser le cache si disponible
            merge(existing = [], incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

export default apolloClient;
