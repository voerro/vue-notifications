import Vue from 'vue'
import Notifications from './components/Notifications.vue'
import notify from './interface'

window.notify = notify;

if (document.querySelector('#voerro-notifications-demo-app-nnpqbywihspyskxjjiky')) {
    Vue.component('notifications', Notifications);
    
    new Vue({
        el: '#voerro-notifications-demo-app-nnpqbywihspyskxjjiky'
    });
}

export default Notifications;