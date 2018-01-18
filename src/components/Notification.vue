<template>
    <div v-html="text"
        @click="hide($event.target)"
        class="notification"
        :class="theme"></div>
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
            if (! element.classList.contains('notification')) {
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
