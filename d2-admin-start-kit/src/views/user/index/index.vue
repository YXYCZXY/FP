<template>
<div class="pagesearch8" style="width:100%;height: 100%;">
    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-collapse v-model="activeNames">
        <el-collapse-item :title="dialogcount" name="1">
          <div>{{this.dialogcountkey}}</div>
        </el-collapse-item>
        <el-collapse-item :title="dialogcause" name="2">
          <div >{{this.dialogcausekey}}</div>
        </el-collapse-item>
      </el-collapse>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>


    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible1"
      width="30%"
      :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="创建时间">
          <el-input v-model="form.creationTime" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="项目ID">
          <el-input v-model="form.ID" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input v-model="form.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="所属村镇">
          <el-input v-model="form.town" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="完成时间">
          <el-input v-model="form.completeTime"></el-input>
        </el-form-item>
        <el-form-item label="项目详情">
          <el-input type="textarea" v-model="form.count"></el-input>
        </el-form-item>
        <el-form-item label="帮扶措施">
          <el-input type="textarea" v-model="form.plan"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit1" >确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible2"
      width="30%"
      :before-close="handleClose">
      <el-form ref="form2" :model="form2" label-width="80px">
        <el-form-item label="紧急程度">
          <el-input v-model="form2.level" ></el-input>
        </el-form-item>
        <el-form-item label="任务名称">
          <el-input v-model="form2.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="form2.creatTime" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="完成情况">
          <el-input v-model="form2.complete" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit2" >确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible3"
      width="30%"
      :before-close="handleClose">
      <el-form ref="form3" :model="form3" label-width="80px">
        <el-form-item label="项目ID">
          <el-input v-model="form3.ID" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="贫困类型">
          <el-input v-model="form3.kind" ></el-input>
        </el-form-item>
        <el-form-item label="致贫原因">
          <el-input v-model="form3.cause" ></el-input>
        </el-form-item>
        <el-form-item label="主要收入">
          <el-input v-model="form3.income"></el-input>
        </el-form-item>
        <el-form-item label="有无帮扶">
          <el-input v-model="form3.help"></el-input>
        </el-form-item>
        <el-form-item label="贫困详情">
          <el-input type="textarea" v-model="form3.count"></el-input>
        </el-form-item>
        <el-form-item label="帮扶措施">
          <el-input type="textarea" v-model="form3.plan"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit3" >确 定</el-button>
      </span>
    </el-dialog>



    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible4"
      width="30%"
      :before-close="handleClose">
      <el-form ref="form4" :model="form4" label-width="80px">
        <el-form-item label="创建时间" prop="creationTime">
          <el-input v-model="form4.creationTime" :disabled="true" ></el-input>
        </el-form-item>
        <el-form-item label="项目ID" prop="ID">
          <el-input v-model="form4.ID" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="form4.name" ></el-input>
        </el-form-item>
        <el-form-item label="所属村镇" prop="town">
          <el-input v-model="form4.town" ></el-input>
        </el-form-item>
        <el-form-item label="完成时间" prop="completeTime">
          <el-input v-model="form4.completeTime"></el-input>
        </el-form-item>
        <el-form-item label="项目详情" prop="count">
          <el-input type="textarea" v-model="form4.count"></el-input>
        </el-form-item>
        <el-form-item label="帮扶措施" prop="plan">
          <el-input type="textarea" v-model="form4.plan"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible4 = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit4" >确 定</el-button>
        <el-button @click="resetForm('form4')">清空</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible5"
      width="30%"
      :before-close="handleClose">
      <el-form ref="form5" :model="form5" label-width="80px">
        <el-form-item label="紧急程度" prop="level">
          <el-input v-model="form5.level" ></el-input>
        </el-form-item>
        <el-form-item label="任务名称" prop="name">
          <el-input v-model="form5.name" ></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="creatTime">
          <el-input v-model="form5.creatTime" :disabled="true" ></el-input>
        </el-form-item>
        <el-form-item label="完成情况" prop="complete">
          <el-input v-model="form5.complete" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible5 = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit5" >确 定</el-button>
        <el-button @click="resetForm('form5')">清空</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible6"
      width="30%"
      :before-close="handleClose">
      <el-form ref="form6" :model="form6" label-width="80px">
        <el-form-item label="项目ID" prop="ID">
          <el-input v-model="form6.ID" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="贫困类型" prop="kind">
          <el-input v-model="form6.kind" ></el-input>
        </el-form-item>
        <el-form-item label="致贫原因" prop="cause">
          <el-input v-model="form6.cause" ></el-input>
        </el-form-item>
        <el-form-item label="主要收入" prop="income">
          <el-input v-model="form6.income"></el-input>
        </el-form-item>
        <el-form-item label="有无帮扶" prop="help">
          <el-input v-model="form6.help"></el-input>
        </el-form-item>
        <el-form-item label="贫困详情" prop="count">
          <el-input type="textarea" v-model="form6.count"></el-input>
        </el-form-item>
        <el-form-item label="帮扶措施" prop="plan">
          <el-input type="textarea" v-model="form6.plan"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible6 = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit6" >确 定</el-button>
        <el-button @click="resetForm('form6')">清空</el-button>
      </span>
    </el-dialog>

  <d2-container better-scroll>
    <el-card class="box-card" style="position: absolute;top: 2%;left: 1%; width: 20%;height: 30%;">
      <el-row> 
        <el-col :span="24" style="text-align: center;">
          <i class="el-icon-s-custom" style="font-size: 100px;"></i>
        </el-col>
        <el-col :span="24" ><span style="padding-left: 10px;">账户名：admin</span></el-col>
        <el-col :span="24" ><span style="padding-left: 10px;">账户权限：个人</span></el-col>
        <el-col :span="24" ><span style="padding-left: 10px;">上次登录：{{new Date().toLocaleDateString()}} </span></el-col>
      </el-row> 
    </el-card>

    <el-card class="box-card" style="position: absolute;top: 35%;left: 1%; width: 20%;height: 40%;">
      <div slot="header" class="clearfix">
        <span style="font-weight: 900;padding-left: 10px;">详细信息</span>
      </div>
      <el-col :span="24" >
        <a><span style="font-weight: 600;padding-right: 20px;padding-left: 10px;">ID:</span>001</a>
      </el-col>
      <el-col :span="24" >
        <a><span style="font-weight: 600;padding-right: 20px;padding-left: 10px;">姓名:</span>张三</a>
      </el-col>
      <el-col :span="24" >
        <a><span style="font-weight: 600;padding-right: 20px;padding-left: 10px;">职位:</span>志愿者</a>
      </el-col>
      <el-col :span="24" >
        <a><span style="font-weight: 600;padding-right: 20px;padding-left: 10px;">所属区域:</span>庐镇乡</a>
      </el-col>
      <el-col :span="24" >
        <a><span style="font-weight: 600;padding-right: 20px;padding-left: 10px;">已帮扶时长:</span>3年</a>
      </el-col>
      <el-col :span="24" >
        <a><span style="font-weight: 600;padding-right: 20px;padding-left: 10px;">正在进行帮扶项目:</span>{{this.tableData1.length}}</a>
      </el-col>
      <el-col :span="24" >
        <a><span style="font-weight: 600;padding-right: 20px;padding-left: 10px;">已完成帮扶项目:</span>5</a>
      </el-col>
    </el-card>

    <el-card class="box-card" style="position: absolute;bottom: 2%;left: 1%; width: 20%;height: 20%;">
      <el-col :span="24" >
        <span style="font-weight: 900;padding-right: 20px;padding-left: 10px;">预计最近完成帮扶项目完成还有:</span>
      </el-col>
      <el-col :span="24" >
        <h3 style="position: absolute;font-size: 35px;left: 60px;top: 27px;">{{this.badtime}}</h3><h1 style="position: absolute;top: 12px;left: 120px;font-size: 50px;">天</h1>
      </el-col>
    </el-card>

    
    <el-card class="box-card" style="position: absolute;left: 22%;top: 2%;width: 38%;height: 47%;">
      <div slot="header" class="clearfix">
        <span>帮扶项目</span>
        <el-button style="float: right; padding: 3px 0" @click="add1" type="text">添加项目</el-button>
      </div>
      <el-table
        :data="tableData1"
        border
        height="250"
        style="width: 100%">
        <el-table-column
          sortable
          prop="creationTime"
          label="创建时间"
          width="110">
        </el-table-column>
        <el-table-column
          prop="ID"
          label="项目ID"
          align="center"
          width="70">
        </el-table-column>
        <el-table-column
          prop="name"
          label="项目名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="town"
          label="所属村镇"
          width="120">
        </el-table-column>
        <el-table-column
          prop="completeTime"
          label="预计完成时间"
          width="120">
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit1(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="success"
              @click="handledetails1(scope.$index, scope.row)">详情</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete1(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>


    <el-card class="box-card" style="position: absolute;left: 61%;top: 2%;width: 38%;height: 47%;">
      <div slot="header" class="clearfix">
        <span>帮扶任务</span>
        <el-button style="float: right; padding: 3px 0" @click="add2"  type="text">添加任务</el-button>
      </div>
      <el-table
        :data="tableData2"
        border
        height="250"
        style="width: 100%">
        <el-table-column
          prop="level"
          sortable
          label="紧急程度"
          width="110">
        </el-table-column>
        <el-table-column
          prop="name"
          label="任务名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="creatTime"
          label="创建时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="complete"
          label="完成情况"
          width="120">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit2(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete2(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>


    <el-card class="box-card" style="position: absolute;left: 22%;bottom: 2%;width: 38%;height: 47%;">
      <div slot="header" class="clearfix">
        <span>帮扶项目所属贫困户基础情况</span>
        <el-button style="float: right; padding: 3px 0" @click="add3"  type="text">添加家庭</el-button>
      </div>
      <el-table
        :data="tableData3"
        border
        height="250"
        style="width: 100%">
        <el-table-column
          prop="ID"
          label="贫困户ID"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          prop="kind"
          label="贫困户类型"
          align="center"
          width="110">
        </el-table-column>
        <el-table-column
          prop="cause"
          label="致贫原因"
          width="120">
        </el-table-column>
        <el-table-column
          prop="income"
          label="主要收入来源"
          width="120">
        </el-table-column>
        <el-table-column
          prop="help"
          align="center"
          label="有无帮扶措施"
          width="120">
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit3(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="success"
              @click="handledetails2(scope.$index, scope.row)">详情</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete3(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>


      <el-card class="box-card" style="position: absolute;left: 61%;bottom: 2%;width: 38%;height: 47%;">
      <div slot="header" class="clearfix">
        <span>预计帮扶成果</span>
      </div>
      <div id="myChartn" style="width: 500px;height:280px;float: left;">
      </div>
    </el-card>
  </d2-container>
</div>
</template>

<script>
import axios from 'axios'
import { pathInit } from '../../../libs/util.db'
export default {
  data () {
    return {
      selectNum:0,
      dialogVisible1:false,
      dialogVisible2:false,
      dialogVisible3:false,
      dialogVisible4:false,
      dialogVisible5:false,
      dialogVisible6:false,
      form: {
        creationTime:"",
        ID:"",
        name:"",
        town:"",
        completeTime:"",
        count:"",
        plan:'',
        },
      form2:{
        level:"",
        name:"",
        creatTime:"",
        complete:""
      },
      form3:{
        ID:"", 
        kind:"", 
        cause:"" , 
        income:"", 
        help:"", 
        count:"" , 
        plan:"", 
      },
      form4: {
        creationTime:"",
        ID:"",
        name:"",
        town:"",
        completeTime:"",
        count:"",
        plan:'',
        },
      form5:{
        level:"",
        name:"",
        creatTime:"",
        complete:""
      },
      form6:{
        ID:"", 
        kind:"", 
        cause:"" , 
        income:"", 
        help:"", 
        count:"" , 
        plan:"", 
      },
      badtime:'',
      tableData1: [],
      activeNames: [],
      dialogcount:'',
      dialogcause:'',
      dialogcountkey:'',
      dialogcausekey:'',
      tableData2: [],
      tableData3: [],
      dialogVisible: false
    }
  },
  mounted () {
     axios.get('http://49.234.228.14:3000/project').then((res)=>{
       console.log(res.data)
       this.tableData1 = res.data.count
       this.tableData2 = res.data.mission
       this.tableData3 = res.data.porfimaly
       let len = this.tableData1.length
       let arr = []
       for(let i = 0;i<len;i++){
          var timestampLogin = new Date(this.tableData1[i].completeTime).getTime();
          arr.push(timestampLogin)
       }
       var max = arr.sort(function(a,b){
            return b-a;
        })[0];
        this.badtime =  parseInt((max-Date.parse(new Date()))/(24*60*60*1000))

      })
    let myChart = this.$echarts.init(document.getElementById('myChartn'))
    myChart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    legend: {
        data: ['月家庭均收入', '帮扶家庭']
    },
    xAxis: [
        {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '月家庭均收入',
            min: 1100,
            max: 2300,
            interval: 250,
            axisLabel: {
                formatter: '{value}'
            }
        },
        {
            type: 'value',
            name: '帮扶家庭',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
                formatter: '{value} '
            }
        }
    ],
    series: [
        {
            name: '月家庭均收入',
            type: 'line',
            data: [2200, 1700, 1500, 1600, 1650, 1700, 1800, 1850, 2000, 1800, 1700, 1750]
        },
        {
            name: '帮扶家庭',
            type: 'line',
            yAxisIndex: 1,
            data: [23, 20, 22, 21, 20, 15, 18, 19, 20, 21, 22, 24]
        }
    ]
    })
  },
  methods: {
    resetForm(i){
      this.$refs[i].resetFields()
    },
    add1(){
      this.dialogVisible4 = true
    },
    add2(){
      this.dialogVisible5 = true
    },
    add3(){
      this.dialogVisible6 = true
    },
    onSubmit3(){
      this.dialogVisible3 = false
      let num = 3
      axios.post('/api/Edit?id='+this.selectNum+'&num='+num,this.form3).then((res)=>{
        axios.get('http://49.234.228.14:3000/again').then((res)=>{
          this.tableData1 = res.data.count
          this.tableData2 = res.data.mission
          this.tableData3 = res.data.porfimaly
        })
      })
    },
    onSubmit2(){
      this.dialogVisible2 = false
      let num = 2
      axios.post('/api/Edit?id='+this.selectNum+'&num='+num,this.form2).then((res)=>{
        axios.get('http://49.234.228.14:3000/again').then((res)=>{
          this.tableData1 = res.data.count
          this.tableData2 = res.data.mission
          this.tableData3 = res.data.porfimaly
        })
      })
    },
    onSubmit1() {
      this.dialogVisible1 = false
      let num = 1
      axios.post('/api/Edit?id='+this.selectNum+'&num='+num,this.form).then((res)=>{
          axios.get('http://49.234.228.14:3000/again').then((res)=>{
            this.tableData1 = res.data.count
            this.tableData2 = res.data.mission
            this.tableData3 = res.data.porfimaly
          })
        })
    },
    onSubmit6(){
      this.dialogVisible6 = false
      let num = 3
      axios.post('/api/Save?num='+num,this.form6).then((res)=>{
        axios.get('http://49.234.228.14:3000/again').then((res)=>{
          this.tableData1 = res.data.count
          this.tableData2 = res.data.mission
          this.tableData3 = res.data.porfimaly
          this.$refs.form6.resetFields()
        })
      })
    },
    onSubmit5(){
      this.dialogVisible5 = false
      let num = 2
      axios.post('/api/Save?num='+num,this.form5).then((res)=>{
        axios.get('http://49.234.228.14:3000/again').then((res)=>{
          this.tableData1 = res.data.count
          this.tableData2 = res.data.mission
          this.tableData3 = res.data.porfimaly
          this.$refs.form5.resetFields()
        })
      })
    },
    onSubmit4() {
      console.log(this.form4)
      this.dialogVisible4 = false
      let num = 1
      axios.post('/api/Save?num='+num,this.form4).then((res)=>{
          axios.get('http://49.234.228.14:3000/again').then((res)=>{
            this.tableData1 = res.data.count
            this.tableData2 = res.data.mission
            this.tableData3 = res.data.porfimaly
          })
        })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
      .then(_ => {
        done();
      })
      .catch(_ => {});
    },
    handleEdit3(index, row){
      this.form3.ID = row.ID 
      this.form3.kind = row.kind 
      this.form3.cause = row.cause 
      this.form3.income = row.income
      this.form3.help = row.help 
      this.form3.count = row.count 
      this.form3.plan = row.plan 
      this.selectNum = index
      this.dialogVisible3 = true
    },
    handleEdit2(index, row){
      console.log(this.form2,row)
      this.form2.level  = row.level
      this.form2.name = row.name
      this.form2.creatTime = row.creatTime
      this.form2.complete = row.complete
      this.dialogVisible2 = true
      this.selectNum = index
    },
    handleEdit1(index, row) {
      console.log(index, row);
      
      this.form.creationTime  = row.creationTime
      this.form.ID = row.ID
      this.form.name = row.name
      this.form.town = row.town
      this.form.completeTime = row.completeTime
      this.form.count = row.count
      this.form.plan = row.plan
      this.dialogVisible1 = true
      this.selectNum = index
    },
    handledetails1(index, row) {
      this.dialogVisible = true
      this.dialogcount="项目详情",
      this.dialogcause="帮扶措施",
      this.dialogcountkey = row.count
      this.dialogcausekey = row.plan
      console.log(index, row);
    },
    handledetails2(index, row) {
      this.dialogVisible = true
      this.dialogcount="贫困户详情",
      this.dialogcause="帮扶措施",
      this.dialogcountkey = row.count
      this.dialogcausekey = row.plan
      console.log(index, row);
    },
    handleDelete1(index, row) {
      console.log(index, row);
      let num = 1
      axios.post('http://49.234.228.14:3000/delete?id='+index+'&num='+num).then((res)=>{
        axios.get('http://49.234.228.14:3000/again').then((res)=>{
            this.tableData1 = res.data.count
            this.tableData2 = res.data.mission
            this.tableData3 = res.data.porfimaly
          })
      })
    },
    handleDelete2(index, row) {
      console.log(index, row);
      let num = 2
      axios.post('http://49.234.228.14:3000/delete?id='+index+'&num='+num).then((res)=>{
        axios.get('http://49.234.228.14:3000/again').then((res)=>{
            this.tableData1 = res.data.count
            this.tableData2 = res.data.mission
            this.tableData3 = res.data.porfimaly
          })
      })
    },
    handleDelete3(index, row) {
      console.log(index, row);
      let num = 3
      axios.post('http://49.234.228.14:3000/delete?id='+index+'&num='+num).then((res)=>{
        axios.get('http://49.234.228.14:3000/again').then((res)=>{
            this.tableData1 = res.data.count
            this.tableData2 = res.data.mission
            this.tableData3 = res.data.porfimaly
          })
      })
    }
  }
}
</script>

<style >
.pagesearch8 .d2-container-full-bs__body-wrapper-inner{
      padding: 0px !important;
      width:100%;height: 100%;
      background-color: white
  }
.pagesearch8
    .el-card__body{
      padding: 0
    }


  .pagesearch8 .el-table__body-wrapper::-webkit-scrollbar {
    width: 10px; 
    height: 10px; 
  }

  .pagesearch8 .el-table__body-wrapper::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 3px;
  }


</style>
