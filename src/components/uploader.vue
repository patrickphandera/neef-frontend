<template>
  <div>
    <!-- Other parts of the template remain the same -->

    <v-card class="mx-2">
      <v-file-input @change="onFileChange" variant="outlined" label="Select the file" class="mt-2 mx-4" color="green" density="compact" v-model="file"></v-file-input>
      <v-row class="py-1">
        <v-btn class="mx-8 text-none mb-4 elevation-0" color="green" @click="uploadFile" append-icon="mdi-upload">Upload</v-btn>
      </v-row>
    </v-card>

    <v-card v-if="!tableResulted" class="px-2 pt-4 ma-2">
      <v-row>
        <div class="mx-2 mb-8 ml-8">Prediction results</div>
        <v-col cols="auto"></v-col>
        <v-btn @click="downloadCSV" class="mr-8" variant="flat" color="green" text-none append-icon="mdi-download">Download</v-btn>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';
  import {putData,postData,getData} from '../services/rest.services'
export default {
  data() {
    return {
      file: null,
      tableResulted: false,
      // other data properties...
    };
  },
  methods: {
    onFileChange(file) {
      this.file = file;
    },
    async uploadFile() {
      if (this.file) {
        try {
          const formData = new FormData();
          formData.append("file", this.file);

          const response = await postData("//upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          this.tableResulted = true;
          this.loans = response.data.loans; // Assuming server returns loan data
        } catch (error) {
          console.error("File upload failed:", error);
          this.messages = "File upload failed. Please try again.";
        }
      } else {
        this.messages = "Please select a file to upload.";
      }
    },
    async downloadCSV() {
      try {
        const response = await axios.get("/api/download", {
          responseType: "blob",
        });

        const blob = new Blob([response.data], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", "loan_results.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Download failed:", error);
        this.messages = "Failed to download the file.";
      }
    },
  },
};
</script>
