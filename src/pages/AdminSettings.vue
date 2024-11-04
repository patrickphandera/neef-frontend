<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12" md="10">
        
        <div class="mx-2">
        <!-- <v-card class="bg-white rounded-xl my-4 " density="compact"> -->
          <v-text-field
            v-model="searchQuery"
            density="compact"
            label="Search Users"
            variant="solo"
            class=" my-4 ml-2"
            append-inner-icon="mdi-magnify"
          ></v-text-field>
        <!-- </v-card> -->
      </div>
      </v-col>
      <v-col cols="12" md="2">
        <v-btn
          append-icon="mdi-plus"
          variant="flat"
          color='green'
          class="text-none elevation-1 mx-2 text-white mt-4 mb-2 "
          @click="dialog=true"
        >
          Add user
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="!gameloaded" align="center" justify="center" dense class="mb-1 mx-1">
      <v-col cols="12 mt-2">
        <SkeletonCard />
      </v-col>
    </v-row>

    <div class="mr-3" v-if="gameloaded">
      <v-data-table
        class="pa-4 ma-2 rounded-lg"
        :headers="headers"
        :items="users"
        :sort-by="[{ key: 'phone', order: 'asc' }]"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon class="me-2" @click="editItem(item)">mdi-square-edit-outline</v-icon>
          
          <v-icon color="warning" @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </div>
    <!-- Add/Edit User Dialog -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="bg-green">
          <span class="text-subtitle-1 text-lowercase font-weight-black">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field variant="outlined" v-model="editedItem.fullname" label="Fullname" density="compact"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field variant="outlined" v-model="editedItem.email" label="Email" density="compact"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field variant="outlined" v-model="editedItem.phone" label="Phone" density="compact"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  density="compact"
                  :items="['user', 'admin', 'loan manager']"
                  variant="outlined"
                  v-model="editedItem.role"
                  label="Role"
                ></v-select>
              </v-col>
              <v-col cols="12">
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="green text-capitalize" variant="outlined" @click="close">Cancel</v-btn>
          <v-btn class="bg-green text-capitalize" variant="outline" @click="save">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Are you sure you want to delete this user?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" variant="text" @click="closeDelete">Cancel</v-btn>
          <v-btn color="green" variant="text" @click="deleteItemConfirm">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { getAllData, putData,postData } from '../services/rest.services';


export default {

  data() {
    return {
      gameloaded: false,
      dialog: false,
      dialogDelete: false,
      headers: [
        { title: 'Fullname', key: 'fullname' },
        { title: 'Email', key: 'email' },
        { title: 'Phone', key: 'phone' },
        { title: 'Role', key: 'role' },
        { title: 'Actions', key: 'actions', sortable: false },
      ],
      users: [],
      editedIndex: -1,
      editedItem: {
        fullname: '',
        email: '',
        phone: '',
        role: '',
       
      },
      defaultItem: {
        fullname: '',
        email: '',
        phone: '',
        role: '',
        
      },
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New User' : 'Edit User';
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      try {
        this.gameloaded = false;
        this.users = await getAllData('users');
        this.gameloaded = true;
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    },
    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = { ...item };
      this.dialog = true;
    },
    async save() {
      try {
        if (this.editedIndex > -1) {
          Object.assign(this.users[this.editedIndex],this.editedItem);
          let updatedUser = await putData(this.editedItem, `users/${this.editedItem._id}`);
          Object.assign(this.users[this.editedIndex], updatedUser);
          window.alert('User updated successfully')
          this.dialog = true;
        } else {
          let newUser = await postData(form, 'users');
          this.users.push(newUser);
          window.alert('User added successfully')
          this.dialog = true;
        }
        this.close();
      } catch (error) {
        console.error('Failed to save user:', error);
        window.alert('Failed to save user')
      }
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },
  },
};
</script>


