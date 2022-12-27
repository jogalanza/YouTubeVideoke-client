<template>
  <BoardLayout>
    <q-card-section class="row">
      <div class="col-12">
        <q-card> Test </q-card>
      </div>
    </q-card-section>
  </BoardLayout>
</template>

<script>
import { defineAsyncComponent, defineComponent } from "vue";

export default defineComponent({
  name: "DashBoard",
  components: {
    BoardLayout: defineAsyncComponent(() =>
      import("../components/General/BoardLayout.vue")
    ),
  },
});
</script>
