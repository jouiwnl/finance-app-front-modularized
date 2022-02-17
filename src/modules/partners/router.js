const Module = () => import("./Module.vue");
const Home = () => import("./views/Home.vue");
const Partner = () => import("./views/Partner.vue");

const moduleRoute = {
  path: "/partners",
  component: Module,
  children: [
    {
      path: "/",
      component: Home
    },

    {
      path: ":id",
      component: Partner
    }
  ]
};

export default router => {
  router.addRoutes([moduleRoute]);
};
