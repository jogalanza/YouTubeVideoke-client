import api from "../api/lookup";
import mainApi from "../api/index";
import { defineStore } from "pinia";

export const useOptions = defineStore("options", {
  state: () => ({
    sites: [],
    products: [],
    dashboards: [],
    dbgroup: [],
    //hardcoded
    //harcoded
    salesTrendAccts: ["Sales Total", "Trade Sales", "Intercompany Sales"],
    fiscalYears: [],
  }),

  getters: {
    Sites: (state) => {
      return [...state.sites];
    },
    Products: (state) => {
      return [...state.products];
    },
    Dashboards: (state) => {
      return [...state.dashboards];
    },
    DBGroup: (state) => {
      return [...state.dbgroup];
    },
    Plant(state) {
      if (state.plant === null) return [{ label: "Loading...", value: -1 }];
      return [...state.plant];
    },
    SalesTrendAccts: (state) => {
      return [...state.salesTrendAccts];
    },
    FiscalYears: (state) => {
      return [...state.fiscalYears];
    },
  },

  actions: {
    LoadOptions() {
      this.GetSites();
      this.GetProducts();
      this.GetDashboards();
      this.GetDBGroup();
      this.GetFiscalYears();
    },
    GetSites() {
      return new Promise((resolve) => {
        api
          .GetSites()
          .then((response) => {
            this.sites = [...response.data];
            resolve();
          })
          .catch(() => {
            resolve();
          });
      });
    },
    GetProducts() {
      return new Promise((resolve) => {
        api
          .GetProducts()
          .then((response) => {
            this.products = [...response.data];
            resolve();
          })
          .catch(() => {
            resolve();
          });
      });
    },
    GetDashboards() {
      return new Promise((resolve) => {
        api
          .GetDashboards()
          .then((response) => {
            this.dashboards = [...response.data];
            resolve();
          })
          .catch(() => {
            resolve();
          });
      });
    },
    GetDBGroup() {
      return new Promise((resolve) => {
        mainApi
          .DBGroupGetAll()
          .then((response) => {
            this.dbgroup = [...response.data.payload.data];
            this.dbgroup.unshift({ value: 0, label: "Ungrouped" });
            resolve();
          })
          .catch(() => {
            resolve();
          });
      });
    },
    GetFiscalYears() {
      return new Promise((resolve) => {
        mainApi
          .FiscalYearsGetAll()
          .then((response) => {
            this.fiscalYears = [...response.data];
            resolve();
          })
          .catch(() => {
            resolve();
          });
      });
    },
  },
});
