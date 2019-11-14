<template>
	<div id="projectDes">
		<div class="searchcon">
			<div class="condition">
		  		<span class="title">品牌名称:</span>
		  		<el-input v-model="brandName" placeholder="请输入内容" style="width: 20%;"></el-input>
		  	</div>
			<div>
				<el-button type="primary" style="margin-top: 10px;" @click="queryBrandList()">搜索</el-button>
				<el-button type="primary" style="margin-top: 10px;" @click="toAddBrand">添加品牌</el-button>
			</div>
			<div></div>
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
			    <el-table-column
			      prop="name"
			      label="品牌"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="desc"
			      label="商品介绍">
			    </el-table-column>
			    <el-table-column
			      prop="info"
			      label="商品故事">
			    </el-table-column>
			    <el-table-column
			      prop="logo"
			      label="品牌 logo">
			      <template slot-scope="scope"> 
					<img :src="pathUrl+scope.row.logo" width="100" /> 
				  </template>
			    </el-table-column>
			    <el-table-column
			      prop="detail"
			      label="品牌背景">
			      <template slot-scope="scope"> 
					<img :src="pathUrl+scope.row.detail" width="100" /> 
				  </template>
			    </el-table-column>
			    <el-table-column
			      fixed="right"
			      label="操作">
			      <template slot-scope="scope">
			        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
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
			brandName:"",
			currentPage:1,
			total:200,
			tableData: [],
		}
	},
	created(){
		axios.defaults.withCredentials = true;//让ajax携带cookie
		this.queryBrandList();
	},
	methods: {
		handleClick(row) {
			console.log(row.id);
			this.$router.push({
				path:"/addBrand",
				query:{
					id:row.id,
				}
			})
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
	      		path:"/newProject",
	      	})
	    },
	    toAddBrand(){
	    	this.$router.push({
	      		path:"/addBrand",
	      	})
	    },
	    current_change(currentPage){
			this.currentPage = currentPage;
			console.log(this.currentPage);
			this.queryBrandList();
		},
	    queryBrandList(){
		    var $this = this;
		    var search = "";
		    if($this.brandName != ""){
		    	var search = "&name="+$this.brandName
		    }
			axios.get($this.baseUrl+'api/brand/all?page='+$this.currentPage+'&pageSize=10'+search,{
					headers:{
						"Content-Type":"application/json"
					}
		        }).then(res => {
		              console.log(res.data);
		              $this.tableData = res.data.list;
		              // $this.parentOptions = res.data.list;
		              $this.total = res.data.count;
		        },error =>{
		                  // $this.loading = false
		              // console.log(error.response);
	        })
	    }
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