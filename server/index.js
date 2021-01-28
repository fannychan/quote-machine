// const { ApolloServer, gql } = require("apollo-server-lambda");
const { ApolloServer, gql } = require("apollo-server");
var jwt = require("jsonwebtoken");

let quotes = [
  {
    author: "Eleanor Roosevelt",
    quote:
      "If life were predictable it would cease to be life, and be without flavor.",
    submittedBy: "Robot1",
  },
  {
    author: "John Lennon",
    quote: "Life is what happens when you're busy making other plans",
    submittedBy: "Lisa",
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
    submittedBy: String
  }

  type Mutation {
    addQuote(quote: String, author: String, submittedBy: String): Quote
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
    random: (_, args, context) => {
      const index = Math.floor(Math.random() * Math.floor(quotes.length));

      return quotes[index];
    },
  },
  Mutation: {
    addQuote: async (_, { author, quote }, context) => {
      console.log("Add qoute", context);
      console.log(author);
      console.log(quote);

      quotes = [
        ...quotes,
        { author, quote, submittedBy: context.user.username },
      ];
      return {
        success: true,
        message: "Quote added",
        quotes,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = (req.headers && req.headers.authorization) || "";
    console.log(auth);
    //TODO: Verify the token also

    const decoded = jwt.decode(auth.substring(7));
    console.log(decoded);
    return { user: { ...decoded } };
  },
});

console.log(process.env.ENV);
if (process.env.ENV === "development") {
  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
} else {
  exports.graphqlHandler = server.createHandler();
}
