<template>
  <v-container class="a4-container">
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
          @blur="toggleEditable('name')"
          @keyup.enter="toggleEditable('name')"
        />
      </v-col>
      <v-col cols="2">
        <router-link to="/character/inventory">
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
        <v-text-field
          v-else
          v-model="character.race"
          label="Race"
          outlined
          dense
          @blur="toggleEditable('race')"
          @keyup.enter="toggleEditable('race')"
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
          @blur="toggleEditable('lvl')"
          @keyup.enter="toggleEditable('lvl')"
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
          @blur="toggleEditable('age')"
          @keyup.enter="toggleEditable('age')"
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
        <v-text-field
          v-else
          v-model="character.profession"
          label="Profession"
          outlined
          dense
          @blur="toggleEditable('profession')"
          @keyup.enter="toggleEditable('profession')"
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
          @blur="toggleEditable('exp')"
          @keyup.enter="toggleEditable('exp')"
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
          @blur="toggleEditable('height')"
          @keyup.enter="toggleEditable('height')"
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
          @blur="toggleEditable('weight')"
          @keyup.enter="toggleEditable('weight')"
        />
      </v-col>
    </v-row>
    <v-spacer />

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

    // Lifecycle hooks
    onMounted(() => {
      getCharacter();
      // Initialize editableFields for all fields and abilities
      editableFields.value = {
        name: false,
        race: false,
        lvl: false,
        age: false,
        profession: false,
        xp: false,
        height: false,
      };
    });

    onBeforeUnmount(() => {
      updateCharacter();
    });

    return {
      character,
      editableFields,
      toggleEditable,
    };
  }
};
</script>

<style scoped></style>
