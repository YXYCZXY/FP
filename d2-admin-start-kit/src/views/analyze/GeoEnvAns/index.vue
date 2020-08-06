<template>
    <div class="pagesearch5" style="width:100%;height: 100%;">
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
            <div id="myChart1" style="width:100.1%;height: 100.1%;">
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
      mapurl:'http://114.98.239.36:6080/arcgis/rest/services/FP/%E6%80%BB%E4%BA%BA%E5%8F%A3/MapServer?f=jsapi',
     options: [{
          value: '1',
          label: '县域人口分析'
        }, {
          value: '2',
          label: '县域贫困人口分析'
        }, {
          value: '3',
          label: '县域贫率分析'
        }, {
          value: '4',
          label: '县域海拔分析'
        }, {
          value: '5',
          label: '县域坡度分析'
        }],
        sevalue: '县域人口分析'
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
          container: 'myChart1',
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

        var template
        switch (maoNum) {
          case 1:
          template = {
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
                    fieldName: "povertynum",
                    label: "贫困率"
                  }
                ]
              }
            ]
          
          }
            break;
          case 2:
          template = {
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
                    fieldName: "povertypeo",
                    label: "贫困人口"
                  },
                  {
                    fieldName: "people",
                    label: "总人口"
                  },
                  {
                    fieldName: "povertynum",
                    label: "贫困率"
                  }
                ]
              }
            ]
          
          }
            break;
          case 3:
          template = {
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
                  },
                  {
                    fieldName: "povertynum",
                    label: "贫困率"
                  }
                ]
              }
            ]
          
          }
            break;
          case 4:
          template = {
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
                    fieldName: "elevatio_1",
                    label: "海拔高度"
                  },
                  {
                    fieldName: "people",
                    label: "总人口"
                  },
                  {
                    fieldName: "povertynum",
                    label: "贫困率"
                  }
                ]
              }
            ]
          
          }
            break;
          case 5:
          template = {
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
                    fieldName: "slope",
                    label: "坡度"
                  },
                  {
                    fieldName: "people",
                    label: "总人口"
                  },
                  {
                    fieldName: "povertynum",
                    label: "贫困率"
                  }
                ]
              }
            ]
          
          } 
            break;
        
          default:
            break;
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
        

      })
    }
  },
  watch: {
    sevalue(value){
      switch (value) {
        case '1':
          this.maoNum = 1
          this.mapurl='http://114.98.239.36:6080/arcgis/rest/services/FP/%E6%80%BB%E4%BA%BA%E5%8F%A3/MapServer?f=jsapi'
          this.addmap(this.mapurl,this.maoNum)
          break;
        case '2':
          this.maoNum = 2
          this.mapurl='http://114.98.239.36:6080/arcgis/rest/services/FP/%E8%B4%AB%E5%9B%B0%E4%BA%BA%E5%8F%A3/MapServer?f=jsapi'
          this.addmap(this.mapurl,this.maoNum)
          break;
        case '3':
          this.maoNum = 3
          this.mapurl='http://114.98.239.36:6080/arcgis/rest/services/FP/%E8%B4%AB%E5%9B%B0%E5%8F%91%E7%94%9F%E7%8E%87/MapServer?f=jsapi'
          this.addmap(this.mapurl,this.maoNum)
          break;
        case '4':
          this.maoNum = 4
          this.mapurl='http://114.98.239.36:6080/arcgis/rest/services/FP/%E6%B5%B7%E6%8B%94/MapServer?f=jsapi'
          this.addmap(this.mapurl,this.maoNum)
          break;
        case '5':
          this.maoNum = 5
          this.mapurl='http://114.98.239.36:6080/arcgis/rest/services/FP/%E5%9D%A1%E5%BA%A6/MapServer?f=jsapi'
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
.pagesearch5 .d2-container-full-bs__body-wrapper-inner{
      padding: 0px !important;
      width:100%;height: 100%;
    }
</style>
