const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("pages/Home.vue"),
  },
  {
    path: "/terms-and-conditions",
    name: "TermsConditions",
    component: () => import("pages/TermsConditions.vue"),
  },
  {
    path: "/privacy-policy",
    name: "PrivacyPolicy",
    component: () => import("pages/PrivacyPolicy.vue"),
  },

  {
    path: "/main",
    name: "Main",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("pages/Dashboard.vue"),
      },
      {
        path: "/transactions",
        name: "Transactions",
        component: () => import("pages/Transactions.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
