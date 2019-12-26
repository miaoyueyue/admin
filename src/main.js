// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/store' // 引入store
// import {post,fetch} from './utils/http'

// import {getCookie,setCookie,delCookie} from './utils/cookie'
// import {setCookie} from './utils/cookie'
// import axios from 'axios'


// axios.defaults.withCredentials=true;//让ajax携带cookie
// Vue.prototype.$axios = axios;

Vue.config.productionTip = false
Vue.use(ElementUI);

// Vue.prototype.$post = post
// Vue.prototype.$fetch = fetch

// Vue.prototype.pathUrl = "https://z-test.xihongshi.live/"
Vue.prototype.pathUrl = "https://z.xihongshi.live/"

Vue.prototype.baseUrl = process.env.NODE_ENV === 'production' ?'https://e.xihongshi.live/':'';
// Vue.prototype.baseUrl = process.env.NODE_ENV === 'production' ?'http://47.101.139.94/':'';

// Vue.prototype.baseUrl = 'https://e.xihongshi.live/'http://47.101.139.94/
// Vue.prototype.baseUrl = 'http://localhost:8080/'

Vue.prototype.backTo =function(){
	router.back(-1)
};

//设置cookie,放在main.js

Vue.prototype.setCookie = function(c_name,value,expiredays) {
  var exdate=new Date()
  exdate.setDate(exdate.getDate()+expiredays)
  document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
};


//获取cookie

Vue.prototype.getCookie=function(c_name) {
  if (document.cookie.length>0)
  {
    var  c_start=document.cookie.indexOf(c_name + "=")
    if (c_start!=-1)
    {
      c_start=c_start + c_name.length+1
     var c_end=document.cookie.indexOf(";",c_start)
      if (c_end==-1) c_end=document.cookie.length
      return unescape(document.cookie.substring(c_start,c_end))
    }
  }
  return ""
};

Vue.prototype.Format = function (date) {
  var year = date.getFullYear(); 
  var month =(date.getMonth() + 1).toString(); 
  var day = (date.getDate()).toString();  
  var hour = (date.getHours()).toString();  
  var min = (date.getMinutes()).toString();  
  var sec = (date.getSeconds()).toString();  
  if (month.length == 1) { 
      month = "0" + month; 
  } 
  if (day.length == 1) { 
      day = "0" + day; 
  }
  var dateTime = year + "-" + month + "-" + day;
  return dateTime;
}

Vue.prototype.Format1 = function (date) {
  var year = date.getFullYear(); 
  var month =(date.getMonth() + 1).toString(); 
  var day = (date.getDate()).toString();  
  var hour = (date.getHours()).toString();  
  var min = (date.getMinutes()).toString();  
  var sec = (date.getSeconds()).toString();  
  if (month.length == 1) { 
      month = "0" + month; 
  } 
  if (day.length == 1) { 
      day = "0" + day; 
  }
  if (day.length == 1) { 
      hour = "0" + day; 
  }
  if (day.length == 1) { 
      min = "0" + day; 
  }
  if (day.length == 1) { 
      sec = "0" + day; 
  }
  var dateTime = year + "-" + month + "-" + day + "-" + hour + "-" + min + "-" + sec;
  return dateTime;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
