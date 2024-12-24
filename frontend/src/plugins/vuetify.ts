import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles"; // Importer les styles CSS de base de Vuetify
import colors from "vuetify/util/colors";
import "@mdi/font/css/materialdesignicons.css"; // Icônes Material Design

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#F9B12A",
          secondary: "#262626",
          ternary: "#64AADC",
          "primary-foreground": "#FFFFFF",
          background: "#F5F5F5",
          "on-primary": "#000000",
          filled: "#ECECEC",
          gradient: "#8693a0",
          green: "#5FC9B8",
          red: colors.red.darken1,
          orange: colors.orange.darken1,
          blue: colors.blue.darken1,
          blueGrey: colors.blueGrey.darken1,
          error: "#EC6D56",
          blue_custom: "#e9f1f9",
          yellow_custom: "#F00",
          dark_grey: "#EDEDED",
          light_grey: colors.grey.lighten1,
          tagFixeVariable: "#faeed5",
          tagGenericPurchase: "#d3e8e2",
          tagGenericSales: "#ffd4d4",
          tagFolder: "#e8d6cf",
          tagFree: "#d1e5f9",
          tagSubAccountableAccount: "#64AADC",
          tagLog: "#e1d5fa",
          new_red: "#EC6D56",
          calendar_red: "#fc5c65",
          calendar_green: "#20bf6b",
          calendar_yellow: "#F9B12A",
        },
      },
    },
  },
});

export default vuetify;
