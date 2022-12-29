const routes = [
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
    path: "/",
    name: "Main",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("pages/Dashboard.vue"),
      },
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
