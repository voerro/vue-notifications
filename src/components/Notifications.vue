<template>
    <div class="voerro-notifications-container" :class="this.class">
        <notification v-for="item in items"
            :key="item.id"
            :data-notification="item"
            :data-theme="theme"
            :hide-after="delay"
            @destroy="pull(item.id)"></notification>

        <audio id="voerro-notifications-player" :src="sound" v-if="sound"></audio>
    </div>
</template>

<script>
    import Notification from './Notification.vue';

    export default {
        props: [
            'position',
            'theme',
            'hideAfter',
            'single',
            'sound',

            'firstNotification',
            'firstTheme',
        ],

        components: { Notification },

        data() {
            return {
                class: this.position ? this.position : 'bottom-right',
                items: [],
                count: 0,
                delay: this.hideAfter ? this.hideAfter : 5000,
            };
        },

        watch: {
            position() {
                this.class = this.position ? this.position : 'bottom-right';
            }
        },

        created() {
            window.NotificationEvent.$on('push', (notification) => {
                this.push(notification);
            });

            if (this.firstNotification) {
                this.push({
                    text: this.firstNotification,
                    theme: this.firstTheme ? this.firstTheme : ''
                });
            }
        },

        methods: {
            push(notification) {
                if (this.single === 'true') {
                    // Only show the last notification
                    this.items.splice(0, this.items.length);
                }

                let method = 'push';

                if (this.class.substring(0, 6) === 'bottom') {
                    method = 'unshift';
                }

                this.items[method]({ 
                    id: this.count++,
                    notification: notification 
                });

                this.playSound();
            },

            pull(id) {
                this.items.forEach((item, index) => {
                    if (item.id == id) {
                        this.items.splice(index, 1);
                        return;
                    }
                });
            },

            playSound() {
                if (this.sound) {
                    let player = document.getElementById('voerro-notifications-player')
                    
                    player.currentTime = 0;
                    player.play();
                }
            },
        }
    }
</script>

<style scoped>
.voerro-notifications-container {
    position: fixed;
    width: 25%;
    z-index: 100;
}

/* Possible notification container positions */
.top-left {
    top: .5rem;
    left: 1rem;
}
.bottom-left {
    bottom: 0.91rem;
    left: 1rem;
}

.top-right {
    top: .5rem;
    right: 1rem;
}
.bottom-right {
    bottom: .5rem;
    right: 1rem;
}

.top-center {
    width: 50%;

    top: .5rem;
    left: 25%;
}
.bottom-center {
    width: 50%;

    bottom: .5rem;
    left: 25%;
}
</style>
