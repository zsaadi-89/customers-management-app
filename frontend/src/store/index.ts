import { createStore } from "vuex";
import apolloClient from "@/plugins/apollo-client";
import { gql } from "@apollo/client";
import { Client } from "@/types/client.types";

export interface State {
  clients: Array<Client>;
}

export const store = createStore<State>({
  state: {
    clients: [],
  },
  mutations: {
    setClients(state, clients) {
      state.clients = clients;
    },
  },
  actions: {
    async fetchClients({ commit }) {
      const response = await apolloClient.query({
        query: gql`
          query {
            clients {
              id
              name
              email
            }
          }
        `,
        fetchPolicy: "cache-first", // N'appelle pas le réseau si les données sont en cache
      });
      commit("setClients", response.data.clients);
    },
  },
});
