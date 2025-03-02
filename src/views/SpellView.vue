<template>
  <v-container>
    <!-- Filters panel -->
    <v-expansion-panels>
      <v-expansion-panel title="Filtres">
        <v-expansion-panel-text>
          <v-row>
            <v-col cols="12">
              <span>Profession :</span>
              <v-row>
                <v-col cols="auto">
                  <v-checkbox
                    v-model="selectAllProfessions"
                    label="Toutes"
                    @change="toggleAllProfessions"
                  />
                </v-col>
                <v-col
                  v-for="profession in professions"
                  :key="profession"
                  cols="auto"
                >
                  <v-checkbox
                    v-model="selectedProfessions"
                    :label="profession"
                    :value="profession"
                    dense
                  />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <span>Niveau :</span>
              <v-row>
                <v-col cols="auto">
                  <v-checkbox
                    v-model="selectAllLevels"
                    label="Tous"
                    @change="toggleAllLevels"
                  />
                </v-col>
                <v-col
                  v-for="level in levels"
                  :key="level"
                  cols="auto"
                >
                  <v-checkbox
                    v-model="selectedLevels"
                    :label="level.toString()"
                    :value="level"
                    dense
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- Search input with dropdown menu -->
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      max-height="300"
      :offset="[-20, 0]"
    >
      <template #activator="{ props, on }">
        <v-text-field
          v-model="searchQuery"
          label="Search for an object by name"
          prepend-inner-icon="mdi-magnify"
          clearable
          v-bind="props"
          v-on="on || {}"
        />
      </template>
      <!-- The dropdown list appears as a scrollable menu -->
      <v-list>
        <v-list-item
          v-for="spell in filteredSpells"
          :key="`${spell.Nom}-${spell.profession}`"
          class="cursor-pointer"
          @click="selectSpell(spell)"
        >
          <v-list-item-title>
            <div class="d-flex justify-space-between w-100">
              <span>{{ spell.Nom }}</span>
              <span>{{ spell.Niveau }}</span>
            </div>
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ spell.profession || '' }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Spell details card -->
    <div v-if="selectedSpell">
      <v-card>
        <v-card-title>{{ selectedSpell.Nom }} {{ selectedSpell.Type }}</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <p><strong>Niveau:</strong> {{ selectedSpell.Niveau }}</p>
            </v-col>
            <v-col cols="6">
              <p><strong>Composantes:</strong> {{ selectedSpell.Composantes }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <p><strong>Portée:</strong> {{ selectedSpell.Portee }}</p>
            </v-col>
            <v-col cols="6">
              <p><strong>Temps d'incantation:</strong> {{ selectedSpell.Temps_incantation }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <p><strong>Durée:</strong> {{ selectedSpell.Duree }}</p>
            </v-col>
            <v-col cols="6">
              <p><strong>Jet de protection:</strong> {{ selectedSpell.Jet_protection }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <p><strong>Zone d'effet:</strong> {{ selectedSpell.Zone_effet }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <p><strong>Description:</strong> {{ selectedSpell.Explication }}</p>
              <div
                v-for="(tableData, tableKey) in filteredTableaux"
                :key="tableKey"
                class="table-container"
              >
                <v-table>
                  <thead>
                    <tr>
                      <th
                        v-for="(title, index) in tableData.titles"
                        :key="index"
                        class="text-left"
                      >
                        {{ title }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(row, rowIndex) in tableData.data"
                      :key="rowIndex"
                    >
                      <td
                        v-for="(cell, cellIndex) in row"
                        :key="cellIndex"
                      >
                        {{ cell }}
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import mageSpells from "../assets/spells/spells_mage.json";
import clericSpells from "../assets/spells/spells_cleric.json";
import druidSpells from "../assets/spells/spells_druid.json";
import illusionnistSpells from "../assets/spells/spells_illusionnist.json";

export default {
  data() {
    return {
      menu: false, // Controls whether the dropdown menu is open
      searchQuery: "",
      professions: ["mage", "clerc", "druide", "illusionniste"],
      selectedProfessions: ["mage", "clerc", "druide", "illusionniste"],
      selectAllProfessions: true,
      levels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      selectedLevels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      selectAllLevels: true,
      spellsData: {
        mage: mageSpells,
        clerc: clericSpells,
        druide: druidSpells,
        illusionniste: illusionnistSpells,
      },
      spells: [],
      selectedSpell: null,
    };
  },
  computed: {
    filteredSpells() {
      if (!this.selectedProfessions.length) return [];
      const search = this.searchQuery ? this.searchQuery.toLowerCase() : "";
      const fspells = this.spells.filter((spell) => {
        return (
          this.selectedProfessions.includes(spell.profession.toLowerCase()) &&
          (!search || spell.Nom.toLowerCase().includes(search)) &&
          this.selectedLevels.includes(Number(spell.Niveau))
        );
      }).sort((a, b) => a.Niveau - b.Niveau || a.profession - b.profession);
      return fspells;
    },
    filteredTableaux() {
      const result = {};

      if (this.selectedSpell) {
        Object.keys(this.selectedSpell).forEach(key => {
          if (key === 'Tableau' || key.startsWith('Tableau')) {
            result[key] = this.selectedSpell[key];
          }
        });
      }
      return result;
    }
  },
  watch: {
    selectedProfessions: {
      handler: "fetchSpells",
      immediate: true,
    },
    searchQuery(val) {
      if (val) {
        this.menu = true;
      }
    }
  },
  methods: {
    fetchSpells() {
      this.spells = [];
      for (const profession of this.selectedProfessions) {
        if (this.spellsData[profession]) {
          this.spells.push(
            ...this.spellsData[profession].map((spell) => ({
              ...spell,
              profession: profession.toLowerCase(),
            }))
          );
        }
      }
    },
    selectSpell(spell) {
      this.searchQuery = "";
      this.menu = false;
      this.selectedSpell = spell;
    },
    toggleAllProfessions() {
      this.selectedProfessions = this.selectAllProfessions ? [...this.professions] : [];
    },
    toggleAllLevels() {
      this.selectedLevels = this.selectAllLevels ? [...this.levels] : [];
    },

  },
};
</script>

<style scoped>
.table-container {
  padding-top: 50px;
}
</style>
