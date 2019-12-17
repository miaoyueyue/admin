<template>
	<div id="project">
		<div class="padding margin">
			<div class="padding txtright">
				<el-button type="primary" @click="createUser(false)">创建用户</el-button>
			</div>
			<el-table
			    :data="tableData"
			    stripe
			    border
			    style="width: 100%">
			    <el-table-column
			      prop="account"
			      label="账号"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="name"
			      label="姓名"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="sr_name"
			      label="角色"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="parentName"
			      label="上一级">
			    </el-table-column>
			    <el-table-column
			      prop="createdTime"
			      label="创建时间">
			    </el-table-column>
			    <el-table-column
			      fixed="right"
			      label="操作">
			      <template slot-scope="scope">
			        <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">重置密码</el-button> -->
			        <el-button v-if="scope.row.status=='enable'" @click="addUnable(scope.row)" type="text" size="small">设为无效</el-button>
			        <el-button v-else="" @click="addEnable(scope.row)" type="text" size="small">设为有效</el-button>
			        <el-button type="text" size="small" @click="createUser(true,scope.row)">修改角色</el-button>
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
		  title="用户"
		  :modal-append-to-body="false"
		  :visible.sync="dialogVisible"
		  width="30%"
		  >
		  <el-form label-width="80px">
			  <el-form-item label="账号">
			    <el-input v-model="account"></el-input>
			  </el-form-item>
			  <el-form-item label="姓名">
			    <el-input v-model="userName"></el-input>
			  </el-form-item>
			  <el-form-item label="默认密码">
			    <el-input v-model="password" placeholder="" type="password"></el-input>
			  </el-form-item>
			  <el-form-item label="角色">
			   <el-select v-model="role" placeholder="请选择">
			      <el-option
				      v-for="item in roleOptions"
				      :key="item.sr_id"
				      :label="item.sr_name"
				      :value="item.sr_id">
				   </el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="上一级" v-if="isEdit">
			    <el-select v-model="parent" value-key="id" placeholder="请选择">
			     <el-option
				      v-for="item in parentOptions"
				      :value="item"
				      :key="item.id"
				      :label="item.name">
				   </el-option>
				   <div class="txtcenter">
				   	<el-pagination 
						 class="fy txtright margin"
			             layout="prev, pager, next"
			             @current-change="current_change1"
			             :total="total"
			             background
			            >
			          </el-pagination>
				   </div>
			    </el-select>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="onSubmit" v-if="isEdit">立即创建</el-button>
			    <el-button type="primary" @click="editUser" v-if="!isEdit">修改</el-button>
			  </el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
export default {
  name: 'project',
  data(){
  	return{
        account: '',
		password: '',
		name:"",
		role: '',
		parent: '',
		userName:"",
		parentName:"",
		parentId:"",

        roleOptions:[],//角色选择
        parentOptions:[],

  		dialogVisible:false,

  		currentPage1:1,
  		currentPage:1,
  		total:200,
  		tableData: [],

        isEdit:false,

        editId:"",
  	}
  },
  created(){
  	axios.defaults.withCredentials = true;//让ajax携带cookie
  	this.queryUserList();
  	this.queryRoleList();
  	console.log(this.$store.state.xhs_admin);
  },
  watch:{
  	dialogVisible(oldVal,newVal){
  		if(newVal){
  			this.editId = "";
  			this.account = "";
			this.password = "";
			this.userName = "";
			this.role = "";
			this.parent = "";
			this.parentName = "";
			this.parentId = "";
  		}
  	}
  },
  methods:{
  	addUnable(row){
  		this.$confirm('是否设为无效', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var $this = this;
	  		var obj={
	  			id:row.id,
	  			status:"disable"
	  		}
	  		axios.put($this.baseUrl+'api/setStaffStatus',obj,{
				headers:{
					"Content-Type":"application/json"
				}
	        }).then(res => {
	              	// console.log(res.data);
	              	if($this.currentPage == 1){
	              		$this.queryUserList();
	              	}else{
	              		$this.current_change($this.currentPage);
	              	}
	              	$this.$message({
			          message: '设置成功',
			          type: 'success'
			        });
	            },error =>{
	                  // $this.loading = false
	              // console.log(error.response);
	        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作'
          });          
        });
  	},
  	addEnable(row){
  		this.$confirm('是否设为有效', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var $this = this;
	  		var obj={
	  			id:row.id,
	  			status:"enable"
	  		}
	  		axios.put($this.baseUrl+'api/setStaffStatus',obj,{
				headers:{
					"Content-Type":"application/json"
				}
	        }).then(res => {
	              	// console.log(res.data);
	              	if($this.currentPage == 1){
	              		$this.queryUserList();
	              	}else{
	              		$this.current_change($this.currentPage);
	              	}
	              	$this.$message({
			          message: '设置成功',
			          type: 'success'
			        });
	            },error =>{
	                  // $this.loading = false
	              // console.log(error.response);
	        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作'
          });          
        });
  	},
  	createUser(type,row){
  		this.isEdit = !type;
  		// console.log(row); 
  		this.dialogVisible = true;
  		if(row){
			this.editId = row.id;
  			this.account = row.account;
			this.password = row.password;
			this.userName = row.name;
			this.role = row.role;
			this.parentName = row.parentName;
			this.parentId = row.parentId;
  		}
  	},
  	current_change(currentPage){
		this.currentPage = currentPage;
		// console.log(this.currentPage);
		this.queryUserList();
	},
	current_change1(currentPage){
		this.currentPage1 = currentPage;
		// console.log(currentPage);
		var $this = this;
		axios.get($this.baseUrl+'api/staff/list?page='+currentPage+'&pageSize=10',{
			headers:{
				"Content-Type":"application/json"
			}
        }).then(res => {
              // console.log(res.data);
              $this.total = res.data.count;
              $this.parentOptions = res.data.list;
            },error =>{
                  // $this.loading = false
              // console.log(error.response);
        })
	},
	queryUserList(){
		var $this = this;
		axios.get($this.baseUrl+'api/staff/list?page='+$this.currentPage+'&pageSize=10',{
			headers:{
				"Content-Type":"application/json"
			}
        }).then(res => {
              // console.log(res.data);
              $this.tableData = res.data.list;
              $this.parentOptions = res.data.list;
              $this.total = res.data.count;
            },error =>{
                  // $this.loading = false
              // console.log(error.response);
        })
	},
	queryRoleList(){
		var $this = this;
		axios.get($this.baseUrl+'api/staff/role',{
			headers:{
				"Content-Type":"application/json"
			}
        }).then(res => {
              // console.log(res.data);
              $this.roleOptions = res.data;
            },error =>{
                 
        })
	},
	onSubmit(){
		var $this = this;
		var obj={
			account: $this.account,
			password: $this.password,
			name: $this.userName,
			role: $this.role,
			parentName: $this.parent.name,
			parentId: $this.parent.id,
		}
		// console.log(obj);
		// console.log($this.parent);
        axios.post($this.baseUrl+'api/staff/user',obj,{
            headers:{
                  "Content-Type":"application/json"
            }
          }).then(res => {
              	// console.log(res.data);
              	$this.$notify({
                  message: "创建成功",
                });
              	$this.account = "";
				$this.password = "";
				$this.userName = "";
				$this.role = "";
				$this.parent = "";
				$this.queryUserList();
				$this.dialogVisible = false;
            },error =>{
                  $this.loading = false
              // console.log(error.response);
        })
	},
	editUser(){
		var $this = this;
		var obj={
			id:$this.editId,
			account: $this.account,
			password: $this.password,
			name: $this.userName,
			role: $this.role,
			parentName: $this.parentName,
			parentId: $this.parentId,
		}
		console.log(obj);
        axios.put($this.baseUrl+'api/staff/user',obj,{
            headers:{
                  "Content-Type":"application/json"
            }
        }).then(res => {
              	// console.log(res.data);
              	$this.$notify({
                  message: "修改成功",
                });
              	$this.editId = "";
	  			$this.account = "";
				$this.password = "";
				$this.userName = "";
				$this.role = "";
				$this.parent = "";
				$this.parentName = "";
				$this.parentId = "";
				$this.queryUserList();
				$this.dialogVisible = false;
            },error =>{
                  $this.loading = false
              // console.log(error.response);
        })
	},
  }
}
</script>

<style lang="less">
	#project {

	}
</style>