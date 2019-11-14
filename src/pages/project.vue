<template>
	<div id="project">
		<div class="firstMargin searchcon flexb">
		  	<div class="condition flex">
		  		<div class="title">城市:</div>
		  		<el-input v-model="city" placeholder="请输入内容"></el-input>
		  	</div>
		    <!-- <div class="condition flex">
			  	<div class="title">商圈:</div>
			  	<el-input v-model="BusinessCircle" placeholder="请输入内容"></el-input>
		 	</div> -->
		    <div class="condition flex">
			  	<div class="title">资源负责人:</div>
			  	<el-select style="max-width:120px;margin:0 10px" v-model="dutyName" filterable value-key="id" placeholder="负责人">
		  			<!-- dutyName dutyId -->
				    <el-option
				      v-for="item in userOptions"
				      :value="item.name"
				      :key="item.id"
				      :label="item.name">
				   </el-option>
				   <div class="txtcenter">
				   	<el-pagination 
						 class="fy txtright margin"
			             layout="prev, pager, next"
			             @current-change="current_change2"
			             :total="total2"
			             :current-page="currentPage2"
			             background
			            >
			          </el-pagination>
				   </div>
				</el-select>
			</div>
			 <div class="condition flex">
			  	<div class="title">项目名称:</div>
			  	<el-input v-model="projectName" placeholder="请输入内容"></el-input>
			</div>
			<div class="condition flex">
			  	<div class="title">状态:</div>
			  	<el-select v-model="status" placeholder="">
				    <el-option
				      v-for="item in statusOptions"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				</el-select>
			</div>
			<div class="condition ">
			  	<el-button type="primary" round @click="queryProjectList">搜索</el-button>
			</div>
		</div>
		<div class=" txtright">
			<el-button class="margin" type="primary" v-if="permission != 'executor'" @click="toCreate">新建项目</el-button>
			<el-button class="margin" type="primary" @click="handleDownload">导出</el-button>
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
			      prop="name"
			      label="项目名称"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="b_name"
			      label="客户">
			    </el-table-column>
			    <el-table-column
			      prop="type"
			      label="类型">
			      <template slot-scope="scope">
					<span v-if="scope.row.type === 'walk'">走入式</span>
					<span v-if="scope.row.type === 'postion'">阵地式</span>
					<span v-if="scope.row.type === 'road'">路演</span>
				  </template>
			    </el-table-column>
			    <el-table-column
			      prop="cycle_end_time,cycle_start_time"
			      label="项目周期">
			      <template slot-scope="scope">
			      	{{scope.row.cycle_end_time}}   至   {{scope.row.cycle_start_time}}
			      </template>
			      <!-- cycle_end_time   cycle_start_time-->
			    </el-table-column>
			    <el-table-column
			      prop="city"
			      label="城市">
			    </el-table-column>
			    <el-table-column
			      prop="duty_name"
			      label="项目负责人">
			    </el-table-column>
			    <el-table-column
			      prop="count"
			      label="计划派发量">
			    </el-table-column>
			    <!-- <el-table-column
			      prop="address"
			      label="实际派发量">
			    </el-table-column> -->
			    <el-table-column
			      prop="status"
			      label="状态">
			      <template slot-scope="scope">
					<div v-if="scope.row.status == 'pending'">待开始</div>
					<div v-if="scope.row.status == 'progress'">进行中</div>
					<div v-if="scope.row.status == 'done'">完成</div>
				  </template>
			    </el-table-column>
			    <el-table-column
			      label="操作">
			      <template slot-scope="scope">
			        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
			        <el-button type="text" size="small" @click="toEdit(scope.row)"  v-if="permission != 'executor'" >编辑</el-button>
			      </template>
			    </el-table-column>
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
// import Blob from '../excel/Blob'
// import Export2Excel from '../excel/Export2Excel.js'
export default {
  name: 'Project',
  data(){
  	return{
  		city:"",
  		BusinessCircle:"",
  		dutyName:"",
  		projectName:"",
  		status:"",
  		userOptions:[],
  		currentPage2:1,
  		total2:200,
  		currentPage:1,
  		total:200,
  		tableData: [],
  		statusOptions:[{
          value: '',
          label: '全部'
        },{
          value: 'pending',
          label: '待开始'
        }, {
          value: 'progress',
          label: '进行中'
        }, {
          value: 'done',
          label: '完成 '
        }],
  	}
  },
  computed: {
	  permission() {
	      return localStorage.getItem("permission")
	    },
	},
  created(){
		axios.defaults.withCredentials = true;//让ajax携带cookie
		this.queryProjectList();
		this.queryUserList();
	},
  methods: {
	handleClick(row) {
		console.log(row);
		// getProDes
		this.$store.commit('getProDes',row);
		sessionStorage.setItem('getProDes', JSON.stringify(row));

		this.$router.push({
			path:"/projectDes",
			query:{
				id:row.id,
			}
		})
	},
	toCreate(){
		this.$router.push({
			path:"/newProject",
		})
	},
	toEdit(row){
		sessionStorage.setItem('getProDes', JSON.stringify(row));
		this.$router.push({
			path:"/editPro",
			query:{
				id:row.id,
			}
		})
	},
	current_change2(currentPage){
		this.currentPage2 = currentPage;
		console.log(this.currentPage);
		var $this = this;
		axios.get($this.baseUrl+'api/staff/list?page='+$this.currentPage2+'&pageSize=10',{
			headers:{
				"Content-Type":"application/json"
			}
        }).then(res => {
              console.log(res.data);
              $this.userOptions = res.data.list;
              $this.total2 = res.data.count;
            },error =>{
        })
	},
	queryUserList(){
		var $this = this;
		axios.get($this.baseUrl+'api/staff/list?page=1&pageSize=10',{
			headers:{
				"Content-Type":"application/json"
			}
        }).then(res => {
              console.log(res.data);
              $this.userOptions = res.data.list;
              $this.total2 = res.data.count;
            },error =>{
        })
	},
	current_change(currentPage){
		this.currentPage = currentPage;
		console.log(this.currentPage);
		this.queryProjectList();
	},
    queryProjectList(){
	    var $this = this;
		axios.get($this.baseUrl+'api/project/list?page='+$this.currentPage+'&pageSize=10&city='+$this.city+'&projectName='+$this.projectName+'&dutyName='+$this.dutyName+'&status='+$this.status,{
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
        const tHeader = ['序号', '项目名称', '客户', '类型', '项目周期', '城市', '项目负责人', '计划派发量', '状态']
        const filterVal = ['id', 'name', 'b_name', 'type', 'cycle', 'city', 'duty_name', 'count', 'status']
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "表",
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
      })
      this.queryProjectList();
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === "type" || j === "status" || j === "cycle") {
        	if(v.type == "walk"){
	        	v.type= "走入式"
        	}
        	if (j === "cycle") {
	        	v.cycle = v.cycle_start_time + '至' + v.cycle_end_time
	        }
        	if(v.status == "pending"){
        		v.status = "待开始"
        	}else if(v.status == "progress"){
        		v.status = "进行中"
        	}else if(v.status == "done"){
        		v.status = "完成"
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
	#project {
		// overflow: scroll;
		// position: absolute;
		// top: 40px;
		// bottom: 0;
		.searchcon{
			margin: 10px;
			.condition{
				margin: 10px;
				.title{
					display: inline-block;
					white-space: nowrap;
					line-height: 40px;
					margin-right: 6px;
					font-size: 0.94rem;
				}
				input{
					// height: 30px;
					// line-height: 30px;
				}
				button{
					padding: 10px 20px;
				}
			}
		}
	}
</style>