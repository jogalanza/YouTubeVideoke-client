<template>
  <q-card flat class="row justify-center main-board">
    <q-card class="col-11 inner-board">
      <q-card-section v-if="loading" class="q-pa-none" style="height: 4px">
        <q-linear-progress indeterminate />
      </q-card-section>
      <!-- <q-card-section class="q-pa-none">
        <slot name="title"></slot>
      </q-card-section> -->
      <slot></slot>
    </q-card>
  </q-card>
</template>

<style scoped>
</style>

<script>
import { watch } from "vue";
import { useMainStore } from "../../stores/main";
import { useQuasar } from "quasar";

export default {
  name: "MainBoard",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const store = useMainStore();
    const q = useQuasar();

    watch(
      props,
      () => {
        store.UpdateBoardTitle(props.title);
      },
      { deep: true, immediate: true }
    );
    return {
      q,
    };
  },
  methods: {},
  mounted() {},
};
</script>
