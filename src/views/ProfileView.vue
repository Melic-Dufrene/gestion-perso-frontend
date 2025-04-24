<template>
  <v-container>
    <v-row>
      <h1>
        Bienvenue {{ user.username }}
      </h1>
    </v-row>
    <v-row>
      <v-col
        v-for="(item, index) in char_list"
        :key="index"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card>
          <v-card-title>
            {{ item.campaign }}
          </v-card-title>
          <v-card-text>
            <h3>
              {{ item.name }}
            </h3>
            {{ item.profession }}
          </v-card-text>
          <v-card-actions>
            <v-btn
              v-if="character && character._id === item._id"
              color="blue"
              @click="openEditDialog(item)"
            >
              Modifier
            </v-btn>
            <v-btn
              v-else
              color="primary"
              @click="selectCharacter(item)"
            >
              Choisir
            </v-btn>
            <v-btn
              color="red"
              @click="openDeleteDialog(item)"
            >
              Supprimer
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <v-card>
          <v-card-title>
            Nouveau personnage
          </v-card-title>
          <v-card-actions>
            <v-btn
              color="primary"
              @click="createCharacter"
            >
              Créer
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Confirmation Dialog -->
    <v-dialog
      v-model="deleteDialog"
      max-width="500px"
    >
      <v-card>
        <v-card-title>Confirmer la suppression</v-card-title>
        <v-card-text>
          Êtes-vous sûr de vouloir supprimer ce personnage ?
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            @click="deleteDialog = false"
          >
            Annuler
          </v-btn>
          <v-btn
            color="red"
            @click="deleteChar"
          >
            Supprimer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit Dialog -->
    <v-dialog
      v-model="editDialog"
      max-width="500px"
    >
      <v-card>
        <v-card-title>Modifier le personnage</v-card-title>
        <v-card-text>
          <v-form ref="editForm">
            <v-text-field
              v-model="editedCharacter.name"
              label="Nom"
              required
            />
            <v-text-field
              v-model="editedCharacter.campaign"
              label="Campagne"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            @click="editDialog = false"
          >
            Annuler
          </v-btn>
          <v-btn
            color="blue"
            @click="saveChanges"
          >
            Enregistrer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useUserStore } from "@/stores/userStore";
import { useCharacterStore } from "@/stores/characterStore";

export default {
  name: 'ProfileView',
  setup() {
    const userStore = useUserStore();
    const {
      getCharacters,
      getUserInfos,
      char_list,
      user
    } = userStore;
    const characterStore = useCharacterStore();
    const {
      character,
      getCharacter,
      updateCharacter,
      newCharacter,
      deleteCharacter,
      setCurrentCharacter
    } = characterStore;

    const deleteDialog = ref(false);
    const editDialog = ref(false);
    const characterToDelete = ref(null);
    const editedCharacter = ref({});

    async function initChars() {
      await getCharacters();
      if (char_list.length > 0) {
        selectCharacter(char_list[0])
      }
    }
    onMounted(async () => {
      await getUserInfos();
      await initChars();
    });

    async function createCharacter() {
      await newCharacter();
      await initChars();
    }

    function openDeleteDialog(item) {
      characterToDelete.value = item;
      deleteDialog.value = true;
    }

    async function deleteChar() {
      if (characterToDelete.value) {
        await deleteCharacter(characterToDelete.value._id);
        await getCharacters(); // Refresh the character list
        deleteDialog.value = false;
      }
    }

    function openEditDialog(item) {
      editedCharacter.value = { ...item }; // Create a copy to avoid modifying directly
      editDialog.value = true;
    }

    async function saveChanges() {
      Object.assign(character, { ...editedCharacter.value }); // Update the character object
      await updateCharacter(character._id);
      await getCharacters(); // Refresh the character list
      editDialog.value = false;
    }

    function selectCharacter(character) {
      setCurrentCharacter(character);
    }

    return {
      char_list,
      user,
      character,
      createCharacter,
      deleteDialog,
      openDeleteDialog,
      deleteChar,
      editDialog,
      openEditDialog,
      editedCharacter,
      saveChanges,
      selectCharacter
    }
  }
};
</script>