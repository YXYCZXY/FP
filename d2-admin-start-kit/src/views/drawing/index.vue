<template>
    <div class="pagesearch8" style="width:100%;height: 100%;">
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
            <div id="myChart3" style="width:100.1%;height: 100.1%;">
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
      lowmap:'',
      maoNum:1,
      mapurl:'http://114.98.239.36:6080/arcgis/rest/services/FP/%E9%81%93%E8%B7%AF%E5%BB%BA%E8%AE%BE/MapServer?f=jsapi',
     options: [{
          value: '1',
          label: '道路建设扶贫'
        }, {
          value: '2',
          label: '电力建设扶贫'
        }, {
          value: '3',
          label: '桥梁建设扶贫'
        }, {
          value: '4',
          label: '扶贫就业措施'
        }, {
          value: '5',
          label: '水利建设扶贫'
        }, {
          value: '6',
          label: '贫困人口分布'
        }],
        sevalue: '道路建设扶贫'
    }
  },
  mounted () {
    this.addmap(this.mapurl,this.maoNum)
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
    addmap(mapurl,maoNum){
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
          container: 'myChart3',
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



        // const Cluster
        switch (maoNum) {
          case 1:
          var template1 = {
            title: "{name}",
            content: [
              {
                type: "fields",
                fieldInfos: [
                  {
                    fieldName: "OBJECTID",
                    label: "ID"
                  },{
                    fieldName: "people",
                    label: "总人口"
                  },{
                    fieldName: "DLJS1",
                    label: "道路建设数"
                  },
                ]
              }
            ]
          }
          var Cluster = new FeatureLayer({
          url:mapurl,
            popupTemplate: template1
          });
          
          
          map.add(Cluster)

            break;
          case 2:
          var template1 = {
            title: "{name}",
            content: [
              {
                type: "fields",
                fieldInfos: [
                  {
                    fieldName: "OBJECTID",
                    label: "ID"
                  },{
                    fieldName: "people",
                    label: "总人口"
                  },{
                    fieldName: "DLJS",
                    label: "电力建设数"
                  },
                ]
              }
            ]
          }
          var Cluster = new FeatureLayer({
          url:mapurl,
            popupTemplate: template1
          });
          
          
          map.add(Cluster)
            break;
          case 3:
          var template1 = {
            title: "{name}",
            content: [
              {
                type: "fields",
                fieldInfos: [
                  {
                    fieldName: "OBJECTID",
                    label: "ID"
                  },{
                    fieldName: "people",
                    label: "总人口"
                  },{
                    fieldName: "QLJS",
                    label: "桥梁建设数"
                  },
                ]
              }
            ]
          }
          var Cluster = new FeatureLayer({
          url:mapurl,
            popupTemplate: template1
          });
          
          
          map.add(Cluster)
            break;
          case 4:
          var template1 = {
            title: "{name}",
            content: [
              {
                type: "fields",
                fieldInfos: [
                  {
                    fieldName: "OBJECTID",
                    label: "ID"
                  },{
                    fieldName: "people",
                    label: "总人口"
                  },{
                    fieldName: "FPJY",
                    label: "扶贫就业数"
                  },
                ]
              }
            ]
          }
          var Cluster = new FeatureLayer({
          url:mapurl,
            popupTemplate: template1
          });
          
          map.add(Cluster)
            break;
          case 5:
          var template1 = {
            title: "{name}",
            content: [
              {
                type: "fields",
                fieldInfos: [
                  {
                    fieldName: "OBJECTID",
                    label: "ID"
                  },{
                    fieldName: "people",
                    label: "总人口"
                  },{
                    fieldName: "SLJS",
                    label: "水利建设数"
                  },
                ]
              }
            ]
          }
          var Cluster = new FeatureLayer({
          url:mapurl,
            popupTemplate: template1
          });
          map.add(Cluster)
            break;
          case 6:
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
                    fieldName: "people",
                    label: "总人口"
                  },
                  {
                    fieldName: "povertypeo",
                    label: "贫困人口"
                  },{
                    fieldName: "povertynum",
                    label: "贫困率"
                  }, 
                ]
              }
            ]
          
        }
          var Cluster = new FeatureLayer({
            url:mapurl,
            popupTemplate: template
          });
          
          
          map.add(Cluster)
            break;
        
          default:
            break;
        }

        var legend = new Legend({
            view: view,
            layerInfos: [{
              layer: Cluster,
              title: "Legend"
            }]
          });

          view.ui.add(legend, "bottom-right");

        this.lowmap = view


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
        

      })
    }
  },
  watch: {
    sevalue(value){
      switch (value) {
        case '1':
          this.maoNum = 1
          this.mapurl='http://114.98.239.36:6080/arcgis/rest/services/FP/%E9%81%93%E8%B7%AF%E5%BB%BA%E8%AE%BE/MapServer?f=jsapi'
          this.addmap(this.mapurl,this.maoNum)
          break;
        case '2':
          this.maoNum = 2
          this.mapurl='http://114.98.239.36:6080/arcgis/rest/services/FP/%E7%94%B5%E5%8A%9B%E5%BB%BA%E8%AE%BE/MapServer?f=jsapi'
          this.addmap(this.mapurl,this.maoNum)
          break;
        case '3':
          this.maoNum = 3
          this.mapurl='http://114.98.239.36:6080/arcgis/rest/services/FP2/%E6%A1%A5%E6%A2%81%E5%BB%BA%E8%AE%BE/MapServer?f=jsapi'
          this.addmap(this.mapurl,this.maoNum)
          break;
        case '4':
          this.maoNum = 4
          this.mapurl='http://114.98.239.36:6080/arcgis/rest/services/FP2/%E6%89%B6%E8%B4%AB%E5%B0%B1%E4%B8%9A/MapServer?f=jsapi'
          this.addmap(this.mapurl,this.maoNum)
          break;
        case '5':
          this.maoNum = 5
          this.mapurl='http://114.98.239.36:6080/arcgis/rest/services/FP2/%E6%B0%B4%E5%88%A9%E5%BB%BA%E8%AE%BE/MapServer?f=jsapi'
          this.addmap(this.mapurl,this.maoNum)
          break;
        case '6':
          this.maoNum = 6
          this.mapurl='http://114.98.239.36:6080/arcgis/rest/services/FP/%E8%B4%AB%E5%9B%B0%E4%BA%BA%E5%8F%A3/MapServer?f=jsapi'
          this.addmap(this.mapurl,this.maoNum)
          break;
      
        default:
          break;
      }
    },
  }
}
</script>

<style >
.pagesearch8 .d2-container-full-bs__body-wrapper-inner{
      padding: 0px !important;
      width:100%;height: 100%;
    }
</style>
