// const { ApolloServer, gql } = require("apollo-server-lambda");
const { ApolloServer, gql, AuthenticationError } = require("apollo-server");
var jwt = require("jsonwebtoken");
const fs = require('fs');

let rawdata = fs.readFileSync('data.json');
let quotes = JSON.parse(rawdata);

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
      console.log("Context", context)
      if(!context.user.username) {
        throw new AuthenticationError('you must be logged in');  
      }
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
    //TODO: Verify the token also
    const decoded = jwt.decode(auth.substring(7));
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
