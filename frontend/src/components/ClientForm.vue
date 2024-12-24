<template>
  <v-card-text>
    <v-form @submit.prevent="submit">
      <v-text-field
        v-model="name"
        label="Nom"
        required
        variant="outlined"
      ></v-text-field>
      <v-text-field
        v-model="email"
        label="Email"
        required
        variant="outlined"
        type="email"
      ></v-text-field>
      <v-btn type="submit" color="primary" block> Ajouter </v-btn>
    </v-form>
  </v-card-text>
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
import apolloClient from "@/plugins/apollo-client";
import { gql } from "@apollo/client";

@Component
export class ClientForm extends Vue {
  name = "";
  email = "";

  async submit() {
    await apolloClient.mutate({
      mutation: gql`
        mutation ($name: String!, $email: String!) {
          createClient(name: $name, email: $email) {
            id
            name
            email
          }
        }
      `,
      variables: { name: this.name, email: this.email },
    });

    this.$emit("clientCreated");
    this.name = "";
    this.email = "";
  }
}

export default toNative(ClientForm);
</script>

<style scoped></style>
