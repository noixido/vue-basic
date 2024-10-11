import { createWebHistory, createRouter } from 'vue-router'

import Login from '../components/Auth/Login.vue'
import Dashboard from '../components/Dashboard.vue'
import MainLayout from '../components/Layout/MainLayout.vue'
import Home from '../components/Pages/Home.vue'
import About from '../components/Pages/About.vue'
import University from '../components/Pages/University.vue'
import AdminProfile from '../components/Pages/AdminProfile.vue'

const routes = [
  { 
    path: '/', 
    name: 'login',
    component: Login,
    props: true, 
    meta: {
      guest: true,
    },
  },
    { 
      path: '/dashboard', 
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
        role: 'Employee',
      },
      
  },
  { 
      path: '/', 
      component: MainLayout,
      children: [{
        path: 'home',
        name: 'home',
        component: Home,
        meta: {
          requiresAuth: true,
          role: 'Admin',
        },
      },
      {
        path: 'about',
        name: 'about',
        component: About,
        meta: {
          requiresAuth: true,
          role: 'Admin',
        },
      },
      {
        path: 'university',
        name: 'university',
        component: University,
        meta: {
          requiresAuth: true,
          role: 'Admin',
        },
      },
      {
        path: 'profile/admin',
        name: 'profile-admin',
        component: AdminProfile,
        meta: {
          requiresAuth: true,
          role: 'Admin',
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  if(to.matched.some((record) => record.meta.requiresAuth)){
    if(!isAuthenticated){
      next({
        path: '/',
        query: {
          redirect: to.fullPath,
        },
      });
    }else{
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload.role;

      if(to.meta.role && to.meta.role !== role){
        next({
          path: '/',
        });
      }else{
        next();
      }
    }
  }else if(to.matched.some((record) => record.meta.guest)){
    if(isAuthenticated){
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload.role;

      if(role === 'Admin'){
        next({
          path: '/home',
        });
      }else if(role === 'Employee'){
        next({
          path: '/dashboard',
        });
      }
    }else{
      next();
    }
  }else{
    next();
  }
});

export default router;