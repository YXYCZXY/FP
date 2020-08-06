<template>
    <div class="pagesearch2" style="width:100%;height: 100%;">
        <d2-container better-scroll>
            <div  class="buttondraw">
                <el-button type="success" @click="judge" >查询</el-button>
                <el-button type="info" @click="clearAll">重置</el-button>
            </div>
            <el-tooltip class="item"  effect="dark" content="全图显示地图" placement="bottom-start">
            <div  @click="globemap()" style="position: absolute;right: 22px;z-index: 10;top: 86px;font-size: 25px;cursor: pointer;">
                <d2-icon style="color: burlywood" name="globe"/>
            </div>
            </el-tooltip>

                <div class="buttons bts1" v-show="cardshow" @click="echart(1)">
                    <div class="btn btn1"><span class="circle"></span><span class="text">居住地统计</span></div>
                </div>
                <div class="buttons bts2" v-show="cardshow" @click="echart(2)">
                    <div class="btn btn1"><span class="circle"></span><span class="text">致贫原因统计</span></div>
                </div>
                <div class="buttons bts3" v-show="cardshow" @click="echart(3)">
                    <div class="btn btn1"><span class="circle"></span><span class="text">年收入统计</span></div>
                </div>
            <el-collapse-transition>
                <el-card v-show="cardshow" class="box-card" style="position: absolute;width: 750px;z-index: 10;right: 21%;top: 8.5%;pointer-events: auto;">
                    <div slot="header" class="clearfix" style="text-align: center;">
                        <span id="spancahneg">贫困户类型和居住地统计</span>
                        <div @click="back" style="float: left; padding: 3px 0;cursor: pointer" >
                            <i class="el-icon-refresh-left"></i>
                        </div>
                    </div>
                    <div id="myChart" style="width: 750px;height:490px;float: left;">
                    </div>
                </el-card>
            </el-collapse-transition>
            <div id="allmap3" style="width:100.1%;height: 100.1%;"> </div>
        </d2-container>
    </div>
</template>

<script>
import inMap from 'inmap';
import axios from 'axios'

import Vue from 'vue'
export default {
    data () {
        return {
            btmMap:'',
            cardshow:false,
            mapoverlays:'',
            familyPointData:'',
            mapinfoWindow:'',
            mappoint:'',
            judgeNum:0,
            selectData:[],
            m1Data:[],
            m2Data:[],
            m3Data:[],
            m4Data:[],
            changeData:[],
            fistseacrh:true
        }
    },
    mounted () {
        axios.get('http://49.234.228.14:3000/searchfamily').then((res)=>{
            this.familyPointData = res.data[0].family
            axios.get('http://49.234.228.14:3000/search').then((res)=>{
            var data  = res.data
            var inmap = new inMap.Map({
                id: 'allmap3',
                center: [116.834088, 31.292848],
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
            this.drawmap(inmap)     
        })
      })   
    },
    methods: {
        back(){
            this.cardshow = false
        },
        echart(i){
            if(i == 1){
                this.changeData = this.m2Data
                document.getElementById('spancahneg').innerText = "贫困户类型和居住地统计"
                this.mapechart()
            }else if(i == 2){
                this.changeData = this.m3Data
                document.getElementById('spancahneg').innerText = "贫困户类型和致贫原因统计"
                this.mapechart()
            }else if(i == 3){
                this.changeData = this.m4Data
                document.getElementById('spancahneg').innerText = "贫困户类型和年收入统计"
                this.mapechart()
            }
            console.log(i,this.changeData,'??')
        },
        mapechart(){
            console.log(this.m1Data,this.m2Data,this.m3Data,this.m4Data,this.changeData,'数据11')
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            myChart.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 10,
                        data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
                    },
                    series: [
                        {
                            name: '贫困类型',
                            type: 'pie',
                            selectedMode: 'single',
                            radius: [0, '30%'],

                            label: {
                                position: 'inner'
                            },
                            labelLine: {
                                show: false
                            },
                            data: this.m1Data
                        },
                        {
                            name: '来源',
                            type: 'pie',
                            radius: ['40%', '55%'],
                            label: {
                                formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                                backgroundColor: '#eee',
                                borderColor: '#aaa',
                                borderWidth: 1,
                                borderRadius: 4,
                                // shadowBlur:3,
                                // shadowOffsetX: 2,
                                // shadowOffsetY: 2,
                                // shadowColor: '#999',
                                // padding: [0, 7],
                                rich: {
                                    a: {
                                        color: '#999',
                                        lineHeight: 22,
                                        align: 'center'
                                    },
                                    hr: {
                                        borderColor: '#aaa',
                                        width: '100%',
                                        borderWidth: 0.5,
                                        height: 0
                                    },
                                    b: {
                                        fontSize: 16,
                                        lineHeight: 33
                                    },
                                    per: {
                                        color: '#eee',
                                        backgroundColor: '#334455',
                                        padding: [2, 4],
                                        borderRadius: 2
                                    }
                                }
                            },
                            data: this.changeData
                        }
                    ]
            })
        },
        globemap(){
            var map = this.btmMap.getMap()
            map.centerAndZoom(new BMap.Point(116.844088, 31.292848),11); 
        },
        drawmap(inmap){
            var map = inmap.getMap()
            var overlays = [];
            let that = this
            var overlaycomplete = function(e){
                overlays.push(e.overlay);
                that.mapoverlays = overlays
            };
            var styleOptions = {
                strokeColor:"blue",    //边线颜色。

                strokeWeight: 3,       //边线的宽度，以像素为单位。
                strokeOpacity: 0.5,	   //边线透明度，取值范围0 - 1。
                fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
                strokeStyle: 'solid' //边线的样式，solid或dashed。
            }
            //实例化鼠标绘制工具
            var drawingManager = new BMapLib.DrawingManager(map, {
                isOpen: false, //是否开启绘制模式
                enableDrawingTool: true, //是否显示工具栏
                drawingToolOptions: {
                    anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
                    offset: new BMap.Size(5, 5), //偏离值
                    drawingModes:[BMAP_DRAWING_CIRCLE,BMAP_DRAWING_RECTANGLE,BMAP_DRAWING_POLYGON]
                },
                circleOptions: styleOptions, //圆的样式
                polylineOptions: styleOptions, //线的样式
                polygonOptions: styleOptions, //多边形的样式
                rectangleOptions: styleOptions //矩形的样式
            });  
            //添加鼠标绘制工具监听事件，用于获取绘制结果
            drawingManager.addEventListener('overlaycomplete', overlaycomplete);
        },
        clearAll(){
            console.log(this.changeData,'数据')
            if(this.mapoverlays.length != 0){
                this.fistseacrh = true
                this.cardshow = false
                this.m1Data = []
                this.m2Data = []
                this.m3Data = []
                this.m4Data = []
                this.changeData = []
                this.selectData = []
                this.mapoverlays = []
                var map = this.btmMap.getMap()
                for(var i = 0; i < this.mapoverlays.length; i++){
                    map.removeOverlay(this.mapoverlays[i]);
                } 
                var allOverlay = map.getOverlays();
                let len = allOverlay.length
                if(allOverlay[len-1].emitEvent == false){
                    for (var i = 0; i < len - 1; i++){
                        console.log(allOverlay,'图层')
                        map.removeOverlay(allOverlay[i])
                    }
                }else{
                    for (var i = 0; i < len - 2; i++){
                        console.log(allOverlay,'图层')
                        map.removeOverlay(allOverlay[i])
                    }
                }

                map.closeInfoWindow(this.mapinfoWindow,this.mappoint);
                this.drawmap(this.btmMap)
            }
            
            
        },
        judge(){
            if(this.fistseacrh){
                this.m1Data = []
                this.m2Data = []
                this.m3Data = []
                this.m4Data = []
                this.changeData = []
                this.selectData = []
                if(this.mapoverlays.length > 0){
                    this.judgeNum = 0
                    let len = this.familyPointData.length
                    let that = this
                    let map = this.btmMap.getMap()
                    //添加点
                    function addMarker(count){
                        let point = new BMap.Point(count.parpat[0],count.parpat[1]);
                        let marker = new BMap.Marker(point);
                        let opts
                        let content
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
                        let infoWindow = new BMap.InfoWindow(content, opts);  // 创建信息窗口对象
                        marker.addEventListener("click", function(){ 
                            that.mapinfoWindow = infoWindow
                            that.mappoint = point
                            map.openInfoWindow(infoWindow,point); //开启信息窗口
                        });
                        map.addOverlay(marker);
                    }
                    for (let i = 0; i < len; i ++) {
                        let point = new BMap.Point(this.familyPointData[i].parpat[0],this.familyPointData[i].parpat[1]);
                        let polygon2 = this.mapoverlays[0]
                        if(BMapLib.GeoUtils.isPointInPolygon(point,polygon2)){
                            let count = this.familyPointData[i]
                            let selectfim = count
                            selectfim.local =  selectfim.local.split("-")[0]
                            this.selectData.push(selectfim)
                            this.judgeNum ++
                            addMarker(count);
                        } 
                    }
                    let sellen = this.selectData.length
                    console.log(this.selectData,'添加数据')
                    //数据去重 1
                        let m1name = []
                        for(let i = 0;i < sellen;i++){
                            let m1kind =  this.selectData[i].kind
                            m1name.push(m1kind)
                        }
                        function unique(arr){
                            var newArr = [];
                            for(var i = 0; i < arr.length; i++){
                                if(newArr.indexOf(arr[i]) == -1){
                                    newArr.push(arr[i])
                                }
                            }
                            return newArr;
                        }       
                        var newArr = unique(m1name);

                        let newLen = newArr.length
                        
                        for(let i = 0;i < newLen;i++){
                            let m1kind =  newArr[i]
                            
                            let newNum = 0
                            for(let i = 0;i < sellen;i++){
                                if(m1kind == this.selectData[i].kind){
                                    newNum ++
                                }
                            }
                            let m1 = {
                                name:m1kind,
                                value:newNum
                            }
                            this.m1Data.push(m1)
                        }
                    //数据去重 2
                    let m1local = []
                    for(let i = 0;i < sellen;i++){
                        let m1kind =  this.selectData[i].local
                        m1local.push(m1kind)
                    }
                    function unique1(arr){
                        var newArr = [];
                        for(var i = 0; i < arr.length; i++){
                            if(newArr.indexOf(arr[i]) == -1){
                                newArr.push(arr[i])
                            }
                        }
                        return newArr;
                    }       
                    var newArr1 = unique1(m1local);

                    let newLen1 = newArr1.length
                    
                    for(let i = 0;i < newLen1;i++){
                        let m1kind =  newArr1[i]
                        
                        let newNum = 0
                        for(let i = 0;i < sellen;i++){
                            if(m1kind == this.selectData[i].local){
                                newNum ++
                            }
                        }
                        let m1 = {
                            name:m1kind,
                            value:newNum
                        }
                        this.m2Data.push(m1)
                    }
                    


                    console.log(this.selectData,'sj')




                    //数据去重 3
                    let m1cause = []
                    for(let i = 0;i < sellen;i++){
                        let m1kind =  this.selectData[i].cause
                        m1cause.push(m1kind)
                    }

                    function unique2(arr){
                        var newArr = [];
                        for(var i = 0; i < arr.length; i++){
                            if(newArr.indexOf(arr[i]) == -1){
                                newArr.push(arr[i])
                            }
                        }
                        return newArr;
                    }       
                    var newArr2 = unique2(m1cause);

                    let newLen2 = newArr2.length
                    
                    for(let i = 0;i < newLen2;i++){
                        let m1kind =  newArr2[i]
                        
                        let newNum = 0
                        for(let i = 0;i < sellen;i++){
                            if(m1kind == this.selectData[i].cause){
                                newNum ++
                            }
                        }
                        let m1 = {
                            name:m1kind,
                            value:newNum
                        }
                        this.m3Data.push(m1)
                    }



                    //数据去重 4
                    let m1income = []
                    for(let i = 0;i < sellen;i++){
                        let m1kind =  this.selectData[i].income
                        m1income.push(m1kind)
                    }
                    console.log(m1income,'qian')
                    let incomelen = m1income.length
                    let in1 = 0
                    let in2 = 0
                    let in3 = 0
                    let in4 = 0
                    for(let i = 0;i < incomelen;i++){
                        const x = m1income[i];
                        if(x < 5000){
                            in1 ++
                        }else if(4999 < x && x <6000){
                            in2 ++
                        }else if(5999 < x && x <7000){
                            in3 ++
                        }else if(6999 < x ){
                            in4 ++
                        }
                    }
                    if(in1 != 0){
                        this.m4Data.push({value:in1,name:'年收入5000以下'})
                    }
                    if(in2 != 0){
                        this.m4Data.push({value:in2,name:'年收入5000~6000'})
                    }
                    if(in3 != 0){
                        this.m4Data.push({value:in3,name:'年收入6000~7000'})
                    }
                    if(in4 != 0){
                        this.m4Data.push({value:in4,name:'年收入7000以上'})
                    }
                    this.changeData = this.m2Data
                    this.mapechart()
                    this.cardshow = true
                    this.fistseacrh = false
                }else{
                    this.$message({
                        showClose: true,
                        message: '请先绘制',
                        type: 'error'
                    });
                }
            }else{
                this.cardshow = true
            }

        }
    },
    watch: {
        mapoverlays(value){
            if(value.length > 1){
                this.$message({
                    showClose: true,
                    message: '请先查询当前绘制或者重置当前绘制',
                    type: 'error'
                });
                var map = this.btmMap.getMap()
                map.removeOverlay(this.mapoverlays[1]);
                this.mapoverlays.splice(1,1)
                console.log(this.mapoverlays,'绘制')
            }
        }
    }
}
</script>

<style >
.pagesearch2 .d2-container-full-bs__body-wrapper-inner{
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
.buttondraw{
    position: absolute;
    right: 60px;
    z-index: 10;
    top: 80px;
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: center;

    z-index: 7;
    color: white;
}
.bts1{
    position: absolute;
    top: 115px;
    left: 128px;
}
.bts2{
    position: absolute;
    top: 245px;
    left: 115px;
}
.bts3{
    position: absolute;
    top: 180px;
    left: 128px;
}
.buttons .btn {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Raleway", sans-serif;
  font-weight: 300;
  padding: 1rem 2rem;
  margin: 0 1rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.buttons .btn:nth-child(1) {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #8d99ae;
  padding: 1rem 2rem 1rem 3rem;
}
 .buttons .btn:nth-child(1) .circle {
  background-color: #8d99ae;
  height: 1rem;
  width: 1rem;
  border-radius: 100%;
  margin-right: 1rem;
  position: absolute;
  left: 1rem;
  z-index: -1;
  transition: 0.25s;
}
.buttons .btn:nth-child(1) .text {
  position: relative;
  left: 0;
  transition: 0.5s;
}
.buttons .btn:nth-child(1):hover {
  color: white;
}
 .buttons .btn:nth-child(1):hover .circle {
  -webkit-transform: scale(25);
          transform: scale(25);
}
.buttons .btn:nth-child(1):hover .text {
  left: -0.5rem;
}

@-webkit-keyframes wow {
  to {
    height: 20rem;
    width: 20rem;
  }
}

@keyframes wow {
  to {
    height: 20rem;
    width: 20rem;
  }
}
@-webkit-keyframes noway {
  to {
    height: 1rem;
    width: 1rem;
  }
}
@keyframes noway {
  to {
    height: 1rem;
    width: 1rem;
  }
}
</style>