<template>
  <div class="">
    <v-card  class="ma-2" density="compact">
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
    <v-card class="pa-4" density="compact">
<div>Infor <v-icon>mdi-information</v-icon></div>
<div>
{{ messages}}
</div>
    </v-card>
    <v-card class="">
<v-card-title class="font-weight-black text-overline">RESULTS <v-icon>mdi-information</v-icon> : <span class=" text-red font-weight-black" v-if="outcome.prediction=='Not eligible'">{{ outcome.prediction }} <v-icon>mdi-close-circle</v-icon></span>       <span v-if="outcome.prediction=='Eligible'" class="text-success font-weight-black">{{ outcome.prediction }} <v-icon>mdi-check-circle</v-icon></span> <span class="" v-if="outcome.prediction=='Negative numbers are not allowed'" >{{ outcome.prediction }} </span></v-card-title>
    </v-card>
    
    





    <v-card class="px-4 pt-1 ma-2" v-if="!next" >
      <div class="font-weight-black pb-4">
        Fill in the the parameters
      </div>
      <v-row>
        <v-col cols="6" >
          <div><v-icon>mdi-information</v-icon><span class="Number of people that directly depend on applicant font-weight-black"> Gender:</span> Applicant's gender</div>
          <v-select v-model="user.gender" label="Enter Gender..." variant="outlined" :items="['Male','Female']" density="compact" color="green"></v-select>

        </v-col>
        
        <v-col cols="6" >
          <div><v-icon>mdi-information</v-icon><span class="Number of people that directly depend on applicant font-weight-black" placeholder="shhhhhhhhhhh..."> Dependant:</span> Number of of people that depend on the applicant</div>
          <v-text-field v-model="user.dependents" density="compact" label="Dependents" variant="outlined" type="number" color="green"></v-text-field>
          

        </v-col>
        <v-col cols="6" >
          <div><v-icon>mdi-information</v-icon><span class="Number of people that directly depend on applicant font-weight-black"> Age:</span> Applicant's age</div>
          <v-text-field  v-model="user.age" label="Age" variant="outlined" type="number"  color="green" density="compact"></v-text-field>

        </v-col>
        <v-col cols="6" >
          <div><v-icon>mdi-information</v-icon><span class="Number of people that directly depend on applicant font-weight-black"> Income:</span> Amount of money earned monthly</div>
          <v-text-field v-model="user.income" density="compact" label="Income" variant="outlined" type="number" color="green"></v-text-field>

        </v-col>
        <v-col cols="6" >
          <div><v-icon>mdi-information</v-icon><span class="Number of people that directly depend on applicant font-weight-black"> Loan amount:</span> Amount of money to be borrow</div>
          <v-text-field v-model="user.loanamount" density="compact" label="loan Amount" variant="outlined" type="number" color="green" ></v-text-field>

        </v-col>
        <v-col cols="6" >
          <div><v-icon>mdi-information</v-icon><span class="Number of people that directly depend on applicant font-weight-black"> Collateral:</span> Property value</div>
          <v-text-field v-model="user.collateral" density="compact" label="Collateral" variant="outlined" type="number" color="green" ></v-text-field>

        </v-col>
        <v-col cols="6" >
          <div><v-icon>mdi-information</v-icon><span class="Number of people that directly depend on applicant font-weight-black"> Term:</span> Perid of loan repayment (in Months)</div>
          <v-text-field v-model="user.term" density="compact" label="Term" variant="outlined" type="number" color="green" ></v-text-field>

        </v-col>
        <v-col cols="6" >
          <div><v-icon>mdi-information</v-icon><span class="Number of people that directly depend on applicant font-weight-black"> Interest rate:</span> Amount of money paid on top of the amount borrowed </div>
          <v-text-field v-model="user.rate" density="compact" label="Rate" variant="outlined" type="number" color="green" ></v-text-field>
        </v-col>
        <v-col cols="6" >
          <div><v-icon>mdi-information</v-icon><span class="Number of people that directly depend on applicant font-weight-black"> Loan type:</span> Category of loan</div>
          <v-select density="compact" v-model="user.loantype" label="Loan Type" variant="outlined" type="number" color="green" :items="['Youth Enterprise', 'Women Enterprise','Men Enterprise']" ></v-select>
        </v-col>
        
      </v-row>
      <v-row>
        <v-col cols="auto"></v-col>
        <v-col></v-col>
        <!-- <v-btn class="my-6 text-none" color="green" variant="outlined" @click="user={}">Clear</v-btn> -->
<v-btn class="ma-6 text-none" color="green" append-icon="mdi-chevron-right"  @click="next=!next" >Next</v-btn>

<!-- <v-btn class="ma-6 text-none" color="green"  :disabled="!(processing=='predicting')" loading v-show="(processing=='predicting')">Predicing results..</v-btn> -->
</v-row>
    </v-card>
    <v-card class="ma-2 pa-2 pt-4"   v-if="next && !toggle">
      <v-card-title class="mb-4">Collaterals</v-card-title>
      <v-row>
        <v-col cols="6">
          <div><v-icon>mdi-information</v-icon><span class="Number of people that directly depend on applicant font-weight-black"> Quollateral type:</span> Items for collateral</div>
      <v-select :items="['Vehicle','Land','House']" variant="outlined" density="compact"></v-select>
    </v-col>  <v-col cols="6">
      <div><v-icon>mdi-information</v-icon><span class="Number of people that directly depend on applicant font-weight-black"> Reg number:</span> Vehicle's number plate</div>
      <v-text-field   variant="outlined" density="compact"></v-text-field>
    </v-col>
    </v-row>

    </v-card>
    <v-card class="ma-1 bg-grey-lighten-3 elevation-0"  v-if="next && !toggle">
      <v-row>
        <v-col cols="auto"></v-col>
        <v-col></v-col><v-btn class="my-6 text-none" color="green" variant="outlined" @click="next=!next">Back</v-btn>
<v-btn class="ma-6 text-none" color="green" @click="submitData()" :disabled="!(processing=='')" v-show="processing==''" >Predict</v-btn>
<v-btn class="ma-6 text-none" color="green"  :disabled="!(processing=='verifying')" loading v-show="processing=='verifying'">Validating data..</v-btn>
<v-btn class="ma-6 text-none" color="green"  :disabled="!(processing=='predicting')" loading v-show="(processing=='predicting')">Predicing results..</v-btn>
</v-row>
    </v-card>












    <v-card class="mx-2" v-if="toggle" ><v-file-input @change="onFileChange" variant="outlined" label="Select the file"  class="mt-2 mx-4" color="green" density="compact" prepend-icon=""  v-model="file">
    
    </v-file-input>
    <v-row class="py-1">
      
      <v-btn class="mx-8 text-none mb-4 elevation-0" color="green" @click="postData11()" append-icon="mdi-upload">Upload</v-btn>
    </v-row>
    </v-card>

    <v-card class="my-4 mx-2" v-if="toggle">
      <v-card-title>
        Infor <v-icon>mdi-information</v-icon>
      </v-card-title>
      {{ messages }}
    </v-card>
<v-card v-if="!tableResulted && toggle" class="px-2 pt-4 ma-2">
<v-row>
  <v-row>
    
  </v-row>
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
import axios from 'axios';
import {getData, postData,postData1,putData,downloadData, getAllData} from '../services/rest.services'
export default {
  data () { 
      
    return{
      messages: '',
      next: false,
      outcome: '',
      tableResulted:true,
      filename: '',
      filetype: '',
      required: (value) => !!value || 'Required.',
       ageRange: (value) =>
        (value >= 18 && value <= 75) || 'Age must be between 18 and 75',
      loans: [
     
     
      
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
async predict() {
  if (this.file) {
    this.filename = this.file.name; // Full name with extension, e.g., "document.pdf"
    this.filetype = this.file.name.split('.').pop(); // Get the extension only, e.g., "pdf"
    try {
      this.processing = 'validating';
      const formData = new FormData();
      formData.append("file", this.file); // Append the actual file
      const response = await axios.post("https://neefaiappbackend-1.onrender.com/predict_many", 
      {
"filename" :this.fileName,
"filetype" :this.fileExtension
  
        }, {
        headers: {
           'Content-Type': 'application/json'
        },
      });
      this.processing = '';
      this.tableResulted=false
      this.loans=await response.data
return response.data
   } catch (error) {
       console.error('Error uploading file:', error.response.data);
       this.messages=error.response.data;
      return error;
    
  }
}
},

async validate(){
if (this.file) {

      try {
        this.processing='validating'
        const response = await axios.post("https://neefaiappbackend-1.onrender.com/process",
          {
"filename" :this.fileName,
"filetype" :this.fileExtension
  
        },
      {
        headers: {
           'Content-Type': 'application/json'
        },
      }
      );
        this.processing=''
        return response
        
      } catch (error) {
        console.error('Error uploading file:', error.response.data);
        this.messages=error.response.data
        return error
      }
    } else {
      this.messages='Please select a file first.';
    }
},

      onFileChange(event) {
    this.file = event.target.files[0];
    if (this.file) {
      this.fileName = this.file.name; // Get the full file name
      this.fileExtension = this.fileName.split('.').pop(); // Extract the file extension
    }
  },

  async postData11() {
  try {
   this.loans=[]
    const formData = new FormData();
    formData.append('file', this.file);
    const response = await axios.post('https://neefaiappbackend-1.onrender.com/upload',formData);
    
    console.log('Response data:', response.data);  // Handle success
    
    if(response){
        this.messages='started validating'
       let result= await this.validate()

       if(result){
        this.messages='Finish succefully'
        this.results= await this.predict()
        console.log(this.results)
        this.tableResulted=false
       }
        
        }
  } catch (error) {
    this.messages='File failed to load';  // Handle error
  }
  this.tableResulted=false
},
  async uploadFile() {
    if (this.file) {
      const formData = new FormData();
      formData.append('file', this.file);
console.log(this.file)
      try {
        this.processing='uploading'
        this.messages='uploading'
        const response = await axios.post('upload', formData);
        this.processing=''

        if(response){
        // this.messages='Started validating..'
       let result= await this.validate()

       if(result){
        this.messages = 'Finish succefully dalidation'
        this.results= await this.predict()
        console.log(this.results)
        this.tableResulted=false
       }
        
        }

      } catch (error) {
        this.messages='Error uploading file'
        this.messages=error.response.data
      }
    } else {
      this.messages='Please select a file first.';
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
      this.messages=response.prediction
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
        this.messages=this.errormsg
        // window.alert(this.errormsg)
      }
    }

},

async submitData() {

  let loantypeValue;
if (this.user.loantype === 'Women Enterprise') {
  loantypeValue = 0;
} else if (this.user.loantype === 'Men Enterprise') {
  loantypeValue = 1;
} else if (this.user.loantype === 'Youth Enterprise') {
  loantypeValue = 2;
} 
  if(this.user.income<0 || this.user.loanamount<0  || this.user.age<0 || this.user.collateral<0 || this.user.term<0 || this.user.rate<0 )
  {

    this.messages='Negative numbers are not allowed'
  }else{
    try {
      const requestData = {
    gender: this.user.gender=='Male' ? 0:1,
    age: this.user.age,
    dependents : this.user.dependents,
    income: this.user.income,
    loanamount: this.user.loanamount,
    collateral: this.user.collateral,
    rate : this.user.rate,
    term: this.user.term,
    loantype: loantypeValue ,
  };
    const response = await axios.post('https://neefaiappbackend-1.onrender.com/predict', requestData,{
      headers: {
          'Content-Type': 'application/json', // Set content type
        }
    });
    this.messages='Results generated successfully'
    this.outcome=response.data
  } catch (error) {
    // Handling different error types
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Error response data:', error.response.data);
      this.messages=error.response.data.error
      
      console.error('Error response status:', error.response.status);
    } else if (error.request) {
      // Request was made but no response received
      this.messages='No response received'
      console.error('No response received:', error.request);
    } else {
      this.messages='Request error'
      // Error setting up the request
      console.error('Request error:', error.message);
    }
  }

// Call the function to send the request
}
}
},

}
</script>


