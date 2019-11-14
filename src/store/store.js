import Vue from 'vue'
import Vuex from 'vuex'
import {getCookie} from '../utils/cookie' //引用刚才我们创建的util.js文件，并使用getCookie方法
import {setCookie} from '../utils/cookie' //引用刚才我们创建的util.js文件，并使用getCookie方法
import {delCookie} from '../utils/cookie' //引用刚才我们创建的util.js文件，并使用getCookie方法

Vue.use(Vuex)

const store = new Vuex.Store({
	state : {
	    xhs_admin:getCookie("xhs_admin"),
	    nextRoute:"",
	    proDes:[],
	    // username:  Cookie.get("username"),
	},
	mutations : {
	    saveToken: function (state, userToken) {
	    	console.log(state,userToken);
	    	state.xhs_admin = userToken.xhs_admin;
	    	setCookie("xhs_admin", userToken.xhs_admin)
	    },
	    clearToken: function (state) {
	    	// state.xhs_admin = null;
	    	// delCookie("xhs_admin");
    		setCookie("xhs_admin",'');
	    },
	    addNextRoute(state,payload){
	    	state.newRoute = payload;
	    	console.log(payload);
	    },
	    getProDes(state,payload){
	    	state.proDes = payload;
	    	console.log(payload);
	    },
	}
})

export default store