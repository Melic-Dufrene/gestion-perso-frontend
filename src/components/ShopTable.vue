<template>
  <v-table>
    <thead>
      <!-- <tr>
                <th v-for="header in Object.keys(datajson[0])" :key="header"> {{ header }}
                </th>

            </tr> -->
    </thead>
    <tbody>
      <tr
        v-for="item in datajson"
        :key="item.name"
      >
        <td
          v-for="key in Object.keys(item)"
          :key="item.name + key"
        >
          {{ item[key] }}
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  props: {
    datajson: {
      type: Array,
      required: true
    }
  },

  mounted: function () {
    console.log("Shoptable:",this.datajson);
  }
}
</script>

<style>
tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, .05);
}
</style>
