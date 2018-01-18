<template>
    <div v-text="`${notification.id} - ${notification.text}`"
        @click="hide($event.target)"
        class="voerro-notification"></div>
</template>

<script>
export default {
    props: ['notification'],

    mounted() {
        setTimeout(() => {
            this.hide(this.$el);
        }, 5000);
    },

    methods: {
        hide(target) {
            // Maybe I'll add more styles/effects for hiding notifications someday
            // That's why I'm not calling fadeOut() directly
            target.style.opacity = 1;
            
            this.fadeOut(target);
        },

        fadeOut(target) {   
            if (! target || target.style.opacity <= 0) {
                this.destroy();
                
                return;
            }

            target.style.opacity -= .1;

            setTimeout(() => this.fadeOut(target), 25);
        },

        destroy() {
            this.$emit('destroy');
        }
    }
}
</script>

<style>
.voerro-notification {
    /* TEMPORRAY */
    border: 1px solid #ff0000;
    padding: 1rem;
    background: #eaeaea;
}
</style>
