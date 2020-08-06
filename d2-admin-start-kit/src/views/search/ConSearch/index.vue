<template>
  <div class="pagesearch2" style="width:100%;height: 100%;">
    <d2-container better-scroll>
      <el-card class="box-card" style="position: absolute;width: 30%;z-index: 100;left: 1%;top: 1%;" >
        

        <el-tooltip class="item"  effect="dark" content="搜索结果展开缩放" placement="right-start">
          <div  @click="shrink " style="position: absolute;left: 356px;top: 72px;font-size: 25px;cursor:pointer;">
            <d2-icon style="color: burlywood" name="arrows-v"/>
          </div>
        </el-tooltip>

        <el-tooltip class="item"  effect="dark" content="全图显示地图" placement="right-start">
          <div  @click="globemap()" style="position: absolute;left: 350px;top: 5px;font-size: 25px;cursor:pointer;">
            <d2-icon style="color: burlywood" name="globe"/>
          </div>
        </el-tooltip>

        <div  style="float: left;padding-left: 5px;padding-top: 5px;padding-bottom: 5px;">
          <el-radio v-model="radio1" label="五保户">五保户</el-radio>
          <el-radio v-model="radio1" label="低保户">低保户</el-radio>
          <el-radio v-model="radio1" label="贫困户">贫困户</el-radio>
        </div>
        <div  style="float: left;padding-left: 5px;padding-bottom: 5px;">
          <el-radio v-model="radio2" label="环境致贫">环境致贫</el-radio>
          <el-radio v-model="radio2" label="因灾致贫">因灾致贫</el-radio>
          <el-radio v-model="radio2" label="劳动力致贫">劳动力致贫</el-radio>
          <el-radio v-model="radio2" label="技术致贫">技术致贫</el-radio>
          <el-radio v-model="radio2" label="思想落后">思想落后</el-radio>
          <el-radio v-model="radio2" label="因病因残致贫">因病因残致贫</el-radio>
        </div>
        <div style="padding-left: 10%;padding-bottom: 10px;">
          <el-button type="success" @click="search" style="width: 40%;padding-top: 10px;padding-bottom: 5px;">查询</el-button>
           <el-button type="info" @click="again" style="width: 40%;padding-top: 10px;padding-bottom: 5px;">重置</el-button>
        </div>
        <el-collapse-transition>
        <div class="fimalypage" v-show="fimaly1" >
          <div  v-for="(n,i) in this.familyData" @click="familyClick(i)" :key="n" class="demo-bs-item" style="cursor:pointer;">
            <span style="font-weight:bold;padding-left: 15px;color:red">贫困户Id:{{n.Id}}</span></br>
            <span style="padding-left: 35px;color:red">贫困户类型:{{n.kind}}</span></br>
            <span style="padding-left: 35px;color:red">贫困户地址:{{n.local}}</span></br>
            <span style="padding-left: 35px;color:red">年收入:{{n.income}}</span></br>
            <span style="padding-left: 35px;color:red">有无帮扶措施:{{n.policy | familypolicy}}</span></br>
          </div>
        </div>
      </el-collapse-transition>
        
      </el-card>
      <transition name="el-fade-in-linear">
      <el-card v-show="fimaly2" class="box-card" style="position: absolute; width: 400px;z-index: 100;bottom: 10px;background-color: white;right: 20px;">
        <div slot="header" class="clearfix">
          <span>详细信息</span>
        </div>
          <span style="font-weight:bold;padding-left: 15px;color:red">贫困户Id:{{this.minuteData.Id}}</span></br>
          <span style="padding-left: 35px;color:red">贫困户类型:{{this.minuteData.kind}}</span></br>
          <span style="padding-left: 35px;color:red">贫困户地址:{{this.minuteData.local}}</span></br>
          <span style="padding-left: 35px;color:red">年收入:{{this.minuteData.income}}</span></br>
          <span style="padding-left: 35px;color:red">有无帮扶措施:{{this.minuteData.policy | familypolicy}}</span></br>
          <el-collapse v-model="activeNames">
            <el-collapse-item title="致贫原因" name="1">
               <div  v-for="(n,i) in this.minuteData.povertycause" :key="n">
                 {{i+1}}、{{n}}
               </div>
            </el-collapse-item>
            <el-collapse-item title="帮扶措施" name="2">
              <div  v-for="(n,i) in this.minuteData.content" :key="n">
                 {{n}}
               </div>
            </el-collapse-item>
          </el-collapse>
      </el-card>
     </transition>

      <div id="allmap2" style="width:100.1%;height: 100.1%;"> </div>
    </d2-container>
  </div>
</template>

<script>
import inMap from 'inmap';
import axios from 'axios'

import Vue from 'vue'
import { GridLayout, GridItem } from 'vue-grid-layout'
Vue.component('d2-grid-layout', GridLayout)
Vue.component('d2-grid-item', GridItem)

export default{
  data () {
    return {
      btmMap:'',
      activeNames: [],
      villsetTime:'',
      familyPointData:'',
      familyData:[],
      mapinfoWindow:'',
      mappoint:'',
      fimaly2:false,
      radio1: '',
      radio2:'',
      minuteData:[],
      fimaly1:false
    }
  },
  filters: {
    familypolicy:function (value) {
      if(value){
        return "有"
      }else{
        return "暂无"
      }
    }
  },
  mounted () {
     axios.get('http://49.234.228.14:3000/searchfamily').then((res)=>{
        this.familyPointData = res.data[0].family
          axios.get('http://49.234.228.14:3000/search').then((res)=>{
          var data  = res.data
          var inmap = new inMap.Map({
              id: 'allmap2',
              center: [116.844088, 31.292848],
              zoom: {
                  value: 11,
                  show: true,
                  max: 22
              }
          });

          var overlay = new inMap.MaskOverlay({
              style: {
                  backgroundColor: "rgba(31,44,72,1)",
                  borderColor: 'rgba(250, 250, 55, 1)',
                  shadowColor: 'rgba(250, 250, 55, 1)',
                  shadowBlur: 20,
                  borderWidth: 16,
              },
              data: data,
              event: {
                  onState(state) {
                      console.log(state);
                  }
              }
          });

          inmap.add(overlay);
          this.btmMap = inmap
          this.villPoint(inmap)
        })
      })   


  },
  methods:{
    shrink(){
      if(this.familyData != ''){
        this.fimaly1 = !this.fimaly1
      }
    },
    globemap(){
      var map = this.btmMap.getMap()
      map.centerAndZoom(new BMap.Point(116.844088, 31.292848),11); 
    },
    watchinfoWindow(){
      if(this.mapinfoWindow){
        if(this.mapinfoWindow.isOpen()==false){
          this.villPoint(this.btmMap)
          this.fimaly2 = false
        }
      }
    },
    again(){
      this.radio1 = ''
      this.radio2 = ''
      this.familyData = []
      this.fimaly1 = false
      this.fimaly2 = false
      var map = this.btmMap.getMap()
      map.closeInfoWindow(this.mapinfoWindow,this.mappoint);
      this.villPoint(this.btmMap)
    },
    familyClick(i){
      var that = this
      var map = this.btmMap.getMap()
      //添加点
      function addMarker(count){
        var point = new BMap.Point(count.parpat[0],count.parpat[1]);
        var marker = new BMap.Marker(point);
        var opts
        var content
        let policy
        if(count.policy == true){
          opts = {
            width : 200,     // 信息窗口宽度
            height: 120,     // 信息窗口高度
            title : "贫困户ID:"+count.Id , // 信息窗口标题
          }
          content = "贫困户类型:"+count.kind+"</br>贫困户地址:"+count.local+"</br>致贫原因:"+count.cause +"</br>有无帮扶措施:有"
        }else {
          opts = {
            width : 200,     // 信息窗口宽度
            height: 120,     // 信息窗口高度
            title : "贫困户ID:"+count.Id , // 信息窗口标题
          }
          content = "贫困户类型:"+count.kind+"</br>贫困户地址:"+count.local +"</br>有无帮扶措施:无"
        }
        //添加窗口
        var infoWindow = new BMap.InfoWindow(content, opts);  // 创建信息窗口对象
        that.mapinfoWindow = infoWindow
        that.mappoint = point
        map.openInfoWindow(infoWindow,point); //开启信息窗口
        map.addOverlay(marker);
      }
      var count = this.familyData[i]
      addMarker(count);
      this.minuteData = count
      this.fimaly2 = true
    },
    search(){
      if(this.radio1 == '' && this.radio2 == ''){
        this.$message({
          showClose: true,
          message: '贫困户类型或制贫原因任选一项再查询',
          type: 'error'
        });
      }else if(this.radio1 !== '' && this.radio2 !== ''){
        this.familyData = []
        let len = this.familyPointData.length
        for(let i = 0;i<len;i++){
          if(this.familyPointData[i].kind == this.radio1 || this.familyPointData[i].cause == this.radio2){
            this.familyData.push(this.familyPointData[i])
          }
        }
        this.fimaly1 = true
      }else if(this.radio1 !== ''){
        this.familyData = []
        let len = this.familyPointData.length
        for(let i = 0;i<len;i++){
          if(this.familyPointData[i].kind == this.radio1){
            this.familyData.push(this.familyPointData[i])
          }
        }
        this.fimaly1 = true
      }else if(this.radio2 !== ''){
        this.familyData = []
        let len = this.familyPointData.length
        for(let i = 0;i<len;i++){
          if(this.familyPointData[i].cause == this.radio2){
            this.familyData.push(this.familyPointData[i])
          }
        }
        this.fimaly1 = true
      }

    },
    villPoint(inmap){
      var that = this
      var map = inmap.getMap()
      //添加点
      function addMarker(count){
        var point = new BMap.Point(count.parpat[0],count.parpat[1]);
        var marker = new BMap.Marker(point);
        var opts
        var content
        let policy
        if(count.policy == true){
          opts = {
            width : 200,     // 信息窗口宽度
            height: 120,     // 信息窗口高度
            title : "贫困户ID:"+count.Id , // 信息窗口标题
          }
          content = "贫困户类型:"+count.kind+"</br>贫困户地址:"+count.local+"</br>致贫原因:"+count.cause +"</br>有无帮扶措施:有"
        }else {
          opts = {
            width : 200,     // 信息窗口宽度
            height: 120,     // 信息窗口高度
            title : "贫困户ID:"+count.Id , // 信息窗口标题
          }
          content = "贫困户类型:"+count.kind+"</br>贫困户地址:"+count.local +"</br>有无帮扶措施:无"
        }
        
        //添加窗口
        var infoWindow = new BMap.InfoWindow(content, opts);  // 创建信息窗口对象
          marker.addEventListener("click", function(){ 
            that.mapinfoWindow = infoWindow
            that.mappoint = point
            map.openInfoWindow(infoWindow,point); //开启信息窗口
            that.fimaly2 = true
            that.minuteData = count
          });
        map.addOverlay(marker);
      }
      
      let len = this.familyPointData.length
      for (var i = 0; i < len; i ++) {
        var count = this.familyPointData[i]
        addMarker(count);
      }
    }
  },
  watch: {
    fimaly2(value){
      if(value){
        this.villsetTime =  setInterval(() => {
          this.watchinfoWindow()
        }, 500);
      }else{
        clearInterval(this.villsetTime)
      }
    }
  }
}
</script>

<style>
  .pagesearch2
    .d2-container-full-bs__body-wrapper-inner{
      padding: 0px !important;
      width:100%;height: 100%;
    }
  .pagesearch2
    .el-collapse{
      width: 90%;
      padding-left: 5%;
      margin-top: 5px;
    }
  .pagesearch2
    .el-card__body{
      padding: 0px !important;
    }
  
.BMap_cpyCtrl {
  display: none;
}
.anchorBL {
  display: none;
}

.BMap_bubble_title {
  color:white;
  font-size:13px;
  font-weight:bold;
  text-align:left;
  padding-left:5px;
  padding-top:5px;
  border-bottom:1px solid gray;
  background-color:#0066b3;
}
/* 消息内容 */
.BMap_bubble_content {
  background-color:white;
  padding-left:5px;
  padding-top:5px;
  padding-bottom:10px;
}
/* 内容 */
.BMap_pop div:nth-child(9) {
  top:35px !important;
  border-radius:7px;
}
/* 左上角删除按键 */
.BMap_pop img {
  display: none;
}
.BMap_top {
  display:none;
}
.BMap_bottom {
  display:none;
}
.BMap_center {
  display:none;
}
/* 隐藏边角 */
.BMap_pop div:nth-child(1) div {
  display:none;
}
.BMap_pop div:nth-child(3)  {
  display:none;
}

.BMap_pop div:nth-child(5)  {
  display:none;
}

.BMap_pop div:nth-child(7) {
  display:none;
}

.fimalypage{
  height: 225px;
  width: 100%;
  
  position: relative;
  border-radius: 15px;
    overflow-y: auto;
  overflow-x: hidden;
}
/*滚动条样式*/
.fimalypage::-webkit-scrollbar {/*滚动条整体样式*/
    width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
}
.fimalypage::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
}
.fimalypage::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
}
</style>
