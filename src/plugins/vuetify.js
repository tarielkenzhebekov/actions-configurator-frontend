import { createVuetify } from "vuetify";


import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

import { aliases, mdi } from "vuetify/iconsets/mdi" 

import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import 'vuetify/dist/vuetify.min.css'


const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  components,
  directives,
})


export default vuetify