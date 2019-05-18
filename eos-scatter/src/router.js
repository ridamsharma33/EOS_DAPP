import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Payment from './views/Payment.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/payment',
      name: 'payment',
      component: Payment
    }
  ]
});
