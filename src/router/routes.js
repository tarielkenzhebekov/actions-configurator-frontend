const routes = [
  {
    path: "/",
    alias: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue")
  },
  {
    path: "/actions",
    name: "actions",
    component: () => import("@/views/ActionsView.vue")
  }
]


export default routes
