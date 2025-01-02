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
import {
  createClientMutation,
  updateClientMutation,
  updateCacheAfterCreate,
  updateCacheAfterUpdate,
} from "@/utils/apollo-client-utils";

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
    if (this.isEdit && this.client) {
      this.name = this.client.name;
      this.email = this.client.email;
    }
  }

  async submit() {
    if (this.isEdit) {
      await this.updateClient();
    } else {
      await this.createClient();
    }
    this.$emit("clientUpdated");
  }

  private async createClient() {
    await apolloClient.mutate({
      mutation: createClientMutation,
      variables: { name: this.name, email: this.email },
      update: (cache, { data: { createClient } }) =>
        updateCacheAfterCreate(cache, createClient),
    });
  }

  private async updateClient() {
    await apolloClient.mutate({
      mutation: updateClientMutation,
      variables: {
        id: this.client.id,
        name: this.name,
        email: this.email,
      },
      update: (cache, { data: { updateClient } }) =>
        updateCacheAfterUpdate(cache, updateClient),
    });
  }
}

export default toNative(ClientForm);
</script>

<style scoped></style>
