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
import { VContainer, VCard, VCardTitle, VForm, VTextField, VBtn, VCardActions } from 'vuetify/components';
import api from "../plugins/axios";

const username = ref('');
const password = ref('');

const handleRegister = async () => {
  try {
    const response = await api.post('/auth/register', {
      username: username.value,
      password: password.value,
    });
  } catch (error) {
    alert('Register failed', error);
  }
};
</script>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
}
</style>
