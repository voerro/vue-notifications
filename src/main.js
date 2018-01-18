import Vue from 'vue'

import Notifications from './components/Notifications.vue'
import notify from './interface'
window.notify = notify;
Vue.component('notifications', Notifications);

new Vue({
  el: '#app'
})

export { Notifications, notify };