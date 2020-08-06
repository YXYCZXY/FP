<template>
    <div class="pagesearch6" style="width:100%;height: 100%;">
      <div id="r-result" style="width: 38%;"></div>
      <el-dialog
        title="查询资源"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
         <el-select v-model="value3"  clearable filterable placeholder="请选择村庄" >
            <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogsure">确 定</el-button>
        </span>
      </el-dialog>

        <d2-container better-scroll>
          <el-select v-model="value"  clearable filterable placeholder="请选择村庄" style="position: absolute;top: 10px;left: 10px;z-index: 10;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value2"  clearable placeholder="请选择资源" style="position: absolute;top: 10px;left: 160px;z-index: 10;">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

          <el-table
            v-show="tableshow"
            @row-click="rowClick"
            :data="tableData"
            :row-class-name="tableRowClassName" 
            :row-style="selectedstyle" 
            height="300"
            style="width: 38%;position: absolute;z-index: 10;top: 10%;left: 1%;border-radius: 20px;">
            <el-table-column
              type="index"
              align="center"
              width="20">
            <template slot="header" slot-scope="scope">
              <el-tooltip class="item"  effect="dark" content="查询" placement="top-start">
              <div  @click="dialogVisible = !dialogVisible" style="cursor: pointer;font-size: 20px;">
                  <d2-icon style="color: black" name="search"/>
              </div>
              </el-tooltip>
            </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="村庄-服务设置"
              align="center"
              width="100">
            </el-table-column>
            <el-table-column
              prop="distance"
              label="距离"
              sortable
              width="50">
            </el-table-column>
            <el-table-column
              prop="score"
              label="评分"
              sortable
              width="40">
            </el-table-column>
          </el-table>

        <el-button type="success" @click="searchsore" round style="position: absolute;z-index: 10;top: 1.6%;left: 310px;">查询</el-button>
        <el-button type="success" @click="arriveAla"  v-show="arrive" round style="position: absolute;z-index: 10;top: 1.6%;left: 380px;">可达性分析</el-button>
        
        <el-tooltip class="item" v-show="iconshow" effect="dark" content="全图显示地图" placement="right-start">
        <div  @click="globemap()" style="position: absolute;z-index: 10;top: 10%;left: 480px;font-size: 25px;cursor: pointer;">
            <d2-icon style="color: burlywood" name="globe"/>
        </div>
        </el-tooltip>

        <el-tooltip class="item" v-show="iconshow"  effect="dark" content="重置" placement="right-start">
        <div  @click="again()" style="position: absolute;z-index: 10;top: 15%;left: 480px;font-size: 25px;cursor: pointer;">
            <d2-icon style="color: burlywood" name="mail-reply-all"/>
        </div>
        </el-tooltip>

        <div id="allmap5" style="width:61.1%;height: 100.1%;left: 513px;"> </div>
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
          rowpoint1:'',
          rowpoint2:'',
          selectTable:false,
          options3:[],
          dialogVisible:false,
          value3: '',
          iconshow:false,
          tableshow:false,
          basics:'',
          arrive:false,
          getIndex:"",
          tableData: [],
            btmMap:'',
            options: [],
            value: '',
            options2: [{
                value: '1',
                label: '医疗资源'
              }, {
                value: '2',
                label: '教育资源'
              }, {
                value: '3',
                label: '居民活动中心'
              }, {
                value: '4',
                label: '公园'
              }],
              value2: ''
            }
          
    },
    mounted () {
        axios.get('http://49.234.228.14:3000/resource').then((res)=>{
          this.basics = res.data[0]
          let villlen = this.basics.vill.length
          for(let i = 0;i < villlen;i++){
            let obj = {
              value:i,
              label:this.basics.vill[i].name,
              parpat:this.basics.vill[i].parpat
            }
            this.options.push(obj)
          }          
          axios.get('http://49.234.228.14:3000/searchfamily').then((res)=>{
            this.familyPointData = res.data[0].family
            axios.get('http://49.234.228.14:3000/search').then((res)=>{
              var data  = res.data
              var inmap = new inMap.Map({
                  id: 'allmap5',
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
            })
          })   
        })

    },
    methods: {
      arriveAla(){
        let that = this
        if(this.selectTable == false ){
          this.$message({
            message: '请先选中表格内容',
            type: 'warning'
          });
        }else{
          let busTime
          let busDis
          let carTime
          let carDis
          var map = this.btmMap.getMap()          
          
          var searchComplete = function (results){
              if (transit.getStatus() != BMAP_STATUS_SUCCESS){
                return ;
              }
                var plan = results.getPlan(0);
                busTime = plan.getDuration(true) ;  //获取时间
                busDis = plan.getDistance(true) ;  //获取距离

                that.$notify({
                  title: '蓝色公交车路线',
                  dangerouslyUseHTMLString: true,
                  message: '<i style="color:teal">'+"乘坐公交路程:"+busTime+"</br>"+"乘坐公交耗时:"+busDis+'</i> ',
                  duration: 8000,
                  position: 'bottom-right'
                });

            }
            var transit = new BMap.TransitRoute(map, {renderOptions: {map: map},
              onSearchComplete: searchComplete,
          });
          transit.disableAutoViewport()
          transit.search(this.rowpoint1, this.rowpoint2);


          
          var searchComplete = function (results){
            if (transit.getStatus() != BMAP_STATUS_SUCCESS){
              return ;
            }
            var plan = results.getPlan(0);
            
            carTime =  plan.getDuration(true) ;                //获取时间

            carDis = plan.getDistance(true) ;             //获取距离
            that.$notify({
              title: '绿色驾车路线',
              dangerouslyUseHTMLString: true,
              message: '<i style="color:green">'+"驾车路程:"+carTime+"</br>"+"驾车耗时:"+carDis+'</i> ',
              duration: 8000,
              position: 'top-right'
            });
          }
          var transit1 = new BMap.DrivingRoute(map, {renderOptions: {map: map},
            onSearchComplete: searchComplete,
            });
          transit1.search(this.rowpoint1, this.rowpoint2);
          transit1.disableAutoViewport()


        }
      },
       handleClose(done) {
        this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
      },
      dialogsure(){
        if(this.value3 !== ''){
          let res = this.tableData.filter((num)=>{
            return num.hosname == this.options3[this.value3].label
          })
          this.tableData = res
          this.dialogVisible = false
        }else{
          this.dialogVisible = false
        }
      },
      again(){
        this.tableshow = false
        this.arrive = false
        this.value = ''
        this.value2 = ''
        this.iconshow = false
        this.selectTable = false
      },
      globemap(){
        var map = this.btmMap.getMap()
        map.centerAndZoom(new BMap.Point(116.834088, 31.292848),11); 
      },
      searchsore(){
        if(this.value == '' && this.value2 == ''){
           this.$message({
            showClose: true,
            message: '请选择村庄和资源',
            type: 'error'
          });
        }else{
          this.iconshow = true
          this.tableshow = true
          this.arrive = true
          let selectLen
          let selectData
          if(this.value2 == 1){
              selectLen = this.basics.hospital.length   
              selectData =  this.basics.hospital 
              this.countdistance(selectLen,selectData)
          }else if(this.value2 == 2){
              selectLen = this.basics.school.length
              selectData =  this.basics.school 
              this.countdistance(selectLen,selectData)
          }else if(this.value2 == 3){
              selectLen = this.basics.park.length
              selectData =  this.basics.park 
              this.countdistance(selectLen,selectData)
          }else if(this.value2 == 4){
              selectLen = this.basics.activity.length
              selectData =  this.basics.activity 
              this.countdistance(selectLen,selectData)
          }
        }
      },
      countdistance(selectLen,selectData){
        var map =  this.btmMap.getMap()
        let Apoint = new BMap.Point(this.basics.vill[this.value].parpat[0],this.basics.vill[this.value].parpat[1]);  
        for(let i = 0;i<selectLen;i++){
          let Bpoint = new BMap.Point(selectData[i].parpat[0],selectData[i].parpat[1]);  
          let countdistance = parseInt((map.getDistance(Apoint,Bpoint)).toFixed(2)) 
          let obj = {
            name:this.options[this.value].label + ' >> ' + selectData[i].Name,
            hosname:selectData[i].Name,
            score:selectData[i].score,
            distance:countdistance + '米',
            distanceNum:countdistance,
            parpat: selectData[i].parpat
          }
          let obj2 = {
            value:i,
            label:selectData[i].Name
          }
          this.tableData.push(obj)
          this.options3.push(obj2)
        }
      },
      selectedstyle ({row, rowIndex}) {
          if ((this.getIndex) === rowIndex ) {
            return {
              "background-color": "#85ce61"
            };
          }
        },
        tableRowClassName ({row, rowIndex}) {
          row.index = rowIndex;
        },
        rowClick (row) {
          this.getIndex=row.index
          var map = this.btmMap.getMap()
          var allOverlay = map.getOverlays();
          let len = allOverlay.length
          if(allOverlay.length > 1){
            for (var i = 0; i < len - 1; i++){
                map.removeOverlay(allOverlay[i])
            }

          }
            var point1 = new BMap.Point(this.options[this.value].parpat[0],this.options[this.value].parpat[1]);
            this.rowpoint1 = point1
            var marker1 = new BMap.Marker(point1);  // 创建标注
            map.addOverlay(marker1);              // 将标注添加到地图中
            marker1.setAnimation(BMAP_ANIMATION_BOUNCE);
            var label1 = new BMap.Label(this.options[this.value].label,{offset:new BMap.Size(20,-10)});
            marker1.setLabel(label1);

            var point2 = new BMap.Point(row.parpat[0],row.parpat[1]);
            this.rowpoint2 = point2
            var marker2 = new BMap.Marker(point2);  // 创建标注
            map.addOverlay(marker2);              // 将标注添加到地图中 
            marker2.setAnimation(BMAP_ANIMATION_BOUNCE);
            var label2 = new BMap.Label(row.hosname,{offset:new BMap.Size(20,-10)});
            marker2.setLabel(label2);
            this.selectTable = true
        }
    }
}
</script>

<style>

.pagesearch6 .d2-container-full-bs__body-wrapper-inner{
      padding: 0px !important;
      width:100%;height: 100%;
      background-color: rgba(31,44,72,1)
    }
   .pagesearch6 .el-input{
      width: 66%!important;
    }
    

  .pagesearch6 .el-table__body-wrapper::-webkit-scrollbar {
    width: 6px; 
    height: 6px; 
  }

  .pagesearch6 .el-table__body-wrapper::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 3px;
  }


</style>
