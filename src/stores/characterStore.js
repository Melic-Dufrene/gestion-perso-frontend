// src/stores/characterStore.js
import { defineStore } from 'pinia';
import { reactive } from 'vue';
import api from '../plugins/axios';

export const useCharacterStore = defineStore('characterStore', {
  state: () => ({
    character: reactive({})
  }),
  actions: {
    async getCharacter(id) {
      try {
        const response = await api.get('/character/one/' + id.toString());
        // Replace our character with the response
        Object.assign(this.character, response.data);
      } catch (error) {
        console.error('Failed to get character', error);
      }
    },
    async deleteCharacter(id)  {
      try {
        await api.delete('/character/one/' + id.toString());
      } catch (error) {
        console.error('Failed to get character', error);
      }
    },
    async postCharacter(id) {
      try {
        await api.post('/character/one/' + id.toString(), this.character);
      } catch (error) {
        console.error('Failed to post character', error);
      }
    },
    async newCharacter() {
      try {
        const response = await api.get('/character/new');
        // Replace our character with the response
        Object.assign(this.character, response.data);
      } catch (error) {
        console.error('Failed to create a new character: ', error);
      }
    },
    setCurrentCharacter(character) {
      Object.assign(this.character, character);
    },
    async updateCharacter(id) {
      try {
        await api.patch('/character/one/' + id.toString(), {...this.character, "_id":this.character._id});
      } catch (error) {
        console.error('Failed to update character', error);
      }
    }
  },
  persist: true,
});
