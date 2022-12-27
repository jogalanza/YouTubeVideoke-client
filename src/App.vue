<template>
  <router-view></router-view>
</template>

<script>
import {
  inject,
  onBeforeUnmount,
  onMounted,
  provide,
  watch,
  ref,
  computed,
  nextTick,
} from "vue";
import { useQuasar, Cookies } from "quasar";
import { useUser } from "./stores/user";
import { useMainStore } from "./stores/main";
import { useRoute, useRouter } from "vue-router";
import { useOptions } from "./stores/options";
import { useNotifs } from "./stores/notifs";
import { useGeneral } from "./composables/general";

export default {
  name: "App",
  created() {
    window.addEventListener("beforeinstallprompt", this.beforeInstall);
    window.addEventListener("appinstalled", this.appInstalled);
    window.addEventListener("appnewupdates", this.updateAvailable, {
      once: true,
    });

    //console.warn("APP", navigator.serviceWorker);

    // Prevent multiple refreshes
    if (navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (this.refreshing) return;
        this.refreshing = true;
        // Here the actual reload of the page occurs
        window.location.reload();
      });
    }
  },
  setup() {
    const q = useQuasar();
    const user = useUser();
    const options = useOptions();
    const route = useRoute();
    const router = useRouter();
    const { navigateTo, hasKey, NotifyUser } = useGeneral();
    const eventBus = inject("eventBus");
    const mainStore = useMainStore();
    const notifs = useNotifs();
    const HubSend = inject("HubSend");
    const refreshing = ref(false);
    const hubRegistered = ref(false);
    const hubConnected = ref(false);
    const hubConnectionInfo = ref({});
    const sessionUpdate = ref(null);

    const HubConnected = computed(() => hubConnected.value);

    watch(
      () => user.GroupMenu,
      (newVal) => {
        if (newVal !== null && route.meta.key !== undefined) {
          if (!hasKey(user.GroupMenu, route.meta.key)) {
            //console.warn("App group check", user.GroupMenu, route.meta.key);
            navigateTo({ name: "Unauthorized" });
          }
        }
      }
    );

    watch(
      () => user.ActiveUser,
      (newVal) => {
        if (newVal.ID !== undefined) {
          RegisterToHub();
        }
      },
      { deep: true }
    );

    const GetLocaleString = (key, _default) => {
      return _default;
      // if (!key) return _default;
      // if (locale.Repo === null || locale.Repo === undefined) return _default;
      // if (locale.Repo[key] === undefined) return _default;
      // if (locale.Repo[key] === null) return _default;
      // return locale.Repo[key];
    };

    const IsMenuOK = (key) => {
      if (user.GroupMenu === null) return false;
      return hasKey(user.GroupMenu, key);
    };

    const beforeInstall = (e) => {
      e.preventDefault();
      var x = q.cookies.get("install-finx-pwa");
      if (!x) {
        mainStore.SetInstallPrompt(e);
        mainStore.SetInstallable(true);
      }
    };

    const appInstalled = () => {
      mainStore.SetInstallPrompt(null);
      mainStore.SetInstallable(false);
    };

    const updateAvailable = (e) => {
      console.warn("updateAvailable", e);
      mainStore.SetAppUpdate(e.detail);
    };

    provide("GetLocaleString", GetLocaleString);
    provide("IsMenuOK", IsMenuOK);
    provide("HubConnected", HubConnected);
    provide("navigateTo", navigateTo);

    const HubConnectOK = (data) => {
      hubConnected.value = true;
      hubConnectionInfo.value = data;
      nextTick(() => {
        RegisterToHub();
      });
    };

    const RegisterToHub = () => {
      if (
        !hubRegistered.value &&
        hubConnected.value &&
        user.ActiveUser.ID !== undefined
      ) {
        var r = {
          id: user.ActiveUser.ID,
          connection: hubConnectionInfo.value,
        };
        HubSend({
          method: "register-user",
          payload: JSON.stringify(r),
        });
        hubRegistered.value = true;
        UpdateHubSession();
      }
    };

    const HandleNewNotifs = (_data) => {
      var data = JSON.parse(_data);
      if (!data.noCache) notifs.AddItem(data);
      if (data.showNotif) {
        var x =
          data.message.length > 100
            ? `${data.message.substring(0, 100)}...`
            : data.message;
        NotifyUser({ success: true, message: x }, undefined, {
          icon: data.icon,
          position: "bottom-left",
          type: data.type,
          multiLine: true,
        });
      }
    };

    const UpdateHubSession = () => {
      if (hubConnected.value && user.ActiveUser.ID !== undefined) {
        HubSend({
          method: "update-hub-session",
          payload: user.ActiveUser.ID,
        });
      }
    };

    const HandleAppSessionInfo = (_info) => {
      mainStore.SyncAppSessionInfo(_info);
    };

    const UpdateDashboardList = () => {
      options.GetDashboards();
      user.GetUserDashboards();
    };

    const InitDashboardFilter = () => {
      console.warn("InitDashboardFilter", mainStore.DashboardFilter);
      var x = { ...mainStore.DashboardFilter };
      if (x.Year === null) {
        x.Year = new Date().getFullYear();
      }

      mainStore.SyncDashboardFilter(x);
    };

    onMounted(() => {
      //options.LoadOptions();
      InitDashboardFilter();

      eventBus.$on("hub-connected", HubConnectOK);
      eventBus.$on("hub-app-notif", HandleNewNotifs);
      eventBus.$on("hub-update-dashboards", UpdateDashboardList);
      eventBus.$on("hub-session-users", HandleAppSessionInfo);

      window.onbeforeunload = function () {
        try {
          SetDashboardOut();
        } catch {
          //
        }
      };

      sessionUpdate.value = setInterval(() => {
        UpdateHubSession();
      }, (window.finx && window.finx.sessionInterval !== undefined ? window.finx.sessionInterval : 60) * 1000);

      var x = window.localStorage.getItem("finx_locale");

      const value = Cookies.get("_finxrdr");
      var y = window.localStorage.getItem("finx_last");
      if (value) {
        Cookies.remove("_finxrdr");
        console.warn("Parse redirect object", value, value.route, value.query);
        try {
          router.replace({ name: value.route, query: { ...value.query } });
        } catch {
          navigateTo({ name: "Home" });
        }
      } else if (y && ["RequestAccess", "Unauthorized"].indexOf(y) === -1) {
        navigateTo({ name: y });
      } else {
        navigateTo({ name: "Home" });
      }
    });

    onBeforeUnmount(() => {
      eventBus.$off("hub-connected", HubConnectOK);
      eventBus.$off("hub-app-notif", HandleNewNotifs);
      eventBus.$off("hub-update-dashboards", UpdateDashboardList);
      eventBus.$off("hub-session-users", HandleAppSessionInfo);
      clearInterval(sessionUpdate.value);
    });

    return {
      beforeInstall,
      appInstalled,
      updateAvailable,
      refreshing,
      HubConnected,
    };
  },
};
</script>
