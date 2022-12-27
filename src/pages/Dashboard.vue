<template>
  <BoardLayout>
    <template v-slot:header>
      <!-- <q-toolbar>
        <q-toolbar-title>#HomeBudget</q-toolbar-title>
        <q-space />
        <q-btn label="Switch Workspace" no-caps unelevated text-color="green" />
      </q-toolbar> -->
    </template>

    <q-card-section style="height: 60px"></q-card-section>

    <q-card flat class="row justify-center">
      <q-card-section class="col-11 col-sm-10 col-md-6 q-pa-none">
        <q-card flat>
          <q-card-section
            class="column text-white"
            style="background: #297bfa; border-radius: 8px"
          >
            <div class="row justify-between">
              <div class="q-py-sm text-h4">#HomeBudget</div>
            </div>

            <q-separator color="white" class="q-my-sm" />
            <div class="q-py-sm">Available Balance</div>
            <div class="row justify-between">
              <div class="text-h4">{{ formatCurrency(5000, 2) }}</div>
              <q-btn
                color="white"
                label="New Transaction"
                text-color="app-blue"
                unelevated
                no-caps
                rounded
                padding="xs md"
              />
            </div>
          </q-card-section>

          <q-card-section
            class="row q-pa-none q-mt-md"
            style="margin-left: -8px; margin-right: -8px"
          >
            <div class="col-12 col-md-6">
              <q-card class="q-ma-sm">
                <q-card-section class="text-center text-h3 text-bold">
                  {{ formatCurrency(5000, 2) }}
                </q-card-section>
                <q-card-section
                  class="card-caption text-center text-grey text-h6"
                >
                  Balance
                </q-card-section>
              </q-card>
            </div>

            <div class="col-12 col-md-6">
              <q-card class="q-ma-sm">
                <q-card-section class="text-center text-h3 text-bold">
                  Php 5000
                </q-card-section>
                <q-card-section
                  class="card-caption text-center text-grey text-h6"
                >
                  Last Transaction
                </q-card-section>
              </q-card>
            </div>

            <div class="col-12 col-md-6">
              <q-card class="q-ma-sm">
                <q-card-section class="text-center text-h3 text-bold">
                  Php 5000
                </q-card-section>
                <q-card-section
                  class="card-caption text-center text-grey text-h6"
                >
                  Balance
                </q-card-section>
              </q-card>
            </div>

            <div class="col-12 col-md-6">
              <q-card class="q-ma-sm">
                <q-card-section class="text-center text-h3 text-bold">
                  Php 5000
                </q-card-section>
                <q-card-section
                  class="card-caption text-center text-grey text-h6"
                >
                  Balance
                </q-card-section>
              </q-card>
            </div>

            <div class="col-12 col-md-6">
              <q-card class="q-ma-sm">
                <q-card-section class="text-center text-h3 text-bold">
                  Php 5000
                </q-card-section>
                <q-card-section
                  class="card-caption text-center text-grey text-h6"
                >
                  Balance
                </q-card-section>
              </q-card>
            </div>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
  </BoardLayout>
</template>

<script>
import { defineAsyncComponent, defineComponent, onMounted } from "vue";
import { useGeneral } from "../composables/general";

export default defineComponent({
  name: "DashBoard",
  components: {
    BoardLayout: defineAsyncComponent(() =>
      import("../components/General/BoardLayout.vue")
    ),
  },
  setup() {
    const { formatNumber, formatCurrency } = useGeneral();

    onMounted(() => {
      console.warn("dashboard mounted");
    });
    return {
      formatNumber,
      formatCurrency,
    };
  },
});
</script>
