const Module = () => import("./Module.vue");
const Home = () => import("./views/Home.vue");
const Loan = () => import("./views/Loan.vue");
const LoanReport = () => import("./views/LoanReport.vue");

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
    },

    {
      path: ":id/report",
      component: LoanReport
    }

  ]
};

export default router => {
  router.addRoutes([moduleRoute]);
};
