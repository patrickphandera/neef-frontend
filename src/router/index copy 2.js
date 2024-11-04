// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import About from '../pages/About.vue';
import Register from '../pages/Register.vue';
import Login from '../pages/Login.vue';
import Docs from '../components/Docs.vue';
import Otp from '../pages/Otp.vue';
import Verify from '../pages/Verify.vue';
import Settings from '../pages/Settings.vue';
import AdminSettings from '../pages/AdminSettings.vue';
import Users from '../pages/Users.vue';
import MainLayout from '../layouts/MainLayout.vue';
import InsideLayout from '../layouts/InsideLayout.vue';
import AdminLayout from '../layouts/AdminLayout.vue';

const routes = [
  {
    path: '',
    name: 'HomePage',
    redirect: '/login',
    component: MainLayout,
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      { path: 'otp', component: Otp }
    ]
  },
  {
    path: '/loan-officer',
    name: 'Inside',
    redirect: '/loan-officer/verify',
    component: InsideLayout,
    children: [
      { path: 'docs', component: Docs },
      { path: 'verify', component: Verify }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    redirect: '/admin/users',
    component: AdminLayout,
    children: [
      { path: 'users', component: Users },
      { path: 'settings', component: AdminSettings }
    ]
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  // List of routes that don’t require authentication
  const publicPages = ['HomePage', 'AboutPage', 'Register', 'Login', 'Otp'];
  const authRequired = !publicPages.includes(to.name);
  const isAuthenticated = localStorage.getItem('token'); // Replace 'token' with the key name used in localStorage

  if (authRequired && !isAuthenticated) {
    next('/login'); // Redirect to login page if not authenticated
  } else {
    next(); // Continue to the route if authenticated or accessing a public page
  }
});

export default router;
