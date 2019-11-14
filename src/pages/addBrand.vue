<template>
	<div id="addBrand">
		<div class="searchcon">
		  	<div class="condition">
		  		<div class="title">品牌名称:</div>
		  		<el-input v-model="projectName" placeholder="请输入内容"></el-input>
		  	</div>
		    <div class="condition">
			  	<div class="title">品牌介绍:</div>
		  		<el-input
				  type="textarea"
				  :autosize="{ minRows: 4}"
				  placeholder="请输入内容"
				  v-model="desc">
				</el-input>
		 	</div>
		   	<div class="condition">
			  	<div class="title">品牌故事:</div>
		  		<el-input
				  type="textarea"
				  :autosize="{ minRows: 4}"
				  placeholder="请输入内容"
				  v-model="info">
				</el-input>
		 	</div>
		 	<div class="condition">
			  	<div class="title">品牌Logo:</div>
			  	<el-upload
				  class="avatar-uploader"
				  :action="baseUrl+'api/upload/proxy'"
				  :data='{prefix: "lg/"}'
				  :show-file-list="false"
				  :on-success="handleAvatarSuccess"
				  >
				
				  <!-- :action="baseUrl+'api/upload/proxy'"   :data="uploadData"  :http-request="upLoad" -->
				  <img v-if="logoUrl" :src="logoUrl" class="avatar">
				  <img v-else src="../../static/imgs/addImg.png" alt="">
				</el-upload>
		 	</div>
		 	<div class="condition">
			  	<div class="title">详情图片:</div>
			  	<el-upload
				  class="avatar-uploader"
				  :action="baseUrl+'api/upload/proxy'"
				  :show-file-list="false"
				  :data='{prefix: "template/"}'
				  :on-success="handleAvatarSuccess1"
				  >
				  <img v-if="desUrl" :src="desUrl" class="avatar">
				  <img v-else src="../../static/imgs/addImg.png" alt="">
				</el-upload>
		  		<!-- <img src="../../static/imgs/addImg.png" alt=""> -->
		 	</div>
		</div>
	  	<div class="txtcenter toSave">
	  		<el-button type="primary" v-if="!this.$route.query.id" @click="saveBrand">保存</el-button>
	  		<el-button type="primary" v-else @click="saveEdit">保存修改</el-button>
	  	</div>
	</div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
export default {
  name: 'addBrand',
   data(){
  	return{
  		editId:"",
  		desc: "",
		detail: "",
		info: "",
		logo: "",
		projectName: "",
  		logoUrl:"",
  		desUrl:"",
  	}
  },
  watch:{
  	pType(oldV,newV){
  		console.log(oldV);
  		console.log(newV);
  	},
  	customer(oldV,newV){
  		console.log(oldV);
  		console.log(newV);
  	},
  },
  created(){
  	this.$store.commit('addNextRoute', "新建品牌")
  	if(this.$route.query.id){
  		this.editId = this.$route.query.id;
  		this.getEditInfo();
  	}
  },
  methods:{
  	getEditInfo(){
  		var $this = this;
  		axios.get($this.baseUrl+'api/brand?id=' + $this.editId,{
            headers:{
                  "Content-Type":"application/json"
            }
          }).then(res => {
              	console.log(res.data);
              	$this.projectName = res.data.name;
				$this.logoUrl = $this.pathUrl+res.data.logo;
				$this.desUrl = $this.pathUrl+res.data.detail;
				$this.desc = res.data.desc;
				$this.info = res.data.info;
				$this.detail = res.data.detail;
				$this.logo = res.data.logo;
            },error =>{
                  $this.loading = false
              // console.log(error.response);
        })
  	},
  	handleAvatarSuccess(res, file) {
        this.logoUrl = URL.createObjectURL(file.raw);
        console.log(res);
        this.logo = res.key;
	},
	handleAvatarSuccess1(res, file) {
	    this.desUrl = URL.createObjectURL(file.raw);
	    console.log(res);
        this.detail = res.key;
	},
	saveEdit(){
		var $this = this;
		var obj={
			id: $this.editId,
			desc: $this.desc,
			detail: $this.detail,
			info: $this.info,
			logo: $this.logo,
			name: $this.projectName,
		}
		console.log(obj);

        axios.put($this.baseUrl+'api/brand',obj,{
            headers:{
                  "Content-Type":"application/json"
            }
          }).then(res => {
              	console.log(res.data);
            },error =>{
        })
	},
	saveBrand(){
		var $this = this;
		var obj={
			desc: $this.desc,
			detail: $this.detail,
			info: $this.info,
			logo: $this.logo,
			name: $this.projectName,
		}
		console.log(obj);

        axios.post($this.baseUrl+'api/brand',obj,{
            headers:{
                  "Content-Type":"application/json"
            }
          }).then(res => {
              	console.log(res.data);
              	$this.projectName = "";
				$this.logoUrl = "";
				$this.desUrl = "";
				$this.desc = "";
				$this.detail = "";
				$this.info = "";
				$this.logo = "";
            },error =>{
                 
        })
	},
  }
}
</script>

<style lang="less">
	#addBrand {
		.searchcon{
			width: 80%;
			margin: 10px;
			.condition{
				margin: 20px;
				.title{
					// display: inline-block;
					white-space: nowrap;
					line-height: 40px;
					margin-right: 16px;
					font-size: 0.94rem;
				}
				.el-input{
					width: 60%;
				}
			}
		}
		.avatar{
			max-width: 280px;
		}
		.toSave{
			width: 100%;
			margin:30px 0;
			button{
				width: 30%;
			}
		}
	}
</style>