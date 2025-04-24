// src/stores/characterStore.js
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import api from '../plugins/axios';

export const useUserStore = defineStore('userStore', {
    state: () => ({
        user: reactive({}),
        char_list: reactive([]),
        current_character: ref(0)
    }),
    actions: {
        async getCharacters() {
            try {
                const response = await api.get('/character/all');
                Object.assign(this.char_list, response.data);
            } catch (error) {
                console.error('Failed to get characters', error);
            }
        },
        async getUserInfos() {
            try {
                const response = await api.get('/user/infos');
                Object.assign(this.user, response.data);
            } catch (error) {
                console.error('Failed to get user info', error);
            }
        }
    },
    persist: true,
});