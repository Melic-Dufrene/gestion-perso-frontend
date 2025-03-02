import {createRouter, createWebHistory} from 'vue-router';
import ShopView from '../views/ShopView.vue';
import SpellsView from '../views/SpellView.vue';
import CharacterView from '../views/CharacterView.vue';
import ProfileView from '../views/ProfileView.vue';
import InventoryView from '@/views/InventoryView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import UploadView from '@/views/UploadView.vue';

const routes = [
  {
    path: '/',
    redirect: '/profile', // Redirect to the Profile tab by default
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/shop',
    name: 'Shop',
    component: ShopView,
  },
  {
    path: '/spells',
    name: 'Spells',
    component: SpellsView,
  },
  {
    path: '/character',
    name: 'Character',
    component: CharacterView,
  },
  {
    path: '/character/inventory',
    name: 'Inventory',
    component: InventoryView,
  },
  {
    path: '/uploads',
    name:'Upload',
    component:UploadView
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");
  if (!isAuthenticated && to.path !== "/login" && to.path !== "/register") {
    next("/login");
  } else {
    next();
  }
});

export default router;