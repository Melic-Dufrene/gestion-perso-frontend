<template>
  <v-container>
    <v-table>
      <thead>
        <tr>
          <th>
            <div>
              Force
            </div>
            <div
              v-if="!editableFields.strength"
              class="configurable"
              @dblclick="toggleEditable('strength')"
            >
              {{ character.stats.strength }}
            </div>
            <v-text-field
              v-else
              v-model="character.stats.strength"
              outlined
              dense
              @blur="toggleEditable('strength')"
              @keyup.enter="toggleEditable('strength')"
            />
          </th>
          <th>
            <div>
              Intelligence
            </div>
            <div
              v-if="!editableFields.intelligence"
              class="configurable"
              @dblclick="toggleEditable('intelligence')"
            >
              {{ character.stats.intelligence }}
            </div>
            <v-text-field
              v-else
              v-model="character.stats.intelligence"
              dense
              @blur="toggleEditable('intelligence')"
              @keyup.enter="toggleEditable('intelligence')"
            />
          </th>
          <th>
            <div>
              Sagesse
            </div>
            <div
              v-if="!editableFields.wisdom"
              class="configurable"
              @dblclick="toggleEditable('wisdom')"
            >
              {{ character.stats.wisdom }}
            </div>
            <v-text-field
              v-else
              v-model="character.stats.wisdom"
              outlined
              dense
              @blur="toggleEditable('wisdom')"
              @keyup.enter="toggleEditable('wisdom')"
            />
          </th>
          <th>
            <div>
              Constitution
            </div>
            <div
              v-if="!editableFields.constitution"
              class="configurable"
              @dblclick="toggleEditable('constitution')"
            >
              {{ character.stats.constitution }}
            </div>
            <v-text-field
              v-else
              v-model="character.stats.constitution"
              outlined
              dense
              @blur="toggleEditable('constitution')"
              @keyup.enter="toggleEditable('constitution')"
            />
          </th>
          <th>
            <div>
              Dextérité
            </div>
            <div
              v-if="!editableFields.dexterity"
              class="configurable"
              @dblclick="toggleEditable('dexterity')"
            >
              {{ character.stats.dexterity }}
            </div>
            <v-text-field
              v-else
              v-model="character.stats.dexterity"
              outlined
              dense
              @blur="toggleEditable('dexterity')"
              @keyup.enter="toggleEditable('dexterity')"
            />
          </th>
          <th>
            <div>
              Charisme
            </div>
            <div
              v-if="!editableFields.charisma"
              class="configurable"
              @dblclick="toggleEditable('charisma')"
            >
              {{ character.stats.charisma }}
            </div>
            <v-text-field
              v-else
              v-model="character.stats.charisma"
              outlined
              dense
              @blur="toggleEditable('charisma')"
              @keyup.enter="toggleEditable('charisma')"
            />
          </th>
          <th>
            <div>
              Beauté
            </div>
            <div
              v-if="!editableFields.beauty"
              class="configurable"
              @dblclick="toggleEditable('beauty')"
            >
              {{ character.stats.beauty }}
            </div>
            <v-text-field
              v-else
              v-model="character.stats.beauty"
              outlined
              dense
              @blur="toggleEditable('beauty')"
              @keyup.enter="toggleEditable('beauty')"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div><strong>Bonus toucher</strong></div>
            <div>{{ hit_bonus }}</div>
          </td>
          <td>
            <div><strong>Compréhension des sorts</strong></div>
            <div>{{ spell_understanding }}</div>
          </td>
          <td>
            <div><strong>Sorts supplémentaires</strong></div>
            <div>{{ wis_supp_spells }}</div>
          </td>
          <td>
            <div><strong>Bonus de PV</strong></div>
            <div>{{ hp_bonus }}</div>
          </td>
          <td>
            <div><strong>Bonus de Lancer</strong></div>
            <div>{{ throw_react_bonus }}</div>
          </td>
          <td>
            <div><strong>Bonus de réaction</strong></div>
            <div>{{ reaction_bonus }}</div>
          </td>
          <td style="border-bottom: none; border-right:none" />
        </tr>
        <tr>
          <td>
            <div><strong> Bonus de dégats</strong></div>
            <div>{{ damage_bonus }}</div>
          </td>
          <td>
            <div><strong>Nombre permis</strong></div>
            <div>{{ nb_spells_allowed }}</div>
          </td>
          <td>
            <div><strong>Ajustement aux attaques magiques</strong></div>
            <div>{{ magic_ajust }}</div>
          </td>
          <td>
            <div><strong>Résistance aux traumatismes</strong></div>
            <div>{{ trauma_resist }}</div>
          </td>
          <td>
            <div><strong> Bonus de CA</strong></div>
            <div>{{ armor_class_bonus }}</div>
          </td>
          <td style="border-bottom: none; border-right:none" />
          <td style="border:none" />
        </tr>
        <tr>
          <td>
            <div><strong>Bonus de Poids</strong></div>
            <div>{{ weight_bonus }} p.o.</div>
          </td>
          <td style="border-bottom: none; border-right:none" />
          <td style="border-bottom: none; border-left:none" />
          <td>
            <div><strong>Résurrection</strong></div>
            <div>{{ resurrection }}</div>
          </td>
          <td>
            <div><strong>Bonus d'initiative</strong></div>
            <div>{{ throw_react_bonus }}</div>
          </td>
          <td style="border-bottom: none; border-right:none;border-top:none" />
          <td style="border: none" />
        </tr>
        <tr>
          <td>
            <div><strong>Tordre les barreaux</strong></div>
            <div>{{ twist_bars }}</div>
          </td>
          <td style="border-bottom: none; border-right:none;border-top:none" />
          <td style="border: none" />
          <td style="border-bottom: none; border-right:none;border-left:none" />
          <td style="border-bottom: none; border-right:none;border-left:none" />
          <td style="border: none" />
          <td style="border: none" />
        </tr>
        <tr>
          <td>
            <div><strong>Défoncer les portes (d6)</strong></div>
            <div>{{ open_doors }}</div>
          </td>
          <td style="border-bottom: none; border-right:none;border-top:none" />
          <td style="border: none" />
          <td style="border: none" />
          <td style="border: none" />
          <td style="border: none" />
          <td style="border: none" />
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>


<script>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount
} from 'vue';
import {
  useCharacterStore
} from '@/stores/characterStore';

import chartables from '@/assets/character/characteristics.json';


export default {
  name: 'StatsCharacter',
  setup() {

    const editableFields = ref({});

    // Access the store
    const characterStore = useCharacterStore();
    const {
      character,
      updateCharacter
    } = characterStore;

    // Computed properties for bonuses and other values:
    const hit_bonus = computed(() =>
      chartables?.strength[character.stats.strength.toString()]?.hit_bonus ?? "0"
    );
    const damage_bonus = computed(() =>
      chartables?.strength[character.stats.strength.toString()]?.damage_bonus ?? "0"
    );
    const weight_bonus = computed(() =>
      chartables?.strength[character.stats.strength.toString()]?.weight_bonus ?? "0"
    );
    const open_doors = computed(() =>
      chartables?.strength[character.stats.strength.toString()]?.open_doors ?? "0"
    );
    const twist_bars = computed(() =>
      chartables?.strength[character.stats.strength.toString()]?.twist_bars ?? "0"
    );

    const spell_understanding = computed(() =>
      chartables?.intelligence[character.stats.intelligence.toString()]?.spell_understanding ?? "0"
    );
    const nb_spells_allowed = computed(() =>
      chartables?.intelligence[character.stats.intelligence.toString()]?.nb_spell_allowed ?? "0"
    );
    const wis_supp_spells = computed(() =>
      chartables?.wisdom[character.stats.wisdom.toString()]?.additional_spell ?? 0
    );
    const magic_ajust = computed(()=> chartables?.wisdom[character.stats.wisdom.toString()]?.magic_ajust || 0)

    const hp_bonus = computed(() => {
      let bonus =
        chartables?.constitution[character.stats.constitution.toString()]?.hp_bonus ?? "0";
      if (character.profession === "Guerrier") {
        if (character.stats.constitution.toString() === "17") {
          return "+ 3";
        }
        if (character.stats.constitution.toString() === "18") {
          return "+ 4";
        }
      }
      return bonus;
    });

    const trauma_resist = computed(() =>
      chartables?.constitution[character.stats.constitution.toString()]?.trauma_resist ?? "0"
    );
    const resurrection = computed(() =>
      chartables?.constitution[character.stats.constitution.toString()]?.resurrect ?? "0"
    );
    const throw_react_bonus = computed(() =>
      chartables?.dexterity[character.stats.dexterity.toString()]?.throw_react_bonus ?? "0"
    );
    const armor_class_bonus = computed(() =>
      chartables?.dexterity[character.stats.dexterity.toString()]?.ac_bonus ?? "0"
    );
    const reaction_bonus = computed(() =>
      chartables?.charisma[character.stats.charisma.toString()]?.reaction_bonus ?? "0%"
    );

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
        beauty: false,
        weight: false,
        strength: false,
        intelligence: false,
        wisdom: false,
        constitution: false,
        dexterity: false,
        charisma: false
      };
    });

    return {
      character,
      editableFields,
      hit_bonus,
      damage_bonus,
      weight_bonus,
      open_doors,
      twist_bars,
      spell_understanding,
      nb_spells_allowed,
      wis_supp_spells,
      magic_ajust,
      hp_bonus,
      trauma_resist,
      resurrection,
      throw_react_bonus,
      armor_class_bonus,
      reaction_bonus,
      toggleEditable,
      saveChanges
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

<style>
</style>