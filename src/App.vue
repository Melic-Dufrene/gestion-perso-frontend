<template>
  <v-app>
    <template v-if="showNavbar">
      <Navbar />
    </template>
    <v-main>
      <router-view /><!-- This will display the content for each tab -->
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/NavBar.vue';
import {
  computed
} from 'vue';
import {
  useRoute
} from 'vue-router';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  setup() {
    const route = useRoute();
    const showNavbar = computed(() => !['/login', '/register'].includes(route.path));
    return {
      showNavbar
    };
  },
};
</script>

<style></style>
