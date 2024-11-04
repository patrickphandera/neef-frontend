<template>
  <div>
    <div class="text-center font-weight-black text-h6 elevation-2 text-uppercase pa-4">
      loan eligibility checker
    </div>
    <v-card
      class="mx-auto mt-12 elevation-1 "
      max-width="344"
      
    >     <div class="text-center font-weight-black pa-2">LOGIN</div>
    <v-container class="text-black text-left text-green d-flex justify-center">
 
      <v-img src="/download (15).jpeg" height="80px" width="auto"></v-img>
      <div>
        <v-icon icon="mdi-chevron-menu" color="green" size="12"></v-icon>
      </div>
    </v-container>
      <v-container>
        <v-text-field
        density="compact"
          v-model="credentials.username"
          color="green"
          label="Username"
         variant="outlined"
        ></v-text-field>
        <v-text-field
        density="compact"
          v-model="credentials.password"
          color="green"
          label="Password"
           type='password'
          variant="outlined"
        ></v-text-field>
          <v-checkbox
        density="compact"
          v-model="terms"
          color="green"
          label="I agree to terms and conditions here"
        ></v-checkbox>
      </v-container>
      <v-card-actions >
        <v-btn color="green" block variant="flat" class=" px-4 text-none" @click="Login()">
          Next
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn  block variant="outline" class="text-none align-self-end" to="/register">
          New Member?  <span class="text-green">Register Now</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
  </template>






<script>
  import { loginUser } from '../services/auth.service'; 
    export default {
      data: () => ({
        errormsg: '',
        error: false,
        credentials: {
        username: '',
        password: ''
      },
        first: null,
        last: null,
        email: null,
        password: null,
        terms: false,
      }),
      methods: {
    async Login() {
      try {
       
        // Call the login service with the user credentials
        let formData=new FormData()
        formData.append('username',this.credentials.username)
        formData.append('password',this.credentials.password)
        const response = await loginUser(formData);
        console.log(response)
        // Handle successful login (e.g., redirect to another page, show a success message)
        // console.log(response.data.role)
  
        if(response.role=='admin'){
          this.$router.push('/admin'); // Redirect to a dashboard or other page
}else if(response.role=='loan-officer'){
  this.$router.push('/loan-officer'); // Redirect to a dashboard or other page
}else{
  this.error=true
  this.errormsg='Your account is being reviewed, you will be communicated once the process is completed'
  alert(this.errormsg)
}
      } catch (error) {
        // Handle login errors (e.g., show an error message)
        this.error=String(error.response.data.msg)
        console.error('Login failed:', error);
        alert('Login failed:'+this.error)
        
      }
    }
    }
  }
  </script>
    <style>
    .bg-blue-darken-4 {
      background-color: #236b15; /* Your primary color */
      color: whitesmoke;
    }</style>

    
