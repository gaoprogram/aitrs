<!--
  User: gaol
  Date: 2020/7/31
  功能：饼状图 组件  controlType 为
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
    <div class="seriesPie-cmp-wrap">
        <el-row>
            <el-col :span="24" class="myChartWrap">
               饼状图 组件
              <div ref="seriesPie" id="myChart"></div>
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
                text: '生源地',   //图表顶部的标题 
                //   subtext: '纯属虚构'    //副标题
                link:'https://www.baidu.com', //主标题文本超链接, 默认值true
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
              // trigger 设置触发类型，默认数据触发，可选值：'item' ¦ 'axis'
              trigger: 'item',
              showDelay: 20,   // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
              hideDelay: 20,   // 隐藏延迟，单位ms
              backgroundColor: 'rgba(255,0,0,0.7)',  // 提示框背景颜色
              textStyle: {
                fontSize: '16px',
                color: '#000'  // 设置文本颜色 默认#FFF
              },
              // formatter设置提示框显示内容
              // {a}指series.name  {b}指series.data的name
              // {c}指series.data的value  {d}%指这一部分占总数的百分比
              formatter: '{a} <br/>{b} : {c}个 ({d}%)'
            //   formatter: function (params) {
            //       console.log("------33-3-", params)
            //       let tips = `
            //         <h1>${params.data.name}</h1>
            //         <p>${params.data.value}</p>
            //       `
            //       return tips
            //   }
            },
            legend: {
              // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
              orient: 'vertical',
              // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
              x: 'left',
              // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
              y: 'center',
              itemWidth: 24,   // 设置图例图形的宽
              itemHeight: 18,  // 设置图例图形的高
              textStyle: {
                color: '#666'  // 图例文字颜色
              },
              // itemGap设置各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
              itemGap: 30,
              backgroundColor: '#eee',  // 设置整个图例区域背景颜色
              data: ['北京','上海','广州','深圳','郑州']
            },
            xAxis : [{  //x轴坐标数据
                show: false,
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
                show: false, 
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
            series : [
              {
                name: '生源地3',
                type: 'pie',
                // radius: '50%',  // 设置饼状图大小，100%时，最大直径=整个图形的min(宽，高)
                radius: ['30%', '60%'],  // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
                center: ['50%', '50%'],  // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
                data: [
                    {value:335, name:'北京',id: 1, com: 'page'},
                    {value:310, name:'上海', id: 2, com: 'page'},
                    {value:234, name:'广州', id: 3, com: 'page'},
                    {value:135, name:'深圳', id: 4, com: 'page'},
                    {value:148, name:'郑州', id: 5, com: 'page'}
                ],
                // itemStyle 设置饼状图扇形区域样式
                itemStyle: {
                  // emphasis：英文意思是 强调;着重;（轮廓、图形等的）鲜明;突出，重读
                  // emphasis：设置鼠标放到哪一块扇形上面的时候，扇形样式、阴影
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(30, 144, 255，0.5)'
                  }
                },
                // 设置值域的那指向线
                labelLine: {
                  normal: {
                    show: false   // show设置线是否显示，默认为true，可选值：true ¦ false
                  }
                },
                // 设置值域的标签
                label: {
                  normal: {
                    position: 'inner',  // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
                    // formatter: '{a} {b} : {c}个 ({d}%)'   设置标签显示内容 ，默认显示{b}
                    // {a}指series.name  {b}指series.data的name
                    // {c}指series.data的value  {d}%指这一部分占总数的百分比
                    formatter: '{c}'
                  }
                }
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
      let myChart = echarts.init(_this.$refs.seriesPie)
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

