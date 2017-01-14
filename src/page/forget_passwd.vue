<template>
    <div class="login weui_tab">
    	 <v-header :canBack="true"><span slot="center">忘记密码</span></v-header>
        <div class="weui-cells weui-cells_form">
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
            <a class="weui-btn weui-btn_primary" href="javascript:" @click="forgetPasswd">提交</a>
        </div>
<!--          <div class="login-router-link">
                <router-link to="/register">用户注册</router-link>
                <router-link to="/">忘记密码</router-link>
        </div> -->
    </div>
</template>
<script>
import { 
	API_FORGET_PASSWD,
} from '../store/mutation-types'
export default {
    data() {
        return {
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
        forgetPasswd:function(){
            if(!this.email){
                $.toptip('邮箱不能为空',2000, 'error');
                return
            }else{
                if(!this.isEmail(this.email)){
                    $.toptip('邮箱格式不正确',2000, 'error');
                    return
                }
            }
            if (!this.password){
                $.toptip('密码不能为空',2000, 'error');
                return
            }
            var _this = this;
            _this.$store.dispatch(API_FORGET_PASSWD,
                {email:this.email,
                password: this.password}).then(function(json){
                    console.log(json)
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
