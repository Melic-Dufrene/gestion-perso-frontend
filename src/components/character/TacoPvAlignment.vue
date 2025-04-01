<template>
  <v-card elevation="0">
    <v-card-text>
      <v-row>
        <v-col cols="8">
          <v-table>
            <thead>
              <tr>
                <th colspan="4">
                  Classe d'armure et TACO
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div
                    v-if="!editableFields.ca_front"
                    class="configurable"
                    @dblclick="toggleEditable('ca_front')"
                  >
                    <strong>CA devant </strong>
                    <div>{{ character.ac.front }}</div>
                  </div>
                  <v-text-field
                    v-else
                    v-model="character.ac.front"
                    label="CA devant"
                    outlined
                    dense
                    @blur="toggleEditable('ca_front')"
                    @keyup.enter="toggleEditable('ca_front')"
                  />
                </td>
                <td>
                  <div
                    v-if="!editableFields.ca_back"
                    class="configurable"
                    @dblclick="toggleEditable('ca_back')"
                  >
                    <strong>CA derrière </strong>
                    <div>{{ character.ac.back }}</div>
                  </div>
                  <v-text-field
                    v-else
                    v-model="character.ac.back"
                    label="CA derrière"
                    outlined
                    dense
                    @blur="toggleEditable('ca_back')"
                    @keyup.enter="toggleEditable('ca_back')"
                  />
                </td>
                <td>
                  <div
                    v-if="!editableFields.ca_shield"
                    class="configurable"
                    @dblclick="toggleEditable('ca_shield')"
                  >
                    <strong>CA avec Bouclier </strong>
                    <div>{{ character.ac.front_w_shield }}</div>
                  </div>
                  <v-text-field
                    v-else
                    v-model="character.ac.front_w_shield"
                    label="CA avec Bouclier"
                    outlined
                    dense
                    @blur="toggleEditable('ca_shield')"
                    @keyup.enter="toggleEditable('ca_shield')"
                  />
                </td>
                <td>
                  <div><strong>TACO </strong></div>
                  <div>{{ taco }}</div>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
        <v-col cols="2">
          <v-table>
            <thead>
              <tr>
                <th>
                  Points de vie
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div
                    v-if="!editableFields.hp"
                    class="configurable"
                    @dblclick="toggleEditable('hp')"
                  >
                    {{ character.hp }}
                  </div>
                  <v-text-field
                    v-else
                    v-model="character.hp"
                    label="Total de PV"
                    outlined
                    dense
                    @blur="toggleEditable('hp')"
                    @keyup.enter="toggleEditable('hp')"
                  />
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
        <v-col cols="2">
          <v-table>
            <thead>
              <tr>
                <th>
                  Alignement
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div
                    v-if="!editableFields.alignement"
                    class="configurable"
                    @dblclick="toggleEditable('alignement')"
                  >
                    {{ character.alignement }}
                  </div>
                  <v-text-field
                    v-else
                    v-model="character.alignement"
                    outlined
                    dense
                    @blur="toggleEditable('alignement')"
                    @keyup.enter="toggleEditable('alignement')"
                  />
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useCharacterStore } from '@/stores/characterStore';
import tacotable from '@/assets/character/taco.json';

export default {
  name: 'TacoPvAlignment',
  setup() {
    const allprofessions = [
      "Guerrier",
      "Illusionniste",
      "Magicien",
      "Clerc",
      "Druide",
      "Voleur",
      "Assassin",
      "Moine",
      "Paladin",
      "Ranger"
    ];
    const editableFields = ref({});

    // Access the store
    const characterStore = useCharacterStore();
    const { character, getCharacter, updateCharacter } = characterStore;

    const taco = computed(() => {
      if (!allprofessions.includes(character.profession)) {
        return 20;
      }
      const lowerProfession = character.profession.toLowerCase();
      if (character.lvl > tacotable[lowerProfession].max_niveau) {
        return tacotable[lowerProfession][tacotable[lowerProfession].max_niveau];
      }
      return tacotable[lowerProfession][character.lvl];
    });

    // Methods
    function toggleEditable(field) {
      editableFields.value[field] = !editableFields.value[field];
    }

    const saveChanges = debounce(async (field) => {
      await updateCharacter(character._id);
    }, 300);

    // Lifecycle hooks
    onMounted(() => {
      // Initialize editableFields for all fields and abilities
      editableFields.value = {
        hp: false,
        alignement: false,
        ca_front: false,
        ca_back: false,
        ca_shield: false
      };
    });

    return {
      character,
      editableFields,
      taco,
      toggleEditable,
      saveChanges,
    };
  }
};

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
</script>

<style scoped>
.title {
  font-size: 1.5rem;
  text-align: center;
}
</style>