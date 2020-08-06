<template>
    <div class="pagesearch4" style="width:100%;height: 100%;">
        <d2-container better-scroll>
            <el-tooltip class="item"  effect="dark" content="全图显示地图" placement="top-start">
            <div  @click="globemap()" style="position: absolute;left: 290px;z-index: 100;top: 33px;font-size: 25px;cursor: pointer;">
                <d2-icon style="color: burlywood" name="globe"/>
            </div>
            </el-tooltip>
            <el-select v-model="sevalue" placeholder="请选择" style="position: absolute;top: 27px;left: 60px;z-index: 10;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <div id="myChart" style="width:100.1%;height: 100.1%;">
            </div>
        </d2-container>
      
    </div>
</template>

<script>
import {loadModules} from "esri-loader";

import axios from 'axios'
export default {
  data () {
    return {
      myVar:'',
      mapLod:false,
      lowmap:'',
      mapurl:'http://114.98.239.36:6080/arcgis/rest/services/FP/%E7%BB%BC%E5%90%88%E5%8A%A0%E6%9D%83%E5%88%86%E6%9E%90/MapServer?f=jsapi',
      options: [{
          value: '1',
          label: '综合加权分析'
        }, {
          value: '2',
          label: '道路综合加权分析'
        }, {
          value: '3',
          label: '高速公路加权分析'
        }, {
          value: '4',
          label: '省道加权加权分析'
        }, {
          value: '5',
          label: '水系加权分析'
        }, {
          value: '6',
          label: '海拔加权分析'
        }],
        sevalue: '综合加权分析'
    }
  },
  mounted () {
    this.addmap(this.mapurl)
    this.$message({
      showClose: true,
      message: '首次加载 地图显示较慢 长时间不显示请刷新',
      duration:5000
    });
  },
  methods: {
    globemap(){
      this.lowmap.goTo({
        position: {
          latitude: 31.271414543456387,
          longitude: 116.8301719367853,
          z: 208386.52202822175
        },
        tilt: 0, // looking from a bird's eye view
        heading: 0
      })
    },
    addmap(mapurl){
      const _self = this; //定义一个_self防止后续操作中this丢失
      const option = {
        //定义一个包含有JS API中js开发包和css样式文件的对象
        url: "http://js.arcgis.com/4.15/dojo/dojo.js",
        css: "https://js.arcgis.com/4.15/esri/themes/light/main.css"
      };
      //通过loadModules来做衔接
      loadModules(
              [
                "esri/Map",
                "esri/Basemap",
                "esri/layers/TileLayer",
                "esri/layers/FeatureLayer",
                "esri/views/SceneView",
                "esri/Camera",
                "esri/widgets/Legend"
              ],
              option
      ).then(([Map, Basemap, TileLayer, FeatureLayer, SceneView, Camera,Legend]) => {
        const layer = new TileLayer({
          url: "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity_Mobile/MapServer?f=jsapi"
        });
        const customBasemap = new Basemap({
          baseLayers: [layer],
          title: "Custom Basemap",
          id: "myBasemap"
        });
        const map = new Map({
          basemap: customBasemap
        });

        var view = new SceneView({
          container: 'myChart',
          map: map,
          camera: {
            position: {
              latitude: 31.271414543456387,
              longitude: 116.8301719367853,
              z: 208386.52202822175
            },
            tilt: 0, // looking from a bird's eye view
            heading: 0
          }
        });

        var template = {
          title: "{name}",
          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "OBJECTID",
                  label: "ID"
                },
                {
                  fieldName: "Observed",
                  label: "贫困发生率"
                },
                {
                  fieldName: "StdResid",
                  label: "加权值"
                }
              ]
            }
          ]
         
        }

        this.lowmap = view
        const Cluster = new FeatureLayer({
          url:mapurl,
          popupTemplate: template
        });
        
        
        map.add(Cluster)
        var legend = new Legend({
          view: view,
          layerInfos: [{
            layer: Cluster,
            title: "Legend"
          }]
        });

        view.ui.add(legend, "bottom-right");

        view.watch("camera", update);
        function update(camera) {
          var tilt = camera.tilt;
          var heading = camera.heading;
          var position = camera.position;
          console.log(position.latitude);
          console.log(position.longitude);
          console.log(position.z);
          console.log(tilt);
          console.log(heading);
        }
        this.myVar =  setInterval(() => {
            this.mapLod = Cluster.loaded
        }, 1000);
        

      })
    }
  },
  watch: {
    sevalue(value){
      switch (value) {
        case '1':
          this.mapurl='http://114.98.239.36:6080/arcgis/rest/services/FP/%E7%BB%BC%E5%90%88%E5%8A%A0%E6%9D%83%E5%88%86%E6%9E%90/MapServer?f=jsapi'
          this.addmap(this.mapurl)
          break;
        case '2':
          this.mapurl='http://114.98.239.36:6080/arcgis/rest/services/FP/%E9%81%93%E8%B7%AF%E7%BB%BC%E5%90%88%E5%8A%A0%E6%9D%83%E5%88%86%E6%9E%90/MapServer?f=jsapi'
          this.addmap(this.mapurl)
          break;
        case '3':
          this.mapurl='http://114.98.239.36:6080/arcgis/rest/services/FP/%E9%AB%98%E9%80%9F%E5%85%AC%E8%B7%AF/MapServer?f=jsapi'
          this.addmap(this.mapurl)
          break;
        case '4':
          this.mapurl='http://114.98.239.36:6080/arcgis/rest/services/FP/%E7%9C%81%E9%81%93%E5%8A%A0%E6%9D%83/MapServer?f=jsapi'
          this.addmap(this.mapurl)
          break;
        case '5':
          this.mapurl='http://114.98.239.36:6080/arcgis/rest/services/FP/%E6%B2%B3%E6%B5%81%E5%8A%A0%E6%9D%83/MapServer?f=jsapi'
          this.addmap(this.mapurl)
          break;
        case '6':
          this.mapurl='http://114.98.239.36:6080/arcgis/rest/services/FP/%E5%9D%A1%E5%BA%A6%E5%8A%A0%E6%9D%83/MapServer?f=jsapi'
          this.addmap(this.mapurl)
          break;
      
        default:
          break;
      }
    },
    mapLod(value){
      console.log(value,'???')
      if(value){
        clearInterval(this.myVar)
          this.$notify({
            title: '说明',
            message: '加权值越高说明贫困率受其影响越大！',
            duration: 4000,
            offset: 100
          });
          this.mapLod = false
      }
    }
  }
}
</script>

<style >
.pagesearch4 .d2-container-full-bs__body-wrapper-inner{
      padding: 0px !important;
      width:100%;height: 100%;
    }
</style>
