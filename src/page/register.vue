<!-- login.vue -->
<template>
    <div class="login weui_tab">
    	 <v-header :canBack="true"><span slot="center">用户注册</span></v-header>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" placeholder="请输入用户名" v-model="username">
                </div>
            </div>
             <div class="weui-cell">
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" placeholder="请输入邮箱" v-model="email">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <input class="weui-input" type="password" placeholder="请输入密码" v-model="password">
                </div>
            </div>
        </div>
         <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" href="javascript:" @click="login">马上注册</a>
        </div>
    </div>
</template>
<script>
import { 
	API_REGISTER,
} from '../store/mutation-types'
export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            status: false //true正在提交， false还没提交
        }
    },
    methods:{
        isEmail:function(){
        var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        if(reg.exec(this.email)){
            return true;
        }
        return false;
        },
        login:function(){
            if(!this.username){
                $.toptip('用户名不能为空',2000, 'error');
                return
            }
            if(!this.email){
                $.toptip('邮箱不能为空',2000, 'error');
                return
            }else{
                if(!isEmail(this.email)){
                    $.toptip('邮箱格式不正确',2000, 'error');
                    return
                }
            }
            if (!this.password){
                $.toptip('密码不能为空',2000, 'error');
                return
            }
            var _this = this;
            _this.$store.dispatch(API_REGISTER,
                {username:this.username,email:this.email,
                password: this.password}).then(function(json){
                    if (json.body.code==200){
                        $.toptip(json.body.msg,2000,'success');
                        _this.$router.push("/login");
                    }else{
                        $.toptip(json.body.msg,2000,'error');
                    }
                });
        }
    }
}
</script>
