import { Store } from "vuex";
import { State } from "./store";

declare module "@vue/runtime-core" {
  // Déclare les types de l'état global
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
