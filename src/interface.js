import Vue from 'vue';

window.NotificationEvent = new Vue();

let notify = (notification) => {
    window.NotificationEvent.$emit('push', notification);
}

export default notify;