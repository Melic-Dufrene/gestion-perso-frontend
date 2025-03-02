// src/stores/characterStore.js
import { defineStore } from 'pinia';
import { reactive } from 'vue';
import api from '../plugins/axios';

export const useCharacterStore = defineStore('characterStore', {
  state: () => ({
    character: reactive ({
      lvl: 1,
      exp: 0,
      name: "Name",
      race: "Elfe",
      profession: "Guerrier",
      hp: 1,
      age: 0,
      weight: 0,
      height: 0,
      ac: {
        front: 10,
        back: 10,
        front_w_shield: 10
      },
      alignement: "Neutre/Neutre",
      stats: {
        strength: 8,
        intelligence: 8,
        wisdom: 8,
        constitution: 8,
        dexterity: 8,
        charisma: 8,
        beauty: 8
      },
      abilities: [
        "Résistance aux sorts de sommeil et de charme 90%",
        "Infrarouge à 20m",
        "Détection des portes cachées 16% sans recherche, 50% avec recherche",
        "Détection des portes secrètes 33% avec recherche",
        "Bonus d'attaque avec épées et arcs +1",
        "Surprise ennemie: 66% sans bruit, 33% en ouvrant une porte"
      ]
    }),
    originalCharacter: null
  }),
  actions: {
    async getCharacter() {
      try {
        const response = await api.get('/character/');
        // Replace our character with the response
        Object.assign(this.character, response.data);
        this.originalCharacter = JSON.parse(JSON.stringify(response.data));
      } catch (error) {
        console.error('Failed to get character', error);
      }
    },
    async postCharacter() {
      try {
        await api.post('/character/', this.character);
      } catch (error) {
        console.error('Failed to post character', error);
      }
    },
    async updateCharacter() {
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

      compareObjects(this.character, this.originalCharacter);

      if (Object.keys(updatedFields).length === 0) {
        console.log('No changes detected.');
        return;
      }

      try {
        const response = await api.patch('/character/', {...updatedFields, "_id":this.character._id});
        console.log('Updated fields:', response.data);
        // Update the original character data with the new changes
        this.originalCharacter = JSON.parse(JSON.stringify(this.character));
      } catch (error) {
        console.error('Failed to update character', error);
      }
    }
  }
});
