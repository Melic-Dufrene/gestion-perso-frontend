<template>
  <v-container>
    <v-file-input
      label="Upload Image"
      accept="image/*"
      @change="onFileChange"
    />

    <v-row>
      <v-col
        v-for="(image, index) in images"
        :key="index"
        cols="12"
        sm="4"
        md="3"
      >
        <v-card @dblclick="viewImage(image)">
          <v-img
            :src="image.url"
            height="100px"
            contain
          />
          <v-card-actions>
            <v-btn
              color="red"
              @click="removeImage(image.id)"
            >
              Supprimer
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog
      v-model="dialog"
      max-width="90%"
    >
      <v-card>
        <v-card-title>
          <v-btn
            icon
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="d-flex justify-center">
          <v-img
            :src="selectedImage"
            max-height="80vh"
            contain
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      images: [],
      dialog: false,
      selectedImage: null
    };
  },
  created() {
    this.fetchImages();
  },
  methods: {
    async fetchImages() {
      try {
        const response = await axios.get('/api/images');
        this.images = response.data;
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    },
    async onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        try {
          const response = await axios.post('/api/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          this.images.push(response.data);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    },
    async removeImage(id) {
      try {
        await axios.delete(`/api/images/${id}`);
        this.images = this.images.filter(image => image.id !== id);
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    },
    viewImage(image) {
      this.selectedImage = image.url;
      this.dialog = true;
    }
  }
};
</script>
