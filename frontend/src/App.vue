<template>
  <v-app>
    <v-app-bar elevated>
      <v-toolbar color="grey-lighten-3" title="Gestion des clients">
        <v-btn variant="tonal" stacked>
          <v-icon icon="mdi-logout"></v-icon>

          Déconnexion
        </v-btn>
      </v-toolbar>
    </v-app-bar>
    <v-navigation-drawer color="primary">
      <!--<v-list-item
        title="Gestion des Clients"
        subtitle="Vuetify app"
      ></v-list-item>
      <v-divider></v-divider>-->
      <v-list-item
        link
        :to="{ name: 'home' }"
        title="Mes clients"
        active-class="custom-menu-active"
      >
      </v-list-item>
      <v-list-item
        link
        title="Mes collaborateurs"
        active-class="custom-menu-active"
      ></v-list-item>
      <v-list-item
        link
        title="Paramètres"
        active-class="custom-menu-active"
      ></v-list-item>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";

@Component
export class App extends Vue {}

export default toNative(App);
</script>

<style lang="scss">
.custom-menu-active {
  border-right: 5px solid black !important;
  .v-list-item-title {
    font-weight: bold;
  }
}
.v-data-table thead th {
  font-weight: bold !important;
}
</style>
