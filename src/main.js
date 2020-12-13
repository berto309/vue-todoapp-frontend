import Vue from "vue"; // Import Vue

import VueRouter from "vue-router"; // Import Vue router

import { ValidationProvider } from 'vee-validate'; // Import Vee-validate 
Vue.component('ValidationProvider', ValidationProvider)

import Master from "./components/layouts/Master.vue";

import { store } from "./store/store"; // Import store for state management with Vuex

import routes from "./routes"; // Import routes from route js file



// Define a global Event Hub to listen and dispatch events
//between components
// This is the event hub we'll use in every
// component to communicate between them.
window.EventHub = new Vue();

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: "history",
});

// Route Navigation Guards

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isLoggedIn) {
      next({
        name: "login",
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresVisitor)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.getters.isLoggedIn) {
      next({
        name: "todos",
      });
    } else {
      next();
    }
  }
  {
    next(); // make sure to always call next()!
  }
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Master),
  store: store,
  router,
}).$mount("#app");
