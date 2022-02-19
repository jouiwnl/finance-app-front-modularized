const Module = () => import("./Module.vue");
const Home = () => import("./views/Home.vue");
const Email = () => import("./views/Email.vue");

const moduleRoute = {
  path: "/emails",
  component: Module,
  children: [
    {
      path: "/",
      component: Home
    },

    {
      path: ":id",
      component: Email
    }
  ]
};

export default router => {
  router.addRoutes([moduleRoute]);
};
