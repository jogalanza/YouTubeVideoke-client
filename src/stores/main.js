// import { createStore } from "vuex";
// import user from "./module/user";
// import options from "./module/options";
// import locale from "./module/locale";
import api from "../api/index";
import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => ({
    boardTitle: "",
    SAPAutoPostIntervals: [
      { label: "10 minutes", value: 10 },
      { label: "15 minutes (default)", value: 15 },
      { label: "30 minutes", value: 30 },
      { label: "45 minutes", value: 45 },
      { label: "1 hour", value: 60 },
    ],
    darkMode: 0,
    installable: false,
    installPrompt: null,
    connectionInfo: null,
    wsConnected: false,
    wsName: null,
    appNewUpdates: null,
    hasNewUpdates: false,
    currentPeriod: null,

    partners: [],
    partnerEmails: [],

    //dashboard
    dashboardFilter: {
      Year: null,
      Month: null,
      Site: [],
      SBU: [],
      BusinessLine: [],
      ProductFamily: [],
      Function: [],
    },
    activeDashboard: {},
    activeBoards: [],
    //Users and Roles
    activeRole: {},
    snapshot: {
      Enabled: false,
      Month: 1,
      Year: 0,
    },
    snapshotYears: [],
    snapshotMonths: [],
    appSessionInfo: {
      Users: 0,
      Sessions: 0,
    },
    serverResources: {
      CPU: "N/A",
      RAM: "N/A",
    },
  }),

  getters: {
    ActiveDashboard: (state) => {
      return { ...state.activeDashboard };
    },
    ActiveBoards: (state) => {
      return { ...state.activeBoards };
    },
    DashboardFilter: (state) => {
      return state.dashboardFilter;
    },
    getAppName: () => {
      return "App Name";
    },
    BoardTitle: (state) => {
      return state.boardTitle;
    },
    Years() {
      var currentYear = new Date().getFullYear(),
        years = [currentYear - 1, currentYear, currentYear + 1];
      // var startYear = 2020;
      // while (startYear <= currentYear) {
      //   years.push(startYear++);
      // }
      return years; //.reverse();
    },
    SnapshotYears: (state) => {
      return [...state.snapshotYears];
    },
    SelectYears: (state) => {
      var currentYear = new Date().getFullYear();
      var years = [currentYear - 1, currentYear, currentYear + 1];

      if (state.snapshot.Enabled) {
        years = [
          state.snapshot.Year - 1,
          state.snapshot.Year,
          state.snapshot.Year + 1,
        ];
      }
      // var startYear = 2020;
      // while (startYear <= currentYear) {
      //   years.push(startYear++);
      // }
      return years; //.reverse();
    },
    Months() {
      return [
        { label: "January", value: 1 },
        { label: "February", value: 2 },
        { label: "March", value: 3 },
        { label: "April", value: 4 },
        { label: "May", value: 5 },
        { label: "June", value: 6 },
        { label: "July", value: 7 },
        { label: "August", value: 8 },
        { label: "September", value: 9 },
        { label: "October", value: 10 },
        { label: "November", value: 11 },
        { label: "December", value: 12 },
      ];
    },
    Weeks() {
      var weeks = [];
      var seed = 1;
      while (seed <= 53) {
        weeks.push(seed);
        seed++;
      }
      return weeks;
    },
    Quarters() {
      var weeks = [];
      var seed = 1;
      while (seed <= 53) {
        weeks.push(seed);
        seed++;
      }
      return [
        { label: "Q1", value: 1 },
        { label: "Q2", value: 2 },
        { label: "Q3", value: 3 },
        { label: "Q4", value: 4 },
      ];
    },
    Snapshot: (state) => {
      return { ...state.snapshot };
    },
    AppSessionInfo(state) {
      return { ...state.appSessionInfo };
    },
    ServerResources(state) {
      return { ...state.serverResources };
    },
    DarkMode(state) {
      return state.darkMode == 1;
    },
    Installable(state) {
      return state.installable;
    },
    InstallPrompt(state) {
      return state.installPrompt;
    },
    ConnectionInfo(state) {
      return state.connectionInfo;
    },
    CurrentPeriod(state) {
      return state.currentPeriod;
    },
  },

  actions: {
    SetActiveDashboard(payload) {
      return new Promise((resolve) => {
        this.activeDashboard = { ...payload };
        resolve();
      });
    },
    SyncDashboardFilter(payload) {
      return new Promise((resolve) => {
        this.dashboardFilter = { ...payload };
        resolve();
      });
    },
    AddActiveBoard(payload) {
      return new Promise((resolve) => {
        this.activeBoards.push({ ...payload });
        resolve();
      });
    },
    GetSnapshotYears() {
      return new Promise((resolve, reject) => {
        api
          .SnapshotYears()
          .then((response) => {
            this.snapshotYears = [...response.data];
            if (this.snapshot.Year === 0 && this.snapshotYears.length > 0) {
              this.snapshot.Year = this.snapshotYears[0];
            }
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    },
    GetSnapshotMonths() {
      return new Promise((resolve, reject) => {
        api
          .SnapshotYears()
          .then((response) => {
            this.snapshotYears = [...response.data];
            if (this.snapshot.Year === 0 && this.snapshotYears.length > 0) {
              this.snapshot.Year = this.snapshotYears[0];
            }
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    },
    SyncSnapshot(payload) {
      this.snapshot = { ...payload };
    },
    SyncAppSessionInfo(payload) {
      this.appSessionInfo = { ...payload };
    },
    SyncServerResources(payload) {
      this.serverResources = { ...payload };
    },
    UpdateBoardTitle(payload) {
      this.boardTitle = payload;
    },
    UpdateDarkMode(payload) {
      this.darkMode = payload;
      window.localStorage.setItem("darkMode", payload);
    },
    SetInstallPrompt(payload) {
      this.installPrompt = payload;
    },
    SetInstallable(payload) {
      this.installable = payload;
    },
    GetCurrentPeriod() {
      api.GetCurrentPeriod().then((response) => {
        if (response.data === null) {
          this.currentPeriod = null;
        } else {
          this.currentPeriod = { ...response.data };
          this.currentPeriod.Quarter = Math.ceil(this.currentPeriod.Month / 3);
        }
      });
    },
    UpdateSocketStatus(data) {
      this.wsConnected = data;
      if (!data) this.wsName = null;
    },
    UpdateSocketName(data) {
      this.wsName = data;
    },
    SetAppUpdate(data) {
      this.appNewUpdates = data;
      this.hasNewUpdates = true;
    },
    SetHasNewUpdates(data) {
      this.hasNewUpdates = data;
    },
    SetActiveRole(data) {
      this.activeRole = { ...data };
    },
  },
});
