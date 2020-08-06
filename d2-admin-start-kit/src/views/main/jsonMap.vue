<template>
  <div id="allmap" style="width:830px;height:600px"> </div>
</template>

<script>
  // import BMap from 'BMap'
  import inMap from 'inmap';
  import axios from 'axios'

  export default {
    data() {
      return {}
    },
    methods: {},
    mounted () {

    axios.get('http://49.234.228.14:3000/').then((res)=>{
        console.log(res.data)
          var data  = res.data
        var inmap = new inMap.Map({
       id: "allmap",
       skin: "Blueness",
       center: ["116.802747","31.287199"],
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
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
