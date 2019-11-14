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
				<div>
					<el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
					    <el-radio-button label="allImg">全部照片</el-radio-button>
					    <el-radio-button label="right">客户可见</el-radio-button>
					  </el-radio-group>
				</div>
			</div>
			<div class="imgLine" v-for="(item,index) in 3" :key="index">
				<div class="imgName">
					摆放照/整体效果/前台照
				</div>
				<div class="oneLine flex">
					<div v-for="(item,index) in 4" :key="index">
						<div>
							<img src="../../static/imgs/addImg.png" alt="">
						</div>
						<div class="flexb">
							<div>
								<img src="../../static/imgs/delete.png" alt="">
								<span>删除</span>
							</div>
							<div>
								<el-radio v-model="radio" label="1">客户可见</el-radio>
							</div>
						</div>
					</div>
					<div>
						<div>
							<img src="../../static/imgs/addImg.png" alt="">
						</div>
						<div class="txtcenter">
							<div>
								<span>添加照片</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="txtcenter toSave">
	  		<el-button type="primary">保存</el-button>
	  	</div>
	</div>
</template>

<script>
export default {
  name: 'businessDes',
  data(){
  	return{
  		value2:"",
  		city:"",
  		tabPosition: 'allImg',
  		radio:"",
  	}
  },
   computed:{
	    businessDes(){
	   	 return JSON.parse(sessionStorage.getItem('getBusinessDes'))
	    }
  	},
  	created(){
  		console.log(this.businessDes);
  	},
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
		.toSave{
			width: 100%;
			margin:30px 0;
			button{
				width: 30%;
			}
		}
	}
</style>