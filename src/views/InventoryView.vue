<template>
  <v-container>
    <v-row>
      <v-col cols="2" />
      <v-col cols="8">
        <h1>Inventory</h1>
      </v-col>
      <v-col cols="2">
        <router-link to="/character">
          <v-btn
            color="brown"
            icon
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </router-link>
      </v-col>
    </v-row>
    <h2>Bourse</h2>
    <v-row v-if="character.inventory">
      <v-col
        cols="3"
        class="title"
      >
        <strong>PC</strong>
      </v-col>
      <v-col
        cols="3"
        class="title"
      >
        <strong>PA</strong>
      </v-col>
      <v-col
        cols="3"
        class="title"
      >
        <strong>PO</strong>
      </v-col>
      <v-col
        cols="3"
        class="title"
      >
        <strong>PP</strong>
      </v-col>
    </v-row>
    <v-row v-if="character.inventory">
      <v-col
        cols="3"
        class="title"
      >
        <div
          v-if="!editableFields.pc"
          class="configurable"
          @dblclick="toggleEditable('pc')"
        >
          <strong>{{ character.inventory.bursary.pc }}</strong>
        </div>
        <v-text-field
          v-else
          v-model="character.inventory.bursary.pc"
          label="PC"
          outlined
          dense
          @blur="toggleEditable('pc')"
          @keyup.enter="toggleEditable('pc')"
        />
      </v-col>
      <v-col
        cols="3"
        class="title"
      >
        <div
          v-if="!editableFields.pa"
          class="configurable"
          @dblclick="toggleEditable('pa')"
        >
          <strong>{{ character.inventory.bursary.pa }}</strong>
        </div>
        <v-text-field
          v-else
          v-model="character.inventory.bursary.pa"
          label="PA"
          outlined
          dense
          @blur="toggleEditable('pa')"
          @keyup.enter="toggleEditable('pa')"
        />
      </v-col>
      <v-col
        cols="3"
        class="title"
      >
        <div
          v-if="!editableFields.po"
          class="configurable"
          @dblclick="toggleEditable('po')"
        >
          <strong>{{ character.inventory.bursary.po }}</strong>
        </div>
        <v-text-field
          v-else
          v-model="character.inventory.bursary.po"
          label="PO"
          outlined
          dense
          @blur="toggleEditable('po')"
          @keyup.enter="toggleEditable('po')"
        />
      </v-col>
      <v-col
        cols="3"
        class="title"
      >
        <div
          v-if="!editableFields.pp"
          class="configurable"
          @dblclick="toggleEditable('pp')"
        >
          <strong>{{ character.inventory.bursary.pp }}</strong>
        </div>
        <v-text-field
          v-else
          v-model="character.inventory.bursary.pp"
          label="PP"
          outlined
          dense
          @blur="toggleEditable('pp')"
          @keyup.enter="toggleEditable('pp')"
        />
      </v-col>
    </v-row>
    <v-spacer style="padding-bottom: 5%;" />

    <h2>Sur le personnage</h2>
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
          <tr
            v-for="(item, index) in character.inventory.on"
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
                <span>{{ item.description }}</span>
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
    <h2>Dans le sac</h2>
  </v-container>
</template>

<script>
import { ref, reactive } from 'vue';
import { useCharacterStore } from '@/stores/characterStore';

export default {
  name: "InventoryView",
  setup() {
    const characterStore = useCharacterStore();
    const { character } = characterStore;

    const editDialog = ref(false);
    const editableFields = reactive({
      pc: false,
      pa: false,
      po: false,
      pp: false
    });
    const selectedItem = reactive({
      name: '',
      price: '',
      weight: '',
      is_magic: false,
      desc: ''
    });

    function toggleEditable(field) {
      editableFields[field] = !editableFields[field];
    }

    function openEditDialog(item) {
      Object.assign(selectedItem, { ...item }); // Create a copy to avoid modifying directly
      editDialog.value = true;
    }

    function saveChanges() {
      const index = character.inventory.on.findIndex(i => i.id === selectedItem.id);
      if (index !== -1) {
        Object.assign(character.inventory.on[index], { ...selectedItem });
      } else {
        character.inventory.on.push({ ...selectedItem, id: character.inventory.on.length });
        console.log({ ...selectedItem, id: character.inventory.on.length })
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
      character,
      editDialog,
      editableFields,
      selectedItem,
      toggleEditable,
      saveChanges,
      openEditDialog,
      cancelEdit,
      resetSelectedItem
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
