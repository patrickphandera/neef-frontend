<template>
  <v-container>
    
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      API_BASE_URL :'http://127.0.0.1:5000',
      users: [],
      headers: [
        { text: 'Full Name', value: 'fullname' },
        { text: 'Email', value: 'email' },
        { text: 'Phone', value: 'phone' },
        { text: 'Role', value: 'role' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      loading: false,
      dialog: false,
      valid: false,
      showPassword: false,
      editedUser: null
    };
  },
  methods: {
    fetchUsers() {
      this.loading = true;
      axios.get(`${API_BASE_URL}/users`)  // Adjust the endpoint as needed
        .then(response => {
          this.users = response.data;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
          alert('Failed to load users');
        });
    },
    openDialog(user = null) {
      this.editedUser = user ? { ...user } : { fullname: '', email: '', phone: '', role: '', password: '' };
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
      this.editedUser = null;
    },
    saveUser() {
      if (!this.$refs.form.validate()) return;
      
      const endpoint = this.editedUser._id ? `${API_BASE_URL}/${this.editedUser._id}` : '/api/register';
      const method = this.editedUser._id ? 'put' : 'post';

      axios[method](endpoint, this.editedUser)
        .then(() => {
          this.fetchUsers();
          this.closeDialog();
        })
        .catch(() => alert('Failed to save user'));
    },
    deleteUser(userId) {
      if (confirm('Are you sure you want to delete this user?')) {
        axios.delete(`${API_BASE_URL}/${userId}`)
          .then(() => this.fetchUsers())
          .catch(() => alert('Failed to delete user'));
      }
    }
  },
  created() {
    this.fetchUsers();
  }
};
</script>

<style scoped>
/* You can add custom styles here */
</style>
