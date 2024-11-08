<template>
  <div>
    <v-card class="ma-2">
      <v-row class="my-1">
        <v-col cols="auto" class="mx-2">
          <v-icon color="warning" aria-label="Warning">mdi-alert-circle</v-icon> ONLY <span class="font-weight-black">MWK</span> is accepted
        </v-col>
        
        <v-col cols="auto" class="mx-2">
          <v-icon color="success" aria-label="Success">mdi-alert-circle</v-icon> <span class="font-weight-black">Your data is in a file?</span> Enable file processor
        </v-col>

        <v-col class="auto"></v-col>

        <div class="mr-6">
          <v-switch density="compact" v-model="toggle" color="green" label="Enable file processor"></v-switch>
        </div>
      </v-row>
    </v-card>

    <v-row>
      <v-col cols="8">
        <v-card class="px-4 pt-1 ma-2" v-if="!toggle">
          <div class="font-weight-black pb-4 my-3">LOAN APPLICANT DETAILS</div>
          <v-row>
            <v-col cols="6">
              <v-select v-model="user.gender" label="Select Gender" variant="outlined" :items="['Male','Female']" density="compact" color="green"></v-select>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="user.age" label="Enter Age" variant="outlined" type="number" hint="Current age of applicant" color="green" density="compact"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="user.dependents" density="compact" label="Number of people direectly depend on Applicant" variant="outlined" type="number" color="green"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="user.income" density="compact" label="Monthly Income" variant="outlined" type="number" color="green"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="user.loanamount" density="compact" label="Enter loan amount" variant="outlined" type="number" color="green"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="user.collateral" density="compact" label="Collateral Value" variant="outlined" type="number" color="green"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="user.term" density="compact" label="Repayment Term (Months)" variant="outlined" type="number" color="green"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="user.rate" density="compact" label="Interest Rate (Percentage)" variant="outlined" type="number" color="green"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-select density="compact" v-model="user.loantype" label="Loan Type" variant="outlined" :items="['Youth Enterprise', 'Women Enterprise', 'Men Enterprise']" color="green"></v-select>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="4" v-if="!toggle">
        <v-card height="225px" class="mt-2">
          <v-card-title class="bg-white mt-2 mr-2 font-weight-black">Info <v-icon>mdi-information</v-icon></v-card-title>
          <div class="mx-4 mt-12 text-capitalize">{{ messages }}</div>
        </v-card>

        <v-card height="225px" class="mt-2" >
          <UploadComponent></UploadComponent>
          <v-card-title class="bg-white mt-2 mr-2 font-weight-black">RESULTS</v-card-title>
          <div class="font-weight-black text-h5 mx-4 mt-12 text-uppercase" :class="{ 'text-success': results === 'Eligible', 'text-red': results === 'Not eligible' }"  >
            {{ results }}
            <v-icon v-if="results === 'Eligible' && results !=''" >mdi-check-circle</v-icon>
            <v-icon v-if="results === 'Not eligible' && results !=''">mdi-close-octagon</v-icon>
          </div>
          <v-divider></v-divider>
        </v-card>
      </v-col>
    </v-row>

    <v-card class="ma-1 bg-grey-lighten-3 elevation-0 mx-4" v-if="!toggle">
      <v-row>
        <v-btn class="my-6 text-none mx-4" color="green" variant="outlined" @click="user = {}">CLEAR</v-btn>
        <v-btn class="ma-6 text-none" color="green" @click="verify()" :disabled="processing !== ''" v-show="processing === ''">PREDICT</v-btn>
        <v-btn class="ma-6 text-none" color="green" :disabled="processing !== 'verifying'" loading v-show="processing === 'verifying'">Validating data...</v-btn>
        <v-btn class="ma-6 text-none" color="green" :disabled="processing !== 'predicting'" loading v-show="processing === 'predicting'">Predicting results...</v-btn>
      </v-row>
    </v-card>

    <v-card class="mx-2" v-if="toggle">
      <v-file-input @change="onFileChange" variant="outlined" label="Select the file" class="mt-2 mx-4" color="green" density="compact" v-model="file"></v-file-input>
      <v-row class="py-1">
        <v-btn class="mx-8 text-none mb-4 elevation-0" color="green" @click="uploadFile()" append-icon="mdi-upload">Upload</v-btn>
      </v-row>
    </v-card>

    <v-card v-if="!tableResulted" class="px-2 pt-4 ma-2">
      <v-row>
        <div class="mx-2 mb-8 ml-8">Prediction results</div>
        <v-col cols="auto"></v-col>
        <v-btn @click="downloadCSV()" class="mr-8" variant="flat" color="green" text-none append-icon="mdi-download">Download</v-btn>
      </v-row>
      <v-table density="compact">
        <thead>
          <tr>
            <th class="text-left">Age</th>
            <th class="text-left">Gender</th>
            <th class="text-left">Dependents</th>
            <th class="text-left">Income</th>
            <th class="text-left">Loan Amount</th>
            <th class="text-left">Collateral</th>
            <th class="text-left">Term</th>
            <th class="text-left">Rate</th>
            <th class="text-left">Loan Type</th>
            <th class="text-left">Result</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in loans" :key="index">
            <td>{{ item.Age }}</td>
            <td>{{ item.Gender === 0 ? 'Male' : 'Female' }}</td>
            <td>{{ item.Dependents }}</td>
            <td>{{ item.Income }}</td>
            <td>{{ item.LoanAmount }}</td>
            <td>{{ item.Collateral }}</td>
            <td>{{ item.Term }}</td>
            <td>{{ item.Rate }}</td>
            <td>{{ item.LoanType }}</td>
            <td>{{ item.Result }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </div>
</template>

<script>
import UploadComponent from '../components/uploader.vue'
export default {
  components:{UploadComponent},
  data() {
    return {
      toggle: false,          // Toggles between file and form input
      processing: '',         // Tracks processing status for buttons
      user: {                 // User details model for form input
        gender: '',
        age: null,
        dependents: null,
        income: null,
        loanamount: null,
        collateral: null,
        term: null,
        rate: null,
        loantype: '',
      },
      file: null,             // File model for file input
      loans: [],              // Holds loan data after prediction
      messages: '',           // General information message
      results: '',            // Prediction result
      tableResulted: false,   // Toggles the display of the results table
    };
  },
  methods: {
    verify() {
      if (this.validateForm()) {
      if(this.user.age>75 || this.user.age<18 || this.user.dependents<0 || this.user.dependents>5 || this.user.loanamount>1.5*this.user.collateral || this.user.income>0.25*this.loanamount){
        this.results = 'Not eligible';
      }else if(this.user.dependents<0 ){
 this.messages='Dependants can not be negative'
      }
      else if( this.user.loanamount<0 ){
 this.messages='Loan amount can not be negative'
      }

      else if( this.user.collateral<0 ){
 this.messages='Collateral can not be negative'
      }
      else
      {
      // Verifies user data and triggers prediction
      
        this.processing = 'verifying';
        setTimeout(() => {
          this.processing = 'predicting';
          this.predict();
        }, 1000);
      }
    }
    },
    predict() {
      // Simulate a prediction (Replace this with actual logic)
      setTimeout(() => {
        this.results = Math.random() > 0.5 ? 'Eligible' : 'Not eligible';
        this.processing = '';
        this.tableResulted = true;
      }, 2000);
    },
    validateForm() {
      // Simple validation (Replace with actual validation logic as needed)
      const requiredFields = ['gender', 'age', 'dependents', 'income', 'loanamount', 'collateral', 'term', 'rate', 'loantype'];
      for (let field of requiredFields) {
        if (!this.user[field]) {
          this.messages = 'All fields are required!';
          return false;
        }
      }
      this.messages = '';
      return true;
    },
    clearForm() {
      // Clears form data
      this.user = {
        gender: '',
        age: null,
        dependents: null,
        income: null,
        loanamount: null,
        collateral: null,
        term: null,
        rate: null,
        loantype: '',
      };
    },
    onFileChange(file) {
      // Handles file input change
      this.file = file;
    },
    uploadFile() {
      // Handles file upload
      if (this.file) {
        this.messages = 'File uploaded successfully!';
        // Process the file here
      } else {
        this.messages = 'Please select a file to upload.';
      }
    },
    downloadCSV() {
      // Downloads a CSV file of results
      const csvContent = [
        ['Age', 'Gender', 'Dependents', 'Income', 'Loan Amount', 'Collateral', 'Term', 'Rate', 'Loan Type', 'Result'],
        ...this.loans.map(item => [
          item.Age, item.Gender === 0 ? 'Male' : 'Female', item.Dependents,
          item.Income, item.LoanAmount, item.Collateral, item.Term,
          item.Rate, item.LoanType, item.Result,
        ])
      ].map(e => e.join(",")).join("\n");
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", "loan_results.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
};
</script>
