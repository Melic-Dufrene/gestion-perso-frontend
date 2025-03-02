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
            <v-icon>
              mdi-account
            </v-icon>
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
        <strong>{{ character.inventory.bursary.pc }}</strong>
      </v-col>
      <v-col
        cols="3"
        class="title"
      >
        <strong>{{ character.inventory.bursary.pa }}</strong>
      </v-col>
      <v-col
        cols="3"
        class="title"
      >
        <strong>{{ character.inventory.bursary.po }}</strong>
      </v-col>
      <v-col
        cols="3"
        class="title"
      >
        <strong>{{ character.inventory.bursary.pp }}</strong>
      </v-col>
    </v-row>
    <v-spacer style="padding-bottom: 5%;" />

    <h2>Sur le personnage</h2>
    <v-container>
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.id"
        >
          <v-list-item-title>
            {{ item.name }}
            <v-tooltip right>
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
          </v-list-item-title>
          <v-list-item-action>
            <v-btn
              icon
              @click="openEditDialog(item)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-dialog
        v-model="editDialog"
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            Edit Item
          </v-card-title>
          <v-card-text>
            <v-form ref="editForm">
              <v-text-field
                v-model="selectedItem.name"
                label="Name"
                required
              />
              <v-text-field
                v-model="selectedItem.field1"
                label="Field 1"
              />
              <v-text-field
                v-model="selectedItem.field2"
                label="Field 2"
              />
              <v-text-field
                v-model="selectedItem.field3"
                label="Field 3"
              />
              <v-text-field
                v-model="selectedItem.field4"
                label="Field 4"
              />
              <v-text-field
                v-model="selectedItem.field5"
                label="Field 5"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              @click="editDialog = false"
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
    <v-container>
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.id"
        >
          <v-list-item-title>
            {{ item.name }}
            <v-tooltip bottom>
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
          </v-list-item-title>
          <v-list-item-action>
            <v-btn
              icon
              @click="openEditDialog(item)"
            >
              <v-icon>
                mdi-pencil
              </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-dialog
        v-model="editDialog"
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            Edit Item
          </v-card-title>
          <v-card-text>
            <v-form ref="editForm">
              <v-text-field
                v-model="selectedItem.name"
                label="Name"
                required
              />
              <v-text-field
                v-model="selectedItem.field1"
                label="Field 1"
              />
              <v-text-field
                v-model="selectedItem.field2"
                label="Field 2"
              />
              <v-text-field
                v-model="selectedItem.field3"
                label="Field 3"
              />
              <v-text-field
                v-model="selectedItem.field4"
                label="Field 4"
              />
              <v-text-field
                v-model="selectedItem.field5"
                label="Field 5"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              @click="editDialog = false"
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
  </v-container>
</template>


<script>
import { ref } from 'vue';
import {
  useCharacterStore
} from '@/stores/characterStore';

export default {
  name: "InventorView",
  setup() {
    const characterStore = useCharacterStore();
    const {
      character,
      //getCharacter,
      //updateCharacter
    } = characterStore;
    const items = [
      { id: 1, name: 'Item 1', description: 'Detailed info about Item 1', field1: '', field2: '', field3: '', field4: '', field5: '' },
      { id: 2, name: 'Item 2', description: 'Detailed info about Item 2', field1: '', field2: '', field3: '', field4: '', field5: '' }
    ];

    let editDialog = ref(false);

    function openEditDialog(item) {
      this.selectedItem = { ...item }; // Create a copy to avoid modifying directly
      this.editDialog = true;
    }

    function saveChanges() {
      const index = this.items.findIndex(i => i.id === this.selectedItem.id);
      if (index !== -1) {
        this.items[index] = { ...this.selectedItem };
      }
      this.editDialog = false;
    }

    return {
      character,
      items,
      editDialog,
      saveChanges,
      openEditDialog
    };
  }
};
</script>


<style scoped>
.purple-border {
  border: 2px solid purple;
}

.class {
  text-align: center;
}

h1 {
  text-align: center;
  padding-bottom: 2%;
}
</style>
