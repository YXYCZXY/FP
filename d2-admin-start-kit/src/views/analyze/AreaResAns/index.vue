<template>
    <div class="pagesearch7" style="width:100%;height: 100%;">
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
            <div id="myChart2" style="width:100.1%;height: 100.1%;">
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
      mapurl:'http://114.98.239.36:6080/arcgis/rest/services/FP/%E6%80%BB%E8%80%95%E5%9C%B0/MapServer?f=jsapi',
     options: [{
          value: '1',
          label: '总耕地资源分析'
        }, {
          value: '2',
          label: '人均耕地分析'
        }, {
          value: '3',
          label: '水资源分析'
        }, {
          value: '4',
          label: '公园及活动中心分析'
        }, {
          value: '5',
          label: '教育资源分析'
        }, {
          value: '6',
          label: '医疗资源分析'
        }],
        sevalue: '总耕地资源分析'
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
          container: 'myChart2',
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
        var template1 = {
            title: "{CNName}",
            content: [
              {
                type: "fields",
                fieldInfos: [
                  {
                    fieldName: "OBJECTID",
                    label: "ID"
                  },
                  {
                    fieldName: "CNDescribe",
                    label: "详细位置"
                  }
                ]
              }
            ]
        }
        var template2 = {
            title: "{Name}",
            content: [
              {
                type: "fields",
                fieldInfos: [
                  {
                    fieldName: "OBJECTID",
                    label: "ID"
                  },
                  {
                    fieldName: "x",
                    label: "经度"
                  },
                  {
                    fieldName: "y",
                    label: "纬度"
                  }
                ]
              }
            ]
        }
        // const Cluster
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
                    fieldName: "plough",
                    label: "总耕地面积"
                  }
                ]
              }
            ]
          
          }
          var Cluster = new FeatureLayer({
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
                    fieldName: "people",
                    label: "总人口"
                  },
                  {
                    fieldName: "per_plough",
                    label: "人均耕地"
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
          var legend = new Legend({
            view: view,
            layerInfos: [{
              layer: Cluster,
              title: "Legend"
            }]
          });

          view.ui.add(legend, "bottom-right");
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
                  },{
                    fieldName: "Shape_Leng",
                    label: "长度"
                  }, 
                ]
              }
            ]
          
          }

          var Cluster1 = new FeatureLayer({
            url:mapurl+'/2',
            popupTemplate: template
          });
              
              
          map.add(Cluster1)

          var Cluster2 = new FeatureLayer({
            url:mapurl+'/1',
            popupTemplate: template1
          });
          
          
          map.add(Cluster2)

          var Cluster3 = new FeatureLayer({
            url:mapurl+'/0',
            popupTemplate: template
          });
          
          
          map.add(Cluster3)
          
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
                    fieldName: "name ",
                    label: "名称"
                  }
                ]
              }
            ]
          
          }
          var Cluster1 = new FeatureLayer({
            url:mapurl+'/2',
            popupTemplate: template1
          });
              
              
          map.add(Cluster1)

          var Cluster2 = new FeatureLayer({
            url:mapurl+'/1',
            popupTemplate: template2
          });
          
          
          map.add(Cluster2)

          var Cluster3 = new FeatureLayer({
            url:mapurl+'/0',
            popupTemplate: template2
          });
          
          
          map.add(Cluster3)
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
                    fieldName: "name ",
                    label: "名称"
                  }
                ]
              }
            ]
          
          }
          var Cluster2 = new FeatureLayer({
            url:mapurl+'/1',
            popupTemplate: template1
          });
          
          
          map.add(Cluster2)

          var Cluster3 = new FeatureLayer({
            url:mapurl+'/0',
            popupTemplate: template2
          });
          
          
          map.add(Cluster3) 
            break;
          case 6:
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
                    fieldName: "name ",
                    label: "名称"
                  }
                ]
              }
            ]
          
          }
          var Cluster1 = new FeatureLayer({
            url:mapurl+'/2',
            popupTemplate: template1
          });
              
              
          map.add(Cluster1)

          var Cluster2 = new FeatureLayer({
            url:mapurl+'/1',
            popupTemplate: template2
          });
          
          
          map.add(Cluster2)

          var Cluster3 = new FeatureLayer({
            url:mapurl+'/0',
            popupTemplate: template2
          });
          
          
          map.add(Cluster3) 
            break;
        
          default:
            break;
        }

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
          this.mapurl='http://114.98.239.36:6080/arcgis/rest/services/FP/%E6%80%BB%E8%80%95%E5%9C%B0/MapServer'
          this.addmap(this.mapurl,this.maoNum)
          break;
        case '2':
          this.maoNum = 2
          this.mapurl='http://114.98.239.36:6080/arcgis/rest/services/FP/%E4%BA%BA%E5%9D%87%E8%80%95%E5%9C%B0/MapServer'
          this.addmap(this.mapurl,this.maoNum)
          break;
        case '3':
          this.maoNum = 3
          this.mapurl='http://114.98.239.36:6080/arcgis/rest/services/FP/%E6%B0%B4%E7%B3%BB%E8%B5%84%E6%BA%90/MapServer'
          this.addmap(this.mapurl,this.maoNum)
          break;
        case '4':
          this.maoNum = 4
          this.mapurl='http://114.98.239.36:6080/arcgis/rest/services/FP/%E5%85%AC%E5%9B%AD%E5%8F%8A%E6%B4%BB%E5%8A%A8%E4%B8%AD%E5%BF%83/MapServer'
          this.addmap(this.mapurl,this.maoNum)
          break;
        case '5':
          this.maoNum = 5
          this.mapurl='http://114.98.239.36:6080/arcgis/rest/services/FP/%E5%AD%A6%E6%A0%A1/MapServer'
          this.addmap(this.mapurl,this.maoNum)
          break;
        case '6':
          this.maoNum = 6
          this.mapurl='http://114.98.239.36:6080/arcgis/rest/services/FP/%E5%8C%BB%E7%96%97%E5%8D%AB%E7%94%9F/MapServer'
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
.pagesearch7 .d2-container-full-bs__body-wrapper-inner{
      padding: 0px !important;
      width:100%;height: 100%;
    }
</style>
