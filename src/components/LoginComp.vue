<template>
    <div class="LoginComp">
        <div class="ms-title"><img class="logo" src="img/logo.svg"/><span>医疗工作平台</span></div>
        <div class="ms-login">
            <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0px">
                <el-form-item prop="username">
                    <i class="icon iconfont icon-yisheng1"/>
                    <el-input v-model.trim="loginForm.username" class="login-input" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item prop="password">
                    <i class="icon iconfont icon-mima"/>
                    <el-input v-model="loginForm.password" @keyup.enter.native="submitForm('loginForm')" type="password" placeholder="请输入密码" class="login-input"/>
                </el-form-item>
                <div>
                    <el-button type="primary" class="login-btn" @click="submitForm('loginForm')">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>    
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

interface LoginForm {
    username: string;
    password: string;
}

@Component
export default class LoginComp extends Vue {
    public loginForm: LoginForm = {
        username: '',
        password: ''
    };
    public rules: any = {
        username: [{
        required: true,
        message: '请输入用户名',
        trigger: 'blur'
        }],
        password: [{
        required: true,
        message: '请输入密码',
        trigger: 'blur'
        }]
    };
    public submitForm(formName: string) {
        this.$store.dispatch('LoginByUsername', this.loginForm).then((d) => {
            this.$router.push('/emergency');
        });
    }
    public mounted() {
        // 登录清除token记录
        this.$store.dispatch('Logout');
    }
}
</script>
<style lang="less">
    .LoginComp{
        .login-input{
            input{
                border:none;
                border-radius: 0px;
                border-bottom: 1px solid #dcdfe6;
                
            }
        }
    }
</style>
<style lang="less" scoped>
    .LoginComp{
        position: absolute;
        right: 200px;
        top:calc(50% - 196px);
        width: 350px;
        height: auto;
        border-radius: 3px;
        background-color: #fff;
        text-align: center;
        .logo{
            vertical-align: bottom;
            margin-right: 10px
        }
        .ms-title{
            color: #3a8ee6;
            font-size: 25px;
            font-weight: bold;
            padding: 50px 0px 60px;
            text-align: center;
        }
        .ms-login{
            .el-form-item{
                width: 60%;
                margin-left: auto;
                margin-right: auto;
            }
            .login-input{
                width: 100%;
            }
            .login-btn{
                width: 60%;
                margin-bottom: 50px;
            }
            .icon{
                position: absolute;
                left: -5px;
                z-index: 99;
                opacity: 0.4;
            }
        }
    }
</style>


