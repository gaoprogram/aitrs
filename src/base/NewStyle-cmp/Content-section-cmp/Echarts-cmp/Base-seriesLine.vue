<!--
  User: gaol
  Date: 2020/7/31
  功能：折线图 组件  controlType 为
-->
<style lang="stylus" scoped rel="stylesheet/stylus">
.myChartWrap {
  height: 500px
}
#myChart {
  width: 500px;
  height 500px;
}
</style>
<template>
    <div class="seriesLine-cmp-wrap">
        <el-row>
            <el-col :span="24" class="myChartWrap">
               折线图 组件
              <div ref="seriesLine" id="myChart"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
  import echarts from 'echarts'
  // require('echarts/lib/chart/line')
  // // 以下的组件按需引入
  // require('echarts/lib/component/tooltip')   // tooltip组件
  // require('echarts/lib/component/title')   //  title组件
  // require('echarts/lib/component/legend')  // legend组件
  export default {
    props: {
      // option将要设置以下字段感觉就足够使用了
      options: {
        type: Object,
        default: () => {
          return {
            title: { 
                show: true,
                text: '未来一周气温变化',   //图表顶部的标题 
                //   subtext: '纯属虚构'    //副标题
                link:'https://www.baidu.com',//主标题文本超链接,默认值true
                target: null,//指定窗口打开主标题超链接，支持'self' | 'blank'，不指定等同为'blank'（新窗口）
                subtext: '副标题',//副标题文本，'\n'指定换行
                sublink: '',//副标题文本超链接
                subtarget: null,//指定窗口打开副标题超链接，支持'self' | 'blank'，不指定等同为'blank'（新窗口）
                x:'center',//水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
                y: 'top',//垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
                textAlign: null,//水平对齐方式，默认根据x设置自动调整，可选为： left' | 'right' | 'center
                backgroundColor: 'rgba(0,0,0,0)',//标题背景颜色，默认'rgba(0,0,0,0)'透明
                borderColor: '#ccc',//标题边框颜色,默认'#ccc'
                borderWidth: 0,//标题边框线宽，单位px，默认为0（无边框）
                padding: 5,//标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距
                itemGap: 10,//主副标题纵向间隔，单位px，默认为10
                textStyle: {//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
                    fontFamily: 'Arial, Verdana, sans...',
                    fontSize: 12,
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                },
                subtextStyle: {//副标题文本样式{"color": "#aaa"}
                    fontFamily: 'Arial, Verdana, sans...',
                    fontSize: 12,
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                },
            },
            tooltip: {   //鼠标悬浮框的提示文字
               trigger: 'axis',   // axis   item   none三个值,
                // formatter: function (params) {
                    // let tips = ''
                    // if(params != null && params.length>0){
                    //     tips += params[0].name + '<br />'
                    //     for(let i = 0; i< params.length; i++){
                    //         tips += params[i].marker + params[i].seriesName + ":" + params[i].value + '%<br />'
                    //     }
                    // }
                    // return tips
                // }
            },
            legend: {
                orient: 'horizontal', // vertical
                top:"7%", //与上方的距离 可百分比% 可像素px
                left: 'center',
                data: ['招商银行', '浦发银行', '广发银行', '上海银行']
            },
            xAxis : [{  //x轴坐标数据
                show: true,
                type: 'category',   // 还有其他的type，可以去官网喵两眼哦
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],   // x轴数据
                // name: '星期',   // x轴名称
                // x轴名称样式
                nameTextStyle: {
                    fontWeight: 500,
                    fontSize: 18
                }
            }],
            yAxis : [{   //y轴坐标数据
                show: true, 
                number: 0,
                type: 'value',  //value 数值轴，适用于连续数据。 'category' ：类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。'time' ：时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。'log' ：对数轴。适用于对数数据。
                // name: '纵轴名称',   // y轴名称
                // y轴名称样式
                nameTextStyle: {
                    fontWeight: 500,
                    fontSize: 18
                },            
                // axisLabel : {
                //     formatter: '{value} °C'
                // }
            }],
            series: [  //驱动图表生成的数据内容数组，几条折现，数组中就会有几个对应对象，来表示对应的折线
                {
                    name: '招商银行',
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line'
                },
                {
                    name: '浦发银行',
                    data: [620, 711, 823, 934, 1445, 1456, 1178],
                    type: 'line'
                },
                {
                    name: '广发银行',
                    data: [612, 920, 1140, 1160, 1190, 1234, 1321],
                    type: 'line'
                },
                {
                    name: '上海银行',
                    data: [234, 320, 453, 567, 789, 999, 1200],
                    type: 'line'
                }
            ]            
          }
        }
      }      
    },
    computed: {

    },
    data () {
      return {

      }
    },
    created () {
      debugger
      // console.log("--------------",document.getElementById('myChart'))
      // let myChart = echarts.init(document.getElementById('myChart'))
      // myChart.setOption(this.option)
    },
    mounted () {
      let _this = this
      // console.log("--------------",document.getElementById('myChart'))
      // let myChart = echarts.init(document.getElementById('myChart'))
      let myChart = echarts.init(_this.$refs.seriesLine)
      console.log("----------myChart",myChart)
      myChart.setOption(_this.options)

      myChart.on("click", function(params){
        //   alert(params)
        console.log(params)
      });
    },
    beforeDestroy () {
      // 销毁

    },
    methods: {},
    watch: {
      obj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          this.$emit('update:obj', newValue)
        },
        deep: true
      }
    }
  }
</script>

