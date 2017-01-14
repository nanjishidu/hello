<template>
    <transition name="slide" mode="out-in">
            <router-view class="view"></router-view>
    </transition>
</template>
<script>
    export default {
        data() {
            return {}
        },
        mounted() {
            this.appShow()
        },
        methods: {
            appShow() {
            	console.log()
                const END_TIME = new Date().getTime() //结束时间
                const diffTime = END_TIME - PAGE_START_TIME 
                const timer = setTimeout(() => {
                    clearTimeout(timer)
                    document.querySelector('.app-loading').className += ' app-loading-hide'
                }, diffTime > 2000 ? 0 : 2000 - diffTime)
            }
        }
    }
</script>
<style scode>
	.slide-enter {
        transform: translate3d(100%, 0, 0);
    }
    
    .slide-enter-active {
        animation: slideIn .2s forwards;
    }
    
    .slide-leave-active {
        opacity: 0;
        transition: opacity .2s ease;
    }
    
    @keyframes slideIn {
        from {
            transform: translate3d(100%, 0, 0);
        }
        to {
            transform: translate3d(0, 0, 0);
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translate3d(0, 0, 0);
        }
        to {
            transform: translate3d(100%, 0, 0);
        }
    }
</style>