<template>
  <d2-container type="full" class="page">
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
            <div id="allmap" style="width:830px;height:600px"> </div>
          </template>

          <template v-if="item.i === '1'">
            <el-tag size="mini" type="info" slot="header" style="font-size: 10px;background-color: white;border-color: white;color: black;">{{item.i | itemId}}</el-tag>
          </template>
          <template v-if="item.i === '2'">
            <el-tag size="mini" type="info" slot="header" style="font-size: 10px;background-color: white;border-color: white;color: black;">{{item.i | itemId}}</el-tag>
          </template>
          <template v-if="item.i === '3'">
            <el-tag size="mini" type="info" slot="header" style="font-size: 10px;background-color: white;border-color: white;color: black;">{{item.i | itemId}}</el-tag>
          </template>
          <template v-if="item.i === '4'">
            <el-tag size="mini" type="info" slot="header" style="font-size: 10px;background-color: white;border-color: white;color: black;">{{item.i | itemId}}</el-tag>
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
import JsonMap from './jsonMap'
import Vue from 'vue'
import { GridLayout, GridItem } from 'vue-grid-layout'
Vue.component('d2-grid-layout', GridLayout)
Vue.component('d2-grid-item', GridItem)
export default {
  data () {
    return {
      layout: {
        layout: [
          { x: 0, y: 0, w: 8, h: 15, i: '0' },
          {x: 8, y: 0, w: 4, h: 5, i: '1'},
          {x: 8, y: 5, w: 4, h: 5, i: '2'},
          {x: 8, y: 10, w: 2, h: 5, i: '3'},
          {x: 10, y: 10, w: 2, h: 5, i: '4'},
        ],
        colNum: 12,
        rowHeight: 31,
        isDraggable: false,//拖拽
        isResizable: false,//大小
        isMirrored: false,//控制下标
        verticalCompact: true,//是否使用verticalCompact布局
        margin: [10, 10],
        useCssTransforms: true
      }
    }
  },
  components:{
    JsonMap
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
        axios.get('http://49.234.228.14:3000/').then((res)=>{
        console.log(res.data)
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
             color: "rgba(0, 0, 0, 1)"
           }
         },
         selected: {
           backgroundColor: "rgba(184,0,0,1)",
           borderColor: "rgba(255,255,255,1)",
           label: {
             color: "rgba(255,255,255,1)"
           }
         },
         colors: [
           "rgba(0,133,235,0.40)",
           "rgba(0,184,255,0.40)",
           "rgba(72,246,217,0.40)",
           "rgba(252,196,95,0.40)",
           "rgba(255,132,84,0.40)"
         ]
       }
     });
     inmap.add(overlay);
     overlay.setData(data);
    
        console.log(data,typeof(data),'???')
      })
    

  },
  methods: {
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