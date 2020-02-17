import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import WeekView from './components/WeekView.vue';
import SingleUser from './components/SingleUser.vue';
import Settings from './components/Settings.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
        path: '/WeekView',
        name: 'WeekView',
        component: WeekView,
      },
      {
        path: '/SingleUser',
        name: 'SingleUser',
        component: SingleUser,
      },
      {
        path: '/Settings',
        name: 'Settings',
        component: Settings,
      },

      
  ],
});
