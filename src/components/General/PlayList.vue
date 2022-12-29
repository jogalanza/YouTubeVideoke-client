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
      <q-toolbar-title>Next Song</q-toolbar-title>
    </q-toolbar>
    <q-card-section style="height: calc(100% - 68px)">
      <q-virtual-scroll
        v-if="mainStore.Playlist.length > 0"
        :items="mainStore.Playlist"
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
              icon="o_close"
              unelevated
              color="red"
              @click="mainStore.RemoveFromPlaylist(index)"
            >
              <q-tooltip>Remove</q-tooltip>
            </q-btn>
          </q-item-section>
        </q-item>
      </q-virtual-scroll>
      <div class="text-center text-h6" v-else>No more songs on queue</div>
    </q-card-section>
  </q-card>
</template>

<script>
import { computed, defineComponent, inject, onMounted, ref, watch } from "vue";
import { useMainStore } from "../../stores/main";

export default defineComponent({
  name: "PlayList",
  emits: ["close"],
  setup(props, context) {
    const key = ref("AIzaSyBam3KaApHnQwkQK8YlxdSGqCjSEL2omLo");
    const mainStore = useMainStore();
    const query = ref(null);
    const api = inject("axios");
    const items = ref([]);
    const loading = ref(false);

    const uri = computed(() => {
      if (!query.value) {
        return `https://www.googleapis.com/youtube/v3/search?key=${key.value}&type=video&part=snippet&maxResults=50&q=videoke+latest+songs+with+lyrics`;
      }
      return `https://www.googleapis.com/youtube/v3/search?key=${key.value}&type=video&part=snippet&maxResults=50&q=${query.value}`;
    });

    watch(query, () => {
      Search();
    });

    const Search = () => {
      loading.value = true;
      api
        .get(uri.value)
        .then((response) => {
          console.warn(response);
          loading.value = false;
          items.value = [...response.data.items];
        })
        .catch(() => {
          loading.value = false;
        });
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
