<template>
    <div class="v-footer weui-tabbar">
        <template v-for="item in list">
            <router-link :to="item.path"  class="weui-tabbar__item weui_bar__item--on ">
                <div class="weui-tabbar__icon" >
                    <i :class="item.icon"></i>
             	</div>
             	<p class="weui-tabbar__label"  :style="isActive(item.path)">{{item.title}}</p>
            </router-link>
      	</template>
    </div>
</template>
<script>
    export default {
  		name: 'footer',
        data() {
            return {
                list: [
                    {
                        title: '首页',
                        path: '/',
                        icon: 'icon-home'
                    },
                    {
                        title: '发现',
                        path: '/find',
                        icon: 'icon-search'
                    },
                    {
                        title: '消息',
                        path: '/message',
                        icon: 'icon-comments-alt'
                    },
                    {
                        title: '我的',
                        path: '/my',
                        icon: 'icon-user'
                    }
                ]
            }
        },
        methods:{
            isActive:function(path){
                if ((this.$route.path=="/")&&(path=="/")){
                    return "color:#80bd01;";
                }
                if ((this.$route.path.indexOf(path) !== -1)&&(path!="/")){
                    return "color:#80bd01;";
                }
                return "";
            }
        }
    }
</script>
