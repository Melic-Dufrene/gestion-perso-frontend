<template>
  <v-app-bar
    app
    color="brown-darken-4"
    dark
  >
    <!-- App Title -->
    <v-toolbar-title class="dungeon-font">
      <v-icon left>
        mdi-sword-cross
      </v-icon>
      Dungeons & Dragons
    </v-toolbar-title>

    <v-spacer />

    <!-- Tabs -->
    <v-tabs
      class="dungeon-font"
      slider-color="amber"
    >
      <!--<v-tab to="/roll">
        <v-icon left>mdi-dice</v-icon>
        Roll
      </v-tab>-->
      <v-tab to="/character">
        <v-icon left>
          mdi-account
        </v-icon>
        Personnage
      </v-tab>
      <v-tab to="/shop">
        <v-icon left>
          mdi-sack
        </v-icon>
        Boutique
      </v-tab>
      <v-tab to="/spells">
        <v-icon left>
          mdi-magic-staff
        </v-icon>
        Sorts
      </v-tab>
      <v-tab to="/uploads">
        <v-icon left>
          mdi-upload
        </v-icon>
        Images
      </v-tab>
      <v-tab to="/profile">
        <v-icon left>
          mdi-shield-account
        </v-icon>
        Profil
      </v-tab>
    </v-tabs>
  </v-app-bar>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>

<style scoped>
/* Custom Font for D&D Theme */
.dungeon-font {
  font-family: 'Cinzel', serif;
  font-weight: bold;
  letter-spacing: 1px;
}

/* Custom Background (Optional) */
.v-app-bar {
  background-image: url('https://www.transparenttextures.com/patterns/old-map.png');
  background-size: cover;
  border-bottom: 2px solid #8B4513;
  /* Wooden border */
}

/* Custom Tab Colors */
.v-tab {
  color: #FFD700 !important;
  /* Gold text */
}

.v-tab--active {
  color: #FFA500 !important;
  /* Orange text for active tab */
}
</style>