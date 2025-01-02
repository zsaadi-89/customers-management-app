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
      <v-btn type="submit" color="primary">
        {{ isEdit ? "Enregistrer" : "Ajouter" }}
      </v-btn>
    </v-form>
  </v-card-text>
</template>

<script lang="ts">
import { Component, Prop, Vue, toNative } from "vue-facing-decorator";
import apolloClient from "@/plugins/apollo-client";
import { gql } from "@apollo/client";

@Component
export class ClientForm extends Vue {
  @Prop({ type: Boolean, default: false }) readonly isEdit!: boolean;
  @Prop({ type: Object, default: null }) readonly client!: {
    id: number;
    name: string;
    email: string;
  };
  name = "";
  email = "";

  mounted() {
    console.log("isEdit" + this.isEdit);
    console.log("client" + this.client);

    // Fill data if edit mode
    if (this.isEdit && this.client) {
      this.name = this.client.name;
      this.email = this.client.email;
    }
  }

  async submit() {
    if (this.isEdit) {
      // Mutation to update a client
      await apolloClient.mutate({
        mutation: gql`
          mutation ($id: Int!, $name: String!, $email: String!) {
            updateClient(id: $id, name: $name, email: $email) {
              id
              name
              email
            }
          }
        `,
        variables: { id: this.client.id, name: this.name, email: this.email },
      });
    } else {
      // Mutation to create a new client
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

      // Rafraîchir la liste des clients après création
      this.$store.dispatch("fetchClients");
    }

    this.$emit("clientUpdated");
  }
}

export default toNative(ClientForm);
</script>

<style scoped></style>
