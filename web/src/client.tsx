import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query GetQoutes {
        quotes {
          author
          quote
        }
      }
    `,
  })
  .then((result) => console.log(result));
