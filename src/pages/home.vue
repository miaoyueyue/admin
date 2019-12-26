<template>
	<div id="layout">
		<el-container class="container1" style="height: 100%;">
  			<el-aside width="200px" style="background-color: rgb(238, 241, 246)">
				<div class="logo txtcenter">
					一企体验
				</div>
				<el-menu
			      :default-active="active"
			      :active="active"
			      class="el-menu-vertical-demo"
			      @select = "select"
			      router
			      text-color="#333"
			      active-text-color="#409EFF">
				    <el-menu-item  v-if="permission=='all'||permission =='super' ||permission == 'admin'" index="1" route="/buildingMg">
				    	<i class="el-icon-menu"></i>
				        <span slot="title">写字楼管理</span>
				    </el-menu-item>
				    <!-- <el-menu-item  v-if="permission=='all'||permission =='super' ||permission == 'admin'" index="2" route="project">
				    	<i class="el-icon-document"></i>
				        <span slot="title">项目管理</span>
				    </el-menu-item> -->
				    <el-submenu index="2">
			        <template slot="title">
			          <i class="el-icon-more-outline"></i>
			          <span>项目管理</span>
			        </template>
			        <el-menu-item-group>
			          <el-menu-item index="2-1"  route="/project"><i class="el-icon-tickets"></i>项目管理</el-menu-item>
			          <!-- <el-menu-item index="2-2"  route="/proPhoto"><i class="el-icon-picture"></i>项目照片</el-menu-item> -->
			          
			          <el-menu-item index="2-2"  route="/applyList"><i class="el-icon-document"></i>申请总表</el-menu-item>
			        </el-menu-item-group>
			        <el-menu-item index="2-3" v-if="permission != 'executor'" route="/newProject"><i class="el-icon-circle-plus"></i>新建项目</el-menu-item>
			      </el-submenu>
				    <el-menu-item  v-if="permission=='all'||permission =='super' ||permission == 'admin'" index="3" route="/imcaMg">
				    	<i class="el-icon-picture-outline"></i>
				        <span slot="title">图片标签及案列管理</span>
				    </el-menu-item>
				    <el-menu-item  v-if="permission=='all'||permission =='super' ||permission == 'admin'" index="4" route="/user">
				    	<i class="el-icon-view"></i>
				        <span slot="title">用户管理</span>
				    </el-menu-item>
				    <el-menu-item  v-if="permission=='all'||permission =='super' ||permission == 'admin'" index="5" route="/brandMg">
				    	<i class="el-icon-setting"></i>
				        <span slot="title">客户管理</span>
				    </el-menu-item>
			    </el-menu>
			  </el-aside>
			  <el-container>
			    <el-header>
			    	<div class="topTitle flexb">
					<router-link :to="viewPath">
						<h1>{{nowViews}}</h1>
					</router-link>
					<div class="flexb">
						<h1>登录账户：{{userName}}</h1>
						<div style="font-size: 0.8rem;margin: 2px 20px;color: #333;vertical-align: top;cursor: pointer;" @click="logOut">退出</div>
					</div>
				</div>
			    </el-header>
			    <el-main>
			        <router-view :key="key" />
			    </el-main>
			  </el-container>
		</el-container>
		<!-- <el-row class="mian">
		<el-col :span="4" class="navLeft">
			<div class="logo txtcenter">
				一企体验
			</div>
			<el-menu
		      :default-active="active"
		      :active="active"
		      class="el-menu-vertical-demo"
		      @select = "select"
		      router
		      background-color="#333333"
		      text-color="#cacaca"
		      active-text-color="#FF8C00">
			    <el-menu-item index="1" route="buildingMg">
			    	<i class="el-icon-menu"></i>
			        <span slot="title">写字楼管理</span>
			    </el-menu-item>
			    <el-menu-item index="2" route="project">
			    	<i class="el-icon-document"></i>
			        <span slot="title">项目管理</span>
			    </el-menu-item>
			    <el-menu-item index="3" route="imcaMg">
			    	<i class="el-icon-picture-outline"></i>
			        <span slot="title">图片标签及案列管理</span>
			    </el-menu-item>
			    <el-menu-item index="4" route="user">
			    	<i class="el-icon-view"></i>
			        <span slot="title">用户管理</span>
			    </el-menu-item>
			    <el-menu-item index="5" route="brandMg">
			    	<i class="el-icon-setting"></i>
			        <span slot="title">客户管理</span>
			    </el-menu-item>
		    </el-menu>
		</el-col>
		<el-col :span="20" class="theRight">
			<div class="topTitle flexb">
				<router-link :to="viewPath">
					{{nowViews}}
				</router-link> -->
				<!-- <router-link to=""></router-link> -->
				<!-- <div class="flexb">
					<div>登录账户：admin</div>
					<div style="font-size: 0.8rem;margin: 2px 20px;color: rgb(202, 202, 202);vertical-align: middle;">安全注销</div>
				</div>
			</div> -->
		<!-- <section class="app-main"> -->
		    <!-- <transition name="fade-transform" mode="out-in"> -->
		      <!-- <keep-alive :include="cachedViews"> -->
		        <!-- <router-view :key="key" /> -->
		      <!-- </keep-alive> -->
		    <!-- </transition> -->
		<!-- </section> -->
		<!-- </el-col> -->
		<!-- </el-row> -->
	</div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
export default {
  name: 'home',
  data(){
  	return{
  		// visitedViews:this.$store.state.visitedViews,
  		nowViews:"",
  		viewPath:"",
  	}
  },
  created(){
    	// console.log(this.nowViews)
    },
  computed: {
    permission() {
      return localStorage.getItem("permission")
    },
    userName() {
      return localStorage.getItem("userName")
    },
    key() {
      return this.$route.path
    },
    active: {
		get () {
			console.log(this.$route.fullPath);
			let index =this.$route.fullPath
			let activeIndex = "";
			if(index == '/buildingMg'){
				activeIndex ="1"
				this.viewPath = "/buildingMg"
				this.nowViews = "写字楼管理"
			}else if(index == '/project'){
				activeIndex ="2-1"
				this.viewPath = "/project"
				this.nowViews = "项目管理"
			}else if(index.indexOf("/proPhoto") != -1){ //项目照片
				activeIndex ="2-1"
				this.viewPath = "/proPhoto"
				this.nowViews = "项目管理"
			}else if(index == '/newProject'){
				activeIndex ="2-3"
				this.viewPath = "/newProject"
				this.nowViews = "新建项目"
			}else if(index == '/applyList'){
				activeIndex ="2-2"
				this.viewPath = "/applyList"
				this.nowViews = "申请总表"
			}else if(index.indexOf("/buildDes") != -1|| index.indexOf("/businessDes") != -1 || index.indexOf("/cityDes") != -1|| index == '/newbuilding'|| index == '/newBusiness'|| index.indexOf("/projectDes") != -1 || index.indexOf("/editPro") != -1){
				activeIndex ="2-1"
				this.viewPath = "/project"
				this.nowViews = "项目管理"
			}else if(index == '/imcaMg'){
				activeIndex ="3"
				this.viewPath = "/imcaMg"
				this.nowViews = "图片标签及案列管理"
			}else if(index == '/user'){
				activeIndex ="4"
				this.viewPath = "/user"
				this.nowViews = "用户管理"
			}else{
				activeIndex ="5"
				this.viewPath = "/brandMg"
				this.nowViews = "客户管理"
			}
			return activeIndex
		},
		set () {
			console.log(this.$route.fullPath)
			let index =this.$route.fullPath
			let activeIndex
			if(index == '/buildingMg'){
				activeIndex ="1"
				this.viewPath = "/buildingMg"
				this.nowViews = "写字楼管理"
			}else if(index == '/project'){
				activeIndex ="2-1"
				this.viewPath = "/project"
				this.nowViews = "项目管理"
			}else if(index.indexOf("/proPhoto") != -1){
				activeIndex ="2-1"
				this.viewPath = "/proPhoto"
				this.nowViews = "项目管理"
			}else if(index == '/newProject'){
				activeIndex ="2-3"
				this.viewPath = "/newProject"
				this.nowViews = "新建项目"
			}else if(index == '/applyList'){
				activeIndex ="2-2"
				this.viewPath = "/applyList"
				this.nowViews = "申请总表"
			}else if(index.indexOf("/buildDes") != -1|| index.indexOf("/businessDes") != -1 || index.indexOf("/cityDes") != -1|| index == '/newbuilding'|| index == '/newBusiness'||  index.indexOf("/projectDes") != -1|| index.indexOf("/editPro") != -1){
				activeIndex ="2-1"
				this.viewPath = "/project"
				this.nowViews = "项目管理"
				console.log("a4541564");
			}else if(index == '/imcaMg'){
				activeIndex ="3"
				this.viewPath = "/imcaMg"
				this.nowViews = "图片标签及案列管理"
			}else if(index == '/user'){
				activeIndex ="4"
				this.viewPath = "/user"
				this.nowViews = "用户管理"
			}else{
				activeIndex ="5"
				this.viewPath = "/brandMg"
				this.nowViews = "客户管理"
			}
			return activeIndex
		}
	}
  },
  methods: {
  	select(index,indexPath){
  		// console.log(index)
		this.active = index;
		// console.log(this.nowViews);
		// this.$store.commit('visitedViews',this.nowViews);
	},
    handleOpen(key, keyPath) {
		// console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
    	// console.log(key, keyPath);
    },
    logOut(){
    	var $this = this;
		axios.get($this.baseUrl+'api/logout',{
				headers:{
					"Content-Type":"application/json"
				}
	        }).then(res => {
	              // console.log(res.data);
	              sessionStorage.clear();
		    	  localStorage.clear();
		    	  $this.$router.replace({
		    	  	path:"/"
		    	  })
	        },error =>{
        })
    },
  }
}
</script>

<style lang="less">
	#layout {
		.container1{
			position:fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
		}
		
		.el-main{
			background-color: #f7f7f7;
		}

		.logo{
			line-height: 56px;
			color: #409EFF;
			font-size: 18px;
			font-weight: 800;
		}

		.el-menu{
			background-color:transparent;
		}
		.el-header {
		    background-color: #d8e5f7;
		    color: #333;
		    line-height: 60px;
		    position: sticky;
		    top: 0;
		    z-index: 5;
		  }
		  
		  .el-aside {
		    color: #333;
		  }

		  .is-active {
			background-color:#d8e5f7;
		  }
		// position: fixed;
		// top:0;
		// bottom: 0;
		// width: 100%;
		// height: 100%;
		// .mine{
		// 	background-color:#a8a9a9;
		// 	padding: 0.8%;
		// 	font-size: 18px;
		// 	color: white;
		// 	font-weight: 800;
		// 	.flexb{
		// 		div{
		// 			margin: 0 10px;
		// 		}
		// 	}
		// }	
		// .mian{
		// 	// position: fixed;
		// 	// top:30px;
		// 	// bottom: 0;
		// 	// width: 100%;
		// 	height: 100%;
		// 	.logo{
		// 		color: #FF8C00;
		// 		padding: 15px;
		// 		font-size: 18px;
		// 		color: white;
		// 		font-weight: 800;
		// 	}
		// 	.navLeft{
		// 		height: 100%;
		// 		overflow: scroll;
		// 		background-color:#333333;
		// 		.el-menu{
		// 			border:none;
		// 			overflow: hidden;
		// 		}
		// 	}
		// 	.theRight{
		// 		height: 100%;
		// 		overflow: scroll;
		// 		position:relative;
				.topTitle{
					// position: sticky;
					// top: 0;
					// left: 0;
					// right: 0;
					// z-index: 5;
					// padding: 10px;
					// background-color:#333;
					color:#409EFF;
					a{
						color:#409EFF;
					}
				}
		// 	}
		// }
	}
</style>