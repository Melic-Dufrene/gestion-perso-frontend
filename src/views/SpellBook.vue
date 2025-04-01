<template>
  <v-container>
    <div v-if="store.character.profession.toLowerCase() !== 'magicien'">
      <v-table>
        <thead>
        </thead>
        <tbody>
          
        </tbody>
      </v-table>
    </div>
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
export default {
  name: 'CharacterView',
  components: {
  },
  setup() {
  }
}
</script>