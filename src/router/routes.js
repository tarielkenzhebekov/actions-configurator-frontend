const routes = [
  {
    path: "/",
    alias: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue")
  },
]


export default routes
