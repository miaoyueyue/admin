<template>
	<div id="projectDes">
		<div class="searchcon flexb">
		  	<div class="condition flex">
		  		<div class="title">项目名称:</div>
		  		<div  class="title">{{des.name}}</div>
		  		<!-- <div><el-button type="text" @click="toCreate">修改项目信息>></el-button></div> -->
		  	</div>
		    <div class="condition flex">
			  	<div class="title">客户:</div>
			  	<div class="title">{{des.b_name}}</div>
		 	</div>
		    <div class="condition flex">
			  	<div class="title">状态:</div>
			  	<div class="title" v-if="des.status == 'pending'">待开始</div>
				<div class="title" v-if="des.status == 'progress'">进行中</div>
				<div class="title" v-if="des.status == 'done'">完成</div>
			</div>
			<div class="condition flex">
				<div class="title">城市:</div>
		  		<div  class="title">{{cityDes.city}}</div>
			</div>
		</div>
		<div class="searchcon flexb">
			<!-- <div class="condition flex">
		  		<div class="title">商圈:</div>
		  		<el-select v-model="pType" placeholder="请选择">
				    <el-option
				      v-for="item in pTypeOptions"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				</el-select>
		  	</div> -->
			<div class="condition flex">
			  	<div class="title">状态:</div>
			  	<el-select v-model="status" placeholder="请选择">
				    <el-option
				      v-for="(item,index) in statusOptions"
				      :key="index"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				</el-select>
			</div>
			<div class="condition flex">
			  	<div class="title">写字楼名称:</div>
		  		<el-input v-model="houseName" placeholder="请输入内容"></el-input>
			</div>
			<div>
				<el-button type="primary" @click="queryAllList">搜索</el-button>
			</div>
			<div></div>
		</div>
		<div class="searchcon flexb">
		  	<div class="condition">
		  		<div class="title" style="margin-right: 20px;">
		  			<div>目标派发量: {{des.count}}</div>
		  		</div>
		  		<div class="title" style="margin-right: 20px;">
		  			<div>实际派发量: {{count}}</div>
		  		</div>
		  		<div class="title" style="margin-right: 20px;">
		  			<div>完成百分比: {{(count/des.count).toFixed(2)}}</div>
		  		</div>
		  	</div>
		</div>
		<div class="flexb tableName">
			<div>写字楼详情<span>(共{{total}}个写字楼)</span></div>
			<el-button class="margin" type="primary" @click="addHouse">新建写字楼</el-button>
		</div>
		<div class="padding">
			<el-table
			    :data="tableData"
			    stripe
			    border
			    style="width: 100%">
			    <el-table-column
			      prop="id"
			      label="序号"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="city"
			      label="城市"
			      >
			    </el-table-column>
			    <!-- <el-table-column
			      prop="address"
			      label="商圈">
			    </el-table-column> -->
			    <el-table-column
			      prop="houseName"
			      label="写字楼名称">
			    </el-table-column>
			    <el-table-column
			      prop="houseAddress"
			      label="地址">
			    </el-table-column>
			    <el-table-column
			      prop="dutyName"
			      label="负责人">
			    </el-table-column>
			    <el-table-column
			      prop="dutyName"
			      label="执行人员">
			    </el-table-column>
			    <el-table-column
			      prop="companyCount"
			      label="申请企业">
			    </el-table-column>
			    <el-table-column
			      prop="applyCount"
			      label="申请数量">
			    </el-table-column>
			    <el-table-column
			      prop="actualCount"
			      label="派发数量">
			    </el-table-column>
			    <el-table-column
			      prop="status"
			      label="进度状态">
			      <template slot-scope="scope">
					<div v-if="scope.row.status == 'pending'">未开始</div>
					<div v-if="scope.row.status == 'floor'">扫楼中</div>
					<div v-if="scope.row.status == 'end'">扫楼结束，待配送</div>
					<div v-if="scope.row.status == 'delivery'">配送完成</div>
					<div v-if="scope.row.status == 'invalid'">无效</div>
				  </template>
			    </el-table-column>
			    <el-table-column
			      label="操作">
			      <template slot-scope="scope">
			        <el-button @click="setInvalid(scope.row)" type="text" size="small" v-if="scope.row.status != 'invalid'">设为无效</el-button>
			        <el-button @click="setEnable(scope.row)" type="text" size="small" v-else>设为有效</el-button>
			        <el-button type="text" size="small" @click="toBuildDes(scope.row)">查看</el-button>
			      </template>
			    </el-table-column>
			</el-table>
			<el-pagination 
			 class="fy txtright margin"
             layout="prev, pager, next"
             @current-change="current_change"
             :total="total"
             background
            >
          </el-pagination>
		</div>
		<el-dialog
		  title="新建写字楼"
		  :modal-append-to-body="false"
		  :visible.sync="dialogVisible"
		  width="30%"
		  >
		  	<el-form label-width="80px">
			  <el-form-item label="名称">
			    <el-input v-model="addHouseName"></el-input>
			  </el-form-item>
			  <el-form-item label="地址">
			    <el-input v-model="addHouseAddress"></el-input>
			  </el-form-item>
			  <el-form-item label="城市">
			    <el-input v-model="cityDes.city" placeholder="" :disabled="true"></el-input>
			  </el-form-item>
			  <el-form-item label="负责人">
			    <el-input v-model="cityDes.dutyName" placeholder="" :disabled="true"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="onSubmit">立即创建</el-button>
			  </el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
export default {
  name: 'projectDes',
  data(){
  	return{
  		proId:this.$route.query.id,
  		houseName:"",
  		currentPage:1,
  		total:200,
  		city:sessionStorage.getItem("city"),
  		status:"",
  		statusOptions:[{
          value: '',
          label: '全部'
        },{
          value: 'pending',
          label: '未开始'
        }, {
          value: 'floor',
          label: '扫楼中'
        }, {
          value: 'end',
          label: '扫楼结束，待配送 '
        },{
          value: 'delivery',
          label: '配送完成'
        },{
          value: 'invalid',
          label: '无效'
        }],
  		tableData: [],
  		count:0,
  		dialogVisible:false,
  		addHouseName:"",
  		addHouseAddress:"",
  	}
  },
  computed:{
  		des(){
	   	 	return JSON.parse(sessionStorage.getItem('getProDes'))
	    },
	    cityDes(){
	   		return JSON.parse(sessionStorage.getItem('cityDes'))
	    },
  },
  created(){
  	this.queryAllList();
  	// console.log(this.des);
   	// console.log(this.cityDes);
  	this.querySumResult();
  },
  methods:{
  	onSubmit(){
  		var obj = {
    		"projectId":this.des.id,
		    "productId":this.des.product_id,
			"houseName":this.addHouseName,
			"houseAddress":this.addHouseAddress,
			"city":this.cityDes.city,
			"dutyName":this.cityDes.dutyName
    	}
  		// console.log(obj);
  		var $this = this;
  		axios.post($this.baseUrl+'api/project/createBuild',obj,{
		        headers:{
		            "Content-Type":"application/json"
		        }
	        }).then(res => {
                // console.log(res.data);
                $this.dialogVisible = false;
                $this.addHouseName = "";
				$this.addHouseAddress = "";
                $this.queryAllList();
            },error =>{
	    })
  	},
  	addHouse(){
  		this.dialogVisible = true;
  		this.addHouseName = "";
		this.addHouseAddress = "";
  	},
  	setInvalid(row){
        this.$confirm('确认设为无效？')
          .then(_ => {
            var $this = this;
	  		var obj={
	  			"original":row.status,
				"status":"invalid"
			}
			// console.log(row)
		    axios.put($this.baseUrl+'api/project/setHouseStatus?houseId='+row.id,obj,{
			        headers:{
			            "Content-Type":"application/json"
			        }
		        }).then(res => {
	                // console.log(res.data);
	                $this.queryAllList();
	            },error =>{
		    })
          })
          .catch(_ => {});
  	},
  	setEnable(row){
  		this.$confirm('确认设为有效？')
          .then(_ => {
            var $this = this;
	  		var obj={
				"status":row.original
			}
			// console.log(row)
		    axios.put($this.baseUrl+'api/project/setHouseStatus?houseId='+row.id,obj,{
			        headers:{
			            "Content-Type":"application/json"
			        }
		        }).then(res => {
	                // console.log(res.data);
	                $this.queryAllList();
	            },error =>{
		    })
          })
          .catch(_ => {});
  	},
  	toBuildDes(row){
  		sessionStorage.setItem('getBuildDes', JSON.stringify(row));
  		this.$router.push({
  			path:"/buildDes",
  		})
  	},
  	current_change(currentPage){
		this.currentPage = currentPage;
		// console.log(this.currentPage);
		this.queryAllList();
	},
    queryAllList(){
    	var $this = this;
	    axios.get($this.baseUrl+'api/project/houseList?page='+$this.currentPage+'&pageSize=10&projectId='+$this.proId+'&houseName='+$this.houseName+'&city='+$this.cityDes.city+'&status='+$this.status+'',{
		        headers:{
		            "Content-Type":"application/json"
		        }
	        }).then(res => {
                // console.log(res.data);
                $this.tableData = res.data.list;
                $this.total = res.data.count;
            },error =>{
	    })
    },
    querySumResult(){
    	var $this = this;
	    axios.get($this.baseUrl+'api/project/sumResult?projectId='+$this.proId+'&city='+$this.city,{
		        headers:{
		            "Content-Type":"application/json"
		        }
	        }).then(res => {
                // console.log(res.data);
                $this.count = res.data.count;
            },error =>{
	    })
    },
  }
}
</script>

<style lang="less">
	#projectDes {
		.searchcon{
			margin: 10px;
			.condition{
				margin: 10px;
				.title{
					display: inline-block;
					white-space: nowrap;
					line-height: 40px;
					margin-right: 16px;
					font-size: 0.96rem;
				}
				.el-button--primary {
					padding: 0px 14px;
					font-size: 0.8rem;
					margin:6px 10px;
					height: 26px;
				}
				.photoDemand{
					border:1px solid #dcdfe6;
					&>div{
						margin-right: 10px;
					}
				}
				.listName{
					.title{
						opacity: 0.6;
						font-size: 0.94rem;
					}
				}
			}
		}
		.tableName{
			padding:0 15px;
			margin-bottom: -10px;
			>div{
				line-height: 40px;
				span{
					opacity: 0.6;
					font-size: 0.6rem;
					margin-left: 10px;
				}
			}
			.el-button{
				margin: 0;
			}
		}
	}
</style>