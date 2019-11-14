<template>
	<div id="newProject">
		<div class="firstMargin searchcon flexb">
		  	<div class="condition flex">
		  		<div class="title">项目名称:</div>
		  		<el-input v-model="projectName" placeholder="请输入内容"></el-input>
		  	</div>
		    <div class="condition flex">
			  	<div class="title">客户:</div>
			  	<el-select value-key="id" v-model="brandId" placeholder="请选择">
				    <el-option
				      v-for="item in brandList"
				      :key="item.id"
				      :label="item.name"
				      :value="item.id">
				    </el-option>
				    <div class="txtcenter">
				   		<el-pagination 
							 class="fy txtright margin"
				             layout="prev, pager, next"
				             @current-change="current_change"
				             :total="total"
				             background
			            >
			            </el-pagination>
				   </div>
				</el-select>
		 	</div>
		    <div class="condition flex">
			  	<div class="title">项目类型:</div>
			  	<el-select v-model="type" placeholder="请选择">
				    <el-option
				      v-for="item in pTypeOptions"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				</el-select>
			</div>
		</div>
		<div class="searchcon flexb">
			<div class="condition flex">
			  	<div class="title">项目周期:</div>
			  	<el-date-picker
			      v-model="cycleTime"
			      type="daterange"
			      range-separator="至"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期">
			    </el-date-picker>
			</div>
			<div class="condition flex">
			  	<div class="title">关联商品:</div>
			  	<el-select v-model="productId" placeholder="请输入关联商品">
				    <el-option
				      v-for="item in productOptions"
				      :key="item.lg_id"
				      :label="item.lg_title"
				      :value="item.lg_id">
				    </el-option>
				    <div class="txtcenter">
				   		<el-pagination 
							 class="fy txtright margin"
				             layout="prev, pager, next"
				             @current-change="current_change1"
				             :total="total1"
				             background
			            >
			            </el-pagination>
				   </div>
				</el-select>
			</div>
		</div>
		<div class="searchcon flexb">
			<div class="condition flex" >
				<div class="title">负责人:</div>
		  		<el-select style="max-width:120px;margin:0 10px" v-model="dutys" filterable value-key="id" placeholder="负责人">
		  			<!-- dutyName dutyId -->
				    <el-option
				      v-for="item in userOptions"
				      :value="item"
				      :key="item.id"
				      :label="item.name">
				   </el-option>
<!-- 				   <div class="txtcenter">
				   	<el-pagination 
						 class="fy txtright margin"
			             layout="prev, pager, next"
			             @current-change="current_change2"
			             :total="total2"
			             :current-page="currentPage2"
			             background
			            >
			          </el-pagination>
				   </div> -->
				</el-select>
				<el-select style="max-width:120px;margin:0 10px" v-model="executor" filterable value-key="id" placeholder="执行人员">
					<!-- 执行人员  executorName executorId-->
				    <el-option
				      v-for="item in userOptions1"
				      :value="item"
				      :key="item.id"
				      :label="item.name">
				   </el-option>
				   <!-- <div class="txtcenter">
				   	<el-pagination 
						 class="fy txtright margin"
			             layout="prev, pager, next"
			             @current-change="current_change3"
			             :total="total3"
			             :current-page="currentPage3"
			             background
			            >
			          </el-pagination>
				   </div> -->
				</el-select>
				<!-- 城市 -->
				<el-input style="max-width:120px;margin:0 10px" v-model="city" placeholder="城市"></el-input>
				<!-- 目标份数 -->
				<el-input style="max-width:120px;margin:0 10px" v-model="count" placeholder="目标派发量"></el-input><span class="title">份</span>
			</div>
			<div class="right padding">
				<el-button type="primary" @click="addPreson">完成</el-button>
				<!-- <el-button type="primary" @click="addPreson">添加负责人</el-button> -->
			</div>
			<div class="padding" style="border:1px solid #dcdfe6" v-if="dutyList!=[]">
				<div class="condition flex" v-for="(item,index) in dutyList" :key="index">
					<div class="title">负责人:</div>
			  		<el-input style="max-width:120px;margin:0 10px" v-model="item.dutyName" disabled="" placeholder="城市"></el-input>
			  		<div class="title">执行人:</div>
					<el-input style="max-width:120px;margin:0 10px" v-model="item.executorName" disabled="" placeholder="城市"></el-input>
					<div class="title">城市:</div>
					<!-- 城市 -->
					<el-input style="max-width:120px;margin:0 10px" v-model="item.city" disabled="" placeholder="城市"></el-input>
					<!-- 目标份数 -->
					<div class="title">目标份数:</div>
					<el-input style="max-width:120px;margin:0 10px" v-model="item.count" disabled="" placeholder="目标派发量"></el-input><span class="title">份</span>
					<el-button type="text" @click="toEditDuty(item,index)">修改</el-button>
					<el-button type="text" @click="toDeleDuty(item,index)">删除</el-button>
				</div>
			</div>
			
		</div>
		<div class="searchcon flexb">
		  	<div class="condition flex">
		  		<div class="title">照片要求:</div>
		  		<div class="photoDemand padding flexb">
		  			<div>
					  	<div>写字楼</div>
					  	<el-checkbox-group v-for="(item,index) in house" :key="index" v-model="item.isShow" > 
					  	<div class="margin">
					  		<el-checkbox :label="item.isShow">{{item.name}}</el-checkbox>
					  		<el-switch v-model="item.isChoose"></el-switch>
					  	</div>
						</el-checkbox-group>
					</div>
					<div>
					  	<div>企业</div>
					  	<el-checkbox-group v-for="(item,index) in company" :key="index" v-model="item.isShow" > 
						  	<div class="margin">
						  		<el-checkbox :label="item.isShow">{{item.name}}</el-checkbox>
						  		<el-switch v-model="item.isChoose"></el-switch>
						  	</div>
						</el-checkbox-group>
					</div>
		  		</div>
		  	</div>
		</div>
		<el-dialog
		  title="新建写字楼"
		  :modal-append-to-body="false"
		  :visible.sync="dialogVisible"
		  width="30%"
		  >
		  	<el-form label-width="80px">
			  <el-form-item label="负责人">
			    <el-select style="max-width:120px;margin:0 10px" v-model="editDutyInfo.editDutyName" filterable value-key="id" placeholder="负责人">
		  			<!-- dutyName dutyId -->
				    <el-option
				      v-for="item in userOptions"
				      :value="item"
				      :key="item.id"
				      :label="item.name">
				   </el-option>
				   <!-- <div class="txtcenter">
				   	<el-pagination 
						 class="fy txtright margin"
			             layout="prev, pager, next"
			             @current-change="current_change2"
			             :total="total2"
			             :current-page="currentPage2"
			             background
			            >
			          </el-pagination>
				   </div> -->
				</el-select>
			  </el-form-item>
			  <el-form-item label="执行人员">
			    <el-select style="max-width:120px;margin:0 10px" v-model="editDutyInfo.editExeName" filterable value-key="id" placeholder="执行人员">
					<!-- 执行人员  executorName executorId-->
				    <el-option
				      v-for="item in userOptions1"
				      :value="item"
				      :key="item.id"
				      :label="item.name">
				   </el-option>
				   <!-- <div class="txtcenter">
				   	<el-pagination 
						 class="fy txtright margin"
			             layout="prev, pager, next"
			             @current-change="current_change3"
			             :total="total3"
			             :current-page="currentPage3"
			             background
			            >
			          </el-pagination>
				   </div> -->
				</el-select>
			  </el-form-item>
			  <el-form-item label="城市">
			    <el-input v-model="editDutyInfo.city" placeholder=""></el-input>
			  </el-form-item>
			  <el-form-item label="份数">
			    <el-input v-model="editDutyInfo.count" placeholder=""></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="onSubmit">立即创建</el-button>
			  </el-form-item>
			</el-form>
		</el-dialog>
<!-- 		<div class="searchcon flexb">
		  	<div class="condition flex">
		  		<div class="title">写字楼列表:</div>
		  		<div>
		  		<el-upload
					  class="upload-demo"
					  action="api/project/import"
					  :with-credentials="true"
					  :on-preview="handlePreview"
					  :on-remove="handleRemove"
					  :before-remove="beforeRemove"
					  :on-exceed="handleExceed"
					  :on-success="handleAvatarSuccess"
					  :multiple = "false"
					  :file-list="fileList">
		  			<el-button type="text">点击导入列表</el-button>
		  			<div class="listName padding"> -->
		  				<!-- <span class="title">XLS 工作表 (.xls)</span> -->
		  				<!-- <el-button type="primary" round>重新上传</el-button> -->
<!-- 		  			</div>
		  		</el-upload>
		  		</div>
		  	</div>
	  	</div> -->
	  	<div class="txtcenter toSave">
	  		<el-button type="primary" @click="saveNew">保存</el-button>
	  	</div>
	</div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
export default {
  name: 'newProject',
   data(){
  	return{
  		value:true,
  		projectName:"",
  		brandId:"",
  		cycleTime: [],
  		type:"",
  		productId:"",
  		
  		pTypeOptions: [{
          value: 'walk',
          label: '走入式'
        }, {
          value: 'postion',
          label: '阵地式'
        }, {
          value: 'road',
          label: '路演'
        }],
        radio:false,
        

        // dutyList:[],

        brandList:[{}],
        total:0,
        currentPage:1,

        productOptions:[],
        total1:0,
        currentPage1:1,

        userOptions:[],
        userOptions1:[],
        total2:0,   
        total3:0,   
        currentPage2:1,
        currentPage3:1,
        dutyList:[],
        dutys:"",
        city:"",
        count:"",
        executor:"",
        house:[],
        company:[],
        // otherhouse:"",
        // otherhouseShow:"",
        // otherhouseChoose:true,
        // othercompany:"",
        // othercompanyShow:"",
        // othercompanyChoose:true,
        fileList:[],
        houseList:"",
        allCount:"",
        dialogVisible:false,//新建模板
        editDutyInfo:"",
        editDutyIndex:"",
  	}
  },
  computed:{
   des(){
   	return JSON.parse(sessionStorage.getItem('getProDes'))
   }
  },
  watch:{
  	type(oldV,newV){
  		console.log(oldV);
  		// console.log(newV);
  		if(oldV == this.des.type){
  			this.house = [];
  			this.company = [];
  			this.house = JSON.parse(this.des.template_json).house;
			this.company = JSON.parse(this.des.template_json).company;
  		}else{
  			this.house = [];
  			this.company = [];
  			this.queryPicquire(newV);
  		}
  	},
  	customer(oldV,newV){
  		console.log(oldV);
  		console.log(newV);
  	},
  },
  created(){
  	axios.defaults.withCredentials = true;//让ajax携带cookie
  	this.getDuty();
  	this.queryBrandList();
  	this.queryProductList();
  	this.queryUserList();
  	// this.$store.state.proDes.id,
  	console.log(JSON.parse(sessionStorage.getItem('getProDes')));
  	// let des = JSON.parse(sessionStorage.getItem('getProDes'))

  	// console.log(this.$store.state.proDes);
	this.projectName = this.des.name;

	// this.brandId = {
	// 	name: this.des.b_name,
	// 	id: Number(this.des.brand_id)
	// }
	this.brandId = Number(this.des.brand_id)

	this.cycleTime = [new Date(this.des.cycle_end_time),new Date(this.des.cycle_start_time)];
	this.type = this.des.type
	this.productId = Number(this.des.product_id);
	this.type = this.des.type
	// this.dutys = this.des.duty_name;
	// this.city = this.des.duty_name;
 //    this.count = this.des.duty_name;
	// this.executor = this.des.duty_name;
	console.log(JSON.parse(this.des.template_json));
  },
  methods:{
  	toEditDuty(item,index){
  		this.editDutyInfo = {
  			editDutyName:{
	  			id: Number(item.dutyId),
				name: item.dutyName
	  		},
	  		editExeName:{
	  			id:Number(item.executorId),
				name:item.executorName,
	  		},
	  		city: item.city,
			count: item.count
  		};
  		console.log(this.editDutyInfo);
  		this.editDutyIndex = index;
  		this.dialogVisible = true;
  	},
  	onSubmit(){
  		this.dutyList.splice(this.editDutyIndex,1);
  		let obj = {
  			"city":this.editDutyInfo.city,//城市
            "dutyName":this.editDutyInfo.editDutyName.name,//"负责人",
            "dutyId":this.editDutyInfo.editDutyName.id,// 负责人id
            "count":this.editDutyInfo.count,//派发数
            "executorName":this.editDutyInfo.editExeName.name,//执行人员
            "executorId":this.editDutyInfo.editExeName.id//执行人员id
  		}
  		this.dutyList.push(obj);
  		console.log(this.dutyList);
  		this.dialogVisible = false;
  	},
  	toDeleDuty(item,index){
  		this.dutyList.splice(index,1);
  	},
  	getDuty(){
  		var $this = this;
		axios.get($this.baseUrl+'api/project/projectDutyList?projectId='+$this.des.id,{
				headers:{
					"Content-Type":"application/json"
				}
	        }).then(res => {
	              console.log(res.data);
	              $this.dutyList = res.data;
	        },error =>{

        })
  	},
  	addPreson(){
  		if(this.city !="" && this.dutys !="" && this.count !="" && this.executor !=""){
	  		let obj = {
	  			"city":this.city,//城市
	            "dutyName":this.dutys.name,//"负责人",
	            "dutyId":this.dutys.id,// 负责人id
	            "count":this.count,//派发数
	            "executorName":this.executor.name,//执行人员
	            "executorId":this.executor.id//执行人员id
	  		}
	  		this.dutyList.push(obj);
	  		console.log(this.dutyList);
	  		this.dutys = ""
	        this.city = ""
	        this.count = ""
	        this.executor = ""
        }
  	},
  	current_change(currentPage){
		this.currentPage = currentPage;
		console.log(this.currentPage);
		this.queryBrandList();
	},
  	queryBrandList(){
	    var $this = this;
		axios.get($this.baseUrl+'api/brand/all?page='+$this.currentPage+'&pageSize=10',{
				headers:{
					"Content-Type":"application/json"
				}
	        }).then(res => {
	              console.log(res.data);
	              $this.brandList = res.data.list;
	              $this.total = res.data.count;
	        },error =>{
	                  // $this.loading = false
	              // console.log(error.response);
        })
    },
    current_change1(currentPage){
		this.currentPage1 = currentPage;
		console.log(this.currentPage);
		this.queryBrandList();
	},
  	queryProductList(){
	    var $this = this;
		axios.get($this.baseUrl+'api/luckgroup/product?page='+$this.currentPage1+'&pageSize=10',{
				headers:{
					"Content-Type":"application/json"
				}
	        }).then(res => {
	              console.log(res.data);
	              $this.total1 = res.data.count;
	              $this.productOptions = res.data.list;
	        },error =>{
	                  // $this.loading = false
	              // console.log(error.response);
        })
    },
 //    current_change2(currentPage){
	// 	this.currentPage2 = currentPage;
	// 	console.log(this.currentPage);
	// 	var $this = this;
	// 	axios.get($this.baseUrl+'api/staff/list?page='+$this.currentPage2+'&pageSize=10',{
	// 		headers:{
	// 			"Content-Type":"application/json"
	// 		}
 //        }).then(res => {
 //              console.log(res.data);
 //              $this.userOptions = res.data.list;
 //              $this.total2 = res.data.count;
 //            },error =>{
 //        })
	// },
	// current_change3(currentPage){
	// 	this.currentPage3 = currentPage;
	// 	console.log(this.currentPage);
	// 	var $this = this;
	// 	axios.get($this.baseUrl+'api/staff/list?page='+$this.currentPage3+'&pageSize=10',{
	// 		headers:{
	// 			"Content-Type":"application/json"
	// 		}
 //        }).then(res => {
 //              console.log(res.data);
 //              $this.userOptions1 = res.data.list;
 //              $this.total3 = res.data.count;
 //            },error =>{
 //        })
	// },
    queryUserList(){
		var $this = this;
		axios.get($this.baseUrl+'api/staff/list?page=1&pageSize=10000',{
			headers:{
				"Content-Type":"application/json"
			}
        }).then(res => {
              console.log(res.data);
              $this.userOptions = res.data.list;
              $this.userOptions1 = res.data.list;
              $this.total2 = res.data.count;
              $this.total3 = res.data.count;
            },error =>{
        })
	},
	queryPicquire(){
		console.log(this.type);
		// api/project/template?type=walk
		var $this = this;
		axios.get($this.baseUrl+'api/project/template?type='+$this.type,{
			headers:{
				"Content-Type":"application/json"
			}
        }).then(res => {
        		if (res.data) {
        			let theHouse = JSON.parse(res.data.house); 
					theHouse.forEach((item,index)=>{
							let obj={
								isShow : false,
							isChoose : item.isChoose,
							name : item.name
							}
						$this.house.push(obj)
					})

					let theCompany = JSON.parse(res.data.company);
					theCompany.forEach((item,index)=>{
						let obj={
								isShow : false,
							isChoose : item.isChoose,
							name : item.name
							}
						$this.company.push(obj)
					})
					console.log($this.house);
					console.log($this.company)
        		}
            },error =>{
        })
	},
	handleRemove(file, fileList) {
        console.log(file, fileList);
	},
	handlePreview(file) {
	    console.log(file);
	},
	handleExceed(files, fileList) {
	    this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
	},
	beforeRemove(file, fileList) {
	    return this.$confirm(`确定移除 ${ file.name }？`);
	},
	handleAvatarSuccess(res, file) { //上传图片
		this.houseList = res;
		console.log(this.houseList);
	},
  	saveNew(){
  		var $this = this
  		$this.dutyList.forEach((item,index)=>{
    		$this.allCount = Number($this.allCount)+Number(item.count);
        })
       	$this.des.template_json = '{"house":'+JSON.stringify($this.house)+',"company":'+JSON.stringify($this.company)+'}'
       	sessionStorage.setItem('getProDes', JSON.stringify($this.des));
  // 		this.house = JSON.parse(this.des.template_json).house;
		// this.company = JSON.parse(this.des.template_json).company;

  		var cycle = [];
  		cycle.push($this.Format($this.cycleTime[0]));
  		cycle.push($this.Format($this.cycleTime[1]));
        console.log(cycle);
        console.log($this.house);
        console.log($this.company);

		var obj={
			projectId: $this.des.id,
			projectName: $this.projectName,
			brandId: $this.brandId,
			cycleTime: cycle,
			type: $this.type,
			count: $this.allCount,
			productId: $this.productId,
			dutyList: $this.dutyList,
			templateJson:{
				"house":$this.house,
		        "company":$this.company
			}
		}
		console.log(obj);

        axios.post($this.baseUrl+'api/project/create',obj,{
            headers:{
                  "Content-Type":"application/json"
            }
          }).then(res => {
              	console.log(res.data);
              	$this.backTo();
    //           	$this.projectName = "";
				// $this.brandId = "";
				// $this.cycleTime = "";
				// $this.type = "";
				// $this.productId = "";
				// $this.house = [];
				// $this.company = [];
				// $this.houseList = "";
				// $this.dutyList = [];
				// $this.dutys = "";
				// $this.city = "";
				// $this.count = "";
				// $this.executor = "";
				// $this.allCount = "";
				// $this.fileList = [];
            },error =>{
                  $this.loading = false
              // console.log(error.response);
        })
  	},
  }
}
</script>

<style lang="less">
	#newProject {
		.searchcon{
			width: 80%;
			margin: 10px;
			.condition{
				margin: 20px;
				.title{
					display: inline-block;
					white-space: nowrap;
					line-height: 40px;
					margin-right: 16px;
					font-size: 0.94rem;
				}
				button{
					padding: 10px 20px;
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
		.toSave{
			width: 100%;
			margin:30px 0;
			button{
				width: 30%;
			}
		}
	}
</style>