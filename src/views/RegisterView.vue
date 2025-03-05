<template>
  <v-container class="fill-height d-flex flex-column align-center justify-center">
    <v-card
      class="pa-8"
      max-width="400"
    >
      <v-card-title class="headline">
        Register
      </v-card-title>
      <v-form @submit.prevent="handleRegister">
        <v-text-field
          v-model="username"
          label="Nom d'utilisateur"
          outlined
          dense
          required
        />
        <v-text-field
          v-model="password"
          label="Mot de passe"
          type="password"
          outlined
          dense
          required
        />
        <v-btn
          type="submit"
          color="green"
          class="mt-4"
          block
        >
          Register
        </v-btn>
      </v-form>

      <!-- Error Message Display -->
      <v-alert
        v-if="registerError"
        type="error"
        class="mt-4"
        dismissible
      >
        {{ registerError }}
      </v-alert>

      <v-card-actions class="justify-center">
        <p class="mt-4 text-sm">
          Already have an account?
          <router-link
            to="/login"
            class="text-green"
          >
            Login
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

const username = ref('');
const password = ref('');
const registerError = ref(''); // Variable to store error message

const handleRegister = async () => {
  try {
    const response = await api.post('/auth/register', {
      username: username.value,
      password: password.value,
    });
    // Handle successful registration here, if needed (e.g., redirect to login or profile page)
    // For now, we're not doing anything after successful registration
  } catch (error) {
    // Capture and display the error message
    registerError.value = error.response?.data?.message || 'Registration failed, please try again';
    console.error('Registration failed', error);
  }
};
</script>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
}
</style>
