<template>
  <div class="d-flex flex-column shop-view-container">
    <div class="table-container">
      <ShopTable
        v-if="shoptab"
        :datajson="shop_tables[shoptab]"
      />
    </div>
    <div class="tabs-container">
      <v-tabs
        v-model="tab"
        class="tabs"
      >
        <v-tab
          v-for="key in Object.keys(shop_tables)"
          :key="key"
          class="tab"
          @click="changeView(key)"
        >
          {{ key }}
        </v-tab>
      </v-tabs>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import ShopTable from "../components/ShopTable.vue";

const shop_tables = require("@/assets/tables/shop.json");

export default {
  components: {
    ShopTable,
  },
  setup() {
    const shoptab = ref("Armes");
    const tab = ref('Armes');

    function changeView(key) {
      console.log("Clicked: ", key);
      shoptab.value = key;
    }

    return {
      shop_tables,
      shoptab,
      tab,
      changeView
    }
  },
}
</script>

<style>
.shop-view-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.table-container {
  flex: 1;
  overflow-y: auto;
}

.tabs-container {
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  position: fixed;
  bottom: 0;
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
}

.tabs {
  padding: 2px;
  display: inline-flex;
  flex-wrap: nowrap;
  min-width: max-content;
}

.tab {
  margin: 0 5px;
  color: #333;
  font-weight: bold;
  white-space: nowrap;
}

.tab:hover {
  background-color: #e0e0e0;
}
</style>