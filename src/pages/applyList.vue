<template>
	<div id="applyList">
		<div class="firstMargin searchcon flexa">
		  	<div class="condition flex">
		  		<div class="title">名字:</div>
		  		<el-input v-model="name" placeholder="请输入内容"></el-input>
		  	</div>
		    <div class="condition flex">
			  	<div class="title">手机号:</div>
			  	<el-input v-model="phone" placeholder="请输入内容"></el-input>
		 	</div>
		    <div class="condition flex">
			  	<div class="title">企业名称:</div>
			  	<el-input v-model="org" placeholder="请输入内容"></el-input>
			</div>
			 <div class="condition flex">
			  	<div class="title">写字楼:</div>
			  	<el-input v-model="address" placeholder="请输入内容"></el-input>
			</div>
			<div class="condition flex">
			  	<div class="title">计划时间:</div>
			  	<el-date-picker
			      v-model="planTimes"
			      type="date"
			      placeholder="选择日期">
			    </el-date-picker>
			</div>
			<div class="condition flex">
			  	<div class="title">实际时间:</div>
			  	<el-date-picker
			      v-model="actualTimes"
			      type="date"
			      placeholder="选择日期">
			    </el-date-picker>
			</div>
			<div class="condition flex">
			  	<div class="title">状态:</div>
			  	<el-select v-model="status" placeholder="请选择">
				    <el-option
				      v-for="item in stateOptions"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
			</div>
			<div class="condition flex">
			  	<div class="title">创建时间:</div>
			    <el-date-picker
			      v-model="createdTime"
			      type="datetimerange"
			      range-separator="至"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期"
			      align="right">
			    </el-date-picker>
			</div>
			<div class="condition flex">
			  	<div class="title">产品名称:</div>
			  	<!-- <el-input v-model="productName" placeholder="请输入内容"></el-input> -->
			  	<el-select v-model="productName" placeholder="请输入关联商品" filterable>
				    <el-option
				      v-for="item in productOptions"
				      :key="item.lg_id"
				      :label="item.lg_title"
				      :value="item.lg_id">
				    </el-option>
				    <!-- <div class="txtcenter">
				   		<el-pagination 
							 class="fy txtright margin"
				             layout="prev, pager, next"
				             @current-change="current_change1"
				             :total="total1"
				             background
			            >
			            </el-pagination>
				   </div> -->
				</el-select>
			</div>
			<div class="condition ">
			  	<el-button type="primary" round @click="queryAllList">搜索</el-button>
			  	<el-button type="plain" round @click="handleDownload">导出</el-button>
			</div>
		</div>
		<div class="padding">
			<el-table
			    :data="tableData"
			    stripe
			    border
			    style="width: 100%">
			    <el-table-column
			      prop="id"
			      label="ID"
			      >
			    </el-table-column>
			    <!-- <el-table-column
			      prop="name"
			      label="用户"
			      >
			    </el-table-column> -->
			    <el-table-column
			      prop="name"
			      label="名字">
			    </el-table-column>
			    <el-table-column
			      prop="phone"
			      label="手机号">
			    </el-table-column>
			    <el-table-column
			      prop="org"
			      label="企业">
			    </el-table-column>
			    <el-table-column
			      prop="address"
			      label="写字楼">
			    </el-table-column>
			    <el-table-column
			      prop="floor"
			      label="楼层">
			    </el-table-column>
			    <el-table-column
			      prop="total"
			      label="数量">
			    </el-table-column>
			    <!-- <el-table-column
			      prop="times"
			      label="次数">
			    </el-table-column> -->
			    <el-table-column
			      prop="planTimes"
			      label="配送时间">
			    </el-table-column>
			    <el-table-column
			      prop="statusTime"
			      label="实际时间">
			    </el-table-column>
			    <el-table-column
			      prop="isConfirm"
			      label="是否确认">
			      <template slot-scope="scope">
					<div v-if="scope.row.isConfirm == 'no'">否</div>
					<div v-if="scope.row.isConfirm == 'yes'">是</div>
				  </template>
			    </el-table-column>
			    <el-table-column
			      prop="confirmType"
			      label="签收方式">
			      <template slot-scope="scope">
					<div v-if="scope.row.confirmType == 'system'">系统确认</div>
					<div v-if="scope.row.confirmType == 'self'">申请者确认</div>
					<div v-if="scope.row.confirmType == 'allograph'">代签</div>
				  </template>
			    </el-table-column>
			    <el-table-column
			      prop="status"
			      label="状态">
			      <template slot-scope="scope">
					<div v-if="scope.row.status == 'pending'">待开始</div>
					<div v-else-if="scope.row.status == 'progress'">进行中</div>
					<div v-else-if="scope.row.status == 'invalid'">无效</div>
					<div v-else-if="scope.row.status == 'done'">完成</div>
				  </template>
			    </el-table-column>
			    <el-table-column
			      prop="createdTime"
			      label="创建时间">
			    </el-table-column>
			    <el-table-column
			      prop="productName"
			      label="产品名称">
			    </el-table-column>
			    <el-table-column
			      prop="detail"
			      label="地址">
			    </el-table-column>
			    <!-- <el-table-column
			      label="操作">
			      <template slot-scope="scope">
			        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
			        <el-button type="text" size="small" @click="toCreate">编辑</el-button>
			      </template>
			    </el-table-column> -->
			</el-table>
			<el-pagination class="fy txtright margin"
             layout="prev, pager, next"
             @current-change="current_change"
             :total="total"
             background
            >
          </el-pagination>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
export default {
  name: 'applyList',
  data(){
  	return{
  		name:"",
		phone:"",
		org:"",
		address:"",
		planTimes:"",
		actualTimes:"",
		status:"",
		createdTime:"",
		productName:"",
  		currentPage:1,
  		total:200,
  		stateOptions: [{
          value: 'pending',
          label: '待开始'
        }, {
          value: 'progress',
          label: '进行中'
        },{
          value: 'done',
          label: '完成'
        }],
        value: '',
  		tableData: [],
  		searchTxt:"",
  		productOptions:[],
  	}
  },
  created(){
  	this.queryAllList();
  	this.queryProductList();
  },
  methods: {
  	queryProductList(){
	    var $this = this;
		axios.get($this.baseUrl+'api/luckgroup/product?page=1&pageSize=1000',{
				headers:{
					"Content-Type":"application/json"
				}
	        }).then(res => {
	              console.log(res.data);
	              // $this.total1 = res.data.count;
	              $this.productOptions = res.data.list;
	        },error =>{
	                  // $this.loading = false
	              // console.log(error.response);
        })
    },
      handleClick(row) {
        console.log(row);
        this.$router.push({
      		path:"/projectDes",
      	})
      },
      toCreate(){
      	this.$router.push({
      		path:"/newProject",
      	})
      },
      current_change(currentPage){
		this.currentPage = currentPage;
		console.log(this.currentPage);
		this.queryAllList();
	  },
    aaa(txt,val){
    	if(val != ""){
    		return "&" + txt + "=" + val
    	}else{
    	    return ""
    	}
    },
    queryAllList(){
    	this.searchTxt = this.aaa("name",this.name)+this.aaa("phone",this.phone)+this.aaa("org",this.org)+this.aaa("address",this.address)+this.aaa("planTimes",this.planTimes)+this.aaa("actualTimes",this.actualTimes)+this.aaa("status",this.status)+this.aaa("createdTime",this.createdTime)+this.aaa("lg_id",this.productName);
		console.log(this.name);
		console.log(this.phone);
		console.log(this.org);
		console.log(this.address);
		console.log(this.planTimes);
		console.log(this.actualTimes);
		console.log(this.status);
		console.log(this.createdTime);
		console.log(this.productName);
		console.log(this.searchTxt);
		var $this = this;
		axios.get($this.baseUrl+'api/luckgroup/all?page='+$this.currentPage+'&pageSize=10'+$this.searchTxt,{
				headers:{
					"Content-Type":"application/json"
				}
	        }).then(res => {
	              console.log(res.data);
	              $this.tableData = res.data.list;
	              $this.total = res.data.count;
	            },error =>{
	                  // $this.loading = false
	              // console.log(error.response);
        })
    },
    handleDownload() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['ID', '用户', '名字', '手机号', '企业', '写字楼', '楼层', '数量','配送时间','实际时间','状态','创建时间','产品名称','地址',]
        const filterVal = ['id', 'uname', 'name', 'phone', 'org', 'address', 'floor', 'actualTotal', 'planTimes', 'actualTimes', 'status', 'createdTime', 'productName', 'detail']
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "申请总表",
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
      })
      // this.queryProjectList();
    },
    formatJson(filterVal, jsonData) {
      	return jsonData.map(v => filterVal.map(j => {
	        if (j === "status") {
	        	if(v.status == "pending"){
	        		v.status = "待开始"
	        	}else if(v.status == "progress"){
	        		v.status = "进行中"
	        	}else if(v.status == "done"){
	        		v.status = "完成"
	        	}else if(v.status == "invalid"){
	        		v.status = "无效"
	        	}
	        	console.log(v[j]);
		        return v[j]
	        } else {
	          return v[j]
	        }
      	}))
    },
  },
}
</script>

<style lang="less">
	#applyList {
		.searchcon{
			margin: 10px;
			.condition{
				margin: 10px;
				.title{
					display: inline-block;
					white-space: nowrap;
					margin-right: 6px;
					font-size: 0.94rem;
					line-height: 40px;
				}
			}
		}
	}
</style>