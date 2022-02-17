const Module = () => import("./Module.vue");
const Home = () => import("./views/Home.vue");

const moduleRoute = {
  path: "/finder",
  component: Module,
  children: [
    {
      path: "/",
      component: Home
    }
  ]
};

export default router => {
  router.addRoutes([moduleRoute]);
};
