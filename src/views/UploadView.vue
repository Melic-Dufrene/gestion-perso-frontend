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
            :src="imageBlobUrls[image.id]"
            alt="Image"
            height="100px"
            style="object-fit: contain;"
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
            :src="imageBlobUrls[selectedImage]"
            max-height="80vh"
            contain
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { reactive } from "vue";
import api from "../plugins/axios";

export default {
  data() {
    return {
      images: [],
      imageBlobUrls: reactive({}), // Store blob URLs for images
      dialog: false,
      selectedImage: null
    };
  },
  created() {
    this.fetchImages();
  },
  methods: {
    async fetchImageBlob(imageUrl, imageId) {
      try {
        const response = await api.get(imageUrl, {
          responseType: 'blob'
        });
        const blobUrl = URL.createObjectURL(response.data);
        this.imageBlobUrls[imageId] = blobUrl; // Dynamically add blob URL
      } catch (error) {
        console.error("Error fetching image blob:", error);
      }
    },
    async fetchImages() {
      try {
        const response = await api.get('/images/all');
        this.images = response.data.images;
        for (const image of this.images) {
          await this.fetchImageBlob(image.url, image.id);
        }
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
          const response = await api.post('/images/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          this.images.push(response.data);
          await this.fetchImageBlob(response.data.url, response.data.id); // Fetch blob for the new image
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    },
    async removeImage(id) {
      try {
        await api.delete(`/images/one/${id}`);
        this.images = this.images.filter(image => image.id !== id);
        delete this.imageBlobUrls[id]; // Remove blob URL
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    },
    viewImage(image) {
      this.selectedImage = image.id;
      this.dialog = true;
    }
  }
};
</script>
