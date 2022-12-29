<template>
  <BoardLayout class="main-player">
    <template v-slot:header>
      <!-- <q-toolbar>
        <q-toolbar-title>#HomeBudget</q-toolbar-title>
        <q-space />
        <q-btn label="Switch Workspace" no-caps unelevated text-color="green" />
      </q-toolbar> -->
    </template>

    <q-card-section
      v-if="videoId !== null"
      class="q-pa-none"
      style="height: calc(100vh)"
    >
      <YouTube
        class="youtube-player"
        ref="player"
        width="100%"
        height="100%"
        :src="uri"
        @readystatechange="PlayVideo"
        @ready="PlayVideo"
        @state-change="StateChanged"
      ></YouTube>
    </q-card-section>
    <q-card-section
      v-else
      class="q-pa-none column justify-center"
      style="height: calc(100vh)"
    >
      <div class="text-center text-h4">Please select a song</div>
      <div class="text-center text-h6 text-grey">
        Find the song you wish to sing using the search feature
      </div>
    </q-card-section>
  </BoardLayout>
</template>

<style lang="scss">
.main-player {
  margin-top: -66px;
  max-height: calc(100vh + 66px);
  height: calc(100vh + 16px);

  .youtube-player {
    height: 100%;
  }
}
</style>

<script>
import {
  computed,
  defineAsyncComponent,
  defineComponent,
  onMounted,
  ref,
  watch,
} from "vue";
import { useGeneral } from "../composables/general";
import { useMainStore } from "src/stores/main";
import YouTube from "vue3-youtube";

export default defineComponent({
  name: "DashBoard",
  components: {
    BoardLayout: defineAsyncComponent(() =>
      import("../components/General/BoardLayout.vue")
    ),
    YouTube,
  },
  setup() {
    const mainStore = useMainStore();
    const player = ref(null);
    const videoId = ref(null);
    const { formatNumber, formatCurrency } = useGeneral();

    const uri = computed(() => {
      if (videoId.value === null) return null;
      return `https://www.youtube.com/watch?v=${videoId.value}`;
    });

    watch(
      () => mainStore.ActiveVideo,
      (newVal) => {
        console.warn("watch activevideo", newVal);
        videoId.value = newVal;
      }
    );

    watch(
      () => mainStore.Playlist,
      (newVal) => {
        if (newVal.length > 0 && videoId.value === null) {
          mainStore.PlayNext();
        }
      }
    );

    const PlayVideo = () => {
      if (player.value) {
        player.value.playVideo();
      }
    };

    const StateChanged = (p) => {
      console.warn("video ended", p);
      if (p.data === 0 && mainStore.Playlist.length > 0) {
        //TODO: load next song
        mainStore.PlayNext();
      }
    };

    const PlayNext = () => {
      mainStore.PlayNext();
    };

    watch(
      () => player.value,
      (newVal) => {
        console.warn("watch player", player.value);
        if (newVal) {
          console.warn("watch player 2", player.value);
          player.value.playVideo();
          //player.value.addEventListener("onStateChange", StateChanged);
        }
      },
      { deep: true }
    );

    onMounted(() => {
      console.warn("dashboard mounted", player.value);
    });
    return {
      videoId,
      uri,
      mainStore,
      player,
      PlayVideo,
      PlayNext,
      StateChanged,
      formatNumber,
      formatCurrency,
    };
  },
});
</script>
