import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export default createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        primary: '#8B4513', // Brown (wooden)
        secondary: '#FFD700', // Gold
        accent: '#FFA500', // Orange
      },
    },
  },
});