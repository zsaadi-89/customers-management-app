/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

import { Router, RouteLocationNormalizedLoaded } from 'vue-router';

declare module '@vue/runtime-core' {
  // Étendre les propriétés globales pour Vue
  interface ComponentCustomProperties {
    $router: Router; // Adding $router
    $route: RouteLocationNormalizedLoaded; // Adding $route (active route)
  }
}
