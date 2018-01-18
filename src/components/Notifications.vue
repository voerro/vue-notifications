<template>
    <div class="notifications-container" :class="this.position">
        <notification v-for="item in items"
            :key="item.id"
            :notification="item"
            @destroy="pull(item.id)"></notification>
    </div>
</template>

<script>
    import Notification from './Notification.vue';

    export default {
        props: [
            'position'
        ],

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

<style scoped>
.notifications-container {
    position: fixed;
    width: 25%;
}

/* Possible notification container positions */
.top-left {
    top: 0.9rem;
    left: 1rem;
}
.bottom-left {
    bottom: 0.91rem;
    left: 1rem;
}

.top-right {
    top: 0.9rem;
    right: 1rem;
}
.bottom-right {
    bottom: 0.9rem;
    right: 1rem;
}

.top-center {
    width: 50%;

    top: 0.9rem;
    left: 25%;
}
.bottom-center {
    width: 50%;

    bottom: 0.9rem;
    left: 25%;
}
</style>
