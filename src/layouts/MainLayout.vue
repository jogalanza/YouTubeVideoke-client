<template>
  <q-layout
    :class="`app-main-layout ${mobileView ? 'mobile-view' : ''}`"
    view="hHr lpR fFr"
    style="background: #0e0c0c"
  >
    <!-- lHh Lpr lFf -->
    <q-header class="app-header dark q-py-sm">
      <q-toolbar>
        <!-- <q-btn
          v-if="q.screen.width < 1014"
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="r_menu"
          size="md"
          class="toggle-main-drawer"
          color="white"
        /> -->

        <q-toolbar-title class="app-title" style="overflow: inherit">
          <!-- <q-img
            :src="require('@/assets/excelitas_logo.png')"
            fit="fill"
            width="144px"
            height="25px"
            style="min-width: 144px; margin-top: 4px"
          /> -->
          <!-- <q-icon
            name="o_account_balance_wallet"
            size="lg"
            color="white"
            class="q-mr-sm"
          /> -->
          <span class="text-white" style="font-size: 1.4em; line-height: 1.5em"
            >VideokeTube</span
          >
        </q-toolbar-title>
        <q-space v-if="mobileView" />

        <!-- <q-btn
          color="white"
          round
          flat
          icon="r_tune"
          size="md"
          class="app-btn q-ml-sm"
          @click="ShowRightDrawerItem(3)"
        >
          <q-tooltip>Filter Dashboard</q-tooltip>
        </q-btn>
        <q-btn
          color="white"
          round
          flat
          icon="r_comment"
          size="md"
          class="app-btn q-ml-sm"
          @click="ShowRightDrawerItem(1)"
        >
          <q-tooltip>Comments</q-tooltip>
        </q-btn> -->
        <q-btn
          round
          flat
          icon="o_skip_next"
          size="md"
          class="app-btn"
          @click="mainStore.PlayNext"
          color="white"
        >
          <q-tooltip>Play Next</q-tooltip>
        </q-btn>

        <q-btn
          round
          flat
          icon="o_search"
          size="md"
          class="app-btn"
          @click="ShowRightDrawerItem(1)"
          color="white"
        >
          <q-tooltip>Search</q-tooltip>
        </q-btn>
        <q-btn
          round
          flat
          icon="o_queue_music"
          size="md"
          class="app-btn"
          @click="ShowRightDrawerItem(2)"
          color="white"
        >
          <q-tooltip>Song Queue</q-tooltip>
        </q-btn>

        <!-- <q-btn
          v-if="!mobileView"
          round
          flat
          icon="o_brightness_medium"
          size="md"
          class="app-btn"
          @click="SwitchTheme"
          color="white"
        >
          <q-tooltip>Switch Theme</q-tooltip>
        </q-btn> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :mini="true"
      class="app-drawer"
      v-if="false"
    >
      <q-list
        class="q-px-none q-pt-sm"
        style="
          height: calc(100vh - 155px);
          overflow-y: auto;
          overflow-x: hidden;
        "
      >
        <template v-for="(m, i) in locUserMenu" :key="i">
          <q-expansion-item
            :id="`drawermenuitem${i}`"
            v-if="
              m.label !== 'separator' &&
              (m.userItem !== undefined ||
                (m.hasHeader === undefined &&
                  m.items !== undefined &&
                  m.ignoreItems === undefined))
            "
            group="menu"
            :key="`${i}-ei`"
            :default-opened="m.opened !== undefined ? m.opened : false"
            :icon="m.icon !== '' ? m.icon : 'r_settings'"
            :label="GetLocaleString(m.langkey, m.label)"
            header-class="sticky-menu-header"
            @mouseenter="m.showMenu = true"
            @mouseleave="m.showMenu = false"
            :class="{
              active:
                m.link === undefined
                  ? false
                  : (route.path.indexOf(m.link) > -1 &&
                      miniState &&
                      m.link !== '/') ||
                    (m.link === '/' && route.path === m.link && miniState),
            }"
          >
            <!--  -->
            <q-menu
              v-model="m.showMenu"
              v-show="miniState"
              v-if="miniState"
              auto-close
              @mouseenter="m.showMenu = true"
              @mouseleave="m.showMenu = false"
              touch-position
              :target="`#drawermenuitem${i}`"
              anchor="top right"
              self="top left"
              style="
                background: transparent;
                padding: 8px;
                padding-top: 0px;
                box-shadow: none;
              "
            >
              <q-card class="drawer-pop-menu">
                <q-card-section class="q-pa-sm">
                  <template v-for="(n, o) in m.items">
                    <q-item-label
                      v-if="n.isHeader !== undefined"
                      :key="o"
                      header
                      style="padding-left: 26px; line-height: 2px !important"
                      >{{ GetLocaleString(n.langkey, n.label) }}</q-item-label
                    >
                    <q-item
                      v-else
                      :key="`${o}-e`"
                      dense
                      clickable
                      style="padding-left: 26px"
                      class="drawer-item"
                      :active="
                        n.link !== undefined
                          ? route.path.indexOf(n.link) > -1 && n.link !== '/'
                          : false
                      "
                      @click="
                        n.action !== undefined
                          ? handleAction(n.action)
                          : navigateTo({ ...n.route })
                      "
                    >
                      <q-item-section
                        avatar
                        style="width: 32px; min-width: 32px"
                      >
                        <q-icon
                          size="16px"
                          :name="
                            n.icon !== '' && n.icon !== undefined
                              ? n.icon
                              : 'r_settings'
                          "
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{
                          GetLocaleString(n.langkey, n.label)
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-card-section>
              </q-card>
            </q-menu>

            <q-card style="background-color: transparent">
              <q-card-section style="padding: 0px">
                <q-list>
                  <template v-for="(n, o) in m.items">
                    <q-item-label
                      v-if="n.isHeader !== undefined && miniState"
                      :key="o"
                      header
                      style="padding-left: 26px; line-height: 2px !important"
                      >{{ GetLocaleString(n.langkey, n.label) }}</q-item-label
                    >
                    <q-item
                      v-else-if="!n.isHeader"
                      :key="`${o}-qe`"
                      clickable
                      style="padding-left: 26px"
                      class="drawer-item"
                      :active="
                        n.link !== undefined
                          ? route.path.indexOf(n.link) > -1 &&
                            !miniState &&
                            n.link !== '/'
                          : false
                      "
                      :to="n.link"
                    >
                      <!-- @click="
                        n.action !== undefined
                          ? handleAction(n.action)
                          : navigateTo({ ...n.route })
                      " -->
                      <q-item-section
                        avatar
                        style="width: 32px; min-width: 32px"
                      >
                        <q-icon
                          size="16px"
                          :name="
                            n.icon !== '' && n.icon !== undefined
                              ? n.icon
                              : 'r_settings'
                          "
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{
                          GetLocaleString(n.langkey, n.label)
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-list>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-item
            v-else-if="
              m.label !== 'separator' &&
              (m.items === undefined || m.ignoreItems)
            "
            :key="`${i}-we`"
            clickable
            @click="navigateTo({ ...m.route })"
            :class="{
              'drawer-item': true,
              active:
                m.link === undefined
                  ? false
                  : (route.path.indexOf(m.link) > -1 && m.link !== '/') ||
                    (m.link === '/' && route.path === m.link),
              'mini-active':
                m.link === undefined
                  ? false
                  : (route.path.indexOf(m.link) > -1 &&
                      miniState &&
                      m.link !== '/') ||
                    (route.path === m.link && m.link === '/' && miniState),
            }"
          >
            <q-item-section avatar>
              <q-icon :name="m.icon !== '' ? m.icon : 'r_settings'" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{
                GetLocaleString(m.langkey, m.label)
              }}</q-item-label>
            </q-item-section>

            <!-- <q-tooltip
              v-show="miniState && q.screen.width >= 1014"
              v-if="miniState && q.screen.width >= 1014"
              anchor="center right"
              self="center left"
              >{{ GetLocaleString(m.langkey, m.label) }}</q-tooltip
            > -->
          </q-item>

          <q-separator v-else :key="`${o}-ee`" />
        </template>
      </q-list>
    </q-drawer>

    <q-drawer
      v-model="rightDrawerOpen"
      :breakpoint="0"
      :width="q.screen.width < 450 ? q.screen.width : 450"
      class="app-drawer-right"
      side="right"
      behavior="desktop"
    >
      <keep-alive>
        <YTSearch
          v-if="rightDrawerItem === 1"
          @close="rightDrawerOpen = false"
        />
      </keep-alive>

      <keep-alive>
        <PlayList
          v-if="rightDrawerItem === 2"
          @close="rightDrawerOpen = false"
        />
      </keep-alive>
    </q-drawer>

    <q-page-container
      :class="{ 'app-container': true, mobile: mobileView }"
      style="position: fixed; top: 0px; right: 0px; left: 0px"
    >
      <router-view></router-view>
    </q-page-container>

    <q-dialog
      v-model="mainStore.Installable"
      seamless
      :position="mobileView ? 'bottom' : 'bottom'"
    >
      <q-card class="bg-primary">
        <q-card-section class="row">
          <div style="line-height: 36px; color: white">Install this app?</div>
          <q-space />
          <q-btn
            label="Dismiss"
            flat
            @click="dismissInstall"
            text-color="white"
            no-caps
          />
          <q-btn
            label="Install"
            color="green"
            @click="installPWA"
            text-color="white"
            unelevated
            no-caps
          />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="mainStore.hasNewUpdates"
      seamless
      :position="mobileView ? 'top' : 'bottom'"
    >
      <q-card class="bg-red">
        <q-card-section class="row">
          <div style="line-height: 36px; color: white">
            A new version of this app is now available. Please refresh the app.
          </div>
          <q-space />
          <q-btn
            label="Dismiss"
            flat
            text-color="white"
            @click="mainStore.SetHasNewUpdates(false)"
            no-caps
          />
          <q-btn
            label="Refresh"
            text-color="green"
            flat
            @click="RefreshApp"
            unelevated
            no-caps
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<style lang="scss">
.app-container {
  &.mobile {
    bottom: 60px;
    padding-bottom: 20px !important;
    height: inherit;
  }
}
.bottom-menu {
  .q-dialog__backdrop {
    margin-bottom: 70px;
  }
  .q-dialog__inner {
    top: 130px;
    // bottom: 70px;
  }
}
.q-expansion-item--standard {
  &.active {
    .sticky-menu-header {
      // background: rgba(94,94,94, 0.3);
      // border-radius: 32px;
      color: var(--q-positive);
    }
  }
}
.footer-menu {
  .q-tab__icon {
    margin-top: -8px;
  }
}
</style>

<script>
import {
  ref,
  computed,
  onMounted,
  watch,
  provide,
  inject,
  onBeforeUnmount,
  defineAsyncComponent,
} from "vue";
import { useQuasar, Cookies } from "quasar";

import { useRoute } from "vue-router";
import api from "../api/index";
//import { useNotifs } from "@/stores/notifs";
import { useUser } from "../stores/user";
import { useMainStore } from "../stores/main";
import { useGeneral } from "src/composables/general";

export default {
  name: "LayoutDefault",
  components: {
    // MessageDialog: defineAsyncComponent(() =>
    //   import("../components/General/MessageDialog.vue")
    // ),
    YTSearch: defineAsyncComponent(() =>
      import("../components/General/YTSearch.vue")
    ),
    PlayList: defineAsyncComponent(() =>
      import("../components/General/PlayList.vue")
    ),
  },
  setup() {
    const eventBus = inject("eventBus");
    const GetLocaleString = inject("GetLocaleString");

    const q = useQuasar();
    const route = useRoute();
    const { navigateTo, UseLightTheme, toggleDarkMode } = useGeneral();
    //const notifs = useNotifs();
    const user = useUser();
    const mainStore = useMainStore();
    //const options = useOptions();

    const mobileWidth = ref(600);

    //Vars
    const offlineNotif = ref(null);
    const miniState = ref(true);
    const tab = ref("confirm");
    const rightDrawerOpen = ref(false);
    const locUserMenu = ref([]);
    const rightDrawerItem = ref(1);
    //Computed
    const scrWidth = computed(() => q.screen.width);
    const mobileView = computed(() => {
      var x = q.screen.width < mobileWidth.value;
      if (user.ActiveUser && user.ActiveUser.MobileViewOnly) x = true;
      //x = true; //remove later
      return x;
    });
    const darkMode = computed(() => {
      return q.dark;
      //return !UseLightTheme(); // q.dark;
    });

    const userMenu = computed(() => user.Menu);

    const footerDialog = ref(false);

    const connectionCheck = ref(null);

    provide("mobileWidth", mobileWidth);
    provide("mobileView", mobileView);
    provide("darkMode", darkMode);

    //Watchers
    watch(tab, () => {
      if (tab.value !== "menu") footerDialog.value = false;
    });

    // watch(miniState, () => {
    //   window.localStorage.setItem(
    //     "finxminimenu",
    //     miniState.value ? "1" : "0"
    //   );
    // });

    watch(
      () => userMenu.value,
      () => {
        locUserMenu.value = [...userMenu.value];
      },
      { deep: true, immediate: true }
    );

    watch(rightDrawerItem, () => {
      if (rightDrawerItem.value !== 2)
        window.localStorage.setItem(
          "finxRightDrawerItem",
          rightDrawerItem.value
        );
    });

    //Methods

    const CheckAuth = () => {
      return;
      if (q.cookies.has("_finxiu")) {
        navigateTo({ name: "RequestAccess" });
      } else {
        user.GetCurrentUser().then(() => {
          user.GetUserDashboards();
          user.GetUserSites();
          user.GetUserProducts();
        });
      }
    };

    const SwitchTheme = () => {
      toggleDarkMode();
      q.dark.set(!UseLightTheme());
    };

    const handleAction = (data) => {
      if (data.name === "Logout") {
        user.SetUser(null);
        q.cookies.remove("_finx_auth");
        q.cookies.remove("_pdcs_oss");
        navigateTo({ name: "Login" });
        api.UserLogout();
      } else if (data.name === "ToggleDarkMode") {
        SwitchTheme();
      }
    };

    const installPWA = () => {
      if (mainStore.InstallPrompt) {
        mainStore.InstallPrompt.prompt();
        mainStore.SetInstallable(false);
      }
    };

    const dismissInstall = () => {
      mainStore.SetInstallable(false);
      q.cookies.set("install-finx-pwa", null, { expires: 15 });
    };

    const RefreshApp = () => {
      mainStore.SetHasNewUpdates(false);
      if (!mainStore.appNewUpdates || !mainStore.appNewUpdates.waiting) return;
      mainStore.appNewUpdates.waiting.postMessage({ type: "SKIP_WAITING" });
    };

    const ShowRightDrawerItem = (_index) => {
      rightDrawerItem.value = _index;
      rightDrawerOpen.value = true;
    };

    onMounted(async () => {
      console.warn(route);

      //set theme
      // eventBus.$on("hub-update-user", EvalUserUpdate);
      // eventBus.$on("ws-update-user", user.GetCurrentUser);

      var x = false; // UseLightTheme();
      q.dark.set(!x);
    });

    onBeforeUnmount(() => {
      // eventBus.$off("hub-update-user", EvalUserUpdate);
      // eventBus.$off("ws-update-user", user.GetCurrentUser);

      clearInterval(connectionCheck);
    });

    return {
      //Vars
      q,
      rightDrawerOpen,
      leftDrawerOpen: ref(false),
      footerDialog,
      tab,
      route,
      offlineNotif,
      //notifs,
      mobileWidth,
      locUserMenu,
      rightDrawerItem,

      //Computed
      mobileView,
      user,
      mainStore,
      miniState,
      scrWidth,
      darkMode,

      //Methods
      navigateTo,
      handleAction,
      installPWA,
      dismissInstall,
      SwitchTheme,
      GetLocaleString,
      RefreshApp,
      CheckAuth,
      ShowRightDrawerItem,
    };
  },
};
</script>
