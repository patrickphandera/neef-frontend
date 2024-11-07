<template>
    <div class="">
      <v-card  class="ma-2">
        <v-row class="my-1">
         
        <v-col cols="auto" class=" mx-2 "><v-icon color="warning"> mdi-alert-circle</v-icon>  ONLY <span class="font-weight-black">MWK</span> is accepted</v-col>
      
        <v-col cols="auto" class="mx-2"><v-icon color="success" > mdi-alert-circle</v-icon>   <span class="font-weight-black">Your data is in a file? </span> Enable file processor  </v-col>
        <v-col class="auto"></v-col>
        <v-col></v-col>

        <div class="mr-6">
          <v-switch
          density="compact"
          v-model="toggle"
          color="green"
          label="Enable file processor"
        ></v-switch>
        </div>
        <!-- <v-btn class="ma-6 text-none elevation-0" color="green" append-icon="mdi-file-document">Rather upload file</v-btn> -->
     
      </v-row>
      </v-card>
      <v-card class="px-4 pt-1 ma-2" v-if="!toggle" >
        <div class="font-weight-black pb-4">
          Fill in the the parameters
        </div>
        <v-row>
          <v-col cols="6" >
            <v-select v-model="user.gender" label="Gender" variant="outlined" :items="['Male','Female']" density="compact" color="green"></v-select>
          </v-col>
          <v-col cols="6" >
            <v-text-field :rules="[rules.required, rules.ageRange]" v-model="user.age" label="Age" variant="outlined" type="number" hint="Current age of apprecant" color="green" density="compact"></v-text-field>
          </v-col>
          <v-col cols="6" >
            <v-text-field v-model="user.dependents" density="compact" label="Dependents" variant="outlined" type="number" color="green" hint="Number of directly dependant of the applicant"></v-text-field>
          </v-col>
          <v-col cols="6" >
            <v-text-field v-model="user.income" density="compact" label="Income" variant="outlined" type="number" color="green" hint="Monthy cummulative revenue of the applicant"></v-text-field>
          </v-col>
          <v-col cols="6" >
            <v-text-field v-model="user.loanamount" density="compact" label="loan Amount" variant="outlined" type="number" color="green" hint="Amount of loan requested by the applicant"></v-text-field>
          </v-col>
          <v-col cols="6" >
            <v-text-field v-model="user.collateral" density="compact" label="Collateral" variant="outlined" type="number" color="green" hint="Loan collateral of the applicant"></v-text-field>
          </v-col>
          <v-col cols="6" >
            <v-text-field v-model="user.term" density="compact" label="Term" variant="outlined" type="number" color="green" hint="Duration(months) for loan payment"></v-text-field>
          </v-col>
          <v-col cols="6" >
            <v-text-field v-model="user.rate" density="compact" label="Rate" variant="outlined" type="number" color="green" hint="Payment rate associated with the loan"></v-text-field>
          </v-col>
          <v-col cols="6" >
            <v-select density="compact" v-model="user.loantype" label="Loan Type" variant="outlined" type="number" color="green" :items="['Youth Enterprise', 'Women Empowerment']" hint="Category of loan requested by applicant"></v-select>
          </v-col>
          
        </v-row>
      </v-card>
      <v-card class="ma-1 bg-grey-lighten-3 elevation-0" v-if="!toggle">
        <v-row>
          <v-col cols="auto"></v-col>
          <v-col></v-col><v-btn class="my-6 text-none" color="green" variant="outlined" @click="user={}">Clear</v-btn>
<v-btn class="ma-6 text-none" color="green" @click="verify()" :disabled="!(processing=='')" v-show="processing==''">Verify</v-btn>
<v-btn class="ma-6 text-none" color="green"  :disabled="!(processing=='verifying')" loading v-show="processing=='verifying'">Validating data..</v-btn>
<v-btn class="ma-6 text-none" color="green"  :disabled="!(processing=='predicting')" loading v-show="(processing=='predicting')">Predicing results..</v-btn>
</v-row>
      </v-card>

      <v-card class="mx-2" v-if="toggle" ><v-file-input @change="onFileChange" variant="outlined" label="Select the file"  class="mt-2 mx-4" color="green" density="compact" prepend-icon=""  v-model="file">
      
      </v-file-input>
      <v-row class="py-1">
        
        <v-btn class="mx-8 text-none mb-4 elevation-0" color="green" @click="uploadFile()" append-icon="mdi-upload">Upload</v-btn>
      </v-row>
      </v-card>


<v-card v-if="!tableResulted" class="px-2 pt-4 ma-2">
  <v-row>
  <div class="mx-2 mb-8 ml-8">Prediction results</div> <v-col cols="auto"></v-col> <v-col></v-col><v-btn @click="downloadCSV()" class="mr-8 " variant="flat bg-green text-none" append-icon="mdi-download">Download</v-btn></v-row>
  <v-table density="compact">
    <v-table-titl></v-table-titl>
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



      <v-card class="px-2 ma-1" v-if="toggle && tableResulted" >
        <div class="mx-4 text-h6 ">
          Parameters description
        </div>
        <v-row>
          <v-col cols="6" >
            <v-list-item>
            <div>
              <div class='text-h6'>Gender</div>
              <div>Type: String</div>
              <div>Possible Values: <em>'Male'</em>, <em>'Female'</em></div>
              <div>Description: Gender of the applicant.</div>
              <div>Validation: Required</div>
            </div>
          </v-list-item>
          </v-col>
          <v-col cols="6" >
            <v-list-item>
            <div>
              <div class="text-body-1">Age</div>
              <div class="text-body-1">Type: Number</div>
              <div class="text-body-1">Possible Values: Any positive integer</div>
              <div class="text-body-1">Description: Current age of the applicant.</div>
              <div class="text-body-1">Validation: Must be a positive number</div>
            </div>
          </v-list-item>
          </v-col>
          <v-col cols="6" >
            <v-list-item>
            <div>
              <div>Dependents</div>
              <div>Type: Number</div>
              <div>Possible Values: Any non-negative integer</div>
              <div>Description: Number of dependents directly relying on the applicant.</div>
              <div>Validation: Cannot be negative</div>
            </div>
          </v-list-item>
          </v-col>
          <v-col cols="6" >
            <v-list-item>
            <div>
              <div>Income</div>
              <div>Type: Number</div>
              <div>Possible Values: Any positive number</div>
              <div>Description: Monthly cumulative income of the applicant.</div>
              <div>Validation: Must be a positive number</div>
            </div>
          </v-list-item>
          </v-col>
          <v-col cols="6" >
            <v-list-item>
            <div>
              <div>Loan Amount</div>
              <div>Type: Number</div>
              <div>Possible Values: Any positive number</div>
              <div>Description: Amount of loan requested by the applicant.</div>
              <div>Validation: Must be a positive number</div>
            </div>
          </v-list-item>
          </v-col>
          <v-col cols="6" >
            <v-list-item>
            <div>
              <div>Collateral</div>
              <div>Type: Number</div>
              <div>Possible Values: Any non-negative number</div>
              <div>Description: Collateral value provided by the applicant.</div>
              <div>Validation: Cannot be negative</div>
            </div>
          </v-list-item>
          </v-col>
          <v-col cols="6" >
            <v-list-item>
            <div>
              <div>Term</div>
              <div>Type: Number</div>
              <div>Possible Values: Any positive integer (in months)</div>
              <div>Description: Duration in months for loan payment.</div>
              <div>Validation: Must be positive</div>
            </div>
          </v-list-item>
          </v-col>
          <v-col cols="6" >
            <v-list-item>
            <div>
              <div>Rate</div>
              <div>Type: Number</div>
              <div>Possible Values: Any positive number (percentage)</div>
              <div>Description: Payment rate associated with the loan.</div>
              <div>Validation: Must be positive</div>
            </div>
          </v-list-item>
          </v-col>
          <v-col cols="6" >
            <v-list-item>
            <div>
              <div>Loan Type</div>
              <div class="text-h6">Type: String</div>
              <div>Possible Values: <em>'Youth Enterprise'</em>, <em>'Women Empowerment'</em></div>
              <div>Description: Category of loan requested by the applicant.</div>
              <div>Validation: Required</div>
            </div>
          </v-list-item>
          </v-col>
          
        </v-row>
      </v-card>
</div>
  </template>
  
  <script>
  import {getData, postData,postData1,putData,downloadData} from '../services/rest.services'
  export default {
    data () { 
        
      return{
        tableResulted:true,
        required: (value) => !!value || 'Required.',
         ageRange: (value) =>
          (value >= 18 && value <= 75) || 'Age must be between 18 and 75',
        loans: [
        {
          Age: 33,
          Collateral: 8686,
          Dependents: 12,
          Gender: 0,
          Income: 2882,
          LoanAmount: 7676,
          LoanType: 0,
          Rate: 9,
          Result: "Eligible",
          Term: 8686
        },
        {
          Age: 21,
          Collateral: 96996,
          Dependents: 7,
          Gender: 0,
          Income: 29292,
          LoanAmount: 6887,
          LoanType: 2,
          Rate: 1,
          Result: "Eligible",
          Term: 878
        },
        {
          Age: 60,
          Collateral: 696,
          Dependents: 0,
          Gender: 1,
          Income: 9696,
          LoanAmount: 686,
          LoanType: 1,
          Rate: 9,
          Result: "Eligible",
          Term: 868
        },
        {
          Age: 53,
          Collateral: 887,
          Dependents: 21,
          Gender: 1,
          Income: 877,
          LoanAmount: 6766,
          LoanType: 1,
          Rate: 10,
          Result: "Eligible",
          Term: 89
        },
        {
          Age: 45,
          Collateral: 655,
          Dependents: 9,
          Gender: 0,
          Income: 776,
          LoanAmount: 667,
          LoanType: 1,
          Rate: 90,
          Result: "Eligible",
          Term: 445
        }
      ],
        results:{},
        processing:'',
        user:{},
        toggle:false,
        file: null,
        fileName:'',
        fileExtension :''
      }
        
      },
      methods:{
        downloadCSV() {
    const headers = ["Age", "Gender", "Dependents", "Income", "LoanAmount", "Collateral", "Term", "Rate", "LoanType", "Result"];
    const rows = this.loans.map(item => ({
      ...item,
      Gender: item.Gender === 0 ? 'Male' : 'Female'
    }));

    const csvContent = [
      headers.join(","), // Add headers
      ...rows.map(row => headers.map(fieldName => JSON.stringify(row[fieldName])).join(","))
    ].join("\n");

    // Create a blob from the CSV content and trigger the download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "loan_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
        async predict(){
  if (this.file) {
     
       

        try {
          this.processing='validating'
          const response = await postData(
            {
"filename" :this.fileName,
"filetype" :this.fileExtension
    
          },'predict_many');
          this.processing=''
          return response
        } catch (error) {
          console.error('Error uploading file:', error.response.data);
          alert(error.response.data)
          return error
        }
      } else {
        alert('Please select a file first.');
      }
},
async validate(){
  if (this.file) {

        try {
          this.processing='validating'
          const response = await postData(
            {
"filename" :this.fileName,
"filetype" :this.fileExtension
    
          },'process');
          this.processing=''
          return response
        } catch (error) {
          console.error('Error uploading file:', error.response.data);
          alert(error.response.data)
          return error
        }
      } else {
        alert('Please select a file first.');
      }
},

        onFileChange(event) {
      this.file = event.target.files[0];
      if (this.file) {
        this.fileName = this.file.name; // Get the full file name
        this.fileExtension = this.fileName.split('.').pop(); // Extract the file extension
      }
    },
    async uploadFile() {
      if (this.file) {
        const formData = new FormData();
        formData.append('file', this.file);

        try {
          this.processing='uploading'
          const response = await postData1(formData,'upload');
          this.processing=''

          if(response){
          alert(response+', started validating..')
         let result= await this.validate()

         if(result){
          alert('Finish succefully dalidation started validating..')
          this.results= await this.predict()
          console.log(this.results)
          this.tableResulted=false
         }
          
          }
 
        } catch (error) {
          console.error('Error uploading file:', error.response.data);
          alert(error.response.data)
        }
      } else {
        alert('Please select a file first.');
      }
    },
      async verify(){
    this.loading=true
        this.errormsg =''
      try {

        // const formData = new FormData();
        // formData.append('age', this.user.age);
        // formData.append('gender', this.user.gender);
        // formData.append('dependents', this.user.dependents);
        // formData.append('income', this.user.income);
        // formData.append('loanamount', this.user.loanamount);
        // formData.append('collateral', this.user.collateral);
        // formData.append('term', this.user.term);
        // formData.append('rate', this.user.rate);
        // formData.append('loantype', this.user.loantype);

        if( this.user.gender){
        this.user.gender=this.user.gender=='Male'? 0:1
        }


        if(this.user.loantype){
        this.user.loantype = this.user.loantype === 'Youth Enterprise' ? 0 : (this.user.loantype === 'Women Empowerment' ? 1 : 0);
        }


        const response = await postData(this.user, `predict`);
        this.errormsg = response;
        this.success = true;
        this.error = false;
        this.loading=false
        alert(response.prediction)
      } catch (error) {
        this.loading=false
        this.success = false;
        this.error = true;
        
        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.error
  
        ) {
          console.log(error)
          this.errormsg = String(error.response.data.error);
          window.alert(this.errormsg)
        }
      }
  },
}
  };
  </script>
  
  
  