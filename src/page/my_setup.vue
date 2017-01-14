<template>
<div class="home">
    <v-header :canBack="true"><span slot="center">设置</span></v-header>
        <div class="weui-panel__bd" style="margin-top:1.1em;">
        <div class="weui-media-box weui-media-box_small-appmsg">
            <div class="weui-cells">
                <router-link to="/my/userinfo" class="weui-cell weui-cell_access">
                    <div class="weui-cell__hd"></div>
                    <div class="weui-cell__bd weui-cell_primary">
                        <p>基本资料</p>
                    </div>
                    <span class="weui-cell__ft"></span>
                </router-link>
                <router-link to="/my/updatepasswd" class="weui-cell weui-cell_access">
                    <div class="weui-cell__hd"></div>
                    <div class="weui-cell__bd weui-cell_primary">
                        <p>更改密码</p>
                    </div>
                    <span class="weui-cell__ft"></span>
                </router-link>
            </div>
            <div class="weui-cells">
                <div class="page__bd page__bd_spacing" style="padding: 15px;">
                    <a href="javascript:;" class="weui-btn weui-btn_default" 
                    style="color:#e1001f;background-color:#ffffff;" @click="logout">退出登陆</a>
                </div>
            </div>
        </div>
    </div>
    <v-footer></v-footer>
</div>
</template>
<script>
import { 
API_LOGOUT,
} from '../store/mutation-types'
export default {
  name: 'my_setup',
  data () {
    return {
    }
  },
  computed: {
  },
  methods:{
    logout:function(){
        this.$store.dispatch(API_LOGOUT,{});
        this.$router.push("/login");
    },
  }

}
</script>


