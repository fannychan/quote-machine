// const { ApolloServer, gql } = require("apollo-server-lambda");
const { ApolloServer, gql } = require("apollo-server");

let quotes = [
  {
    author: "Eleanor Roosevelt",
    quote:
      "If life were predictable it would cease to be life, and be without flavor.",
  },
  {
    author: "John Lennon",
    quote: "Life is what happens when you're busy making other plans",
  },
];

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
    quotes: [Quote]
    quote(author: String!): Quote
    random: Quote
  }
  type Quote {
    author: String
    quote: String
  }

  type Mutation {
    addQuote(quote: String, author: String): Quote
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!",
    quotes: () => quotes,
    quote: (context, args) => {
      return quotes.find((q) => q.author === args.author);
    },
    random: () => {
      console.log("HIT");
      const index = Math.floor(Math.random() * Math.floor(quotes.length));

      return quotes[index];
    },
  },
  Mutation: {
    addQuote: async (_, { author, quote }, { dataSources }) => {
      console.log(author);
      console.log(quote);
      quotes = [...quotes, { author, quote }];
      return {
        success: true,
        message: "Quote added",
        quotes,
      };
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

console.log(process.env.ENV);
if (process.env.ENV === "development") {
  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
} else {
  exports.graphqlHandler = server.createHandler();
}
