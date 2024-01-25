import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/actions",
    name: "actions",
    component: () => import("@/views/actions/index.vue")
  },
  {
    path: "/statistics",
    name: "statistics",
    component: () => import("@/views/statistics/index.vue")
  },
  {
    path: "/subscribers",
    name: "subscribers",
    component: () => import("@/views/subscribers/index.vue")
  },
  {
    path: "/users",
    name: "users",
    component: () => import("@/views/users/index.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue")
  },
  {
    path: '/edit-user/:userId',
    name: 'edit-user',
    component: () => import("@/views/users/components/EditUserForm.vue"),
  },
  {
    path: '/add-user',
    name: 'add-user',
    component: () => import("@/views/users/components/AddUserForm.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
