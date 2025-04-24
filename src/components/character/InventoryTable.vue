<template>
  <v-container>
    <v-table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prix</th>
          <th>Poids</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="props.items.length > 0">
          <tr
            v-for="(item, index) in props.items"
            :key="index"
            :class="{ 'purple-background': item.is_magic }"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.weight }}</td>
            <td>
              <v-tooltip
                v-if="item.desc"
                bottom
              >
                <template #activator="{ props }">
                  <v-icon
                    v-bind="props"
                    class="ml-2"
                  >
                    mdi-information
                  </v-icon>
                </template>
                <span>{{ item.desc }}</span>
              </v-tooltip>
              <v-icon
                class="ml-2"
                @click="openEditDialog(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                class="ml-2"
                @click="character.inventory.on.splice(index, 1)"
              >
                mdi-close
              </v-icon>
            </td>
          </tr>
        </template>
        <tr>
          <td />
          <td />
          <td />
          <td>
            <v-icon
              class="ml-2"
              @click="openEditDialog({})"
            >
              mdi-plus
            </v-icon>
          </td>
        </tr>
      </tbody>
    </v-table>

    <v-dialog
      v-model="editDialog"
      max-width="500px"
    >
      <v-card>
        <v-card-title>Edit Item</v-card-title>
        <v-card-text>
          <v-form ref="editForm">
            <v-text-field
              v-model="selectedItem.name"
              label="Nom"
              required
            />
            <v-row>
              <v-col cols="4">
                <v-text-field
                  v-model="selectedItem.price"
                  label="Prix"
                />
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="selectedItem.weight"
                  label="Poids"
                />
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-model="selectedItem.is_magic"
                  label="Magique"
                />
              </v-col>
            </v-row>
            <v-textarea
              v-model="selectedItem.desc"
              label="Description"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            @click="cancelEdit"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            @click="saveChanges"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>import { ref, reactive, defineProps } from 'vue';

export default {
  name: "InventoryTable",
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const editDialog = ref(false);

    const selectedItem = reactive({
      name: '',
      price: '',
      weight: '',
      is_magic: false,
      desc: ''
    });

    function openEditDialog(item) {
      Object.assign(selectedItem, { ...item }); // Create a copy to avoid modifying directly
      editDialog.value = true;
    }

    function saveChanges() {
      const index = this.props.items.findIndex(i => i.id === selectedItem.id);
      if (index !== -1) {
        Object.assign(this.props.items[index], { ...selectedItem });
      } else {
        this.props.items.push({ ...selectedItem, id: this.props.items.length });
      }
      editDialog.value = false;
      resetSelectedItem();
    }

    function cancelEdit() {
      editDialog.value = false;
      resetSelectedItem();
    }

    function resetSelectedItem() {
      selectedItem.name = '';
      selectedItem.price = '';
      selectedItem.weight = '';
      selectedItem.is_magic = false;
      selectedItem.desc = '';
    }

    return {
      editDialog,
      selectedItem,
      saveChanges,
      openEditDialog,
      cancelEdit,
      resetSelectedItem,
    };
  }
};
</script>

<style scoped>
.purple-background {
  background-color: rgb(185, 72, 185);
  color: white;
}

.class {
  text-align: center;
}

h1 {
  text-align: center;
  padding-bottom: 2%;
}
</style>