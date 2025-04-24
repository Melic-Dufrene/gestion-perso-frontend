<template>
  <v-card elevation="0">
    <v-card-text>
      <v-row>
        <!-- Weapons Table -->
        <v-col cols="6">
          <v-table>
            <thead>
              <tr>
                <th colspan="2">
                  Armes Permises
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Nombre d'armes permises</strong>
                </td>
                <td>
                  <div
                    v-if="!editableFields.permitted_count"
                    class="configurable"
                    @dblclick="toggleEditable('permitted_count')"
                  >
                    {{ character.weapons.permitted_count || 0 }}
                  </div>
                  <v-text-field
                    v-else
                    v-model="character.weapons.permitted_count"
                    label="Nombre d'armes"
                    outlined
                    dense
                    @blur="saveChanges('permitted_count')"
                    @keyup.enter="saveChanges('permitted_count')"
                  />
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <strong>Liste des armes</strong>
                  <div
                    v-if="!editableFields.weapon_list"
                    class="configurable"
                    @dblclick="toggleEditable('weapon_list')"
                  >
                    <ul>
                      <li
                        v-for="(weapon, index) in character.weapons.list || []"
                        :key="index"
                      >
                        {{ weapon }}
                      </li>
                      <li v-if="(character.weapons.list || []).length === 0">
                        <em>Aucune arme ajoutée</em>
                      </li>
                    </ul>
                  </div>
                  <div v-else>
                    <v-textarea
                      v-model="weaponInput"
                      label="Ajouter des armes (séparées par des virgules)"
                      outlined
                      dense
                      @blur="addWeapons"
                      @keyup.enter="addWeapons"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-col>

        <!-- Speed Table -->
        <v-col cols="6">
          <v-table>
            <thead>
              <tr>
                <th colspan="2">
                  Vitesse
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Vitesse de base</strong>
                </td>
                <td>
                  <div
                    v-if="!editableFields.base_speed"
                    class="configurable"
                    @dblclick="toggleEditable('base_speed')"
                  >
                    {{ character.speed.base_speed || 0 }}
                  </div>
                  <v-text-field
                    v-else
                    v-model="character.speed.base_speed"
                    label="Vitesse de base"
                    outlined
                    dense
                    @blur="saveChanges('base_speed')"
                    @keyup.enter="saveChanges('base_speed')"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Vitesse à cheval</strong>
                </td>
                <td>
                  <div
                    v-if="!editableFields.riding_speed"
                    class="configurable"
                    @dblclick="toggleEditable('riding_speed')"
                  >
                    {{ character.speed.riding_speed || 0 }}
                  </div>
                  <v-text-field
                    v-else
                    v-model="character.speed.riding_speed"
                    label="Vitesse à cheval"
                    outlined
                    dense
                    @blur="saveChanges('riding_speed')"
                    @keyup.enter="saveChanges('riding_speed')"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Vitesse en vol</strong>
                </td>
                <td>
                  <div
                    v-if="!editableFields.flying_speed"
                    class="configurable"
                    @dblclick="toggleEditable('flying_speed')"
                  >
                    {{ character.speed.flying_speed || 0 }}
                  </div>
                  <v-text-field
                    v-else
                    v-model="character.speed.flying_speed"
                    label="Vitesse en vol"
                    outlined
                    dense
                    @blur="saveChanges('flying_speed')"
                    @keyup.enter="saveChanges('flying_speed')"
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
import { ref, onMounted } from 'vue';
import { useCharacterStore } from '@/stores/characterStore';

export default {
  name: 'SpeedAndWeapons',
  setup() {
    // Access the store
    const characterStore = useCharacterStore();
    const { character, getCharacter, updateCharacter } = characterStore;

    const editableFields = ref({});
    const weaponInput = ref('');

    // Methods
    function toggleEditable(field) {
      editableFields.value[field] = !editableFields.value[field];
    }

    async function saveChanges(field) {
      await updateCharacter(character._id);
      toggleEditable(field); // Toggle the field back to non-editable
    }

    function addWeapons() {
      if (weaponInput.value.trim()) {
        const newWeapons = weaponInput.value.split(',').map((w) => w.trim());
        character.weapons.list = [ ...newWeapons];
        weaponInput.value = '';
        saveChanges('weapon_list');
      }
    }

    // Lifecycle hooks
    onMounted(() => {
      getCharacter(); // Fetch character data on mount
      editableFields.value = {
        permitted_count: false,
        weapon_list: false,
        base_speed: false,
        riding_speed: false,
        flying_speed: false,
      };
    });

    return {
      character,
      editableFields,
      weaponInput,
      toggleEditable,
      saveChanges,
      addWeapons,
    };
  },
};
</script>

<style scoped>
.configurable {
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.configurable:hover {
  background-color: #f5f5f5;
}

.title {
  font-size: 1.5rem;
  text-align: center;
}
</style>