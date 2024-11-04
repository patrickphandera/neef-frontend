<template>
    <v-app >
     
    <v-navigation-drawer
          app
          permanent
          right
          width="280"
          elevation="1"
        >
        <v-list title="gfgfgfg">
          
            <v-list-item class="mb-5"
             
            >
              <template v-slot:prepend>
                <v-avatar image="/download.jfif"></v-avatar>
                
                <div class="ma-1 text-subtitle-2">Antony Kamowa</div><v-divider vertical></v-divider>
                <div class="ma-1 font-weight-bold">Admin</div>
            
              </template>
              <template v-slot:append>
               
               
                <v-btn
                  icon="mdi-tune"
                  size="small"
                
                  variant="text"
                ></v-btn>
              </template>
              
            </v-list-item>
            
            <v-divider ></v-divider>
            <!-- <v-list-item value="hdhd">
              <template v-slot:prepend>
                <v-avatar  size="x-small">
                  <v-icon icon="mdi-plus-circle" color="blue-darken-4"></v-icon>
                </v-avatar>
               
                <div class="ma-2 text-blue-darken-4">Add task</div>
                
               
              </template>
             
             </v-list-item> -->
             <v-list-item value="calendar" to="/admin/users">
              <template v-slot:prepend>
                <v-avatar  size="x-small">
                  <v-icon icon="mdi-crosshairs-question"></v-icon>
                </v-avatar>
               
                <div class="ma-2">Users</div>
                
               
              </template>
              <template v-slot:append>
               
               
            <v-icon>mdi-chevron-right</v-icon>
              </template>
             </v-list-item>
            
             <!-- <v-list-item value="today" to="/admin/settings">
              <template v-slot:prepend>
                <v-avatar  size="x-small">
                  <v-icon icon="mdi-tune"></v-icon>
                </v-avatar>
               
                <div class="ma-2">Settings</div>
                
               
              </template>
              <template v-slot:append>
               
               
                <v-icon>mdi-chevron-right</v-icon>
              </template>
             </v-list-item>      -->
          </v-list>
        </v-navigation-drawer>
  
        <!-- App Bar -->
        <v-app-bar
          density="compact"
          elevation="1"
        >
          <v-btn icon>
            <v-icon>mdi-menu-open</v-icon>
          </v-btn>
  
          <div class="py-2" ><v-avatar size="small" image='/download (15).jpeg'>
            
          </v-avatar></div><div class="mx-2 font-weight-black">NEEF</div>
  
          <v-spacer></v-spacer>
  
         
         
          <v-spacer></v-spacer>
          <template v-slot:append><v-btn color="black" variant="outlined"  class="mr-2 text-none"  to='/auth/login'>Docs</v-btn><v-btn color="black" variant="flat"  class="mr-2 text-none" append-icon="mdi-logout" to='/auth/login'>Logout</v-btn></template>
        </v-app-bar>
     <v-main class="bg-grey-lighten-3">
      <router-view>
        
      </router-view>
     </v-main>
      
    </v-app>
  </template>
  
  
  <script>
  export default {
    name: 'InsideLayout',
    data() {
      return {
        tab: null,
        items: [
          {
            title: 'Item #1',
            value: 1,
            props: {
              prependIcon: 'mdi-home',
            },
          },
          {
            title: 'Item #2',
            value: 2,
            props: {
              appendIcon: 'mdi-close',
            },
          },
          {
            title: 'Item #3',
            value: 3,
            props: {
              color: 'blue-darken-4',
            },
          },
        ],
      };
    },
  };
  </script>
  
  <style>
  @import 'vuetify/styles';
  
  .parent-container {
    display: flex;
    align-items: center; /* Centers the child vertically */
    justify-content: center; /* Centers the child horizontally */
    height: 87px; /* Adjust this to the desired height of the parent container */
  }
  
  .custom-text-field {
    width: 200px; /* Adjust the width as needed */
  }
  </style>
  