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
  {
    path: "/users",
    name: "users",
    component: () => import("@/views/UsersView.vue")
  },
  {
    path: "/reports",
    name: "reports",
    component: () => import("@/views/ReportsView.vue")
  },
]


export default routes
