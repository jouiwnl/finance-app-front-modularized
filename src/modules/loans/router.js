const Module = () => import("./Module.vue");
const Home = () => import("./views/Home.vue");
const Loan = () => import("./views/Loan.vue");

const moduleRoute = {
  path: "/loans",
  component: Module,
  children: [
    {
      path: "/",
      component: Home
    },

    {
      path: ":id",
      component: Loan
    }
  ]
};

export default router => {
  router.addRoutes([moduleRoute]);
};
