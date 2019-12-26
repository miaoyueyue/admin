<template>
	<div id="businessDes">
		<div class="searchcon">
		  	<div class="condition inb">
		  		<div class="title">企业名称:</div>
		  		<div  class="title">{{businessDes.orgName}}</div>
		  	</div>
		    <div class="condition inb">
			  	<div class="title">楼层房间号:</div>
			  	<div class="title">{{businessDes.roomNo}}</div>
		 	</div>
		    <div class="condition inb">
			  	<div class="title">申请人:</div>
			  	<div class="title">{{businessDes.name}}</div>
			</div>
			<div class="condition inb">
				<div class="title">手机号码:</div>
		  		<div  class="title">{{businessDes.phone}}</div>
			</div>
			<div class="condition inb">
				<div class="title">申请时间:</div>
		  		<div  class="title">{{businessDes.createTime}}</div>
			</div>
		</div>
		<div class="searchcon">
			<div class="condition inb">
				<div class="title">签收方式:</div>
		  		<div class="title" v-if="businessDes.sureWay == 'system'">系统确认</div>
				<div class="title" v-if="businessDes.sureWay == 'self'">申请者确认</div>
				<div class="title" v-if="businessDes.sureWay == 'allograph'">代签</div>
			</div>
			<div class="condition inb">
				<div class="title">申请是否经本人确认:</div>
		  		<div  class="title">未确认</div>
		  		<div class="title" v-if="businessDes.isSure == 'no'">否</div>
				<div class="title" v-if="businessDes.isSure == 'yes'">是</div>
			</div>
			<div class="condition inb">
				<div class="title">状态:</div>
		  		<div class="title" v-if="businessDes.status == 'pending'">待配送</div>
				<div class="title" v-if="businessDes.status == 'done'">签收</div>
				<div class="title" v-if="businessDes.status == 'invalid'">无效</div>
			</div>
			<div class="condition inb">
				<div class="title">签收时间:</div>
		  		<div  class="title">{{businessDes.sureTime}}</div>
			</div>
		</div>
		<div class="searchcon">
			<!-- <div class="condition inb">
				<div class="title">申请配送次数:</div>
		  		<div  class="title">1</div>
			</div> -->
			<div class="condition inb">
				<div class="title">申请份数:</div>
		  		<div  class="title">{{businessDes.total}}</div>
			</div>
			<!-- <div class="condition inb">
				<div class="title">展示申请份数</div>
		  		<el-input v-model="city" placeholder="" style="width: 100px;"></el-input>
			</div> -->
			<div class="condition inb">
				<div class="title">是否设为无效:</div>
		  		<div  class="title">
					<el-switch
					  v-model="value2"
					  @change="setStatus"
					  inactive-color="#ff4949">
					</el-switch>
		  		</div>
			</div>
		</div>
		<div class="searchcon">
			<!-- <div class="condition inb">
				<div class="title">实际配送次数:</div>
		  		<div  class="title">1</div>
			</div> -->
			<div class="condition inb">
				<div class="title">实际配送份数:</div>
		  		<div  class="title">{{businessDes.actualTotal}}</div>
			</div>
			<!-- <div class="condition inb">
				<div class="title">实际展示份数</div>
		  		<el-input v-model="city" placeholder="" style="width: 100px;"></el-input>
			</div>
			<div class="condition inb">
				<el-button type="primary" round>保存</el-button>
			</div> -->
		</div>
		<div class="padding showImg">
			<div class="flex">
				<h2>企业相关图片</h2>
				<!-- <div>
					<el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
					    <el-radio-button label="allImg">全部照片</el-radio-button>
					    <el-radio-button label="right">客户可见</el-radio-button>
					  </el-radio-group>
				</div> -->
				<div class="changeButton">
					<el-button  @click="selectAll" :type="buttonType">全部照片</el-button><el-button  @click="selectVis" :type="buttonType1">客户可见</el-button>
				</div>
			</div>
			<div class="imgLine" v-for="(item,index) in images" :key="index">
		        <div class="imgName">
		          {{item.name}}
		        </div>
		        <div>
		        	<div class="imgMore">
		        		<div style="position: relative;" class="case inb"  v-for="(i,k) in item.src" :key="'a'+k">
							<div style="line-height: 180px;text-align: center;"><img class="caseimg" :src="pathUrl+i" alt=""></div>
							<div style="position: absolute;background-color: rgb(252,84,101);padding: 2px 5px;color: white;top: 0;font-size: 10px"><div>案列图片:</div></div>
							<div class="txtcenter">
								<!-- <img src="../../static/imgs/delete.png" alt=""> -->
								<span class="el-icon-picture-outline"></span>
								<span>案例</span>
							</div>
						</div>
						<div class="case inb"  v-for="(i,k) in item.imgList" :key="2+k"  v-if="i.isVisible || !seeVis">
							<div style="line-height: 180px;text-align: center;" @click="look(i.src)">
								<img class="caseimg" :src="pathUrl+i.src" alt="">
							</div>
							<div class="flexa">
								<div  @click="deleteit(index,k)">
									<img src="../../static/imgs/delete.png" alt="">
									<span>删除</span>
								</div>
								<div>
									<el-checkbox v-model="i.isVisible">客户可见</el-checkbox>
								</div>
							</div>
						</div>
<!-- 						<div class="case inb" @click="toEdit('house',index)">
							<div style="line-height: 180px;text-align: center;"><img class="caseimg"src="../../static/imgs/addImg.png" alt=""></div>
							<div class="txtcenter">
								<span>继续添加图片</span>
							</div>
						</div> -->
						<div class="case inb" @click="getIndex(index)">
					  		<el-upload
							  class="avatar-uploader"
							  :action="baseUrl+'api/upload/proxy'"
							  :data='{prefix: "project/"}'
							  :show-file-list="false"
							  :on-success="handleAvatarSuccess"
							  >
							  <div style="line-height: 180px;text-align: center;"><img class="caseimg"src="../../static/imgs/addImg.png" alt=""></div>
								<div class="txtcenter">
									<span>继续添加图片</span>
								</div>
							</el-upload>
					  	</div>
					</div>
		        </div>
		        
		        <!-- <div class="oneLine flex" style="flex-wrap: wrap;">
		        	<div style="width:100px;height: 180px;line-height: 180px"><div>图片:</div></div>
		          	<div v-for="(i,k) in item.imgList" :key="k" style="width: 20%;height: 180px;">
			            <div style="line-height: 180px;width: 100%;">
			              <img :src="pathUrl+i" alt="" style="max-width: 100%;">
			            </div>
			            <div class="flexb">
			              <div  @click="deleteImg('house',index,k)">
			                <img src="../../static/imgs/delete.png" alt="">
			                <span>删除</span>
			              </div>

			            </div>
			            			 -->              <!-- <div>
			                <el-checkbox v-model="item.">备选项</el-checkbox>
			              </div> -->
		          	<!-- </div>
		          	<div  style="width: 20%;height: 180px;">
			            <div  style="line-height: 180px;width: 100%;">
			              <img src="../../static/imgs/addImg.png" alt="">
			            </div>
			            <div class="txtcenter">
			              <div>
			                <span>添加照片</span>
			              </div>
			            </div>
		          	</div>
		        </div> -->
      		</div>
		</div>
		<el-dialog
		    :visible.sync="isShowImageDialog"
		    :close-on-click-modal = "false"
			:modal-append-to-body="false"
		  >
		    <img :src="pathUrl+looksrc" style="max-width: 100%;max-height: 100%;display: block; margin: 0 auto;"/>
		</el-dialog>
		<div class="txtcenter toSave">
	  		<el-button type="primary" @click="subImg">保存</el-button>
	  	</div>
	</div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
export default {
  name: 'businessDes',
  data(){
  	return{
  		value2:false,
  		city:"",
  		tabPosition: 'allImg',
  		radio:"",
  		images:[],
  		theTemplate:"",
  		looksrc:"",
  		isShowImageDialog:false,
  		operIndex:"",
  		seeVis:false,
  		buttonType:"primary",
  		buttonType1:"",
  	}
  },
   computed:{
   		des(){
	   		return JSON.parse(sessionStorage.getItem('getProDes'))
	    },
	    businessDes(){
	   	 return JSON.parse(sessionStorage.getItem('getBusinessDes'))
	    }
  	},
  	created(){
  		// console.log(this.businessDes);
  		console.log(JSON.parse(this.des.template_json).company);
  		this.theTemplate = JSON.parse(this.des.template_json).company;
  		this.queryBusinessImages();
  		if(this.businessDes.status == 'invalid'){
  			this.value2 = true;
  		}
  		
  	},
  	methods:{
  		selectAll(){
  			this.seeVis = false;
  			this.buttonType = "primary";
  			this.buttonType1 = "";
  		},
  		selectVis(){
  			this.seeVis = true;
  			this.buttonType1 = "primary";
  			this.buttonType = "";
  		},	
  		look(i){
  			this.looksrc = i;
  			this.isShowImageDialog = true;
  		},
  		setStatus(){
  			if(this.value2 == true){
  				var $this = this;
		  		var obj={
					"status":"invalid",
					"applyId":$this.businessDes.applyId
				}
				$this.$confirm('确认设为无效？')
		          .then(_ => {
				    axios.post($this.baseUrl+'api/luckgroup/update',obj,{
					        headers:{
					            "Content-Type":"application/json"
					        }
				        }).then(res => {
			                // console.log(res.data);
			                // $this.queryAllList();
			            },error =>{
				    })
		          })
		          .catch(_ => {
		          	$this.value2 = false;
		          });
  			}else if(this.value2 == false){
  				this.value2 = true;
  			}
  		},
  		queryBusinessImages(){
	        var $this = this;
	        axios.get($this.baseUrl+'api/project/applyImages?applyId='+$this.businessDes.applyId,{
	            headers:{
	              "Content-Type":"application/json"
	            }
            }).then(res => {
                    // console.log(res.data);
                    if(res.data[0].images){
                    	$this.images = JSON.parse(res.data[0].images);
                    }else{
                    	$this.theTemplate.forEach((item,index)=>{
                    		if(item.isShow){
                    			item.imgList = [];
                    			$this.images.push(item)
                    		}
                    	})
                    	// $this.images = $this.theTemplate.assign(obj)
                    }   
                    console.log($this.images);
                },error =>{
         	})
	    },
	    getIndex(index){
	    	// console.log(index);
	    	this.operIndex = index;
	    },
	    handleAvatarSuccess(res, file) {
	        // let img = URL.createObjectURL(file.raw);
	        // console.log(res);
	        let img = res.key;
	        var $this = this;
	        var obj={
	        	src:img,
	        	isVisible:true
	        }
	        $this.images[$this.operIndex].imgList.push(obj);
	        // $this.$set($this.images[$this.operIndex].imgList,0,img);
	       	// vm.$set(vm.items, indexOfItem, newValue)，
            this.$forceUpdate();
		},
		deleteit(index,i){
			// console.log(i);
	        this.images[index].imgList.splice(i,1);
            this.$forceUpdate();
		},
		subImg(){
			var $this = this;
	  		var obj={
				"applyId":$this.businessDes.applyId,
				"images":JSON.stringify(this.images),
			}
		    axios.put($this.baseUrl+'api/luckgroup/asyncImage',obj,{
			        headers:{
			            "Content-Type":"application/json"
			        }
		        }).then(res => {
		            // console.log(res.data);
		            // $this.queryAllList();
		            $this.queryBusinessImages();
		        },error =>{
		    })
	          
		}
  	}
}
</script>

<style lang="less">
	#businessDes {
		.searchcon{
			margin: 10px;
			.condition{
				margin: 10px 1.4rem 10px 0;
				.title{
					display: inline-block;
					white-space: nowrap;
					line-height: 40px;
					margin-right: 16px;
					font-size: 0.96rem;
					vertical-align: middle;
				}
				.el-button--primary {
					padding: 0px 14px;
					font-size: 0.8rem;
					margin:6px 10px;
					height: 26px;
				}
			}
		}
		.showImg{
			border-top: 1px solid rgb(228,228,228);
			.flex{
				h2{
					line-height: 40px;
					margin-right:30px;
				}
				.changeButton{
					button{
						margin:0;
						border-radius: 0;
					}
				}
				margin-bottom: 20px;
			}
			.el-radio-group{
				margin: 0  20px 20px!important;
				span{
					padding: 5px 16px;
				}
			}
			.imgLine{
				margin-bottom: 40px;
				.imgName{
					margin-bottom: 20px;
				}
				
				.oneLine{
					>div{
						margin-right:5%;
					}
					span{
						margin: 0;
						font-size: 0.8rem;
						vertical-align: middle;
						padding:0;
					}
					img{
						vertical-align: middle;
					}
				}
			}	
		}
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
					max-height: 100px;
				}
				.caseimg{
					max-width: 100%;
					max-height: 180px;
				}
			}
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