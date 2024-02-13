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
  },
  {
    path: "/statistics",
    name: "statistics",
    component: () => import("@/views/StatisticsView.vue")
  },
]


export default routes
