import api from "../api/index";
//import general from "../mixins/general";
import { defineStore } from "pinia";

export const useUser = defineStore("user", {
  state: () => ({
    activeUser: null,
    homefilter: { key: null },
    groupMenu: null,
    viewerMenu: [
      {
        label: "Dashboard",
        key: "HOME",
        always: null,
        langkey: "HOME",
        icon: "o_dashboard",
        link: "/dashboard",
        route: { path: "/dashboard" },
      },
      {
        label: "Transactions",
        key: "AR",
        icon: "o_web_stories",
        route: { name: "Transactions" },
        ignoreItems: true,
        link: "/main/transactions",
      },
      {
        label: "Workspaces",
        key: "AR",
        icon: "o_grid_3x3",
        route: { name: "Workspaces" },
        ignoreItems: true,
        link: "/workspaces",
      },
      {
        label: "Settings",
        key: "AR",
        icon: "o_settings",
        route: { name: "Settings" },
        ignoreItems: true,
        link: "/settings",
      },
      {
        label: "About",
        key: "AR",
        icon: "o_info",
        route: { name: "About" },
        ignoreItems: true,
        link: "/about",
      },
    ],
    genMenu: [
      // { label: "separator", icon: "", route: {name: 'Dashboard'} },
      {
        label: "Preferences",
        langkey: "PREF",
        icon: "r_style",
        route: { name: "Preferences" },
        link: "main/preferences",
      },
    ],
    sites: [],
    sbu: [
      { label: "Commercial", value: 1 },
      { label: "Defense & Aerospace", value: 2 },
    ],
    businessLine: [],
    productFamily: [
      { label: "Asslar", value: 1 },
      { label: "Boulder", value: 2 },
      { label: "Billerica", value: 3 },
      { label: "Montreal", value: 4 },
    ],
    functions: [
      { label: "Human Resources", value: 1 },
      { label: "General and Admin", value: 2 },
    ],
    dashboards: [],
    loadingDashboard: false,
  }),

  getters: {
    Sites: (state) => {
      return [...state.sites];
    },
    SBU: (state) => {
      return [...state.sbu];
    },
    BusinessLine: (state) => {
      return [...state.businessLine];
    },
    ProductFamily: (state) => {
      return [...state.productFamily];
    },
    Functions: (state) => {
      return [...state.functions];
    },
    Dashboards: (state) => {
      return [...state.dashboards];
    },
    Menu: (state) => {
      var r = [];
      var x = [...state.viewerMenu];
      //const { hasKey } = general();

      // if (state.groupMenu != null) {
      //   if (state.groupMenu.length > 0) {

      //   }
      // }

      for (var h = 0; h < state.viewerMenu.length; h++) {
        var e = { ...state.viewerMenu[h] };

        //console.warn(e);

        //if (hasKey(state.groupMenu, e.key) || e.always !== undefined) {
        var a = { ...e };
        if (a.items !== undefined) a.items = [];

        if (e.items !== undefined && e.items.length > 0) {
          for (var i = 0; i < e.items.length; i++) {
            // if (
            //   hasKey(state.groupMenu, e.items[i].key) ||
            //   e.items[i].always !== undefined
            // ) {
            var b = { ...e.items[i] };
            a.items.push(b);
            //}
          }
        }

        r.push(a);
        //}
      }

      //override default
      x = [...r];

      //x.push(...state.genMenu);
      return x;
    },
    ManageMenu: (state) => {
      var x = [];

      for (var h = 0; h < state.viewerMenu.length; h++) {
        var e = { ...state.viewerMenu[h] };

        if (e.key !== undefined && e.always === undefined) {
          var a = { ...e };
          if (a.items !== undefined) a.items = [];

          if (e.items !== undefined && e.items.length > 0) {
            for (var i = 0; i < e.items.length; i++) {
              if (
                e.items[i].key !== undefined &&
                e.items[i].always === undefined
              ) {
                var b = { ...e.items[i] };
                a.items.push(b);
              }
            }
          }

          x.push(a);
        }
      }

      return x;
    },
    GroupMenu: (state) => {
      return state.groupMenu;
    },
    ActiveUser: (state) => {
      if (state.activeUser === null) return { Name: "Loading user ..." };
      return state.activeUser;
    },
    IsAdmin: (state) => {
      if (state.activeUser !== null && state.activeUser.AccessRoleID === 1)
        return true;
      return false;
    },
    Role: (state) => {
      console.warn("USER", state, state.activeUser);
      if (
        state.activeUser !== null &&
        state.activeUser.AccessRoleID !== undefined
      )
        return state.activeUser.AccessRoleID;
      return -1;
    },
    HomeFilter: (state) => {
      return state.homefilter;
    },
    LoadingDashboard: (state) => {
      return state.loadingDashboard;
    },
  },

  actions: {
    async SetUser(payload) {
      if (payload === null) {
        this.activeUser = null;
      } else {
        var _this = this;
        this.activeUser = { ...payload };

        await api.GroupAccess_Menu(payload.GID).then((response) => {
          _this.groupMenu = [...response.data.payload];
        });
      }
    },
    GetCurrentUser() {
      var _this = this;
      return new Promise((resolve, reject) => {
        api
          .GetCurrentUser()
          .then((response) => {
            if (response.data) {
              _this.activeUser = { ...response.data };
              _this.GetUserAccessMenu();
            }

            resolve(response.data);
          })
          .catch(() => {
            reject(null);
          });
      });
    },
    GetUserAccessMenu() {
      var _this = this;
      return new Promise((resolve, reject) => {
        api
          .GetUserAccessMenu(_this.activeUser.ID)
          .then((response) => {
            _this.groupMenu = [...response.data];
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    },
    GetUserDashboards() {
      return new Promise((resolve, reject) => {
        if (this.activeUser) {
          var _this = this;
          this.loadingDashboard = true;
          api
            .GetUserHomeItems(this.activeUser.ID, this.homefilter)
            .then((response) => {
              _this.loadingDashboard = false;
              _this.dashboards = [...response.data];
              resolve();
            })
            .catch(() => {
              _this.loadingDashboard = false;
              reject();
            });
        } else {
          resolve();
        }
      });
    },
    GetUserSites() {
      if (this.activeUser) {
        var _this = this;
        api.GetUserSites(this.activeUser.ID).then((response) => {
          _this.sites = [...response.data];
        });
      }
    },
    GetUserProducts() {
      if (this.activeUser) {
        var _this = this;
        api.GetUserProducts(this.activeUser.ID).then((response) => {
          _this.businessLine = [...response.data];
        });
      }
    },
    SyncHomeFilter(payload) {
      //if (this.homefilter.label !== payload.label) {
      this.homefilter = { ...payload };
      this.GetUserDashboards();
      //}
    },
  },
});
