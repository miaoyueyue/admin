<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {getCookie} from './utils/cookie'
import axios from 'axios';

export default {
  name: 'App',
  mounted: function() {
      this.intercept();
      // this.initInterceptors();
  },
  methods: {
    intercept() {
      this.$router.beforeEach((to, from, next) => {
        if(to.meta.requireAuth) {
          // 判断该路由是否需要登录权限
        console.log(localStorage.getItem("uId"))
          
          if(localStorage.getItem("uId")) { // 通过vuex state获取当前的token是否存在
            next();
          } else {
            next({
              path: '/',
              query: {
                redirect: to.fullPath
              } // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
          }
        } else {
          next();
        }
      })
    },
    initInterceptors: function() {
      var $this = this;
      // http响应拦截器
      // axios.interceptors.response.use(data => {
      //   if(data.data.status != 0) {
      //     $this.$toast({
      //       position: "bottom",
      //       message: data.data.msg
      //     });
      //   }
      //   return data
      // }, error => {
      //   $this.$toast({
      //     position: "bottom",
      //     message: "内部服务器出错"
      //   });
      //   return Promise.reject(error)
      // })
    }
  },
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  font-size:100%;
}
html,body,#app {
  width: 100%;
  height: 100%;
  min-width:1200px;
  font-size: 100%;
}
#app {
  font-family: 'Avenir', STXihe, Helvetica Neue,Hiragino Sans GB, sans-serif;
  -webkit-font-smoothing: subpixel-antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #fcfdfd;
}

#app *::-webkit-scrollbar {
      display: none;
}

#app input,#app button{
  /*border:none;*/
  /*outline: none;*/
  -webkit-appearance:none;
  /*background: none;*/
}

#app .firstMargin{
    margin-top: 30px !important;
}

#app .padding{
  padding: 15px;
}

#app .margin{
  margin: 10px;
}

#app input::-webkit-input-placeholder{
  color:rgba(0,0,0,0.4);
  font-size: 0.95rem;
}
#app .left{
  float: left;
}
#app .right{
  float: right;
}
#app a{
  color: #000;
  text-decoration: none;
}
#app .inb{
  display: inline-block;
}
#app .flex{
  display: flex;
}
#app .flexa{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
#app .flexb{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
#app .red{
  color: red;
}
#app .txtcenter{
  text-align: center;
}
#app .txtright{
  text-align: right;
}
#app .txtellipsis{
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-line-clamp:1;
    -webkit-box-orient:vertical;
    word-break:break-all;
    word-wrap: break-word;
}
</style>
