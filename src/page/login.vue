<!-- login.vue -->
<template>
    <div class="login weui_tab">
        <v-header :canBack="true"><span slot="center">登录</span></v-header>
        <!-- <div class="weui-cells weui-cells_title">使用账号和密码登录</div> -->
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <!-- <div class="weui-cell__hd"><label class="weui-label">邮箱</label></div> -->
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" placeholder="请输入用户名/邮箱" v-model="username">
                </div>
               <!--  <div class="weui-cell__ft">
                    <button class="weui-vcode-btn">获取验证码</button>
                </div> -->
            </div>
            <!-- <div class="weui-cells weui-cells_form"> -->
            <div class="weui-cell">
                <!-- <div class="weui-cell__hd"><label class="weui-label">密码</label></div> -->
                <div class="weui-cell__bd">
                    <input class="weui-input" type="password" placeholder="请输入密码" v-model="password">
                </div>
            </div>
        </div>
         <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" href="javascript:" @click="login">马上登陆</a>
        </div>
         <div class="login-router-link">
                <router-link to="/register">用户注册</router-link>
                <router-link to="/forget_passwd">忘记密码</router-link>
        </div>
    </div>
</template>
<script>
import { 
API_LOGIN,
API_USERS_INFO,
} from '../store/mutation-types'
export default {
    data() {
        return {
            username: '',
            password: '',
            status: false //true正在提交， false还没提交
        }
    },
    methods:{
        isEmail:function(){
        var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        if(reg.exec(this.username)){
            return true;
        }
        return false;
        },
        login:function(){
            if(!this.username){
                $.toptip('用户名/邮箱不能为空',2000, 'error');
                return
            }
            // else{
            //     if(!this.isEmail(this.username)){
            //          $.toptip('邮箱格式不正确', 'error');
            //     }
            // }
            if (!this.password){
                $.toptip('密码不能为空',2000, 'error');
                return
            }
            var _this = this;
            _this.$store.dispatch(API_LOGIN,
                {username:this.username,
                password: this.password}).then(function(json){
                    console.log(json)
                    if (json.code==200){
                        _this.$store.dispatch(API_USERS_INFO,{})
                        .then(function(json2){
                            if (json2.code==200){
                                $.toptip("登录成功",2000,'success');
                                setTimeout(function() {
                                    _this.$router.push("/");
                                }, 2000);
                            }else{
                                $.toptip(json2.msg,2000,'error');
                            }
                        })
                    }else{
                        $.toptip(json.msg,2000,'error');
                    }
                });
        }
    }
}
</script>
