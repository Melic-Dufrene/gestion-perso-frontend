<template>
  <v-card elevation="0">
    <v-card-title class="title">
      Capacités supplémentaires
    </v-card-title>
    <v-card-text>
      <v-table>
        <thead />
        <tbody>
          <tr
            v-for="(row, index) in splitArray(character.abilities, 2)"
            :key="index"
          >
            <td>
              <div
                v-if="!editableFields[`abilities_${index * 2}`]"
                class="configurable"
                style="min-height: 20px; min-width: 50px;"
                @dblclick="toggleEditable(`abilities_${index * 2}`)"
              >
                {{ row[0] || '' }}
              </div>
              <v-text-field
                v-else
                v-model="character.abilities[index * 2]"
                outlined
                dense
                @blur="toggleEditable(`abilities_${index * 2}`)"
                @keyup.enter="toggleEditable(`abilities_${index * 2}`)"
              />
            </td>
            <td>
              <div
                v-if="!editableFields[`abilities_${index * 2 + 1}`]"
                class="configurable"
                style="min-height: 20px; min-width: 50px;"
                @dblclick="toggleEditable(`abilities_${index * 2 + 1}`)"
              >
                {{ row[1] || '' }}
              </div>
              <v-text-field
                v-else
                v-model="character.abilities[index * 2 + 1]"
                outlined
                dense
                @blur="toggleEditable(`abilities_${index * 2 + 1}`)"
                @keyup.enter="toggleEditable(`abilities_${index * 2 + 1}`)"
              />
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<script>
import {
  onMounted,
  reactive
} from 'vue';
import {
  useCharacterStore
} from '@/stores/characterStore';

export default {
  name: 'AdditionnalAbilities',
  setup() {
    let editableFields = reactive({});

    // Access the store
    const characterStore = useCharacterStore();
    const {
      character,
      updateCharacter
    } = characterStore;

    // Initialize abilities array if it doesn't exist or is empty
    if (!character.abilities || character.abilities.length === 0) {
      character.abilities = ['', ''];
    }

    // Methods
    function toggleEditable(field) {
      if (!(field in editableFields)) {
        editableFields[field] = false;
      }
      editableFields[field] = !editableFields[field];
    }

    function ensureEvenLength(arr) {
      if (arr.at(-1) !== "") {
        if (arr.length % 2 === 0) {
          character.abilities.push('', '');
          if (editableFields) {
            editableFields[`abilities_${arr.length -2}`] = false;
            editableFields[`abilities_${arr.length - 1}`] = false;
          }
        }
        else {
          character.abilities.push('');
          editableFields[`abilities_${arr.length -1}`] = false;
        }
      }
    }
    function splitArray(arr, size) {
      if (!arr) {
        return []
      }
      ensureEvenLength(arr)
      const arr2 = Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size)
      );
      return arr2;
    }

    // Lifecycle hooks
    onMounted(() => {
      ensureEvenLength(character.abilities);
      // Initialize editableFields for all fields and abilities
      character.abilities.forEach((_,index) => {
        editableFields[`abilities_${index}`] = false;
      });
    });

    return {
      character,
      editableFields,
      toggleEditable,
      ensureEvenLength,
      splitArray
    };
  }
};
</script>


<style scoped>
.title {
  font-size: 1.5rem;
  text-align: center;
}

</style>