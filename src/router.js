import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/order',
      name: 'Order',
      component: () => import('./views/Orders.vue')
    },
    {
      path: '/payments/creditcard',
      name: 'Credit Card',
      component: () => import('./views/payments/CreditCard.vue')
    },
    {
      path: '/payments/ecpay',
      name: 'EC Pay',
      component: () => import('./views/payments/ECPay.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
