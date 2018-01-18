<template>
    <div v-html="text"
        @click="hide($event.target)"
        class="voerro-notification"
        :class="`voerro-notification-theme-${theme}`"></div>
</template>

<script>
export default {
    props: [
        'dataNotification',
        'dataTheme',
        'hideAfter'
    ],

    data() {
        return {
            notification: this.dataNotification.notification,
            text: '',
            theme: this.dataTheme ? this.dataTheme : 'light-blue',
            delay: this.hideAfter
        };
    },

    mounted() {
        // An object with options
        if (typeof this.notification === 'object') {
            if (this.notification.text === undefined) {
                console.error('A notification must have a "text" property.');

                this.destroy();

                return;
            }

            this.text = this.notification.text;
            
            this.theme = this.notification.theme ? this.notification.theme : this.theme;

            this.delay = this.notification.hideAfter
                ? this.notification.hideAfter
                : this.delay;
        } else {    // A string
            this.text = this.notification;
        }

        if (this.delay !== 'never') {
            setTimeout(() => {
                this.hide(this.$el);
            }, this.delay);
        }
    },

    methods: {
        getRootElement(element) {
            if (! element.classList.contains('voerro-notification')) {
                return this.getRootElement(element.parentNode);
            }

            return element;
        },

        hide(target) {
            // Get the root element of the notification in case the user clicked
            // on another DOM element (since notifications can contain HTML)
            target = this.getRootElement(target);

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
.voerro-notification {
    margin: .5rem 0;
    padding: 1rem;

    border-radius: .3rem;
    box-shadow: 0 0 1rem 0rem rgb(0, 0, 0, 0.5);
    filter: opacity(90%);
}

/* Themes */
.voerro-notification-theme-black {
    background: #000000;
    color: #fff;
}
.voerro-notification-theme-white {
    background: #fff;
    color: #000000;
}
.voerro-notification-theme-blue-grey {
    background: #455A64;
    color: #fff;
}
.voerro-notification-theme-grey {
    background: #616161;
    color: #fff;
}
.voerro-notification-theme-brown {
    background: #5D4037;
    color: #fff;
}
.voerro-notification-theme-deep-orange {
    background: #DD2C00;
    color: #fff;
}
.voerro-notification-theme-orange {
    background: #FF6D00;
    color: #000;
}
.voerro-notification-theme-amber {
    background: #FFAB00;
    color: #000;
}
.voerro-notification-theme-yellow {
    background: #FFD600;
    color: #000;
}
.voerro-notification-theme-lime {
    background: #AEEA00;
    color: #000;
}
.voerro-notification-theme-light-green {
    background: #64DD17;
    color: #000;
}
.voerro-notification-theme-green {
    background: #00C853;
    color: #000;
}
.voerro-notification-theme-teal {
    background: #00BFA5;
    color: #000;
}
.voerro-notification-theme-cyan {
    background: #00B8D4;
    color: #000;
}
.voerro-notification-theme-light-blue {
    background: #0091EA;
    color: #fff;
}
.voerro-notification-theme-blue {
    background: #2962FF;
    color: #fff;
}
.voerro-notification-theme-indigo {
    background: #304FFE;
    color: #fff;
}
.voerro-notification-theme-deep-purple {
    background: #6200EA;
    color: #fff;
}
.voerro-notification-theme-purple {
    background: #AA00FF;
    color: #fff;
}
.voerro-notification-theme-pink {
    background: #C51162;
    color: #fff;
}
.voerro-notification-theme-red {
    background: #D50000;
    color: #fff;
}
</style>
