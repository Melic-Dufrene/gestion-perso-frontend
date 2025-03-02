<template>
  <v-card elevation="0">
    <v-card-title class="title">
      Sauvegardes
    </v-card-title>
    <v-card-text>
      <v-table class="saves-table">
        <thead>
          <tr>
            <th>
              Paralysie, poison ou mort magique
            </th>
            <th>
              Pétrification ou allométamorphose
            </th>
            <th>
              Baguette, bâton ou bâtonnet
            </th>
            <th>
              Souffle
            </th>
            <th>
              Sort
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {{ saves.ppm }}
            </td>
            <td>
              {{ saves.pa }}
            </td>
            <td>
              {{ saves.bbb }}
            </td>
            <td>
              {{ saves.souffle }}
            </td>
            <td>
              {{ saves.sort }}
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<script>
import {
  computed,
  onMounted,
  onBeforeUnmount
} from 'vue';
import {
  useCharacterStore
} from '@/stores/characterStore';

import savestable from '@/assets/character/saves.json';

export default {
  name: 'SavesCharacter',
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

    const characterStore = useCharacterStore();
    const {
      character,
      getCharacter,
      updateCharacter
    } = characterStore;

    const saves = computed(() => {
      if (!allprofessions.includes(character.profession)) {
        return {
          ppm: 16,
          pa: 17,
          bbb: 18,
          souffle: 20,
          sort: 19
        };
      }
      const lowerProfession = character.profession.toLowerCase();
      if (character.lvl > savestable[lowerProfession].max_niveau) {
        return savestable[lowerProfession][savestable[lowerProfession].max_niveau];
      }
      return savestable[lowerProfession][character.lvl];
    });

    return {
      character,
      saves,
    };
  }
};
</script>

<style scoped>
.title {
  font-size: 2.5rem;
  text-align: center;
}

.v-table {
  text-align: center;
  border: 1px solid #fafafa;
}

.v-table table {
  table-layout: fixed;
  width: 100%
}

.v-table th {
  background-color: #efefef;
  font-size: 1.5rem;
  font-weight: bold;
}

.v-table th,
.v-table td {
  border: 1px solid #404040;
  text-align: center !important;
  width: 20%;
}

.v-table td {
  background-color: #fff;
}
</style>