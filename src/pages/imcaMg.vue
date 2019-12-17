<template>
	<div id="imcaMg">
		<div class="padding">
			<div class="mgTitle">
				<h4 class="inb">写字楼照片</h4>
				<el-button type="primary" size="small" @click="addType('house')">增加类型</el-button>
			</div>
			<div class="container  flexb">
				<div style="width:48%;" v-for="(item,index) in house" :key="index">
					<div>
						<span>{{item.name}}</span>
						<el-switch
						  v-model="item.isChoose">
						</el-switch>
						<span>必选</span>
					</div>
					<div class="description">
						{{item.description}} 至少{{item.count}}张
					</div>
					<div class="imgMore">
						<div class="case inb"  v-for="(i,k) in item.src" :key="k">
							<div @click="look(i,item.description)"><img class="caseimg" :src="pathUrl+i" alt=""></div>
							<div class="txtcenter" @click="deleteImg('house',index,k)">
								<img src="../../static/imgs/delete.png" alt="">
								<span>删除</span>
							</div>
						</div>
						<div class="case inb" @click="toEdit('house',index)">
							<div><img class="caseimg"src="../../static/imgs/addImg.png" alt=""></div>
							<div class="txtcenter">
								<span>继续添加案例</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="padding bt">
			<div class="mgTitle">
				<h4 class="inb">企业照片</h4>
				<el-button type="primary" size="small" @click="addType('com')">增加类型</el-button>
			</div>
			<div class="container flexb">
				<div style="width:48%;" v-for="(item,index) in company" :key="index">
					<div>
						<span>{{item.name}}</span>
						<el-switch
						  v-model="item.isChoose">
						</el-switch>
						<span>必选</span>
					</div>
					<div class="description">
						{{item.description}} 至少{{item.count}}张
					</div>
					<div class="imgMore">
						<div class="case inb"   v-for="(i,k) in item.src" :key="k">
							<div @click="look(i,item.description)"><img class="caseimg" :src="pathUrl+i" alt=""></div>
							<div class="txtcenter" @click="deleteImg('com',index,k)">
								<img src="../../static/imgs/delete.png" alt="">
								<span>删除</span>
							</div>
						</div>
						<div class="case inb" @click="toEdit('com',index)">
							<div><img class="caseimg"src="../../static/imgs/addImg.png" alt=""></div>
							<div class="txtcenter">
								<span>继续添加案例</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="txtcenter toSave">
	  		<el-button type="primary" @click="saveIt">保存</el-button>
	  	</div>
	  	<el-dialog
        :visible.sync="isShowImageDialog"
        :close-on-click-modal = "false"
        :modal-append-to-body="false"
       >
        <img :src="pathUrl+looksrc" style="max-width: 100%;max-height: 100%;display: block; margin: 0 auto;"/>
        <div class="txtCenter">
        	{{lookDescription}}
        </div>
      </el-dialog>

	  	<el-dialog
		  title="新增图片类型"
		  :close-on-click-modal = "false"
		  :modal-append-to-body="false"
		  :visible.sync="dialogVisible"
		  width="30%"
		  >
		  <el-form ref="form" :model="form" label-width="80px">
			  <el-form-item label="类型名称">
			    <el-input v-model="form.name"></el-input>
			  </el-form-item>
			  <el-form-item label="描述">
			    <el-input v-model="form.description" placeholder=""></el-input>
			  </el-form-item>


			  <el-form-item label="上传数量">
			    <el-input type="number" v-model="form.count" placeholder=""></el-input>
			  </el-form-item>


			  <el-form-item label="是否必选">
			   <el-switch v-model="form.isChoose">
				</el-switch>
			  </el-form-item>
			  <el-form-item label="案例图片">
			  	<img v-if="imagedList!=[]" v-for="(item,index) in imagedList" :key="index" :src="pathUrl+item" alt="" style="width: 80%;">
			    <el-upload
			      ref='upload'
				  :action="baseUrl+'api/upload/proxy'"
				  :data='{prefix: "template/"}'
				  list-type="picture-card"
				  :on-success="handleAvatarSuccess"
				  :on-remove="handleRemove">
				  <i class="el-icon-plus"></i>
				</el-upload>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" v-if='activeIndex===""' @click="onSubmit">立即创建</el-button>
			    <el-button type="primary" v-else @click="onEdit">立即修改</el-button>
			  </el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
export default {
  name: 'imcaMg',
  data(){
  	return{
  		value2:true,
  		dialogVisible:false,
  		looksrc:"",
  		lookDescription:"",
        isShowImageDialog:false,
  		imageList:[],
  		imagedList:[],
  		form:{
  			name:"",
  			description:"",
  			count:"",
  			isChoose:true,
  			src:"",
  		},
  		house:[],
  		company:[],
  		typeIt:"",
  		tempId:"",
  		activeIndex:"",
  	}
  },
  created(){
  	this.queryPicquire();
  },
  watch:{
  	dialogVisible(oldV,newV){
  		// console.log(oldV);
  		// console.log(newV);
  		if(newV){
  			this.$refs.upload.clearFiles();
  			this.imageList = [];
  		}
  	},
  },
  methods:{
  	look(i,Description){
        this.looksrc = i;
        this.lookDescription = Description;
        this.isShowImageDialog = true;
    },
  	queryPicquire(){
		var $this = this;
		axios.get($this.baseUrl+'api/project/template?type=walk',{
			headers:{
				"Content-Type":"application/json"
			}
        }).then(res => {
        	  $this.tempId = JSON.parse(res.data.tempId)
              $this.house = JSON.parse(res.data.house); 
              $this.company= JSON.parse(res.data.company);
              // console.log($this.house);
              // console.log($this.company)
            },error =>{
        })
	},
  	handleAvatarSuccess(res, file) {
        this.logoUrl = URL.createObjectURL(file.raw);
        // console.log(res);
        // if(this.imagedList.length!=0){
        // 	// this.imageList = this.imageList.concat(this.imagedList);
        // 	// console.log(this.imageList);
       	// 	this.imageList.push(res.key);
        // 	console.log(this.imageList);
        // }else{
       		this.imageList.push(res.key);
        // }
	},
  	handleRemove(file, fileList) {
        // console.log(file, fileList);
        // this.imageList = [];
        fileList.forEach((item)=>{
        	this.imageList.push(item.response.key);
        })
    },
  	onSubmit(){
  		this.form.src=this.imageList
  		// console.log(this.form);
  		if(this.typeIt == "house"){
  			this.house.push(this.form);
  		}else if(this.typeIt == "com"){
  			this.company.push(this.form);
  		}
  		this.form = {
  			name:"",
  			description:"",
  			count:"",
  			isChoose:false,
  			src:"",
  		};
  		this.dialogVisible = false;
  		this.typeIt = "";
  		// this.$refs.upload.clearFiles();
  		// this.queryPicquire();
  	},
  	onEdit(){
  		// this.$refs.upload.clearFiles();
  		this.form.src=this.imagedList.concat(this.imageList);
  		// console.log(this.imageList);
  		// console.log(this.form);
  		if(this.typeIt == "house"){
  			this.house[this.activeIndex].name = this.form.name;
  			this.house[this.activeIndex].description = this.form.description;
  			this.house[this.activeIndex].count = this.form.count;
  			this.house[this.activeIndex].isChoose = this.form.isChoose;
  			this.house[this.activeIndex].src = this.form.src;
  			// console.log(this.house);
  			// this.house.push(this.form);
  		}else if(this.typeIt == "com"){
  			this.company[this.activeIndex]=this.form
  		}
  		this.form = {
  			name:"",
  			description:"",
  			count:"",
  			isChoose:false,
  			src:"",
  		};
  		this.dialogVisible = false;
  		this.typeIt = "";
  		this.activeIndex = "";
  		// this.imageList = [];
  		this.imagedList = [];
  		// this.$refs.upload.clearFiles();
  	},
  	addType(type){
  		this.form = {
  			name:"",
  			description:"",
  			count:"",
  			isChoose:false,
  			src:"",
  		};
  		this.imagedList = [];
  		// this.imageList = [];
  		this.typeIt = type;
  		this.dialogVisible = true;
  		// console.log(this.form);
  		// this.$refs.upload.clearFiles();
  	},
  	deleteImg(type,index,k){
  		// console.log(type,index,k);
  		if(type == "house"){
  			this.house[index].src.splice(k,1);
  		}else if(type=="com"){
  			this.company[index].src.splice(k,1);
  		}
  	},
  	toEdit(type,index){
  		// this.$refs.upload.clearFiles();
  		this.activeIndex = index;
  		this.typeIt = type;
  		this.dialogVisible = true;
  		// console.log(this.house);
  		if(type == "house"){
  			this.form = {
	  			name:this.house[index].name,
	  			description:this.house[index].description,
	  			count:this.house[index].count,
	  			isChoose:this.house[index].isChoose,
	  			src:this.house[index].src,
	  		};
	  		this.imagedList = this.house[index].src;
  		}else if(type=="com"){
  			this.form = {
	  			name:this.company[index].name,
	  			description:this.company[index].description,
	  			count:this.company[index].count,
	  			isChoose:this.company[index].isChoose,
	  			src:this.company[index].src,
	  		};
	  		this.imagedList = this.company[index].src;
  		}
  		
  	},
  	saveIt(){
  		var $this = this;
		var obj={
			tempId:$this.tempId ,
			type: "walk",
			house: $this.house,
			company: $this.company,
		}
		// console.log(obj);
        axios.post($this.baseUrl+'api/project/createTemp',obj,{
            headers:{
                  "Content-Type":"application/json"
            }
          }).then(res => {
          		$this.$notify({
                  message: "保存成功",
                });
              	// console.log(res.data);
            },error =>{
            
        })
  	}
  }
}
</script>

<style lang="less">
	#imcaMg {
		.padding{
			padding-right:0;
			.mgTitle{
				.inb{
					margin-right: 15px;
				}
			}
			.container {
			  // display: grid;
			  margin-top: 20px;
				.imgMore{
					margin:20px 0;
					.case{
						width: 22%;
						margin-right: 1%;
						span{
							font-size: 0.76rem;
							vertical-align: middle;
						}
						img{
							vertical-align: middle;
						}
						.caseimg{
							width: 100%;
						}
					}
			  	}
			}
		}
		.bt{
			border-top: 1px solid #dcdfe6;
		}
		.toSave{
			width: 100%;
			margin:30px 0;
			button{
				width: 30%;
			}
		}
		 .avatar-uploader .el-upload {
		    border: 1px dashed #d9d9d9;
		    border-radius: 6px;
		    cursor: pointer;
		    position: relative;
		    overflow: hidden;
		  }
		  .avatar-uploader .el-upload:hover {
		    border-color: #409EFF;
		  }
		  .avatar-uploader-icon {
		    font-size: 28px;
		    color: #8c939d;
		    width: 178px;
		    height: 178px;
		    line-height: 178px;
		    text-align: center;
		  }
		  .avatar {
		    width: 178px;
		    height: 178px;
		    display: block;
		  }
		  .description{
		  	color: #c5c4c4;
		  	font-size: 0.8rem;
		  }
	}
</style>