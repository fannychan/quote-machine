// const { ApolloServer, gql } = require("apollo-server-lambda");
const { ApolloServer, gql, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const jwksClient = require("jwks-rsa");
require("dotenv").config();

const USER_POOL_ID = process.env.USER_POOL_ID || "";
const client = jwksClient({
  jwksUri: `https://cognito-idp.eu-north-1.amazonaws.com/${USER_POOL_ID}/.well-known/jwks.json`,
});

let rawdata = fs.readFileSync("data.json");
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
      if (!context.user) {
        throw new AuthenticationError("you must be logged in");
      }

      if(context.user.exp && Date.now() >= context.user.exp * 1000 ) {
        throw new AuthenticationError('Token has expired');
      }

      try {
        function getKey(header, callback) {
          client.getSigningKey(header.kid, function (err, key) {
            var signingKey = key.rsaPublicKey || key.publicKey;
            callback(null, signingKey);
          });
        }

        jwt.verify(context.token, getKey, function (err, decoded) {
          if (err) {
            console.log(err)
            throw new AuthenticationError("Could not complete");
          }
        });

        quotes = [
          ...quotes,
          { author, quote, submittedBy: context.user.username },
        ];
        return {
          success: true,
          message: "Quote added",
          quotes,
        };
      } catch (err) {
        console.log(err);
        throw new AuthenticationError("Could not complete");
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = (req.headers && req.headers.authorization) || "";
    const token = auth.replace("Bearer ", "");
    const user = jwt.decode(token);
    return { user, token };
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
