<!--src/pages/LoginPage.vue-->
<template>
  <v-container class="fill-height d-flex flex-column align-center justify-center">
    <v-card
      class="pa-8"
      max-width="400"
    >
      <v-card-title class="headline">
        Login
      </v-card-title>
      <v-form @submit.prevent="handleLogin">
        <v-text-field
          v-model="username"
          label="Nom d'utilisateur"
          type="text"
          outlined
          dense
          required
        />
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          outlined
          dense
          required
        />
        <v-btn
          type="submit"
          color="blue"
          class="mt-4"
          block
        >
          Login
        </v-btn>
      </v-form>
      <v-card-actions class="justify-center">
        <p class="mt-4 text-sm">
          Don't have an account?
          <router-link
            to="/register"
            class="text-blue"
          >
            Register
          </router-link>
        </p>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { VContainer, VCard, VCardTitle, VForm, VTextField, VBtn, VCardActions } from 'vuetify/components';
import api from "../plugins/axios";
import router from '../router';
const username = ref('');
const password = ref('');

const handleLogin = async () => {
  try {
    const response = await api.post('/auth/login', {
      username: username.value,
      password: password.value,
    });
    console.log("Login:",username,password)
    // Save token in local storage
    localStorage.setItem('token', response.data.token);
    // Redirect to character page
    router.push('/profile');
  } catch (error) {
    console.error('Login failed', error);
  }
};
</script>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
}
</style>
