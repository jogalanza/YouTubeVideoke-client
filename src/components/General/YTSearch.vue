<template>
  <q-card style="height: 100vh">
    <q-toolbar style="height: 68px">
      <q-btn
        icon="o_arrow_back"
        flat
        round
        class="q-mr-md"
        @click="context.emit('close')"
      />
      <q-input
        v-model="query"
        dense
        filled
        rounded
        placeholder="YouTube search..."
        clearable
        :debounce="1000"
        style="width: 100%"
        :loading="loading"
        :disable="loading"
      ></q-input>
    </q-toolbar>
    <q-card-section style="height: calc(100% - 68px)">
      <q-virtual-scroll
        :items="items"
        separator
        v-slot="{ item, index }"
        style="height: 100%"
      >
        <q-item :key="index" dense class="q-px-none">
          <q-item-section avatar>
            <!-- <q-img
              :src="item.snippet.thumbnails.medium.url"
              :width="item.snippet.thumbnails.medium.width"
              :height="item.snippet.thumbnails.medium.height"
              style="width: 140px"
            ></q-img> -->

            <q-img :src="item.video.thumbnail_src" style="width: 140px"></q-img>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              #{{ index + 1 }} - {{ item.video.title }}
            </q-item-label>
            <q-item-label caption>{{ item.uploader.username }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn
              round
              icon="o_playlist_add"
              unelevated
              color="green"
              @click="mainStore.AddToPlaylist(item)"
            >
              <q-tooltip>Add to Queue</q-tooltip>
            </q-btn>
          </q-item-section>
        </q-item>
      </q-virtual-scroll>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, inject, onMounted, ref, watch } from "vue";
import { useMainStore } from "../../stores/main";
//import { useYoutubeScrape } from "../../mixins/youtube-scrape";
import axios from "axios";

export default defineComponent({
  name: "YTSearch",
  emits: ["close"],
  setup(props, context) {
    //const key = ref("AIzaSyBam3KaApHnQwkQK8YlxdSGqCjSEL2omLo");
    const mainStore = useMainStore();
    const query = ref(null);
    const api = inject("axios");
    const items = ref([]);
    const loading = ref(false);
    //const { youtube } = useYoutubeScrape();

    // const uri = computed(() => {
    //   if (!query.value) {
    //     return `https://www.googleapis.com/youtube/v3/search?key=${key.value}&type=video&part=snippet&maxResults=20&q=videoke+latest+songs+with+lyrics`;
    //   }
    //   return `https://www.googleapis.com/youtube/v3/search?key=${key.value}&type=video&part=snippet&maxResults=20&q=${query.value}`;
    // });

    watch(query, () => {
      Search();
    });

    const Search = async () => {
      loading.value = true;
      axios
        .get(
          `https://jogalanza.com/yts/api/search/?q=${
            query.value || "videoke+latest+songs+with+lyrics"
          }`
        )
        .then((response) => {
          loading.value = false;
          items.value = [...response.data.results];
        })
        .catch(() => {
          loading.value = false;
        });

      // loading.value = true;
      // await youtube(query.value || "videoke+latest+songs+with+lyrics")
      //   .then((response) => {
      //     console.warn("serach", response, response.results);
      //     loading.value = false;
      //     items.value = [...response.results];
      //   })
      //   .catch(() => {
      //     loading.value = false;
      //   });

      // loading.value = true;
      // api
      //   .get(uri.value)
      //   .then((response) => {
      //     console.warn(response);
      //     loading.value = false;
      //     items.value = [...response.data.items];
      //   })
      //   .catch(() => {
      //     loading.value = false;
      //   });
    };

    onMounted(() => {
      Search();
    });

    return {
      context,
      mainStore,
      loading,
      items,
      query,
    };
  },
});
</script>
