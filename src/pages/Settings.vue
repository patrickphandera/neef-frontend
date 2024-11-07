<template>
  <div>
   
  
    <div >
    
  <div >
    <v-row>
        <v-col v-col cols="12 ">
        
    <v-list class="   rounded-lg elevation-0 bg-transparent ">
  <v-list-item
  > 
  <v-btn
         color='green'
          append-icon="mdi-account"
          class="" variant="outline" size="30" 
        >
        
        </v-btn> <span class="ml-2">Profile</span>
  <template v-slot:append>
          <div class="justify-self-end mr-2" > 
          
          </div>
        </template></v-list-item>
  </v-list>
  </v-col>
  </v-row>
  </div>
  <div class="ml-2">
    <v-row class="elevation-1 bg-white ma-2 rounded-lg pt-4">
        <v-col cols="12">
            <v-text-field
            density="compact"
    variant="outlined"
      label="Full name"
      v-model="user.fullname"
      prepend-inner-icon="mdi-text"
      class="mx-2"
      ></v-text-field>
      <v-text-field
      prepend-inner-icon="mdi-account"
      density="compact"
       v-model="user.phone"
      variant="outlined"
      label="Phone"
      class="mx-2"
      ></v-text-field>
      <v-text-field
      prepend-inner-icon="mdi-email"
      density="compact"
      variant="outlined"
       v-model="user.email"
      label="Email"
      class="mx-2"
      ></v-text-field>
      <v-select
      density="compact"
       v-model="user.role"
        disabled
     variant="outlined"
      label="Role"
      :items="['admin','loan-officer']"
      class="mx-2"
      ></v-select>     
        </v-col>
        
    </v-row>
  </div>
  <div >
     
       <v-row>
           <v-col v-col cols="12 ">
           
       <v-list class="   rounded-lg elevation-0 bg-transparent">
     <v-list-item
     > 
     <template v-slot:append>
             <div class="justify-self-end mr-2" > <v-btn color='green' variant='flat' @click="submit()"
          class="  text-capitalize "
        >
          Update Profile 
        </v-btn>
             </div>
           </template></v-list-item>
     </v-list>
     </v-col>
     </v-row>
     </div>

  </div>
  </div>
  </template>
  <script>
  import {putData,postData,getData} from '../services/rest.services'
    export default {
      data: () => ({
        gameloaded:false,
        user_:{},
        user:{
          id :localStorage.getItem('user'),
        },
      }),
      methods:{
async submit(){
  try{


let user= await {
  email:this.user.email,fullname:this.user.fullname,phone:this.user.phone,role:this.user.role
}
 let user_=await putData(user,`user/${this.user._id}`)
 console.log(user)
 this.user_ =await user_
 alert('User updated successfully')
}catch(err){
alert('Update failed due to unknown error')
}
},       
 async getInfor() {
      try {
        this.gameloaded=false
        const response = await getData('user',this.user.id);
        this.user=await response
  this.gameloaded=true
      } catch (error) {
        // Handle login errors (e.g., show an error message)
        this.error=String(error.response)
        console.error('Login failed:', error);
      }
    }
      },
      async mounted(){
  await this.getInfor()
      }
    }
  </script>
  <style scoped>
  .bg-blue-darken-4 {
    background-color: #236b15; /* Your primary color */
    color: whitesmoke;
  }
  
  .bg-secondary1 {
    background-color: grey-lighten-4; /* Your secondary color */
  }
  </style>
  
