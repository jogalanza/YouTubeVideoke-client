<template>
  <BoardLayout class="transactions">
    <q-card-section style="height: calc(100vh - 66px)">
      <q-card flat class="row justify-center" style="height: 100%">
        <q-card-section class="col-12 col-md-8" style="height: 100%">
          <q-card flat style="height: 100%">
            <q-card-section
              class="details q-pa-none"
              style="
                height: calc(100% - 84px);
                border-top-right-radius: 16px;
                border-top-left-radius: 16px;
              "
            >
              <q-table
                square
                flat
                :rows="items"
                :columns="columns"
                :visible-columns="visibleCols"
                virtual-scroll
                :rows-per-page-options="[10, 20, 50, 100]"
                v-model:pagination="pagination"
                @request="GetMaster"
                style="height: calc(100% - 16px); background: transparent"
                class="sticky-header sticky-row-header sticky-action-col"
              >
                <template v-slot:top>
                  <q-toolbar style="background: transparent">
                    <q-input
                      class="q-ml-sm"
                      rounded
                      dense
                      filled
                      placeholder="Search"
                      style="border-radius: 16px; height: 36px"
                      clearable
                    />
                    <q-space />
                    <q-btn
                      no-caps
                      label="Add New"
                      color="white"
                      text-color="app-blue"
                      rounded
                      class="q-mr-sm text-bold"
                      unelevated
                    />
                  </q-toolbar>
                </template>

                <template v-slot:item="props">
                  <q-card
                    class="q-ma-sm"
                    style="width: 100%; max-height: 100px"
                    @dblclick="ShowEditor(props)"
                  >
                    <q-list>
                      <q-item>
                        <q-item-section avatar> </q-item-section>
                        <q-item-section>
                          <q-item-label>{{
                            props.row.Description
                          }}</q-item-label>
                        </q-item-section>
                        <q-item-section side> </q-item-section>
                      </q-item>
                    </q-list>
                  </q-card>
                </template>

                <template v-slot:header-cell-action="props">
                  <q-th :props="props">
                    <q-btn icon="o_settings" flat round size="sm">
                      <q-popup-proxy>
                        <q-card>
                          <q-card-section class="q-pl-none">
                            <q-list dense>
                              <q-item
                                v-for="(c, i) in columns.filter(
                                  (e) =>
                                    e.label !== '' && e.label !== 'Employee'
                                )"
                                :key="i"
                                class="q-pa-none"
                                dense
                              >
                                <q-item-section avatar class="q-pr-none"
                                  ><q-toggle
                                    v-model="visibleCols"
                                    :val="c.name"
                                /></q-item-section>
                                <q-item-section>{{ c.label }}</q-item-section>
                              </q-item>
                            </q-list>
                          </q-card-section>
                        </q-card>
                      </q-popup-proxy>
                    </q-btn>
                  </q-th>
                </template>

                <template v-slot:body-cell-action="props">
                  <q-td
                    :props="props"
                    :style="props.col.style ? { ...props.col.style } : null"
                  >
                    <q-btn
                      dense
                      flat
                      round
                      color="app-blue"
                      dark
                      icon="o_edit"
                      @click.stop="ShowEditor(props)"
                      ><q-tooltip>Edit Information</q-tooltip></q-btn
                    >
                  </q-td>
                </template>
              </q-table>
            </q-card-section>
            <q-card-section class="summary">
              <div>Available Balance</div>
              <div class="text-h4">{{ formatCurrency(5000, 2) }}</div>
            </q-card-section>
          </q-card>
        </q-card-section>
      </q-card>
    </q-card-section>
  </BoardLayout>
</template>

<style lang="scss">
.transactions {
  .details {
    background: rgba(0, 0, 0, 0.1);
    background: #f5f5f5;
  }

  .summary {
    height: 100px;
    border-radius: 8px !important;
    margin-top: -16px;
    background: white;
    box-shadow: 0px -2px 10px rgb(0 0 0 / 30%);
  }

  .sticky-header {
    thead {
      tr {
        th {
          background: #f5f5f5;
        }
      }
    }
  }

  .sticky-row-header {
    thead {
      tr {
        th {
          &:first-child {
            background: #f5f5f5;
          }
        }
      }
    }

    tbody {
      tr {
        td {
          &:first-child {
            background: #f5f5f5;
          }
        }
      }
    }
  }

  .sticky-action-col {
    thead {
      tr {
        th {
          &:last-child {
            position: sticky;
            z-index: 5;
            right: 0px;
            background: #f5f5f5;
          }
        }
      }
    }

    tbody {
      tr {
        td {
          &:last-child {
            position: sticky;
            z-index: 2;
            right: 0px;
            background: #f5f5f5;
          }
        }
      }
    }
  }
}
</style>

<script>
import { defineAsyncComponent, defineComponent, ref } from "vue";
import { useGeneral } from "../composables/general";

export default defineComponent({
  name: "TransactionLogs",
  components: {
    BoardLayout: defineAsyncComponent(() =>
      import("../components/General/BoardLayout.vue")
    ),
  },
  setup() {
    const { formatNumber, formatCurrency } = useGeneral();
    const items = ref([
      {
        Date: new Date(),
        Debit: 100,
        Credit: null,
        Description: "test item",
      },
    ]);

    const visibleCols = ref([
      "Date",
      "ReceiptNo",
      "Debit",
      "Credit",
      "Account",
      "Description",
      "Amount",
      "action",
    ]);

    const columns = ref([
      {
        field: "Date",
        name: "Date",
        label: "Date",
        align: "left",
        width: "800px",
      },
      {
        field: "ReceiptNo",
        label: "Reference #",
        name: "ReceiptNo",
        minWidth: "150px",
        status: [1],
      },
      {
        field: "Debit",
        label: "Debit",
        name: "Debit",
        minWidth: "150px",
        status: [1],
      },
      {
        field: "Credit",
        label: "Credit",
        name: "Credit",
        minWidth: "150px",
        status: [1],
      },
      {
        field: "Account",
        label: "Account",
        name: "Account",
        minWidth: "150px",
        status: [1],
      },
      {
        field: "Description",
        name: "Description",
        label: "Description",
        minWidth: "150px",
        align: "left",
        status: [1],
      },
      {
        field: "Action",
        name: "action",
        label: "",
        style: { width: "60px" },
        status: [1],
      },
    ]);

    return {
      formatNumber,
      formatCurrency,
      items,
      visibleCols,
      columns,
    };
  },
});
</script>
