<template>
<div class="home">
<!-- {{userinfo}} -->
    <v-header :canSetup="true"><span slot="center">{{personalUserinfo.name}}</span></v-header>
        <div class="weui-panel__bd" style="margin-top:1.1em;">
        <div class="weui-media-box weui-media-box_small-appmsg">
            <div class="weui-cells">
                <router-link :to="gotoUserId('/my/photos/list')" class="weui-cell weui-cell_access">
                    <div class="weui-cell__hd"></div>
                    <div class="weui-cell__bd weui-cell_primary">
                        <p>我的帖子</p>
                    </div>
                    <span class="weui-cell__ft">{{personalUserinfo.photonum}}</span>
                </router-link>
                <router-link :to="gotoUserId('/my/following/list')" class="weui-cell weui-cell_access">
                    <div class="weui-cell__hd"></div>
                    <div class="weui-cell__bd weui-cell_primary">
                        <p>我的关注</p>
                    </div>
                    <span class="weui-cell__ft">{{personalUserinfo.following}}</span>
                </router-link>
                <router-link :to="gotoUserId('/my/follower/list')" class="weui-cell weui-cell_access">
                    <div class="weui-cell__hd"></div>
                    <div class="weui-cell__bd weui-cell_primary">
                        <p>我的关注者</p>
                    </div>
                    <span class="weui-cell__ft">{{personalUserinfo.follower}}</span>
                </router-link>
                <router-link to="/my/photos/like" class="weui-cell weui-cell_access">
                    <div class="weui-cell__hd"></div>
                    <div class="weui-cell__bd weui-cell_primary">
                        <p>赞过的图片</p>
                    </div>
                    <span class="weui-cell__ft"></span>
                </router-link>
                <router-link to="/my/photos/tipoff" class="weui-cell weui-cell_access">
                    <div class="weui-cell__hd"></div>
                    <div class="weui-cell__bd weui-cell_primary">
                        <p>举报的图片</p>
                    </div>
                    <span class="weui-cell__ft"></span>
                </router-link>
            </div>
        </div>
    </div>
    <v-footer></v-footer>
</div>
</template>

<script>
import { 
API_USERS_PERSONAL_INFO,
} from '../store/mutation-types'
export default {
  name: 'my',
  data () {
    return {
    }
  },
  computed: {
    personalUserinfo:function(){
        return this.$store.state.users.personalUserinfo||{};
    },
  },
  methods:{
    gotoUserId:function(url){
        return url+"/"+this.personalUserinfo.id;
    },
    getUserInfo:function(){
        this.$store.dispatch(API_USERS_PERSONAL_INFO,{})
    }
  },
  created:function(){
    this.getUserInfo();
  }

}
</script>

