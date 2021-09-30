import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/compat/app";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: { auth: true, filtered: true },
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/auth",
    name: "Auth",
    meta: { auth: false },
    component: () => import("../views/Auth.vue"),
  },
  {
    path: "/create",
    name: "Create",
    meta: { auth: true, filtered: true },
    component: () => import("../views/Create.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: { auth: false },
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/detail/:id",
    name: "Detail",
    meta: { auth: true },
    component: () => import("../views/Detail.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiredAuth = to.matched.some((record) => record.meta.auth);
  if (requiredAuth && !currentUser) {
    next("/auth?message=noUser");
  } else next();
});

export default router;
