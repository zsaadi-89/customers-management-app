<template>
  <v-data-table
    :items="clients"
    :headers="headers"
    :sort-by="[{ key: 'name', order: 'asc' }]"
    item-value="id"
    class="elevation-1"
    density="compact"
  >
    <template v-slot:[`item.actions`]="{ item }">
      <router-link
        :to="{ name: 'edit-client', params: { id: item.id } }"
        class="pa-0"
      >
        <v-icon color="primary">mdi-pencil</v-icon>
      </router-link>
      <v-icon class="pa-0" color="error" @click="deleteClient(item.id)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
import apolloClient from "@/plugins/apollo-client";
import {
  deleteClientMutation,
  updateCacheAfterDelete,
} from "@/utils/apollo-client-utils";

@Component
export class ClientTable extends Vue {
  headers = [
    { title: "Nom", key: "name" },
    { title: "Email", key: "email" },
    { title: "Actions", key: "actions", sortable: false },
  ];

  // Liste des clients depuis le store
  get clients() {
    return this.$store.state.clients;
  }

  mounted() {
    this.fetchClients(); // Charger la liste des clients au montage
  }

  fetchClients() {
    this.$store.dispatch("fetchClients"); // Appeler le store pour récupérer les clients
  }

  async deleteClient(id: number) {
    try {
      await this.executeDeleteClient(id);
      this.fetchClients(); // Rafraîchir la liste des clients après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression du client :", error);
    }
  }

  private async executeDeleteClient(id: number) {
    await apolloClient.mutate({
      mutation: deleteClientMutation,
      variables: { id },
      update: (cache) => updateCacheAfterDelete(cache, id),
    });
  }
}

export default toNative(ClientTable);
</script>

<style lang="scss" scoped></style>
