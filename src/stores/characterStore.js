// src/stores/characterStore.js
import { defineStore } from 'pinia';
import { reactive } from 'vue';
import api from '../plugins/axios';

export const useCharacterStore = defineStore('characterStore', {
  state: () => ({
    character: reactive({}),
    originalCharacter: null
  }),
  actions: {
    async getCharacter(id) {
      try {
        const response = await api.get('/character/one/' + id.toString());
        // Replace our character with the response
        Object.assign(this.character, response.data);
        this.originalCharacter = JSON.parse(JSON.stringify(response.data));
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
        this.originalCharacter = JSON.parse(JSON.stringify(response.data));
      } catch (error) {
        console.error('Failed to create a new character: ', error);
      }
    },
    setCurrentCharacter(character) {
      Object.assign(this.character, character);
      this.originalCharacter = JSON.parse(JSON.stringify(character));
    },
    async updateCharacter(id) {
      if (!this.originalCharacter) {
        console.warn('Character data has not been retrieved from the backend.');
        return;
      }

      const updatedFields = {};
      const compareObjects = (obj1, obj2, path = '') => {
        for (const key in obj1) {
          if (Object.prototype.hasOwnProperty.call(obj1,key)) {
            const newPath = path ? `${path}.${key}` : key;
            if (typeof obj1[key] === 'object' && obj1[key] !== null) {
              compareObjects(obj1[key], obj2[key], newPath);
            } else if (obj1[key] !== obj2[key]) {
              updatedFields[newPath] = obj1[key];
            }
          }
        }
      };

      compareObjects(this.character.value, this.originalCharacter);

      if (Object.keys(updatedFields).length === 0) {
        return;
      }

      try {
        const response = await api.patch('/character/one/' + id.toString(), {...updatedFields, "_id":this.character._id});
        // Update the original character data with the new changes
        this.originalCharacter = JSON.parse(JSON.stringify(this.character.value));
        console.log(response);
      } catch (error) {
        console.error('Failed to update character', error);
      }
    }
  },
  persist: true,
});
