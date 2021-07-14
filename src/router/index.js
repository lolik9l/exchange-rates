import Vue from 'vue';
import VueRouter from 'vue-router';
import StartScreen from '../views/StartScreen.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'StartScreen',
    component: StartScreen,
  },
  {
    path: '/settings',
    name: 'SettingsScreen',
    component: () => import('../views/SettingsScreen.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
