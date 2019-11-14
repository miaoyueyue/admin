<template>
	<div id="proPhoto">
    <el-button  type="text" v-if="buildSelect || businessSelect || imagesSelect" @click="backStep">
      <返回上一级
    </el-button>
    <div class="searchcon flexb">
        <div class="condition flex"  v-if="buildSelect || businessSelect || imagesSelect">
          <div class="title">城市:</div>
          <div  class="title">{{theCity}}</div>
        </div>
        <div class="condition flex" v-if="businessSelect || imagesSelect">
          <div class="title">写字楼名称:</div>
          <div class="title">{{houseInfo.houseName}}</div>
      </div>
        <div class="condition flex" v-if="businessSelect || imagesSelect">
          <div class="title">状态:</div>
          <div class="title" v-if="houseInfo.status == 'pending'">未开始</div>
          <div class="title" v-if="houseInfo.status == 'floor'">扫楼中</div>
          <div class="title" v-if="houseInfo.status == 'end'">扫楼结束，待配送</div>
          <div class="title" v-if="houseInfo.status == 'delivery'">配送完成</div>
          <div class="title" v-if="houseInfo.status == 'invalid'">无效</div>
      </div>
      <div class="condition flex" v-if="businessSelect || imagesSelect">
        <div class="title">负责人:</div>
          <div  class="title">{{houseInfo.dutyName}}</div>
      </div>
      <div class="condition flex" v-if="businessSelect || imagesSelect">
        <div class="title">当前申请企业总数:</div>
          <div  class="title">{{houseInfo.companyCount}}</div>
      </div>
      <div class="condition flex" v-if="businessSelect || imagesSelect">
        <div class="title">当前申请总数:</div>
          <div  class="title">{{houseInfo.applyCount}}</div>
      </div>
    </div>
		<div class="allFolder padding ">
			<div class="folder inb txtcenter" v-if="citySelect" v-for="(item,index) in allCity" :key="index" @click="queryHouse(item.city)">
				<div>
					<img src="../../static/imgs/folder.png" alt="">
				</div>
				<div>{{item.city}}</div>
			</div>
		</div>

		<div class="allFolder padding " v-if="buildSelect">
			<div class="folder inb txtcenter"v-for="(item,index) in building" :key="index"  @click="queryBusiness(item)">
				<div>
					<img src="../../static/imgs/folder.png" alt="">
				</div>
				<div class="txtellipsis">{{item.houseName}}</div>
			</div>
		</div>

		<div class="allFolder padding "  v-if="businessSelect">
      <div class="folder inb txtcenter" @click="queryHouseImages">
        <div>
          <img src="../../static/imgs/folder.png" alt="">
        </div>
        <div>写字楼整体照</div>
      </div>
			<div class="folder inb txtcenter"v-for="(item,index) in buildDes" :key="index" @click="queryBusinessImages(item.applyId)">
				<div>
					<img src="../../static/imgs/folder.png" alt="">
				</div>
				<div>{{item.orgName}}</div>
			</div>
		</div>
    <el-pagination 
       v-if="buildSelect"
       class="fy txtright margin"
       layout="prev, pager, next"
       @current-change="current_change"
       :page-size="50"
       :total="total"
       background
    >
     </el-pagination>
     <el-pagination 
       v-if="businessSelect"
       class="fy txtright margin"
       layout="prev, pager, next"
       @current-change="current_change"
       :page-size="50"
       :total="total"
       background
    >
     </el-pagination>
     <div class="padding showImg" v-if="imagesSelect">
     <!--  <div class="flex">
        <h2>企业相关图片</h2>
        <div>
          <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
              <el-radio-button label="allImg">全部照片</el-radio-button>
              <el-radio-button label="right">客户可见</el-radio-button>
            </el-radio-group>
        </div>
      </div> -->
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
            <div class="case inb"  v-for="(i,k) in item.imgList" :key="2+k" @click="look(i)">
              <div style="line-height: 180px;text-align: center;"><img class="caseimg" :src="pathUrl+i" alt=""></div>
              <div class="txtcenter">
                <img src="../../static/imgs/delete.png" alt="">
                <span>删除</span>
              </div>
            </div>
            <div class="case inb" @click="toEdit('house',index)">
              <div style="line-height: 180px;text-align: center;"><img class="caseimg"src="../../static/imgs/addImg.png" alt=""></div>
              <div class="txtcenter">
                <span>继续添加图片</span>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="oneLine flex">
          <div v-for="(i,k) in item.imgList" :key="k" @click="look(i)">
            <div style="line-height: 180px;">
              <img :src="pathUrl+i" alt="" style="max-height: 180px;max-width: 100%;">
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
            <div style="line-height: 180px;">
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
      <el-dialog
        :visible.sync="isShowImageDialog"
        :close-on-click-modal = "false"
        :modal-append-to-body="false"
       >
        <img :src="pathUrl+looksrc" style="max-width: 100%;max-height: 100%;display: block; margin: 0 auto;"/>
      </el-dialog>
      <div class="txtcenter toSave">
        <el-button type="primary">保存</el-button>
      </div>
    </div>
	</div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
export default {
	name: 'proPhoto',
  	data(){
  		return{
        citySelect:true,
        buildSelect:false,
        businessSelect:false,
        imagesSelect:false,
  			allCity:[],
        theCity:"",
        houseName:"",
        houseInfo:"",
  			building:[],
  			buildDes:[],
        currentPage:1,
        total:0,
        currentPage1:1,
        total1:0,
        tabPosition: 'allImg',
        radio:0,
        images:[],
        applyId:"",
        looksrc:"",
        isShowImageDialog:false,
        theTemplateHouse:"",
        theTemplateCompany:"",
  		}
  	},
    computed:{
      des(){
       return JSON.parse(sessionStorage.getItem('getProDes'))
      },
      buildSessDes(){
        return JSON.parse(sessionStorage.getItem('getBuildDes'))
      }
    },
    created(){
      this.theTemplateHouse = JSON.parse(this.des.template_json).house;
      this.theTemplateCompany = JSON.parse(this.des.template_json).company;
      if(this.$route.query.type == 0){
        this.theCity = this.buildSessDes.city;
        this.queryBusiness(this.buildSessDes);
      }else{
        this.queryAllList();
      }
    }, 
  	methods:{
      look(i){
        this.looksrc = i;
        this.isShowImageDialog = true;
      },
      backStep(){
        if(this.buildSelect == true){ //写字楼
          this.citySelect = true; //返回城市列表
          this.buildSelect = false;
          this.businessSelect = false;
          this.imagesSelect = false;
          this.queryAllList();
        }else if(this.businessSelect == true){
          this.citySelect = false;
          this.buildSelect = true;//返回写字楼列表
          this.businessSelect = false;
          this.imagesSelect = false;
          if(this.$route.query.type == 0){
            this.queryHouse(this.buildSessDes.city);
          }
        }else if(this.imagesSelect == true){
          this.citySelect = false; 
          this.buildSelect = false;
          this.businessSelect = true;//返回企业列表
          this.imagesSelect = false;
        }      
      },
      queryAllList(){
        var $this = this;
        axios.get($this.baseUrl+'api/project/cityDetailList?projectId='+$this.des.id,{
            headers:{
              "Content-Type":"application/json"
            }
              }).then(res => {
                    console.log(res.data);
                    $this.allCity = res.data;
                  },error =>{

          })
      },
      current_change(currentPage){
        this.currentPage = currentPage;
        console.log(this.currentPage);
        this.queryHouse();
      },
      queryHouse(city){
        this.citySelect = false;
        this.buildSelect = true;
        this.theCity = city;
        var $this = this;
        axios.get($this.baseUrl+'api/project/houseList?page='+$this.currentPage+'&pageSize=50&projectId='+$this.des.id+'&city='+$this.theCity,{
              headers:{
                  "Content-Type":"application/json"
              }
            }).then(res => {
                  console.log(res.data);
                  $this.building = res.data.list;
                  $this.total = res.data.count;
              },error =>{
        })
      },
      current_change2(currentPage){
        this.currentPage1 = currentPage;
        console.log(this.currentPage1);
        this.queryAllList();
      },
      queryBusiness(houseInfo){
        this.buildSelect= false;
        this.businessSelect = true;
        var $this = this;
        $this.houseInfo = houseInfo;
        axios.get($this.baseUrl+'api/project/houseApplyList?page='+$this.currentPage+'&pageSize=50&projectId='+$this.des.id+'&city='+$this.theCity+'&houseName='+$this.houseInfo.houseName,{
              headers:{
                  "Content-Type":"application/json"
              }
            }).then(res => {
                  console.log(res.data);
                  $this.buildDes = res.data.result;
                  $this.total1 = res.data.count;
              },error =>{
        })
      },
      queryHouseImages(){
        this.businessSelect = false;
        this.imagesSelect = true;
        var $this = this;
        axios.get($this.baseUrl+'api/project/houseImages?houseId='+$this.houseInfo.id,{
            headers:{
              "Content-Type":"application/json"
            }
        }).then(res => {
              console.log(res.data);
              // $this.images = JSON.parse(res.data[0].images);
              // console.log($this.images);
              if(res.data[0].images){
                    $this.images = JSON.parse(res.data[0].images);
              }else{
                $this.theTemplateHouse.forEach((item,index)=>{
                  if(item.isShow){
                    item.imgList = [];
                    $this.images.push(item)
                  }
                })
              }
            },error =>{
          })
      },
      queryBusinessImages(applyId){
        this.businessSelect = false;
        this.imagesSelect = true;
        this.applyId = applyId;
        var $this = this;
        axios.get($this.baseUrl+'api/project/applyImages?applyId='+$this.applyId,{
            headers:{
              "Content-Type":"application/json"
            }
              }).then(res => {
                    console.log(res.data);
                    // $this.images = JSON.parse(res.data[0].images);
                    // console.log($this.images);
                    if(res.data[0].images){
                      $this.images = JSON.parse(res.data[0].images);
                    }else{
                      $this.theTemplateCompany.forEach((item,index)=>{
                        if(item.isShow){
                          item.imgList = [];
                          $this.images.push(item)
                        }
                      })
                    }   
                  },error =>{

          })
      },
      
  	}
}
</script>

<style lang="less">
	#proPhoto {
		.allFolder{
			.folder{
				width: 20%;
				margin:15px 0;
				img{
					width: 90px;
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