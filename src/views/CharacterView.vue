<template>
  <v-container
    v-if="Object.keys(character).length > 0"
    class="a4-container"
  >
    <v-row class="align-center">
      <v-col cols="2" />
      <v-col cols="8">
        <div
          v-if="!editableFields.name"
          class="configurable"
          @dblclick="toggleEditable('name')"
        >
          <h1>{{ character.name }}</h1>
        </div>
        <v-text-field
          v-else
          v-model="character.name"
          label="Name"
          outlined
          dense
          @blur="saveChanges('name')"
          @keyup.enter="saveChanges('name')"
        />
      </v-col>
      <v-col cols="2">
        <router-link
          to="/character/inventory"
          class="inventorybtn"
        >
          <v-btn
            color="brown"
            icon
          >
            <v-icon>mdi-bag-personal</v-icon>
          </v-btn>
        </router-link>
      </v-col>
    </v-row>
    <v-spacer />
    <v-row dense>
      <v-col cols="2" />
      <v-col cols="3">
        <div
          v-if="!editableFields.race"
          class="configurable"
          @dblclick="toggleEditable('race')"
        >
          <strong>Race: </strong>
          {{ character.race }}
        </div>
        <v-select
          v-else
          v-model="character.race"
          :items="races"
          label="Race"
          outlined
          dense
          @blur="saveChanges('race')"
          @keyup.enter="saveChanges('race')"
        />
      </v-col>
      <v-col cols="3">
        <div
          v-if="!editableFields.lvl"
          class="configurable"
          @dblclick="toggleEditable('lvl')"
        >
          <strong>Niveau: </strong> {{ character.lvl }}
        </div>
        <v-text-field
          v-else
          v-model="character.lvl"
          label="Niveau"
          outlined
          dense
          @blur="saveChanges('lvl')"
          @keyup.enter="saveChanges('lvl')"
        />
      </v-col>
      <v-col cols="3">
        <div
          v-if="!editableFields.age"
          class="configurable"
          @dblclick="toggleEditable('age')"
        >
          <strong>Age: </strong> {{ character.age }} ans
        </div>
        <v-text-field
          v-else
          v-model="character.age"
          label="Age"
          outlined
          dense
          @blur="saveChanges('age')"
          @keyup.enter="saveChanges('age')"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="2" />
      <v-col cols="3">
        <div
          v-if="!editableFields.profession"
          class="configurable"
          @dblclick="toggleEditable('profession')"
        >
          <strong>Profession: </strong> {{ character.profession }}
        </div>
        <v-select
          v-else
          v-model="character.profession"
          :items="professions"
          label="Profession"
          outlined
          dense
          @blur="saveChanges('profession')"
          @keyup.enter="saveChanges('profession')"
        />
      </v-col>
      <v-col cols="3">
        <div
          v-if="!editableFields.xp"
          class="configurable"
          @dblclick="toggleEditable('exp')"
        >
          <strong>Expérience: </strong> {{ character.exp }}
        </div>
        <v-text-field
          v-else
          v-model="character.xp"
          label="Expérience"
          outlined
          dense
          @blur="saveChanges('exp')"
          @keyup.enter="saveChanges('exp')"
        />
      </v-col>
      <v-col cols="3">
        <div
          v-if="!editableFields.height"
          class="configurable"
          @dblclick="toggleEditable('height')"
        >
          <strong>Taille: </strong> {{ character.height }} cm
        </div>
        <v-text-field
          v-else
          v-model="character.height"
          label="Taille"
          outlined
          dense
          @blur="saveChanges('height')"
          @keyup.enter="saveChanges('height')"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="2" />
      <v-col cols="3" />

      <v-col cols="3" />
      <v-col cols="3">
        <div
          v-if="!editableFields.weight"
          class="configurable"
          @dblclick="toggleEditable('weight')"
        >
          <strong>Poids: </strong> {{ character.weight }} kg
        </div>
        <v-text-field
          v-else
          v-model="character.weight"
          label="Poids"
          outlined
          dense
          @blur="saveChanges('weight')"
          @keyup.enter="saveChanges('weight')"
        />
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12">
        <StatsCharacter />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <TacoPvAlignment />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <SavesCharacter />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <NbSpellAllowed />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <AdditionnalAbilities />
      </v-col>
    </v-row>
  </v-container>
  <div v-else>
    Pas de personnage sélectionné.
  </div>
</template>

<script>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue';
import {
  useCharacterStore
} from '@/stores/characterStore';
import NbSpellAllowed from '@/components/character/NbSpellAllowed.vue';
import StatsCharacter from '@/components/character/StatsCharacter.vue';
import SavesCharacter from '@/components/character/SavesCharacter.vue';
import TacoPvAlignment from '@/components/character/TacoPvAlignment.vue';
import AdditionnalAbilities from '@/components/character/AdditionnalAbilities.vue';

export default {
  name: 'CharacterView',
  components: {
    StatsCharacter,
    TacoPvAlignment,
    SavesCharacter,
    NbSpellAllowed,
    AdditionnalAbilities
  },
  setup() {
    const editableFields = ref({});
    const professions = [
      "Guerrier",
      "Clerc",
      "Magicien",
      "Voleur",
      "Ranger",
      "Paladin",
      "Barde",
      "Illusionniste",
      "Druide"
    ];
    const races = [
      "Humain",
      "Elfe",
      "Demi-Elfe",
      "Nain",
      "Demi-Orc",
      "Gnome",
      "Petite-gens"
    ];

    // Access the store
    const characterStore = useCharacterStore();
    const {
      character,
      getCharacter,
      updateCharacter
    } = characterStore;

    // Methods
    function toggleEditable(field) {
      editableFields.value[field] = !editableFields.value[field];
    }

    const saveChanges = debounce(async (field) => {
      editableFields.value[field] = false;
      await updateCharacter(character._id);
    }, 300);

    // Lifecycle hooks
    onMounted(() => {

      // Initialize editableFields for all fields and abilities
      editableFields.value = {
        name: false,
        race: false,
        lvl: false,
        age: false,
        profession: false,
        xp: false,
        height: false,
        weight: false,
      };
    });

    onBeforeUnmount(async () => {
      await updateCharacter(character._id);
    });

    return {
      character,
      editableFields,
      professions,
      races,
      toggleEditable,
      saveChanges,
    };
  }
};

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
</script>

<style>
.v-table {
  text-align: center;
  border: 1px solid #fafafa;
}

.v-table table {
  table-layout: fixed;
  width: 100%;
}

.v-table th {
  background-color: #f4f4f4;
  font-size: 0.8rem;
  font-weight: bold;
}

.v-table th,
.v-table td {
  border: 1px solid #404040;
  text-align: center !important;
  width: 14%;
}

.v-table td {
  font-size: 0.6rem;
  background-color: #fff;
}
@media print {
  .a4-container {
    width: 210mm;
    height: 297mm;
    margin: 0;
    padding: 2mm;
    /* Reduced padding */
    box-sizing: border-box;
    font-size: 10px;
    /* Reduced font size */
  }

  /* Hide the navbar */
  nav {
    display: none !important;
  }

  .inventorybtn {
    display: none !important;
  }

  /* Ensure no page breaks inside the container */
  .a4-container {
    page-break-inside: avoid;
  }

  /* Reduce font size for headings */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 90%;
    /* Scale down headings */
    margin: 0;
    /* Reduce margins */
  }

  /* Reduce font size for table content */
  table {
    font-size: 9px;
    /* Smaller font for tables */
    width: 100%;
    /* Ensure tables use full width */
    border-collapse: collapse;
    /* Remove extra spacing */
  }

  table th,
  table td {
    padding: 1px;
    /* Reduce padding in table cells */
    text-align: left;
    border: 1px solid #ccc;
    /* Add borders for clarity */
  }

  /* Reduce font size for thead and tbody */
  thead{
    font-size: 6px;
  }
  tbody {
    font-size: 5px;
    /* Smaller font for table headers and body */
  }

  /* Reduce spacing for rows and columns */
  .v-row {
    margin-bottom: 1cap;
    /* Reduce row spacing */
  }

  .v-col {
    padding: 1px;
    /* Reduce column padding */
  }

  /* Adjust button sizes */
  button,
  .v-btn {
    font-size: 9px;
    /* Smaller font for buttons */
    padding: 2px 3px;
    /* Reduce button padding */
  }

  /* Adjust text fields and selects */
  .v-text-field,
  .v-select {
    font-size: 9px;
    /* Smaller font for inputs */
    height: auto;
    /* Adjust height */
  }
}
</style>
