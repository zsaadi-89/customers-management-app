import { Client } from "@/types/client.types";
import { ApolloCache, gql } from "@apollo/client";

// Déclare les mutations
export const createClientMutation = gql`
  mutation ($name: String!, $email: String!) {
    createClient(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export const updateClientMutation = gql`
  mutation ($id: Int!, $name: String!, $email: String!) {
    updateClient(id: $id, name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

// Mutation pour supprimer un client
export const deleteClientMutation = gql`
  mutation ($id: Int!) {
    deleteClient(id: $id)
  }
`;

// Mise à jour du cache après la création d'un client
export function updateCacheAfterCreate(
  cache: ApolloCache<{ clients: Client[] }>, // Typage explicite
  newClient: Client // Nouveau client ajouté
) {
  const data = cache.readQuery<{ clients: Client[] }>({
    query: gql`
      query {
        clients {
          id
          name
          email
        }
      }
    `,
  });

  if (data) {
    cache.writeQuery({
      query: gql`
        query {
          clients {
            id
            name
            email
          }
        }
      `,
      data: {
        clients: [...data.clients, newClient], // Ajoute le client au cache
      },
    });
  }
}

// Mise à jour du cache après la modification d'un client
export function updateCacheAfterUpdate(
  cache: ApolloCache<{ clients: Client[] }>, // Cache Apollo avec un typage générique
  updatedClient: Client // Client mis à jour
) {
  const data = cache.readQuery<{ clients: Client[] }>({
    query: gql`
      query {
        clients {
          id
          name
          email
        }
      }
    `,
  });

  if (data) {
    const updatedClients = data.clients.map((client) =>
      client.id === updatedClient.id ? updatedClient : client
    );

    cache.writeQuery({
      query: gql`
        query {
          clients {
            id
            name
            email
          }
        }
      `,
      data: { clients: updatedClients },
    });
  }
}

// Fonction utilitaire pour mettre à jour le cache après suppression
export function updateCacheAfterDelete(
  cache: ApolloCache<{ clients: Client[] }>,
  id: number
) {
  const data = cache.readQuery<{ clients: Client[] }>({
    query: gql`
      query {
        clients {
          id
          name
          email
        }
      }
    `,
  });

  if (data) {
    cache.writeQuery({
      query: gql`
        query {
          clients {
            id
            name
            email
          }
        }
      `,
      data: {
        clients: data.clients.filter((client) => client.id !== id),
      },
    });
  }
}
