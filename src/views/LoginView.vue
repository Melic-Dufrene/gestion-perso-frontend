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

      <!-- Error Message Display -->
      <v-alert
        v-if="loginError"
        type="error"
        class="mt-4"
        dismissible
      >
        {{ loginError }}
      </v-alert>

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
import { VContainer, VCard, VCardTitle, VForm, VTextField, VBtn, VCardActions, VAlert } from 'vuetify/components';
import api from "../plugins/axios";
import router from '../router';

const username = ref('');
const password = ref('');
const loginError = ref(''); // Add a variable to store login error message

const handleLogin = async () => {
  try {
    const response = await api.post('/auth/login', {
      username: username.value,
      password: password.value,
    });
    // Save token in local storage
    localStorage.setItem('token', response.data.token);
    // Redirect to profile page
    router.push('/profile');
  } catch (error) {
    // Check if error response exists and has a message
    loginError.value = error.response?.data?.message || 'Login failed, please try again';
    console.error('Login failed', error);
  }
};
</script>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
}
</style>
