<template>
    <div v-text="`${notification.id} - ${notification.text}`"
        @click="hide($event.target)"
        class="notification"
        :class="this.theme ? this.theme : 'light-blue'"></div>
</template>

<script>
export default {
    props: [
        'notification',
        'theme'
    ],

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

<style scoped>
.notification {
    margin: .5rem 0;
    padding: 1rem;

    border-radius: .3rem;
    box-shadow: 0 0 1rem 0rem rgb(0, 0, 0, 0.5);
    filter: opacity(90%);
}

/* Themes */
.black {
    background: #000000;
    color: #fff;
}
.white {
    background: #fff;
    color: #000000;
}
.blue-grey {
    background: #455A64;
    color: #fff;
}
.grey {
    background: #616161;
    color: #fff;
}
.brown {
    background: #5D4037;
    color: #fff;
}
.deep-orange {
    background: #DD2C00;
    color: #fff;
}
.orange {
    background: #FF6D00;
    color: #000;
}
.amber {
    background: #FFAB00;
    color: #000;
}
.yellow {
    background: #FFD600;
    color: #000;
}
.lime {
    background: #AEEA00;
    color: #000;
}
.light-green {
    background: #64DD17;
    color: #000;
}
.green {
    background: #00C853;
    color: #000;
}
.teal {
    background: #00BFA5;
    color: #000;
}
.cyan {
    background: #00B8D4;
    color: #000;
}
.light-blue {
    background: #0091EA;
    color: #fff;
}
.blue {
    background: #2962FF;
    color: #fff;
}
.indigo {
    background: #304FFE;
    color: #fff;
}
.deep-purple {
    background: #6200EA;
    color: #fff;
}
.purple {
    background: #AA00FF;
    color: #fff;
}
.pink {
    background: #C51162;
    color: #fff;
}
.red {
    background: #D50000;
    color: #fff;
}
</style>
