<template>
  <v-app>
    <template v-if="showNavbar">
      <Navbar class="navbar" />
    </template>
    <v-main>
      <router-view /><!-- This will display the content for each tab -->
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/NavBar.vue';
import {
  ref,
  onMounted,
  onUnmounted,
  watch
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
    const showNavbar = ref(true);

    const updateNavbarVisibility = () => {
      showNavbar.value = !['/login', '/register'].includes(route.path) && !window.matchMedia("print").matches;
    };

    onMounted(() => {
      const mediaQuery = window.matchMedia("print");
      mediaQuery.addEventListener("change", updateNavbarVisibility);
      updateNavbarVisibility(); // Ensure correct initial state
    });

    onUnmounted(() => {
      const mediaQuery = window.matchMedia("print");
      mediaQuery.removeEventListener("change", updateNavbarVisibility);
    });

    watch(route, updateNavbarVisibility);
    return {
      showNavbar
    };
  },
};
</script>

<style></style>
