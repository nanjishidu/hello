<template>
	<div id="users_info">
		<v-header :canBack="true"><span slot="center">基本资料</span></v-header>
        <div class="page__bd">
            <div class="weui-cells__title">简介</div>
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">姓名</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" v-model="personalUserinfo.name" placeholder="">
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">email</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" v-model="personalUserinfo.email" placeholder="">
                    </div>
                </div>
                <div class="weui-cell">
                 	<div class="weui-cell__hd"><label class="weui-label">地址</label></div>
                    <div class="weui-cell__bd">
                    <input class="weui-input" type="text" v-model="personalUserinfo.address" placeholder="请填写你的地址">
                    </div>
                </div>
                 <div class="weui-cell">
                 	<div class="weui-cell__hd"><label class="weui-label">描述</label></div>
                    <div class="weui-cell__bd">
                        <textarea class="weui-textarea" placeholder="请填写你的描述" v-model="personalUserinfo.description" rows="3"></textarea>
                    </div>
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
    name: 'my_userinfo',
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
      getUserInfo:function(){
        this.$store.dispatch(API_USERS_PERSONAL_INFO,{})
      }
    },
    created:function(){
      this.getUserInfo();
    }
}
</script>
