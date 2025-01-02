<template>
  <v-container>
    <v-card>
      <v-card-title class="text-h5">
        {{ client ? `Client : ${client.name}` : "Ajouter un Client" }}
      </v-card-title>
      <div v-if="isEdit && !client">Chargement...</div>
      <ClientForm
        v-else
        :isEdit="isEdit"
        :client="client"
        @clientUpdated="handleClientUpdated"
      />
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
import ClientForm from "@/components/ClientForm.vue";
import apolloClient from "@/plugins/apollo-client";
import { gql } from "@apollo/client";

@Component({
  components: {
    ClientForm,
  },
})
export class ClientEdit extends Vue {
  client: { id: number; name: string; email: string } | null = null;
  isEdit = false;

  async mounted() {
    const id = this.$route.params.id; // Get ID from route params
    if (id) {
      this.isEdit = true; // Edit mode
      try {
        const response = await apolloClient.query({
          query: gql`
            query ($id: Int!) {
              client(id: $id) {
                id
                name
                email
              }
            }
          `,
          variables: { id: parseInt(id as string) },
        });
        this.client = response.data.client;
      } catch (error) {
        console.error("Erreur lors de la récupération du client :", error);
      }
    } else {
      this.isEdit = false; // Create mode
    }
  }

  handleClientUpdated() {
    // Redirigez après mise à jour ou enregistrement
    this.$router.push({ name: "home" });
  }
}

export default toNative(ClientEdit);
</script>

<style scoped></style>
