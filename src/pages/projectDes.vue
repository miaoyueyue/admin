<template>
	<div id="projectDes">
		<div class="searchcon flexb">
		  	<div class="condition flex">
		  		<div class="title">项目名称:</div>
		  		<div  class="title">{{des.name}}</div>
		  		<div><el-button type="text" @click="toCreate">修改项目信息>></el-button></div>
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
				<el-button type="text" @click="toApplyList">申请总表>></el-button>
				<el-button type="text" @click="toPhoto">项目照片>></el-button>
			</div>
		</div>
		<div class="searchcon flexb">
		  	<div class="condition flex">
		  		<div class="title">项目结案:</div>
		  		<el-upload
					  class="upload-demo"
					  accept=".PDF"
				  	  :action="baseUrl+'api/upload/proxy'"
				  	  :data='{prefix: "project/"}'
					  :on-success="handleAvatarSuccess"
					  :multiple = "false"
	                  :before-upload="beforeUpload"
					  :show-file-list = "false"
					  >
		  			<!-- <el-button type="text">点击导入列表</el-button> -->
		  			<div class="title"  style="color: #409EFF" v-if="des.summary_file">{{des.name}}结案.pdf</div>
		  			<div class="title"  style="color: #409EFF" v-else-if="fileList == ''">待上传</div>
		  			<div class="title" style="color: #409EFF" v-else>{{des.name}}结案.pdf</div>
		  			<!-- <div class="listName padding"> -->
		  				<!-- <span class="title">XLS 工作表 (.xls)</span> -->
		  				<!-- <el-button type="primary" round>重新上传</el-button> -->
		  			<!-- </div> -->
		  			<el-button type="primary" round>上传</el-button>
		  		</el-upload>
		  		
		  		<el-button type="primary" round><a  target="_blank" :href="pathUrl + des.summary_file" style="color: white;">下载</a></el-button>
		  		
		  	</div>
		    <!-- <div class="condition flex"> -->
			  	<!-- <div class="title">写字楼列表:</div> -->
		  		<!-- <div class="title" style="color: #409EFF">写字楼列表</div> -->
		  		<!-- <el-button type="primary" round>继续添加</el-button> -->
		  		<div class="condition flex">
			  		<div class="title">写字楼列表:</div>
			  		<div>
			  		<el-upload
						  class="upload-demo"
						  :action="baseUrl+'api/project/import?projectId='+proId+'&productId='+des.product_id+''"
						  :with-credentials="true"
						  :show-file-list = "false"
						  :on-success="handleAvatarSuccess1"
						  :multiple = "false"
						  >
			  			<!-- <el-button type="text">写字楼列表</el-button> -->
		  				<el-button type="primary" round>继续添加</el-button>

			  			<div class="listName padding">
			  				<!-- <span class="title">XLS 工作表 (.xls)</span> -->
			  				<!-- <el-button type="primary" round>重新上传</el-button> -->
			  			</div>
			  		</el-upload>

			  		</div>
			  		<el-button type="primary" round @click="leadingOut">导出</el-button>
			  	<!-- </div> -->
		  		
		 	</div>
		 	<div></div>
		</div>
		<div class="searchcon flexb">
			<div class="condition flex">
		  		<div class="title">城市:</div>
		  		<el-input v-model="city" placeholder="请输入内容"></el-input>
		  	</div>
			<!-- <div class="condition flex">
			  	<div class="title">状态:</div>
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
			  	<div class="title">负责人:</div>
			  	<el-select v-model="dutyName" placeholder="请选择"  value-key="id" >
		  			<!-- dutyName dutyId -->
				    <el-option
				      v-for="item in dutyOptions"
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
			<div>
				<el-button type="primary" style="margin-top: 10px;" @click="queryAllList">搜索</el-button>
			</div>
			<div></div>
		</div>
		<div class="padding">
			<el-table
			    :data="tableData"
			    stripe
			    border
			    show-summary
			    style="width: 100%">
			    <el-table-column
			      prop="city"
			      label="城市"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="dutyName"
			      label="项目负责人"
			      >
			    </el-table-column>
			    <!-- <el-table-column
			      prop="address"
			      label="场地">
			    </el-table-column> -->
			    <el-table-column
			      prop="count"
			      label="计划派发量">
			    </el-table-column>
			    <el-table-column
			      prop="actualTotal"
			      label="实际派发量">
			    </el-table-column>
			    <el-table-column
			      prop="actualTotal,count"
			      label="完成百分比">
			      <template slot-scope="scope">
					<div>
						{{scope.row.actualTotal/scope.row.count}}
					</div>
				  </template>
			    </el-table-column>
			    <el-table-column
			      prop="actualTotal"
			      label="展示派发量">
			    </el-table-column>
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
			      fixed="right"
			      label="操作">
			      <template slot-scope="scope">
			        <el-button @click="handleClick(scope.row)" type="text" size="small">城市详情</el-button>
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
			// proId:this.$store.state.proDes.id,
			city:"",
			dutyName:"",
			currentPage2:1,
			total2:0,
			currentPage:1,
			total:0,
			dutyOptions:"",
			tableData: [],
			fileList:"",
			summaryFile:"",
			// fileList:[],
			leadList:[],
		}
	},
	computed:{
	    des(){
	   		return JSON.parse(sessionStorage.getItem('getProDes'))
	    }
  	},
	created(){
		this.queryAllList();
		this.queryUserList();
		console.log(JSON.parse(sessionStorage.getItem('getProDes')));
	},
	methods: {
		 //下载PDF
		downloadWeekly(){
  			window.location.href =  this.pathUrl + this.des.summary_file
        },
		leadingOut(){ //导出
			var $this = this;
			axios.get($this.baseUrl+'api/project/importOfficeList?projectId='+$this.proId,{
				headers:{
					"Content-Type":"application/json"
				}
	        }).then(res => {
	              console.log(res.data);
	              // $this.leadList = res.data;
	              $this.handleDownload(res.data);
	            },error =>{
	        })
		},
		handleDownload(leadList) {
	      import('@/vendor/Export2Excel').then(excel => {
	        const tHeader = ['城市', '商圈', '楼宇', '楼宇地址', '计划扫楼时间', '负责人', '纳入计划']
	        const filterVal = ['city', 'bussniss_area', 'house_name', 'house_address', 'd_time', 'duty_name', 'is_intake']
	        const list = leadList
	        const data = this.formatJson(filterVal,leadList)
	        excel.export_json_to_excel({
	          header: tHeader,
	          data,
	          filename: "写字楼列表",
	          autoWidth: this.autoWidth,
	          bookType: this.bookType
	        })
	      })
	    },
	    formatJson(filterVal, jsonData) {
	    	console.log(jsonData)
	      return jsonData.map(v => filterVal.map(j => {
	        if (j === "is_intake") {
	        	if(v.is_intake == "yes"){
	        		v.is_intake = "是"
	        	}else if(v.is_intake == "no"){
	        		v.is_intake = "否"
	        	}
		        return v[j]
	        } else {
	          return v[j]
	        }
	      }))
	    },
		handleAvatarSuccess1(res, file) { //上传  
			// this.houseList = URL.createObjectURL(file.raw);
			// this.houseList = res;
			console.log(res);
			 this.$message.warning(`添加成功`);
			// console.log(this.houseList);
		},
		beforeUpload(file) {
            console.log(file)
            var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
            const extension = testmsg === 'pdf'
            if(!extension) {
                this.$message({
                    message: '上传文件只能是PDF格式!',
                    type: 'warning'
                });
            }
            return extension
        },
		handleAvatarSuccess(res, file) { //上传图片  
			console.log(res);
			this.summaryFile = res.key;
			console.log(file);
	        this.fileList = file.name;
	        this.upload();
		},
		upload(){
			var $this = this;
        	var obj = {
        		summaryFile:this.summaryFile,
        		projectId:$this.proId,
        	}
			axios.put($this.baseUrl+'api/project/reUploadSummaryFile',obj,{
				headers:{
					"Content-Type":"application/json"
				}
	        }).then(res => {
	              console.log(res.data);
	              console.log();
	               $this.des.summary_file = $this.summaryFile; 
	               sessionStorage.setItem('getProDes', JSON.stringify($this.des));
	   			// return JSON.parse(sessionStorage.getItem('getProDes'))
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
	              $this.dutyOptions = res.data.list;
	              $this.total2 = res.data.count;
	            },error =>{
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
	              $this.dutyOptions = res.data.list;
	              $this.total2 = res.data.count;
	            },error =>{
	        })
		},
		handleClick(row) {
			console.log(row);
			var $this = this;
			sessionStorage.setItem('cityDes',JSON.stringify(row));
			this.$router.push({
				path:"/cityDes",
				query:{
					id:$this.proId,
				}
			})
		},
		current_change(currentPage){
			this.currentPage = currentPage;
		},
		toPhoto(){
			this.$router.push({
				path:"/proPhoto",
			})
		},
		toApplyList(){
			this.$router.push({
				path:"/applyList",
			})
		},
		toCreate(){
	      	this.$router.push({
	      		path:"/editPro",
	      	})
	    },
	    current_change(currentPage){
			this.currentPage = currentPage;
			console.log(this.currentPage);
			this.queryAllList();
		},
	    queryAllList(){
	    	var $this = this;
		    axios.get($this.baseUrl+'api/project/cityDetailList?page='+$this.currentPage+'&pageSize=10&projectId='+$this.proId+'&dutyName='+$this.dutyName+'&city='+$this.city+'',{
			        headers:{
			            "Content-Type":"application/json"
			        }
		        }).then(res => {
	                console.log(res.data);
	                $this.tableData = res.data;
	                $this.total = res.data.count;
	            },error =>{
		    })
	    },

	},
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
	}
</style>