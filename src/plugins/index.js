import vuetify from "./vuetify"
import router from "./router"
import pinia from "./pinia"
import axiosInstance from "./axios"


const registerPlugins = (app) => {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(axiosInstance)
}


export default registerPlugins