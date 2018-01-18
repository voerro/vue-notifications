import Vue from 'vue';

class Notification {
    constructor() {
        window.NotificationEvent = new Vue();
    }

    push(notification) {
        window.NotificationEvent.$emit('push', notification);
    }
}

export default Notification;