import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import CalculatePayoff from '../views/CalculatePayoff.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },

  {
    path: "/calculatePayoff/:id",
    name: "CalculatePayoff",
    component: CalculatePayoff
  }
];

const router = new VueRouter({
  routes
});

export default router;
