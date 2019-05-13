<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  // 引入 ECharts 主模块
  let echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/pie') // 引入柱状图
  require('echarts/theme/macarons') // echarts 主题
  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '400px'
      },
      initData: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        chart: null
      }
    },
    computed: {
    },
    mounted () {
      this.initChart()
    },
    beforeDestroy () {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart () {
        let that = this
        this.chart = echarts.init(this.$el, 'macarons')

        this.chart.setOption({
          title: {
            text: '',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            x: 'center',
            y: 'bottom',
            data: ['已阅', '未阅']
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {
                show: true,
                type: ['pie', 'funnel']
              },
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          calculable: true,
          series: [
            {
              name: '公告已阅人数/未阅人数',
              type: 'pie',
              roseType: 'radius',
              center: ['50%', '50%'],
              data: that.initData,
              animationEasing: 'cubicInOut',
              animationDuration: 1500
            }
          ]
        })
        this.chart.on('click', function (params) {
          if (params.data.code === '0') {
            that.$emit('getNotRead')
          } else if (params.data.code === '1') {
            that.$emit('getRead')
          }
        })
      }
    },
    watch: {
      initData: {
        handler (val) {
          this.$nextTick(() => {
            this.chart.setOption({series: [
              {
                name: '公告已阅人数/未阅人数',
                type: 'pie',
                roseType: 'radius',
                center: ['50%', '50%'],
                data: val,
                animationEasing: 'cubicInOut',
                animationDuration: 1500
              }]})
          })
        },
        deep: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  canvas
    margin 0 auto!important
</style>
