<template>
	<div id="my_updatepasswd">
        <v-header :canBack="true"><span slot="center">更改密码</span></v-header>
	    <div class="weui-cells">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <input class="weui-input" type="password" placeholder="请输入新密码" v-model="password">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <input class="weui-input" type="password" placeholder="请输入确认密码" v-model="password2">
                </div>
            </div>
        </div>  

        <div class="page__bd page__bd_spacing" style="padding: 20px 10px;">
	        <a class="weui-btn weui-btn_primary" @click="updatepasswd">确认</a>        
	    </div>
        <v-footer></v-footer>
	</div>
</template>
<script>
import { 
API_USERS_UPDATEPASSWD,
} from '../store/mutation-types'
export default {
    data(){
        return {password:'',password2:''}
    },
    methods:{
        updatepasswd:function(){
            var _this = this;
            if(!this.password||!this.password2){
                $.toptip('不能为空',2000, 'error');
                return;
            }
            if (this.password!=this.password2){
                 $.toptip('密码不一致',2000, 'error');
                return;
            }
            this.$store.dispatch(API_USERS_UPDATEPASSWD,{password:this.password}).then(function(json){
                if(json.body.code==200){
                    $.toptip('密码修改成功',2000, 'success');
                    _this.$router.push("/login");
                }else{
                     $.toptip('密码修改失败',2000, 'error'); 
                }
            })
        }
    },
}
</script>