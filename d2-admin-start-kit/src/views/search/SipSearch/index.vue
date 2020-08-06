<template>
<div class="pagesearch1" style="width:100%;height: 100%;">

  <div class="search d7" style="position: fixed;z-index:100">
  <form>
    <input id="searchVill" @blur="blurInput" @focus="focusInput" type="text" placeholder="搜索村庄...">
    <div @click="searchVill" style="position: absolute;left: 160px;top: 3px;font-size: 25px;cursor:pointer;">
      <d2-icon name="search"/>
    </div>

    <div  @click="deleteVill()" style="position: absolute;left: 190px;top: 3px;font-size: 25px;cursor:pointer
    ;">
      <d2-icon style="color: burlywood" name="times"/>
    </div>
    <el-tooltip class="item"  effect="dark" content="全图显示地图" placement="top-start">
      <div  @click="globemap()" style="position: absolute;left: 260px;top: 5px;font-size: 25px;cursor:pointer;">
        <d2-icon style="color: burlywood" name="globe"/>
      </div>
    </el-tooltip>
    
    
    <el-tooltip class="item"  effect="dark" content="点击展开所有村庄信息" placement="top-start">
      <div @click="vill" style="position: absolute;left: 223px;top: 5px;font-size: 25px;cursor:pointer;color: white;">
        <d2-icon name="sort-amount-asc" />
      </div>
    </el-tooltip>
  </form>
  <el-collapse-transition>
    <div class="villpage" v-show="vill1" better-scroll>
      <div class="villpage2">
        <div  v-for="(n,i) in this.villPointData" @click="villClick(i)" :key="i" class="demo-bs-item" style="cursor:pointer;">
          <span style="font-weight:bold;padding-left: 5px;color:red">{{n.name}}</span></br>
          <span style="padding-left: 15px;color:red">是否为贫困村:{{n.poverty | poverty}}</span></br>
          <span style="padding-left: 15px;color:red">所属镇:{{n.town}}</span></br>
          <span style="padding-left: 15px;color:red">总人口:{{n.people}}</span></br>
          <span style="padding-left: 15px;color:red">贫困人口:{{n.povertypeo}}</span></br>
          <span style="padding-left: 15px;color:red">贫困率:{{n.povertynum}}</span>
        </div>
      </div>
    </div>
  </el-collapse-transition>
  <el-collapse-transition>
    <div class="villpage" v-show="vill2" better-scroll>
      <div class="villpage2">
        <div  v-for="(n,i) in this.villPointData2" @click="villClick2(i)" :key="i" class="demo-bs-item" style="cursor:pointer;">
          <span style="font-weight:bold;padding-left: 5px;color:red">{{n.name}}</span></br>
          <span style="padding-left: 15px;color:red">是否为贫困村:{{n.poverty | poverty}}</span></br>
          <span style="padding-left: 15px;color:red">所属镇:{{n.town}}</span></br>
          <span style="padding-left: 15px;color:red">总人口:{{n.people}}</span></br>
          <span style="padding-left: 15px;color:red">贫困人口:{{n.povertypeo}}</span></br>
          <span style="padding-left: 15px;color:red">贫困率:{{n.povertynum}}</span>
        </div>
      </div>
    </div>
  </el-collapse-transition>
</div>
 
  <d2-container better-scroll >
     <transition name="el-fade-in-linear">
      <el-card v-show="vill3" class="box-card" style="position: absolute; width: 400px;z-index: 100;bottom: 10px;background-color: azure;right: 20px;">
        <div slot="header" class="clearfix">
          <span>详细信息</span>
          <el-tooltip :content="'查看村庄详细介绍 '" placement="top">
           <el-switch
           style="position: absolute;left: 100px;"
            v-model="minutevalue"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
          </el-tooltip>
        </div>
        <transition name="el-zoom-in-top">
          <div class="drawpage" v-show="drawer" >
            <div v-for="(n,i) in this.minuteData.content" style="font-size: 18px;" :key="i">{{n}}</div>
          </div>
        </transition>
        <span style="padding-left: 15px;color:red">贫困村:{{this.minuteData.name}}</span></br>
          <span style="padding-left: 15px;color:red">贫困人口:{{this.minuteData.povertypeo}}</span></br>
          <span style="padding-left: 15px;color:red">五保户:{{this.minuteData.five}}户</span></br>
          <span style="padding-left: 15px;color:red">低保户:{{this.minuteData.low}}户</span></br>
          <span style="padding-left: 15px;color:red">扶贫对象:{{this.minuteData.povertyobj}}人</span></br>
          <span style="padding-left: 15px;color:red">主导产业:{{this.minuteData.industry | industryarr}}</span></br>
          <div class="inner" style="    margin-top: 10px;border: 1px solid gray;border-radius: 20px;">
            <ve-bar :data="chartData" :settings="chartSettings" width="350px" height="231px" ></ve-bar>
          </div>
      </el-card>
     </transition>
    <div id="allmap1" style="width:100.1%;height: 100.1%;"> </div>
  </d2-container>
</div>
</template>

<script>

  // import BMap from 'BMap'
  import inMap from 'inmap';
  import axios from 'axios'

import Vue from 'vue'
import { GridLayout, GridItem } from 'vue-grid-layout'
Vue.component('d2-grid-layout', GridLayout)
Vue.component('d2-grid-item', GridItem)
export default {

  data () {
    this.chartSettings = {
      metrics: ['资源占比'],
      dataOrder: {
        label: '资源占比',
        order: 'desc'
      }
    }
    return {
      drawer: false,
      btmMap:'',
      villPointData:'',
      vill1:false,
      mapinfoWindow:'',
      mappoint:'',
      vill2:false,
      villPointData2:'',
      villsetTime:'',
      vill3:false,
      minuteData:{},
      minutevalue: false,
      chartData: {
        columns: ['产业', '资源占比'],
        rows: [
          { 产业: '渔业', 资源占比: 0},
          { 产业: '水田', 资源占比: 0},
          { 产业: '旱田', 资源占比: 0},
          { 产业: '林业', 资源占比: 0},
        ]
      }

     
    }
  },
  filters: {
    poverty:function (value) {
      if(value){
        return "是"
      }else {
        return "否"
      }
    },
    industryarr:function (value) {
      // return value
      var arr = []
      for (let i in value) {
          arr.push(value[i]); //属性
          //arr.push(obj[i]); //值
      }
      console.log(arr);
      return arr[0]+"、"+arr[1]+"、"+arr[2]

    }
  },

  mounted () {
      
      axios.get('http://49.234.228.14:3000/searchcont').then((res)=>{
        this.villPointData = res.data[0].vill
        axios.get('http://49.234.228.14:3000/search').then((res)=>{
          var data  = res.data
          var inmap = new inMap.Map({
              id: 'allmap1',
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

  methods: {
    watchinfoWindow(){
      if(this.mapinfoWindow){
        console.log(this.mapinfoWindow.isOpen(),'窗口')
        if(this.mapinfoWindow.isOpen()==false){
          this.villPoint(this.btmMap)
          this.vill3 = false
        }
      }
    },
    globemap(){
      var map = this.btmMap.getMap()
      map.centerAndZoom(new BMap.Point(116.844088, 31.292848),11); 
    },
    deleteVill(){
      document.getElementById('searchVill').value = ''
      this.villPointData2 = []
      this.vill1 = false
      this.vill2 = false
      this.vill3=false
      var map = this.btmMap.getMap()
      map.closeInfoWindow(this.mapinfoWindow,this.mappoint);
      this.villPoint(this.btmMap)
    },
    searchVill(){
      var keyWord = document.getElementById('searchVill').value
      if(keyWord == ''){
         this.$message({
          showClose: true,
          message: '搜索不能为空',
          type: 'error'
        });
      }else{
        var arr = [];
        for (var i = 0; i < this.villPointData.length; i++) {
          if (this.villPointData[i].name.indexOf(keyWord) >= 0) {
            arr.push(this.villPointData[i]);
          }
        }
        if(arr == ''){
          this.$message({
            showClose: true,
            message: '请确认查询是否存在',
            type: 'error'
          });
          document.getElementById('searchVill').value = ''
        }else{
          this.villPointData2 = arr
          console.log(this.villPointData2,'数据2')
          this.vill1 = false
          this.vill2 = true
          this.vill3=false
        }

      }
     
    },
    blurInput(){
      this.vill1 = false
      var map = this.btmMap.getMap()
      map.closeInfoWindow(this.mapinfoWindow,this.mappoint);
      this.villPoint(this.btmMap)
    },
    focusInput(){
      this.vill1 = false
      var map = this.btmMap.getMap()
      map.closeInfoWindow(this.mapinfoWindow,this.mappoint);
      this.villPoint(this.btmMap)
    },
    vill(){
      this.vill3=false
      this.vill2 = false
      this.vill1 = !this.vill1
      var map = this.btmMap.getMap()
      map.closeInfoWindow(this.mapinfoWindow,this.mappoint);
      this.villPoint(this.btmMap)
    },
    villClick2(i){
      var that = this
      var map = this.btmMap.getMap()
      //添加点
      function addMarker(count){
        var point = new BMap.Point(count.parpat[0],count.parpat[1]);
        var marker = new BMap.Marker(point);
        var opts
        var content
        if(count.poverty == false){
            opts = {
              width : 200,     // 信息窗口宽度
              height: 120,     // 信息窗口高度
              title : count.name , // 信息窗口标题
            }
            content = "贫困村:"+"否"+"</br>所属镇:"+count.town + "</br>总人口:"+count.people+"</br>贫困率:"+count.povertynum
        }else if(count.poverty == true){
            opts = {
              width : 200,     // 信息窗口宽度
              height: 120,     // 信息窗口高度
              title : count.name , // 信息窗口标题
            }
            content = "贫困村:"+"是"+"</br>所属镇:"+count.town + "</br>总人口:"+count.people+"</br>贫困率:"+count.povertynum
        }
        //添加窗口
        var infoWindow = new BMap.InfoWindow(content, opts);  // 创建信息窗口对象
        that.mapinfoWindow = infoWindow
        that.mappoint = point
        map.openInfoWindow(infoWindow,point); //开启信息窗口
           if(count.poverty == true){
              that.minuteData = count
              that.chartData.rows[0].资源占比 = count.resource.pond
              that.chartData.rows[1].资源占比 = count.resource.paddyfield
              that.chartData.rows[2].资源占比 = count.resource.drysoil
              that.chartData.rows[3].资源占比 = count.resource.forestry
              that.vill3 = true
            }else{
              that.vill3 = false
            }
        map.addOverlay(marker);
      }
      var count = this.villPointData2[i]
      addMarker(count);
    },
    villClick(i){
      var that = this
      var map = this.btmMap.getMap()
      //添加点
      function addMarker(count){
        var point = new BMap.Point(count.parpat[0],count.parpat[1]);
        var marker = new BMap.Marker(point);
        var opts
        var content
        if(count.poverty == false){
            opts = {
              width : 200,     // 信息窗口宽度
              height: 120,     // 信息窗口高度
              title : count.name , // 信息窗口标题
            }
            content = "贫困村:"+"否"+"</br>所属镇:"+count.town + "</br>总人口:"+count.people+"</br>贫困率:"+count.povertynum
        }else if(count.poverty == true){
            opts = {
              width : 200,     // 信息窗口宽度
              height: 120,     // 信息窗口高度
              title : count.name , // 信息窗口标题
            }
            content = "贫困村:"+"是"+"</br>所属镇:"+count.town + "</br>总人口:"+count.people+"</br>贫困率:"+count.povertynum
        }
        //添加窗口
        var infoWindow = new BMap.InfoWindow(content, opts);  // 创建信息窗口对象
        that.mapinfoWindow = infoWindow
        that.mappoint = point
        map.openInfoWindow(infoWindow,point); //开启信息窗口
           if(count.poverty == true){
              that.minuteData = count
              that.chartData.rows[0].资源占比 = count.resource.pond
              that.chartData.rows[1].资源占比 = count.resource.paddyfield
              that.chartData.rows[2].资源占比 = count.resource.drysoil
              that.chartData.rows[3].资源占比 = count.resource.forestry
              that.vill3 = true
            }else{
              that.vill3 = false
            }
        map.addOverlay(marker);
      }
      var count = this.villPointData[i]
      addMarker(count);
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
        if(count.poverty == false){
            opts = {
              width : 200,     // 信息窗口宽度
              height: 120,     // 信息窗口高度
              title : count.name , // 信息窗口标题
            }
            content = "贫困村:"+"否"+"</br>所属镇:"+count.town + "</br>总人口:"+count.people+"</br>贫困率:"+count.povertynum
        }else if(count.poverty == true){
            opts = {
              width : 200,     // 信息窗口宽度
              height: 120,     // 信息窗口高度
              title : count.name , // 信息窗口标题
            }
            content = "贫困村:"+"是"+"</br>所属镇:"+count.town + "</br>总人口:"+count.people+"</br>贫困率:"+count.povertynum
        }
        //添加窗口
        var infoWindow = new BMap.InfoWindow(content, opts);  // 创建信息窗口对象
          marker.addEventListener("click", function(){ 
          that.mapinfoWindow = infoWindow
          that.mappoint = point
            map.openInfoWindow(infoWindow,point); //开启信息窗口
            
            if(count.poverty == true){
              that.minuteData = count
              that.chartData.rows[0].资源占比 = count.resource.pond
              that.chartData.rows[1].资源占比 = count.resource.paddyfield
              that.chartData.rows[2].资源占比 = count.resource.drysoil
              that.chartData.rows[3].资源占比 = count.resource.forestry
              that.vill3 = true
            }else{
              that.vill3 = false
            }
            
          });
        map.addOverlay(marker);
      }
      
      let len = this.villPointData.length
      for (var i = 0; i < len; i ++) {
        var count = this.villPointData[i]
        addMarker(count);
      }
    },

    log (arg1 = 'log', ...logs) {
      if (logs.length === 0) {
        console.log(arg1)
      } else {
        console.group(arg1)
        logs.forEach(e => {
          console.log(e)
        })
        console.groupEnd()
      }
    },

    // 测试代码
    layoutUpdatedHandler (newLayout) {
      console.group('layoutUpdatedHandler')
      newLayout.forEach(e => {
        console.log(`{'x': ${e.x}, 'y': ${e.y}, 'w': ${e.w}, 'h': ${e.h}, 'i': '${e.i}'},`)
      })
      console.groupEnd()
    },
    resizeHandler (i, newH, newW) {
      this.log('resizeHandler', `i: ${i}, newH: ${newH}, newW: ${newW}`)
    },
    moveHandler (i, newX, newY) {
      this.log('moveHandler', `i: ${i}, newX: ${newX}, newY: ${newY}`)
    },
    resizedHandler (i, newH, newW, newHPx, newWPx) {
      this.log('resizedHandler', `i: ${i}, newH: ${newH}, newW: ${newW}, newHPx: ${newHPx}, newWPx: ${newWPx}`)
    },
    movedHandler (i, newX, newY) {
      this.log('movedHandler', `i: ${i}, newX: ${newX}, newY: ${newY}`)
    }
  },
  watch: {
    vill3(value){
      if(value){
        this.villsetTime =  setInterval(() => {
          this.watchinfoWindow()
        }, 500);
      }else{
        clearInterval(this.villsetTime)
      }
    },
    minutevalue(value){
      if(value){
        this.drawer=true
      }else{
        this.drawer=false
      }
    },
  }
}
</script>

<style >

  .pagesearch1 .d2-container-full-bs__body-wrapper-inner{
      padding: 0px !important;
      width:100%;height: 100%;
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


/* .d7 {background: #7BA7AB;} */
.d7:after {content:""; clear:both; display:table}

.d7 input {
  width: 200px;
  height: 30px;
  padding-left: 15px;
  border-radius: 42px;
  border: 2px solid #324b4e;
  background: #F9F0DA;
  outline: none;
  position: relative;

}

.demo-bs-item{

  padding-bottom: 10px
}
.villpage{
  height: 270px;
  width: 221px;
  position: relative;
  border: 1px solid black;
  border-radius: 15px;
  overflow: hidden;
  background-color: #F9F0DA
}
.villpage2{
  height: 100%;
  width: 240px;
  overflow-y: auto;
  overflow-x: hidden;
}
.inmap-scale-group{
  display: none
}
.drawpage{
  width: 400px;
  height: 387px;
  position: absolute;
  background-color: cadetblue;
  top: 58px;
  overflow: hidden;
  left: 0px;
  border-radius: 5px;
  z-index: 1000;
}

</style>