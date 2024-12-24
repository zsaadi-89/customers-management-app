<template>
  <v-container>
    <div class="d-flex mb-5">
      <v-btn
        class="ms-auto"
        density="default"
        color="primary"
        :to="{ name: 'new-client' }"
      >
        <v-icon>mdi-plus</v-icon>
        Ajouter un client
      </v-btn>
    </div>
    <v-title class="text-h5 d-flex mb-5">Liste des Clients</v-title>
    <ClientTable />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
import ClientTable from "@/components/ClientTable.vue";

@Component({
  components: {
    ClientTable,
  },
})
export class ClientList extends Vue {}

export default toNative(ClientList);
</script>

<style scoped>
/* Ajoutez vos styles personnalisés si nécessaire */
</style>
