import Vue from 'vue'
import Notifications from './components/Notifications.vue'
import notify from './interface'

window.notify = notify;

if (document.querySelector('#voerro-notifications-demo-app-nnpqbywihspyskxjjiky')) {
    window.Notifications = Notifications;
}

export default Notifications;