<template>
    <div class="pagesearch3" style="width:100%;height: 100%;">
      <d2-container better-scroll>
            <el-collapse-transition>
                <el-card v-show="cardshow" class="box-card" style="position: absolute;width: 750px;z-index: 10;right: 21%;top: 8.5%;pointer-events: auto;">
                    <div slot="header" class="clearfix" style="text-align: center;">
                        <span id="spancahneg">{{this.seclectMapname}}扶贫措施统计</span>
                        <div @click="backmap()" style="float: left; padding: 3px 0;cursor: pointer" >
                            <i class="el-icon-refresh-left"></i>
                        </div>
                    </div>
                    <div id="myChart" style="width: 750px;height:490px;float: left;">
                    </div>
                </el-card>
            </el-collapse-transition>
          <el-tooltip class="item"  effect="dark" content="全图显示地图" placement="top-start">
          <div  @click="globemap()" style="position: absolute;left: 35px;z-index: 100;top: 55px;font-size: 25px;cursor: pointer;">
              <d2-icon style="color: burlywood" name="globe"/>
          </div>
          </el-tooltip>
        <div id="allmap4" style="width:100.1%;height: 100.1%;"> </div>
      </d2-container>
    </div>
</template>
<script>
  import inMap from 'inmap';
  import axios from 'axios'
export default {
  data () {
    return {
      mainmap:'',
      cardshow:false,
      mainMapData:[],
      seclectMapData:[],
      seclectMapname:''
    }
  },
  mounted () {
    let that = this
      axios.get('http://49.234.228.14:3000/mainMap').then((res)=>{
        this.mainMapData = res.data[0].vill
        axios.get('http://49.234.228.14:3000/').then((res)=>{
          var data  = res.data
          var inmap = new inMap.Map({
            id: "allmap4",
            center: ["116.802747","31.283199"],
            zoom: {
              value: 12,
              show: true,
              max: 22
            }
          });


          var overlay = new inMap.PolygonOverlay({
            tooltip: {
              show: true,
              formatter: "{name}"
            },
            legend: {
              show: false,
              title: "舒城县贫困率 "
            },
            style: {
              normal: {
                borderWidth: 1.5,
                label: {
                  show: true, // 是否显示
                  font: "13px bold ",
                  color: "black"
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
                  var map = that.mainmap.getMap()
                  map.panTo(new BMap.Point(event.point.lng,event.point.lat))
                  let len = that.mainMapData.length
                  for(let i = 0;i<len;i++){
                    if(item[0].name == that.mainMapData[i].name){
                      that.seclectMapname = that.mainMapData[i].name
                      console.log(that.mainMapData[i].source,that.seclectMapData,'点击')
                      that.seclectMapData = that.mainMapData[i].source
                      
                    }
                  }
                  that.eventEchart()
                }
              }
          });
          inmap.add(overlay);
          overlay.setData(data);
          this.mainmap = inmap
        })
      })

  },
  methods: {
    backmap(){
        this.cardshow = false
        this.seclectMapData = []
    },
    eventEchart(){
      
      this.cardshow = true
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        legend: {},
        tooltip: {
            trigger: 'axis',
            showContent: false
        },
        dataset: {
            source: this.seclectMapData
        },
        xAxis: {type: 'category'},
        yAxis: {gridIndex: 0},
        grid: {top: '55%'},
        series: [
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {
                type: 'pie',
                id: 'pie',
                radius: '30%',
                center: ['50%', '25%'],
                label: {
                    formatter: '{b}: {@2012} ({d}%)'
                },
                encode: {
                    itemName: 'product',
                    value: '2012',
                    tooltip: '2012'
                }
            }
        ]
      })
      myChart.on('updateAxisPointer', function (event) {
        var xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
            var dimension = xAxisInfo.value + 1;
            myChart.setOption({
                series: {
                    id: 'pie',
                    label: {
                        formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                    },
                    encode: {
                        value: dimension,
                        tooltip: dimension
                    }
                }
            });
        }
    });
    },
    globemap(){
      var map = this.mainmap.getMap()
      map.centerAndZoom(new BMap.Point(116.802747,31.283199),12); 
    },
  }
}
</script>

<style >
.pagesearch3 .d2-container-full-bs__body-wrapper-inner{
      padding: 0px !important;
      width:100%;height: 100%;
    }
</style>
