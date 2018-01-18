import Vue from 'vue'
import Notifications from './components/Notifications.vue'
import Notification from './Notification'

window.Notification = new Notification;

Vue.component('notifications', Notifications);

new Vue({
  el: '#app'
})

export { Notifications, Notification };