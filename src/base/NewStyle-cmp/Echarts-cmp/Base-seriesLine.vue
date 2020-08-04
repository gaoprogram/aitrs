<!--
  User: gaol
  Date: 2020/7/31
  功能：折线图 组件  controlType 为
-->
<style lang="stylus" scoped rel="stylesheet/stylus">

</style>
<template>
    <div class="seriesLine-cmp-wrap">
        <el-row>
            <el-col :span="24">
               折线图 组件
              <div id="myChart"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
  let echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/line')
  // 以下的组件按需引入
  require('echarts/lib/component/tooltip')   // tooltip组件
  require('echarts/lib/component/title')   //  title组件
  require('echarts/lib/component/legend')  // legend组件
  export default {
    props: {
      name: {
        type: String,
        default: '折线图' 
      },
      coordinateSystem: {
        type: String,
        default: 'cartesian2d'
      }, // 笛卡尔坐标系
      xAxisIndex: {  // 使用的 x 轴的 index，在单个图表实例中存在多个 x 轴的时候有用。
        type: Number,
        default: 0
      },
      yAxisIndex: {  // 使用的 y 轴的 index，在单个图表实例中存在多个 y 轴的时候有用。
        type: Number,
        default: 0
      },  
      showSymbol: { // 是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示
        type: Boolean,
        default: false
      },
      // option将要设置以下字段感觉就足够使用了
      option: {
        legend: { // 是为了配置下图的表现的；注意data字段的数组需要对应每条折线的名称,鼠标hover到最顶部的legend标志，可以标志对应的折线图，点击legend标志会隐藏对应的折线图
          data: ['招商银行', '浦发银行', '广发银行', '上海银行']
        },
        xAxis: { // xAxis，配置x轴数据、样式、名称
          type: 'category',   // 还有其他的type，可以去官网喵两眼哦
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],   // x轴数据
          name: '日期',   // x轴名称
          // x轴名称样式
          nameTextStyle: {
            fontWeight: 600,
            fontSize: 18
          }
        },
        yAxis: {  // yAxis，配置y轴名称，样式
          type: 'value',
          name: '纵轴名称',   // y轴名称
          // y轴名称样式
          nameTextStyle: {
            fontWeight: 600,
            fontSize: 18
          }          
        },
        label: { // 图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等，label选项在 ECharts 2.x 中放置于itemStyle下，在 ECharts 3 中为了让整个配置项结构更扁平合理，label 被拿出来跟 itemStyle 平级，并且跟 itemStyle 一样拥有 emphasis 状态。
          type: Object,
          default: () => {
            return {
              show: false, // 是否显示标签。
              position: 'top', // top / left / right / bottom / inside / insideLeft / insideRight / insideTop / insideBottom / insideTopLeft / insideBottomLeft / insideTopRight / insideBottomRight, 也可以position: [10, 10] 或者 position: ['50%', '50%']
              distance: 5, // 距离图形元素的距离。当 position 为字符描述值（如 'top'、'insideRight'）时候有效。
              rotated: 90, // 标签旋转。从 -90 度到 90 度。正值是逆时针
              offset: [30, 40], // 是否对文字进行偏移。默认不偏移。例如：[30, 40] 表示文字在横向上偏移 30，纵向上偏移 40。
              fontStyle: {  
                color: 'auto', //文字的颜色。如果设置为 'auto'，则为视觉映射得到的颜色，如系列色。
                align: 'right',
                fontFamily: 'sans-serif',
                fontSize: 12, 
                verticalAlign: 'bottom',
                lineHeight: 56,
                backgroundColor: 'transparent', // 文字块背景色, 也可以直接使用图片
                borderColor: 'auto', 
                borderWidth: '1', // 文字块边框宽度。
                borderRadius: '5px',  // 文字块的圆角。
                padding: [3, 3, 3, 3], // 文字块的内边距
                shadowColor: 'transparent', // 文字块的背景阴影颜色。
                shadowBlur: 0, // 文字块的背景阴影长度
                rich: {
                  a: {
                    // 没有设置 `align`，则 `align` 为 right
                  }
                }              
              }
            }
          }
        },
        tooltip: { // tooltip，鼠标放到折线图上展示的数据展示样式
          trigger: 'axis'   // axis   item   none三个值
        },
        series: [ // series，y轴数据，每条折线的名称
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
    },
    computed: {

    },
    data () {
      return {

      }
    },
    created () {
      let myChart = echarts.init(document.getElementById('myChart'))
      myChart.setOption(this.option)
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

