<template>
    <v-container>
        <div ><v-text-field
              v-model="searchQuery"
              label="Search"
              append-inner-icon="mdi-magnify"
              density="compact"
             
              clearable
              variant="solo"
            ></v-text-field></div>
      <v-row>
        <v-col>
          <v-toolbar color="green" dark density="compact">
            <v-toolbar-title>Users <v-icon size='20px'>mdi-format-list-bulleted</v-icon>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            
            <v-btn color="secondary" @click="openDialog()">Add User</v-btn>
          </v-toolbar>
  
          <v-data-table
            density="compact"
            :headers="headers"
            :items="filteredUsers"
            class="elevation-1"
            :loading="loading"
            loading-text="Loading users..."
            item-key="_id"
            
          >           
            <template v-slot:item.actions="{ item }">
              <v-btn icon @click="openDialog(item)" variant="text">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="red" @click="deleteUser(item._id)" variant="text">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
  
      <!-- Dialog for Add/Edit User -->
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title class="bg-green">
            <span class="headline">{{ editedUser._id ? 'Edit User' : 'Add User' }}</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="editedUser.fullname"
                label="Full Name"
                required
                density="compact"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                v-model="editedUser.email"
                label="Email"
                required
                type="email"
                density="compact"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                v-model="editedUser.phone"
                label="Phone"
                required
                density="compact"
                variant="outlined"
              ></v-text-field>
              <v-select
                :items="['admin', 'loan-officer']"
                v-model="editedUser.role"
                label="Role"
                required
                density="compact"
                variant="outlined"
              ></v-select>
              <v-text-field
                v-model="editedUser.password"
                label="Password"
                :type="showPassword ? 'text' : 'password'"
                required
                variant="outlined"
              >
                <template v-slot:append-inner>
                  <v-icon @click="showPassword = !showPassword">
                    {{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}
                  </v-icon>
                </template>
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green" text @click="closeDialog()" class="text-none">Cancel</v-btn>
            <v-btn
              color="green"
              variant="flat"
              class="text-none"
              @click="editedUser._id ? updateUser() : createUser()"
            >Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  import { getAllData, putData, postData, deleteData } from '../services/rest.services';
  
  export default {
    data() {
      return {
        users: [],
        searchQuery: '',
        headers: [
          { text: 'Full Name', value: 'fullname' },
          { text: 'Email', value: 'email' },
          { text: 'Phone', value: 'phone' },
          { text: 'Password', value: 'password' },
          { text: 'Role', value: 'role' },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        loading: false,
        dialog: false,
        valid: false,
        showPassword: false,
        editedUser: { fullname: '', email: '', phone: '', role: '', password: '' } // Initialize with empty values
      };
    },
    computed: {
      filteredUsers() {
        if (!this.searchQuery) return this.users;
        const query = this.searchQuery.toLowerCase();
        return this.users.filter(user =>
          Object.values(user).some(value =>
            String(value).toLowerCase().includes(query)
          )
        );
      }
    },
    methods: {
      async fetchUsers() {
        this.loading = true;
        try {
          this.users = await getAllData('users');
        } catch (error) {
          console.error(error);
          alert(`Failed to load users: ${error.response?.data?.msg || 'An error occurred.'}`);
        } finally {
          this.loading = false;
        }
      },
      openDialog(user = null) {
        this.editedUser = user
          ? { ...user }
          : { fullname: '', email: '', phone: '', role: '', password: '' };
        this.dialog = true;
      },
      closeDialog() {
        this.dialog = false;
        this.editedUser = { fullname: '', email: '', phone: '', role: '', password: '' };
      },
      async createUser() {
        try {
          if (!this.$refs.form.validate()) return;
          await postData(this.editedUser, 'register');
          await this.fetchUsers();
          this.closeDialog();
        } catch (err) {
          alert(err.response?.data?.msg || 'Error creating user');
        }
      },
      async updateUser() {
        try {
          if (!this.$refs.form.validate()) return;
          let user = {
            fullname: this.editedUser.fullname,
            email: this.editedUser.email,
            phone: this.editedUser.phone,
            role: this.editedUser.role,
            password: this.editedUser.password
          };
          await putData(user, `user/${this.editedUser._id}`);
          await this.fetchUsers();
          this.closeDialog();
        } catch (err) {
          alert(err.response?.data?.msg || 'Error updating user');
        }
      },
      async deleteUser(userId) {
        try {
          if (confirm('Are you sure you want to delete this user?')) {
            await deleteData(`user/${userId}`);
            await this.fetchUsers();
          }
        } catch (error) {
          console.error(error);
          alert(`Failed to delete user: ${error.response?.data?.msg || 'An error occurred.'}`);
        }
      }
    },
    async created() {
      await this.fetchUsers();
    }
  };
  </script>
  
  <style scoped>
  /* Custom styles */
  </style>
  