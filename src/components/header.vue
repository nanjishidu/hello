<template>
    <div class="v-header">
        <div class="header">                
            <div class="header_left">
            <slot name="left"></slot>
                <a v-if="canBack" class="icon-chevron-left" @click="doBack"></a>
            </div>
            <div class="header_center">
                    <slot name="center"></slot>
            </div>
            <div class="header_right">
                    <slot name="right"></slot>
                    <a v-if="canSetup" class="icon-cog" @click="doSetup"></a>
                    <a v-if="canClose" class="icon-remove" @click="doBack"></a>
            </div>
        </div>
        <div class="header_space"></div>
    </div>
</template>
<script>
    export default {
        props:{
            canBack: { type: Boolean, default: false },
            canSetup: { type: Boolean, default: false },
            canClose: { type: Boolean, default: false },
        },
        data(){
            return {}
        },
        methods: {
            doBack() {
                this.$router.back();
            },
            doSetup() {
                this.$router.push("/my/setup");
            }
        }
    }
</script>