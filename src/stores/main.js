// import { createStore } from "vuex";
// import user from "./module/user";
// import options from "./module/options";
// import locale from "./module/locale";
import api from "../api/index";
import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => ({
    boardTitle: "",
    darkMode: 0,
    installable: false,
    installPrompt: null,
    connectionInfo: null,
    wsConnected: false,
    wsName: null,
    appNewUpdates: null,
    hasNewUpdates: false,
    //custom
    playlist: [],
    activeVideo: null,
  }),

  getters: {
    ActiveVideo: (state) => {
      return state.activeVideo;
    },
    Playlist: (state) => {
      return [...state.playlist];
    },
    getAppName: () => {
      return "App Name";
    },
    BoardTitle: (state) => {
      return state.boardTitle;
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
  },

  actions: {
    AddToPlaylist(payload) {
      this.playlist.push({ ...payload });
      console.warn(this.playlist);
    },
    RemoveFromPlaylist(payload) {
      this.playlist.splice(payload, 1);
    },
    PlayNext() {
      console.warn("playnext", this, this.playlist);
      try {
        var x = this.playlist.splice(0, 1);
        this.activeVideo = x[0].id.videoId;
        console.warn("playnext2", this.activeVideo);
      } catch {
        this.activeVideo = null;
      }

      // return new Promise((resolve) => {
      //   try {

      //     resolve(x[0].id.videoId);
      //   } catch {
      //     _this.activeVideo = null;
      //     resolve(null);
      //   }
      // });
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
