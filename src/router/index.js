import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Product from "../views/Product.vue";
import DashBoard from "../layouts/DashBoard.vue";
import categoryRoutes from "../views/category/category-route";

const routes = [
  {
    path: "/",
    name: "DashBoard",
    component: DashBoard,
    meta: { requireAuth: true },
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
      },
      {
        path: "about",
        name: "About",
        component: About,
      },
      {
        path: "product", // แสดงใน url
        name: "Product",
        component: Product,
      },
      ...categoryRoutes, // ES6 spread
    ],
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: "active", // active menu ที่เรากด linkExactActiveClass เป็นของ Vue และ class active ของ bootstrap หากเราทำเอง ก็เอา ชื่อ class ที่แสดง active มาแทน
});

router.beforeEach((to, from, next) => {
  // check ว่ามี route ไหนบ้างที่ต้องการ token ( requireAuth )
  if (to.matched.some((record) => record.meta.requireAuth)) {
    const token = localStorage.getItem("token");

    if (!token) {
      // หน้าไหนต้องการ requireAuth ให้ไปที่ login ก่อน
      next("/login");
    } else {
      next();
    }
  } else {
    // หน้าไหนไม่มี requrieAuth ให้เข้าได้เลย
    next();
  }
});

export default router;
