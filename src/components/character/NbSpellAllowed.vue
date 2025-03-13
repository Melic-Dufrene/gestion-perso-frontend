<template>
  <v-container>
    <v-row v-if="toDisplay">
      <v-col
        v-for="key in Object.keys(professionData)"
        :key="key"
        :cols="12 / Object.keys(professionData).length"
      >
        <v-card elevation="0">
          <!-- Card title centered -->
          <v-card-title class="title">
            Sorts de {{ key }}
          </v-card-title>

          <!-- Horizontal Table layout-->
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-table
                  v-if="professionData[key] && Object.keys(professionData[key]).length > 0"
                  class="spells-table"
                >
                  <thead>
                    <tr>
                      <th>
                        <v-icon
                          :icon="hovered ? 'mdi-book-open-page-variant' : 'mdi-book-open-variant'"
                          @mouseover="hovered = true"
                          @mouseleave="hovered = false"
                          @click="openSpellBook"
                        />
                      </th>
                      <th
                        v-for="lvl in [...Array(professionData[key]['lvl_spell_max'])].map((_, index) => index + 1)"
                        :key="lvl"
                        class="text-center"
                      >
                        Niveau {{ lvl }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-center">
                        <strong>Nombre de sorts</strong>
                      </td>
                      <td
                        v-for="lvl in [...Array(professionData[key]['lvl_spell_max'])].map((_, index) => index + 1)"
                        :key="lvl"
                        class="text-center"
                      >
                        {{ getSpellCount(professionData[key], character.lvl, lvl) }}
                      </td>
                    </tr>
                  </tbody>
                </v-table>
                <div v-else>
                  Loading...
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, reactive, onMounted, watch, computed } from 'vue';
import { useCharacterStore } from '@/stores/characterStore';

export default {
  setup() {
    const store = useCharacterStore();
    let professionData = reactive({});
    const hovered = ref(false);

    async function loadNbSpellsData(prof) {
      try {
        if (!["magicien", "clerc", "ranger", "paladin", "illusionniste", "druide"].includes(prof)) {
          return;
        }
        const data = await import('@/assets/character/spells/' + prof + '_base_nb_spell.json')
        Object.assign(professionData, data.default);

      } catch (error) {
        console.error("Error loading json nb_spell_data:", error)
      }
    }

    const toDisplay = computed(() => {
      return Object.keys(professionData).length > 0 && store.character;
    });

    onMounted(async () => {
      await loadNbSpellsData(store.character.profession.toLowerCase());
    });

    watch(() => store.character.profession, async (value) => {
      await loadNbSpellsData(value.toLowerCase());
    });

    const getSpellCount = (data, niveau, lvl) => {
      if (data["lvl_max"] < niveau) {
        return data[niveau][data["lvl_max"]];
      }
      if (store.character.profession.toLowerCase().includes("clerc")) {
        if (lvl === 1 && store.character.stats.wisdom >= 14) {
          return 2 + data[niveau][lvl]
        }
        if (lvl === 1 && store.character.stats.wisdom === 13) {
          return 1 + data[niveau][lvl]
        }
        if (lvl === 2 && store.character.stats.wisdom >= 16) {
          return 2 + data[niveau][lvl]
        }
        if (lvl === 2 && store.character.stats.wisdom === 15) {
          return 1 + data[niveau][lvl]
        }
        if (lvl === 3 && store.character.stats.wisdom >= 17) {
          return 1 + data[niveau][lvl]
        }
        if (lvl === 6 && store.character.stats.wisdom < 17) {
          return 0
        }
        if (lvl === 7 && store.character.stats.wisdom < 18) {
          return 0
        }
      }
      return data[niveau][lvl] ?? 0;

    };

    return {
      character: store.character,
      professionData,
      getSpellCount,
      toDisplay,
      hovered
    }
  },
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
  width: 12.5%;
}

.v-table td {
  background-color: #fff;
}
</style>
