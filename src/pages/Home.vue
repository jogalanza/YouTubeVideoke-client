<template>
  <BoardLayout class="home-page">
    <template v-slot:header>
      <q-toolbar class="q-pa-md">
        <q-toolbar-title class="text-bold text-h4 clip"
          >#PettyCash</q-toolbar-title
        >
        <q-space />
        <q-btn
          label="Sign Up"
          class="q-mr-sm"
          no-caps
          flat
          unelevated
          text-color="white"
          rounded
          padding="sm lg"
        />
        <q-btn
          label="Login"
          no-caps
          unelevated
          color="white"
          text-color="app-blue"
          style="font-weight: bold"
          rounded
          padding="sm lg"
        />
      </q-toolbar>
    </template>

    <q-card-section class="section-1 q-pa-none text-center">
      <div style="height: 150px"></div>
      <div class="heading text-h3 text-bold">Where did my money go?</div>
      <div class="heading text-h7 text-grey-3">
        Track your cash flow with ease on-the-go
      </div>
      <q-btn
        label="Try it now!"
        class="q-mt-lg"
        no-caps
        unelevated
        color="white"
        text-color="app-blue"
        rounded
        padding="sm lg"
        to="/dashboard"
      />
    </q-card-section>

    <q-card-section class="section-footer row justify-between">
      <div class="text-grey-5" style="line-height: 2.5em">
        Copyright &copy; 2022 PettyCash. All Rights Reserved.
      </div>
      <div class="text-grey-5">
        <q-btn
          label="Privacy Policy"
          flat
          padding="xs md"
          rounded
          no-caps
          class="q-mr-md"
          to="privacy-policy"
        />

        <q-btn
          label="Terms and Conditions"
          flat
          padding="xs md"
          rounded
          no-caps
          to="terms-and-conditions"
        />
      </div>
    </q-card-section>
  </BoardLayout>
</template>

<style lang="scss">
.home-page {
  padding: 0px;
  height: 100vh;
  max-height: 100vh;

  .q-toolbar {
    background: #297bfa !important;
    color: white !important;
  }

  .section-1 {
    background: #297bfa;
    color: white;
    height: calc(100vh - 72px);
  }
}
</style>

<script>
import { defineAsyncComponent, defineComponent, inject } from "vue";
import { useGeneral } from "../composables/general";

export default defineComponent({
  name: "HomePage",
  components: {
    BoardLayout: defineAsyncComponent(() =>
      import("../components/General/BoardLayout.vue")
    ),
  },
  setup() {
    const { formatNumber, formatCurrency, navigateTo } = useGeneral();
    return {
      formatNumber,
      formatCurrency,
      navigateTo,
    };
  },
});
</script>
