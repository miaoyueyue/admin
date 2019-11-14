<template>
	<div id="buildDes">
		<div class="searchcon ">
		  	<div class="condition inb">
		  		<div class="title">写字楼名称:</div>
		  		<div  class="title">{{buildDes.houseName}}</div>
		  	</div>
		    <div class="condition inb">
			  	<div class="title">地址:</div>
			  	<div class="title">{{buildDes.houseAddress}}</div>
		 	</div>
		    <div class="condition inb">
			  	<div class="title">负责人:</div>
			  	<div class="title">{{buildDes.dutyName}}</div>
			</div>
			<div class="condition inb">
				<div class="title">状态:</div>
		  		<!-- <div  class="title">{{buildDes.status}}</div> -->
		  		<div class="title" v-if="buildDes.status == 'pending'">未开始</div>
				<div class="title" v-if="buildDes.status == 'floor'">扫楼中</div>
				<div class="title" v-if="buildDes.status == 'end'">扫楼结束，待配送</div>
				<div class="title" v-if="buildDes.status == 'delivery'">配送完成</div>
				<div class="title" v-if="buildDes.status == 'invalid'">无效</div>
			</div>
			<div class="condition inb">
				<div class="title">当前申请企业总数:</div>
		  		<div  class="title">{{buildDes.companyCount}}</div>
			</div>
			<div class="condition inb">
				<div class="title">当前申请总数:</div>
		  		<div  class="title">{{buildDes.applyCount}}</div>
			</div>
			<div class="condition inb">
				<el-button type="text" @click="toPhoto">查看照片>></el-button>
			</div>
		</div>
		<div class="searchcon flexb">
			<div class="condition flex">
			  	<div class="title">企业状态:</div>
			  	<el-select v-model="status" placeholder="请输入关联商品">
				    <el-option
				      v-for="item in statusOptions"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				</el-select>
			</div>
			<div class="condition flex">
			  	<div class="title">申请时间:</div>
			  	<el-date-picker
			      v-model="cycleTime"
			      type="daterange"
			      range-separator="至"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期">
			    </el-date-picker>
			</div>
			<!-- <div class="condition flex">
			  	<div class="title">期望送货时间:</div>
			  	<el-date-picker
			      v-model="value1"
			      type="date"
			      placeholder="选择日期">
			    </el-date-picker>
			</div> -->
		</div>
		<div class="searchcon flexb">
			<div class="condition flex">
			  	<div class="title">申请确认:</div>
			  	<el-select v-model="isSure" placeholder="" style="width:120px;">
				    <el-option
				      v-for="item in SureOptions"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				</el-select>
			</div>
			<div class="condition flex">
			  	<div class="title">确认收货方式:</div>
			  	<el-select v-model="sureWay" placeholder="请输入关联商品">
				    <el-option
				      v-for="item in typeOfGetOptions"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				</el-select>
			</div>
			<div class="condition flex">
			  	<div class="title">企业名称:</div>
			  	<div><el-input v-model="orgName" placeholder="请输入内容"></el-input></div>
			</div>
			<div>
				<el-button type="primary" size="small" style="margin-top: 10px;" @click="queryAllList">搜索</el-button>
			</div>
		</div>
		<div class="flexb padding" style="margin-bottom: -20px;">
			<div>
				<h5>申请企业列表</h5>
			</div>
			<!-- <div>
				配送次数字段单次配型的项目不展示
			</div> -->
			<div>
				<el-button type="primary" size="small" @click="addOrg">新增企业</el-button>
				<el-button type="primary" size="small" @click="handleDownload">导出</el-button>
			</div>
		</div>
		<div class="padding">
			<el-table
			    :data="tableData"
			    stripe
			    border
			    style="width: 100%">
			    <el-table-column
			      prop="applyId"
			      label="ID"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="orgName"
			      label="企业名称"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="roomNo"
			      label="楼层房间号">
			    </el-table-column>
			    <el-table-column
			      prop="name"
			      label="申请人姓名">
			    </el-table-column>
			    <el-table-column
			      prop="phone"
			      label="联系方式">
			    </el-table-column>
			    <el-table-column
			      prop="total"
			      label="申请数量">
			    </el-table-column>
			    <el-table-column
			      prop="actualTotal"
			      label="实际配送数量">
			    </el-table-column>
			    <!-- <el-table-column
			      prop="address"
			      label="申请配送次数">
			    </el-table-column> -->
			    <!-- <el-table-column
			      prop="address"
			      label="实际配送次数">
			    </el-table-column> -->
			    <el-table-column
			      prop="sureTime"
			      label="确认收货时间">
			    </el-table-column>
			    <el-table-column
			      prop="createTime"
			      label="用户申请时间">
			    </el-table-column>
			    <el-table-column
			      prop="isSure"
			      label="申请确认">
			      <template slot-scope="scope">
					<div v-if="scope.row.isSure == 'no'">否</div>
					<div v-if="scope.row.isSure == 'yes'">是</div>
				  </template>
			    </el-table-column>
			    <el-table-column
			      prop="sureWay"
			      label="确认收货方式">
				  <template slot-scope="scope">
					<div v-if="scope.row.sureWay == 'system'">系统确认</div>
					<div v-if="scope.row.sureWay == 'self'">申请者确认</div>
					<div v-if="scope.row.sureWay == 'allograph'">代签</div>
				  </template>
			    </el-table-column>
			    <el-table-column
			      prop="status"
			      label="进度状态">
				  <template slot-scope="scope">
					<div v-if="scope.row.status == 'pending'">待配送</div>
					<div v-if="scope.row.status == 'done'">签收</div>
					<div v-if="scope.row.status == 'invalid'">无效</div>
				  </template>
			    </el-table-column>
			    <el-table-column
			      prop="remark"
			      label="备注">
			    </el-table-column>
			    <el-table-column
			      label="操作">
			      <template slot-scope="scope">
			        <!-- <el-button @click="setStatus(scope.row,'invalid')" type="text" size="small">设为无效</el-button> -->
			         <el-button @click="setStatus(scope.row,'invalid')" type="text" size="small" v-if="scope.row.status != 'invalid'">设为无效</el-button>
			        <el-button @click="setEnable(scope.row)" type="text" size="small" v-else>设为有效</el-button>

			        <el-button @click="setStatus(scope.row,'done')" type="text" size="small">签收</el-button>
			        <el-button type="text" size="small" @click="toBusinessDes(scope.row)">查看</el-button>
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
		  width="40%"
		  >
		  	<el-form label-width="100px">
			  <el-form-item label="企业名称">
			    <el-input v-model="addOrgName"></el-input>
			  </el-form-item>
			  <el-form-item label="申请者姓名">
			    <el-input v-model="addName"></el-input>
			  </el-form-item>
			  <el-form-item label="楼层房间号">
			    <el-input v-model="roomNo"></el-input>
			  </el-form-item>
			  <el-form-item label="联系方式">
			    <el-input v-model="phone" placeholder=""></el-input>
			  </el-form-item>
			  <el-form-item label="申请数量">
			    <el-input v-model="addTotal" placeholder=""></el-input>
			  </el-form-item>
			  <el-form-item label="备注">
			    <el-input v-model="remark" placeholder=""></el-input>
			  </el-form-item>
			  <el-form-item label="创建管理者">
			    <el-input v-model="seller" placeholder="" readonly></el-input>
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
  name: 'buildDes',
  data(){
  	return{
		// proId:this.$route.query.id,
  		city:"",
  		status:"",
  		orgName:"",
  		value1:"2019-4-10",
  		currentPage:1,
  		total:0,
  		tableData: [],
        typeOfGet:"",
        typeOfGetOptions: [{
          value: '',
          label: '全部'
        }, {
          value: 'self',
          label: '申请者确认'
        }, {
          value: 'allograph',
          label: '代签'
        }, {
          value: 'system',
          label: '系统确认'
        }],
        statusOptions:[{
          value: '',
          label: '全部'
        }, {
          value: 'pending',
          label: '待配送'
        }, {
          value: 'done',
          label: '签收'
        }, {
          value: 'invalid',
          label: '无效'
        }],
        SureOptions: [{
          value: '',
          label: '全部'
        }, {
          value: 'yes',
          label: '是'
        }, {
          value: 'no',
          label: '否'
        }],
        signSure:"",
        rGoods:"",
        cycleTime:"",
        isSure:"",
        sureWay:"",
        orgName:"",
        dialogVisible:false,//新建模板
        addOrgName:"",
        addName:"",
        roomNo:"",
        phone:"",
        addTotal:"",
        remark:"",
        seller:sessionStorage.getItem("userName"),
  	}
  },
  	computed:{
  		des(){
  			return JSON.parse(sessionStorage.getItem('getProDes'))
  		},
	    buildDes(){
	   		return JSON.parse(sessionStorage.getItem('getBuildDes'))
	    }
  	},
	created(){
	  	this.queryAllList();
	  	console.log(this.buildDes);
	},
  methods:{
  	toPhoto(){
		this.$router.push({
			path:"/proPhoto",
			query:{
				type:0
			}
		})
	},
  	addOrg(){
  		this.dialogVisible = true;
  		this.roomNo = "";
		this.addTotal = "";
		this.remark = "";
		this.addName = "";
		this.phone = "";
		this.addOrgName = "";
  	},
  	onSubmit(){
  		var obj = {
			"productId":this.des.product_id,
			"name":this.addName,
			"phone":this.phone,
			"orgName":this.addOrgName,
			"house":{
				"houseId":this.buildDes.id,
				"houseName":this.buildDes.houseName,
				"houseAddress":this.buildDes.houseAddress,
				"city":this.buildDes.city
			},
			"roomNo":this.roomNo,
			"total":this.addTotal,
			"remark":this.remark,
			"seller":this.seller
		}
		console.log(obj);
		var $this = this;
  		axios.post($this.baseUrl+'api/luckgroup/create',obj,{
		        headers:{
		            "Content-Type":"application/json"
		        }
	        }).then(res => {
                console.log(res.data);
                $this.dialogVisible = false;
                $this.roomNo = "";
				$this.addTotal = "";
				$this.remark = "";
				$this.addName = "";
				$this.phone = "";
				$this.addOrgName = "";
                $this.queryAllList();
            },error =>{
	    })
  	},
  	setStatus(row,type){
  		var $this = this;
		if(type == "invalid"){
			var obj={
	  			"original":row.status,
				"status":type,
				"applyId":row.applyId,
				"actualTotal":"",
			}
			$this.$confirm('确认设为无效？')
	          .then(_ => {
			    axios.post($this.baseUrl+'api/luckgroup/update',obj,{
				        headers:{
				            "Content-Type":"application/json"
				        }
			        }).then(res => {
		                console.log(res.data);
		                $this.queryAllList();
		            },error =>{
			    })
	          })
	          .catch(_ => {});
		}else{
			$this.$prompt('确认设置签收？', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          inputValue:row.total
	        }).then(({ value }) => {
	        	var obj={
		  			"original":row.status,
					"status":type,
					"applyId":row.applyId,
					"actualTotal":value,
				}
	           	axios.post($this.baseUrl+'api/luckgroup/update',obj,{
				        headers:{
				            "Content-Type":"application/json"
				        }
			        }).then(res => {
		                console.log(res.data);
		                $this.queryAllList();
		            },error =>{
			    })
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '取消输入'
	          });       
	        });
			// $this.$confirm('确认设置签收？')
	  //         .then(_ => {
			//     axios.post($this.baseUrl+'api/luckgroup/update',obj,{
			// 	        headers:{
			// 	            "Content-Type":"application/json"
			// 	        }
			//         }).then(res => {
		 //                console.log(res.data);
		 //                $this.queryAllList();
		 //            },error =>{
			//     })
	  //         })
	  //         .catch(_ => {});
		}
  	},
  	setEnable(row){
  		this.$confirm('确认设为有效？')
          .then(_ => {
            var $this = this;
	  		var obj={
				"status":row.originalStatus,
				"applyId":row.applyId
			}
			console.log(row)
		    	axios.post($this.baseUrl+'api/luckgroup/update',obj,{
				        headers:{
				            "Content-Type":"application/json"
				        }
			        }).then(res => {
		                console.log(res.data);
		                $this.queryAllList();
		            },error =>{
			    	})
	          	})
        .catch(_ => {});
  	},
  	toBusinessDes(row){
  		sessionStorage.setItem('getBusinessDes',JSON.stringify(row))
  		this.$router.push({
  			path:"/businessDes"
  		})
  	},
  	current_change(currentPage){
		this.currentPage = currentPage;
		console.log(this.currentPage);
		this.queryAllList();
	},
    queryAllList(){
    	var $this = this;
    	var cycle = ["",""];
    	if($this.cycleTime != ""){
    		cycle = [];
    		cycle.push($this.Format($this.cycleTime[0]));
	  		cycle.push($this.Format($this.cycleTime[1]));
	        console.log(cycle);
    	}
	    axios.get($this.baseUrl+'api/project/houseApplyList?page='+$this.currentPage+'&pageSize=10&houseId='+$this.buildDes.id+'&city='+$this.city+'&houseName='+$this.buildDes.houseName+'&status='+$this.status+'&isSure='+$this.isSure+'&sureWay='+$this.sureWay+'&startTime='+cycle[0]+'&endTime='+cycle[1]+'&orgName='+$this.orgName,{
		        headers:{
		            "Content-Type":"application/json"
		        }
	        }).then(res => {
                console.log(res.data);
                $this.tableData = res.data.result;
                $this.total = res.data.count;
            },error =>{
	    })
    },
    handleDownload() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['序号', '项目名称', '楼层房间号', '申请人姓名', '联系方式', '申请数量', '实际配送数量', '确认收货时间', '用户申请时间', '申请确认', '确认收货方式', '进度状态', '备注']
        const filterVal = ['applyId', 'orgName', 'roomNo', 'name', 'phone', 'total', 'actualTotal', 'createTime', 'sureTime', 'isSure', 'sureWay', 'status', 'remark']
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "企业列表",
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
      })
      this.queryAllList();
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === "isSure" || j === "sureWay" || j === "status") {
        	// console.log(v.isSure);
        	if (v.isSure === "no") {
	        	v.isSure = "否"
	        }else if(v.isSure == "yes"){
        		v.isSure = "是"
        	}

        	if (v.sureWay === "system") {
	        	v.cycle = "系统确认"
	        }else if(v.sureWay == "self"){
        		v.sureWay = "申请者确认"
        	}else if(v.sureWay == "allograph"){
        		v.sureWay = "代签"
        	}

        	if(v.status == "pending"){
        		v.status = "待配送"
        	}else if(v.status == "done"){
        		v.status = "签收"
        	}else if(v.status == "invalid"){
        		v.status = "无效"
        	}
        	// console.log(v[j]);
	        return v[j]
        } else {
          return v[j]
        }
      }))
    },
  }
}
</script>

<style lang="less">
	#buildDes {
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
					vertical-align: middle;
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
	}
</style>