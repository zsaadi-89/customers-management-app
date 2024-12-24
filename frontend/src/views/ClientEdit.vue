<template>
  <v-container>
    <v-card>
      <v-card-title class="text-h5">Ajouter un Client</v-card-title>
      <ClientForm />
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
import ClientForm from "@/components/ClientForm.vue";

@Component({
  components: {
    ClientForm,
  },
})
export class ClientEdit extends Vue {}

export default toNative(ClientEdit);
</script>

<style scoped></style>
