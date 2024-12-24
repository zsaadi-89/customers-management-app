import { createStore } from "vuex";
import apolloClient from "@/plugins/apollo-client";
import { gql } from "@apollo/client";

export interface State {
  clients: Array<{ id: string; name: string; email: string }>;
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
      });
      commit("setClients", response.data.clients);
    },
  },
});
