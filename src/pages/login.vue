<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">后台管理</h3>
      </div>

      <el-form-item prop="account">
        <span class="svg-container">
          账号
        </span>
        <el-input
          ref="account"
          v-model="loginForm.account"
          placeholder="account"
          name="account"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
         密码
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          autocomplete="on"
        />
        <i class="el-icon-view"></i>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="loginIn">登录</el-button>

      <div style="position:relative">
        <div class="tips">
          忘记密码
        </div>
      </div>
    </el-form>

    <el-dialog title="Or connect with" :visible.sync="showDialog">
      Can not be simulated on local, so please combine you own business simulation! ! !
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: { //alen.chen
        account: '',
        password: '',
        keeper:false,
      },
      loginRules: {
        account: [{ required: true}],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      // capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
    if(localStorage.getItem("uId")){
        this.$router.replace({ 
            path: "/home"
        })
      }
      console.log(localStorage.getItem("uId"));
  },
  mounted() {
    if (this.loginForm.account === '') {
      this.$refs.account.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }

  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    loginIn() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          var $this = this;
          // axios.post('api/login',$this.loginForm,{
            axios.post($this.baseUrl+'api/login',$this.loginForm,{
              headers:{
                       "Content-Type":"application/json"
                    }
          }).then(res => {
              console.log(!res.data);
              if(!res.data.error){ 
                $this.$router.replace({ 
                  path: $this.$route.query.redirect
                })
                // $this.setCookie('setCookie',res.data.token);
                sessionStorage.setItem("userName", res.data.name);

                localStorage.setItem("uId", res.data.id);
                localStorage.setItem("permission", res.data.permission[0]);
                $this.$store.commit("saveToken",{"xhs_admin":res.data.token});
                $this.$router.replace("/home");
                $this.loading = false 
              }else{
                $this.loading = false
                $this.$notify({
                  message: res.data.error,
                });
              }
            },error =>{
                  $this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  }
};
</script>

<style lang="less">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

@bg: #283443;
@light_gray: rgb(255, 152, 0);
@cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: @cursor)) {
  .login-container .el-input input {
    color: @cursor;
  }
}

/* reset element-ui css */
.login-container {
  height: 100%;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: @light_gray;
      height: 47px;
      caret-color: @cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px @bg inset !important;
        -webkit-text-fill-color: @cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .el-button {
    background-color: @light_gray;
  }
}
</style>

<style lang="less" scoped>
@bg: #2d3a4b;
@dark_gray: #889aa4;
@light_gray: rgb(255, 152, 0);

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: @bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    // padding: 160px 35px 0;
    margin: 14% auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    float: right;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: @dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: @light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: @dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
