<template>
  <div>
   <div class="text-center font-weight-black text-h6 elevation-2 text-uppercase pa-4">
      Neef Loan reconmender
    </div>
    <v-card
      class="mx-auto  elevation-1  mt-12"
      max-width="344"
      
    >
    <div class="text-center font-weight-black px-2 text-uppercase mt-2">register</div>
   
      <v-container>
        <v-text-field
        density="compact"
          v-model="fullname"
          color="green"
          label="Full name"
          variant="outlined"
        ></v-text-field>
  
        <v-text-field
        density="compact"
          v-model="email"
          color="green"
          label="Email"
          type="email"
         variant="outlined"
        ></v-text-field>
  
        <v-text-field
        density="compact"
          v-model="phone"
          color="green"
          label="Phone number"
           variant="outlined"
        ></v-text-field>
  
        <v-text-field
        density="compact"
          v-model="password"
          color="green"
          label="Password"
           type='password'
          variant="outlined"
        ></v-text-field>
        <v-text-field
        density="compact"
         type='password'
          v-model="comfrimPassword"
          color="green"
          label="Comfirm password"
          variant="outlined"
        ></v-text-field>
        <v-checkbox
        density="compact"
          v-model="terms"
          color="green"
          label="I agree to terms and conditions here"
        ></v-checkbox>
        <v-btn color="green" block variant="flat" class="text-none" @click="register()">
          Next
  
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
  
        <v-btn  block variant="outline" class="text-none" to="/login">
          Already Member?  <span class="text-green">log In</span>
        </v-btn>
      </v-container>
  
     
  
    
    </v-card>
  </div>
  </template>
<script>
import { registerUser } from '../services/auth.service';
  export default {
    data: () => ({
      error: null,
      files: [],
      fullname: null,
      phone: null,
      email: null,
      password: null,
      comfrimPassword: null,
      terms: false,
    }),
    methods: {
  async register() {
    try {
     let formData=new FormData()
     formData.append('fullname',this.fullname)
     formData.append('phone',this.phone)
     formData.append('email',this.email)
     formData.append('password',this.password)
     formData.append('role','user')
      const result = await registerUser(formData);
      console.log('User registered successfully:', result);
      this.$router.push('/login');
    } catch (error) {
      this.error=String(error.response)
      alert(error.response.data.msg)
      console.error(error.response.data.msg);
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