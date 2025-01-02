const { createYoga } = require('graphql-yoga');
const { PrismaClient } = require('@prisma/client');
const { createServer } = require('http'); // Utiliser un serveur HTTP natif
const { makeExecutableSchema } = require('@graphql-tools/schema');

const prisma = new PrismaClient();

const typeDefs = `
  type Client {
    id: Int!
    name: String!
    email: String!
  }

  type Query {
    clients: [Client!]!
    client(id: Int!): Client!
  }

  type Mutation {
    createClient(name: String!, email: String!): Client!
    updateClient(id: Int!, name: String, email: String): Client
    deleteClient(id: Int!): Boolean
  }
`;

const resolvers = {
  Query: {
    clients: () => prisma.client.findMany(),
    client: (_, { id }) => prisma.client.findUnique({ where: { id } }),
  },
  Mutation: {
    createClient: (_, { name, email }) =>
      prisma.client.create({ data: { name, email } }),
    updateClient: (_, { id, name, email }) =>
      prisma.client.update({
        where: { id },
        data: { name, email },
      }),
    deleteClient: async (_, { id }) => {
      await prisma.client.delete({ where: { id } });
      return true;
    },
  },
};

// Créez le schéma avec makeExecutableSchema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialiser Yoga avec le schéma
const yoga = createYoga({
  schema,
});

// Démarrer le serveur HTTP
const server = createServer(yoga);

server.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
