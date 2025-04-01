import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
loadFonts();

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);
app.use(pinia);

import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify'; // Import Vuetify
import { loadFonts } from './plugins/webfontloader'; // Optional: For loading fonts
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';



app.use(vuetify);
app.use(router);
app.mount('#app');
