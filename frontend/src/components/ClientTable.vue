<template>
  <v-data-table
    :items="clients"
    :headers="headers"
    item-value="id"
    class="elevation-1"
    density="compact"
  >
    <template v-slot:[`item.actions`]="{ item }">
      <v-btn
        variant="text"
        class="pa-0"
        :to="{
          name: 'edit-client',
          params: { id: item.id },
        }"
      >
        <v-icon color="primary">mdi-pencil</v-icon>
      </v-btn>
      <v-btn variant="text" class="pa-0" @click="deleteClient(item.id)">
        <v-icon color="error">mdi-delete</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>
<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
import { gql } from "@apollo/client";
import apolloClient from "@/plugins/apollo-client";

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

  // Charger la liste des clients
  mounted() {
    this.fetchClients();
  }

  // Appeler l'action du store pour récupérer les clients
  fetchClients() {
    this.$store.dispatch("fetchClients");
  }

  // Supprimer un client
  async deleteClient(id: string) {
    try {
      await apolloClient.mutate({
        mutation: gql`
          mutation ($id: Int!) {
            deleteClient(id: $id)
          }
        `,
        variables: { id: parseInt(id) },
      });
      // Mettre à jour les clients immédiatement après la suppression
      this.fetchClients();
    } catch (error) {
      console.error("Erreur lors de la suppression du client :", error);
    }
  }
}

export default toNative(ClientTable);
</script>
<style lang="scss" scoped></style>
