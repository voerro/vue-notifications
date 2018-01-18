<template>
    <div>
        <notification v-for="item in items"
            :key="item.id"
            :notification="item"
            @destroy="pull(item.id)"></notification>
    </div>
</template>

<script>
    import Notification from './Notification.vue';

    export default {
        components: { Notification },

        data() {
            return {
                items: [],
                count: 0
            };
        },

        created() {
            window.NotificationEvent.$on('push', (notification) => {
                this.push(notification);
            });
        },

        methods: {
            push(notification) {
                this.items.push({ 
                    id: this.count++,
                    text: notification 
                });
            },

            pull(id) {
                this.items.forEach((item, index) => {
                    if (item.id == id) {
                        this.items.splice(index, 1);
                        return;
                    }
                });
            },
        }
    }
</script>