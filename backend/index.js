const { createYoga } = require('graphql-yoga');
const { PrismaClient } = require('@prisma/client');
const { createServer } = require('http'); // Utiliser un serveur HTTP natif
const { makeExecutableSchema } = require('@graphql-tools/schema');

const prisma = new PrismaClient();
const axios = require("axios");

const typeDefs = `
  type Client {
    id: Int!
    name: String!
    email: String!
    phoneNumber: String!
    siren: String
    siret: String
    vatNumber: String
  }

  type Query {
    clients: [Client!]!
    client(id: Int!): Client!
    searchCompanyBySiren(siren: String!): Client
  }

  type Mutation {
    createClient(name: String!, email: String!, phoneNumber: String!, siren: String, siret: String, vatNumber: String): Client!
    updateClient(id: Int!, name: String, email: String, phoneNumber: String, siren: String, siret: String, vatNumber: String): Client
    deleteClient(id: Int!): Boolean
  }
`;

const resolvers = {
  Query: {
    clients: () => prisma.client.findMany(),
    client: (_, { id }) => prisma.client.findUnique({ where: { id } }),

    // Recherche d'une entreprise par SIREN
    searchCompanyBySiren: async (_, { siren }) => {
      try {
        const response = await axios.get(
          `https://recherche-entreprises.api.gouv.fr/search?q=${siren}`
        );

        if (response.data && response.data.results && response.data.results.length > 0) {
          const company = response.data.results[0]; // Prenez la première entreprise retournée
          return {
            name: company.nom_raison_sociale || "Non spécifié",
            phoneNumber: company.telephone || "",
            siren: company.siren || "",
            siret: company.siret || "",
            vatNumber: company.numero_tva_intra || "",
          };
        } else {
          throw new Error("Aucune entreprise trouvée pour ce SIREN.");
        }
      } catch (error) {
        console.error("Erreur lors de la recherche par SIREN :", error);
        throw new Error("Impossible de récupérer les informations de la société.");
      }
    },
  },

  Mutation: {
    createClient: (_, { name, email, phoneNumber, siren, siret, vatNumber }) =>
      prisma.client.create({
        data: { name, email, phoneNumber, siren: siren || null, siret: siret || null, vatNumber: vatNumber || null },
      }),

    updateClient: (_, { id, name, email, phoneNumber, siren, siret, vatNumber }) =>
      prisma.client.update({
        where: { id },
        data: { name, email, phoneNumber, siren: siren || null, siret: siret || null, vatNumber: vatNumber || null },
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
