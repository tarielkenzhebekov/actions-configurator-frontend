import vuetify from "./vuetify"
import router from "./router"
import pinia from "./pinia"


const registerPlugins = (app) => {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
}


export default registerPlugins