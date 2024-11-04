<template>
    <div>
     
    
      <div >
       
    <div >
      <v-row>
          <v-col v-col cols="12 ">
          
      <v-list class="   rounded-lg elevation-0 bg-transparent">
    <v-list-item
    
    > 
    <v-btn
           
            append-icon="mdi-apps"
            class=" bg-blue-darken-4 text-font-weight-black" variant="outline" size="30" 
          >
           
          </v-btn> <span class="ml-2">Profile</span>
    <template v-slot:append>
            <div class="justify-self-end mr-2" > <v-btn
          
         
         class=" bg-blue-darken-4 text-capitalize "
         append-icon="mdi-square-edit-outline"
       >
        
     
         Edit Profile 
         
     
       
       </v-btn>
             
            
            </div>
          </template></v-list-item>
    </v-list>
    </v-col>
    </v-row>
    </div>
    <v-row v-if="!gameloaded" align="center" justify="center" dense class="mb-1 mx-1" >
          <v-col
          
            
            cols="12 mt-2"
           
          >
          <SkeletonCard></SkeletonCard> 
          </v-col>
          
        </v-row>
    <div class="ml-2" v-if="gameloaded">
      <v-row class="elevation-1 bg-white ma-2 rounded-lg">
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
         prepend-inner-icon="mdi-human-non-binary"
        density="compact"
         v-model="user.gender"
       variant="outlined"
        label="Gender"
        :items="['Male','Female','Prefer not to say']"
        class="mx-2"
        ></v-select>
       
        <v-select
         prepend-inner-icon="mdi-map-marker-right"
        density="compact"
         v-model="user.district"
       variant="outlined"
        label="District"
        :items="districts"
        class="mx-2"
        ></v-select>
        <v-text-field
         prepend-inner-icon="mdi-crown"
        density="compact"
      variant="outlined"
         v-model="user.ta"
        label="TA"
        class="mx-2"
        ></v-text-field>
       
          </v-col>
          
      </v-row>
    </div>
    
    <v-list-item>
          <template v-slot:append>
            <div class="justify-self-end">
             
            
            </div>
          </template>
        </v-list-item>
    </div>
    </div>
    </template>
    <script>
    import {getData} from '../../services/rest.services'
    import SkeletonCard from '../../components/SkeletonCard.vue'
      export default {
        components:{SkeletonCard},
        data: () => ({
          gameloaded:false,
          user:{
            id :localStorage.getItem('user'),
          },
          districts:
          [
      "Blantyre",
      "Chiradzulu",
      "Chitipa",
      "Dedza",
      "Dowa",
      "Karonga",
      "Kasungu",
      "Likoma",
      "Lilongwe",
      "Machinga",
      "Machinga",
      "Mangochi",
      "Mchinji",
      "Mulanje",
      "Mwanza",
      "Mzimba",
      "Mzuzu",
      "Nkhata Bay",
      "Nkhotakota",
      "Ntcheu",
      "Ntchisi",
      "Phalombe",
      "Rumphi",
      "Salima",
      "Thyolo",
      "Zomba"
    ],
    
          messages: [
            {
              from: 'You',
              message: `Sure, I'll see you later.`,
              time: '10:42am',
              color: 'deep-purple-lighten-1',
            },
            {
              from: 'John Doe',
              message: 'Yeah, sure. Does 1:00pm work?',
              time: '10:37am',
              color: 'green',
            },
            {
              from: 'You',
              message: 'Did you still want to grab lunch today?',
              time: '9:47am',
              color: 'deep-purple-lighten-1',
            },
          ],
        }),
        methods:{
          async getInfor() {
        try {
          this.gameloaded=false
          const response = await getData('users',this.user.id);
          this.user=await response
          
    console.log(response)
    this.gameloaded=true
        } catch (error) {
          // Handle login errors (e.g., show an error message)
          this.error=String(error.response.data.msg)
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
    