<template>
  <d2-container type="full" class="page" better-scroll>
    <d2-grid-layout
      v-bind="layout"
      @layout-updated="layoutUpdatedHandler">
      <d2-grid-item
        v-for="(item, index) in layout.layout"
        :key="index"
        v-bind="item"
        @resize="resizeHandler"
        @move="moveHandler"
        @resized="resizedHandler"
        @moved="movedHandler">
        <el-card shadow="never" class="page_card" >
          
          <template v-if="item.i === '0'">
            <h1 style="position: relative;margin: 0px;font-size: 20px;    text-align: center;top: -8px;">舒城县贫困率地图展示</h1>
              <el-tooltip class="item"  effect="dark" content="全图显示地图" placement="top-start">
              <div  @click="globemap()" style="position: absolute;left: 35px;z-index: 100;top: 55px;font-size: 25px;cursor: pointer;">
                  <d2-icon style="color: burlywood" name="globe"/>
              </div>
              </el-tooltip>
            <div id="allmap" style="width:804px;height:600px"> 
            </div>
          </template>

          <template v-if="item.i === '1'">
              <h1 id="Htext1" style="position: relative;margin: 0px;font-size: 20px;text-align: center;">舒城县贫困户占比</h1>
              <ve-pie :data="piechartDataOne"  width="350px" height="320px" style="position: absolute;top: 0;"></ve-pie>
          </template>
          <template v-if="item.i === '2'">
              <h1 id="Htext2" style="position: relative;margin: 0px;font-size: 20px;    top: 30px;text-align: center;">舒城县扶贫措施占比</h1>
               <ve-ring :data="piechartDataTwo" :settings="chartSettings" width="350px" height="320px" style="position: absolute;top: 0;" ></ve-ring>
          </template>
          <template v-if="item.i === '3'">
              <h1 id="Htext3" style="position: relative;margin: 0px;font-size: 20px;">舒城县贫困率走势</h1>
              <ve-line :data="chartDataOne" :legend-visible="false" width="632px" height="318px"></ve-line>
          </template>
          <template v-if="item.i === '4'">
              <h1 style="position: relative;margin: 0px;font-size: 20px;">舒城县城镇贫困率对比</h1>
              <ve-line :data="chartDataTwo"  width="632px" height="318px"></ve-line>
          </template>
        </el-card>
      </d2-grid-item>
    </d2-grid-layout>
  </d2-container>
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
      roseType: 'radius'
    }
    return {
      mainMapData:[],
      seclectMapData:[],
      seclectMapname:'舒城县',
      layout: {
        layout: [
          { x: 0, y: 0, w: 8, h: 16, i: '0' },
          {x: 8, y: 0, w: 4, h: 8, i: '1'},
          {x: 8, y: 8, w: 4, h: 8, i: '2'},
          {x: 0, y: 15, w: 6, h: 8, i: '3'},
          {x: 6, y: 15, w: 6, h: 8, i: '4'},
        ],

        colNum: 12,
        rowHeight: 31,
        isDraggable: false,//拖拽
        isResizable: false,//大小
        isMirrored: false,//控制下标
        verticalCompact: true,//是否使用verticalCompact布局
        margin: [10, 10],
        useCssTransforms: true
      },
      mainmap:'',
      chartDataOne: {
          columns: ['日期', '贫困率'],
          rows: [
            { '日期': '2015', '贫困率': 36 },
            { '日期': '2016', '贫困率': 30 },
            { '日期': '2017', '贫困率': 21 },
            { '日期': '2018', '贫困率': 9 }
          ]
      },
      chartDataTwo: {
          columns: ['日期', '晓天镇', '庐镇乡', '山七镇', '河棚镇', '城关镇'],
          rows: [
            { '日期': '2012',  '晓天镇':0.21, '庐镇乡':0.33, '山七镇':0.24, '河棚镇':0.35, '城关镇':0.25 },
            { '日期': '2013', '晓天镇':0.2, '庐镇乡':0.3, '山七镇':0.21, '河棚镇':0.34, '城关镇':0.24 },
            { '日期': '2014', '晓天镇':0.18, '庐镇乡':0.29, '山七镇':0.2, '河棚镇':0.3, '城关镇':0.21 },
            { '日期': '2015', '晓天镇':0.15, '庐镇乡':0.25, '山七镇':0.17, '河棚镇':0.27, '城关镇':0.19 },
            { '日期': '2016', '晓天镇':0.14, '庐镇乡':0.24, '山七镇':0.15, '河棚镇':0.24, '城关镇':0.15  },
            { '日期': '2017', '晓天镇':0.12, '庐镇乡':0.21, '山七镇':0.13, '河棚镇':0.22, '城关镇':0.11 },
            { '日期': '2018', '晓天镇':0.1, '庐镇乡':0.2, '山七镇':0.11, '河棚镇':0.21, '城关镇':0.09 }
          ]
      },
      piechartDataOne: {
          columns: ['贫困户类型', '数量'],
          rows: [
            { '贫困户类型': '五保户', '数量': 1783 },
            { '贫困户类型': '低保户', '数量': 7546 }
          ]
      },
      piechartDataTwo: {
          columns: ['扶贫措施', '数量'],
          rows: [
            { '扶贫措施': '桥梁建设', '数量': 2141 },
            { '扶贫措施': '电力建设', '数量': 2146 },
            { '扶贫措施': '道路建设', '数量': 2221 },
            { '扶贫措施': '水利设施', '数量': 2315 },
            { '扶贫措施': '居住环境改善', '数量': 2552 },
            { '扶贫措施': '扶贫就业', '数量': 2614 }
          ]
      }
    }
  },
  filters: {
    itemId:(value)=>{
      if(value == '1'){
        return '舒城县贫困率走势'
      }else if(value == '0'){
        return '舒城县贫困率地图'
      }else if(value == '2'){
        return '舒城县城镇贫困率对比'
      }else if(value == '3'){
        return '舒城县扶贫措施占比'
      }else if(value == '4'){
        return '舒城县贫困户占比'
      }
    }
  },
  mounted () {
    let that = this
    axios.get('http://49.234.228.14:3000/mainMap').then((res)=>{
      this.mainMapData = res.data[0].vill
      axios.get('http://49.234.228.14:3000/').then((res)=>{
        var data  = res.data
        var inmap = new inMap.Map({
        id: "allmap",
        skin: "Blueness",
        center: ["116.802747","31.283199"],
        zoom: {
          value: 11,
          show: true,
          max: 22
        }
        });


      var overlay = new inMap.PolygonOverlay({
        tooltip: {
          show: true,
          formatter: "{name}+'~'+{count}"
        },
        legend: {
          show: true,
          title: "舒城县贫困率 "
        },
        style: {
          normal: {
            borderWidth: 1.5,
            label: {
              show: true, // 是否显示
              font: "13px bold ",
              color: "#fff"
            }
          },
          mouseOver: {
            shadowColor: "rgba(0, 0, 0, 1)",
            shadowBlur: 10,
            borderWidth: 1.5,
            label: {
              color: "rgba(0, 0, 0, 1)",
                overflow: "visible",
                font: "25px bold ",
                centerType: "minMax"
            }
          },
            selected: {
              backgroundColor: "rgba(251,132,7,0.15)",
              label: {
                color: "rgba(255,255,255,1)",
                overflow: "visible",
                font: "25px bold ",
                centerType: "minMax"
              }
            },
          colors: [
            "rgba(0,133,235,0.40)",
            "rgba(0,184,255,0.40)",
            "rgba(72,246,217,0.40)",
            "rgba(252,196,95,0.40)",
            "rgba(255,132,84,0.40)"
          ]
        },
          // 获取图层信息
          event: {
            onMouseClick: function (item, event) {
              let len = that.mainMapData.length
              for(let i = 0;i<len;i++){
                if(item[0].name == that.mainMapData[i].name){
                  that.seclectMapname = that.mainMapData[i].name
                  console.log(that.mainMapData[i],'点击')
                  that.seclectMapData = that.mainMapData[i]
                  document.getElementById('Htext1').innerText = that.seclectMapname + "贫困户占比"
                  document.getElementById('Htext2').innerText = that.seclectMapname + "扶贫措施占比"
                  document.getElementById('Htext3').innerText = that.seclectMapname + "贫困率走势"
                }
              }
            }
          }
      });
      inmap.add(overlay);
      overlay.setData(data);
          this.mainmap = inmap
          console.log(data,typeof(data),'???')
      })
    })
    

  },
  methods: {
    globemap(){
      var map = this.mainmap.getMap()
      map.centerAndZoom(new BMap.Point(116.802747,31.283199),11); 
      this.chartDataOne.rows[0].贫困率 = 36
      this.chartDataOne.rows[1].贫困率 = 30
      this.chartDataOne.rows[2].贫困率 = 21
      this.chartDataOne.rows[3].贫困率 = 9
      this.piechartDataOne.rows[0].数量 = 1783
      this.piechartDataOne.rows[1].数量 = 7546
      this.piechartDataTwo.rows[0].数量 = 2141
      this.piechartDataTwo.rows[1].数量 = 2146
      this.piechartDataTwo.rows[2].数量 = 2221
      this.piechartDataTwo.rows[3].数量 = 2315
      this.piechartDataTwo.rows[4].数量 = 2552
      this.piechartDataTwo.rows[5].数量 = 2614
      document.getElementById('Htext1').innerText = "舒城县贫困户占比"
      document.getElementById('Htext2').innerText = "舒城县扶贫措施占比"
      document.getElementById('Htext3').innerText = "舒城县贫困率走势"
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
    seclectMapData(value){
      this.chartDataOne.rows[0].贫困率 = value[2015]
      this.chartDataOne.rows[1].贫困率 = value[2016]
      this.chartDataOne.rows[2].贫困率 = value[2017]
      this.chartDataOne.rows[3].贫困率 = value[2018]
      this.piechartDataOne.rows[0].数量 = value.five
      this.piechartDataOne.rows[1].数量 = value.low
      this.piechartDataTwo.rows[0].数量 = value.measure1
      this.piechartDataTwo.rows[1].数量 = value.measure2
      this.piechartDataTwo.rows[2].数量 = value.measure3
      this.piechartDataTwo.rows[3].数量 = value.measure4
      this.piechartDataTwo.rows[4].数量 = value.measure5
      this.piechartDataTwo.rows[5].数量 = value.measure6
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  .vue-grid-layout {
    background-color: $color-bg;
    border-radius: 4px;
    margin: -10px;
    .page_card {
      height: 100%;
      @extend %unable-select;
    }
    .vue-resizable-handle {
      opacity: .3;
      &:hover{
        opacity: 1;
      }
    }
  }
}
</style>