<!--
  User: xxxxxxx
  Date: 2019/2/15
  功能：地图组件弹窗
-->

<template>
  <el-dialog title="地点选择"
             width="700px"
             :visible="true"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             :show-close="false"
             append-to-body
             custom-class="addLocation-dialog"
  >
    <!-- obj: {{obj}} -->
    <div class="div-item" style="display: inline-block;">
      已选择地点：
      <el-input v-model="obj.LocationName" style="width: 200px"></el-input>
    </div>

    <div class="div-item" style="display: inline-block;margin-top: 10px">
      地点搜索：
      <el-input v-model="locationKeyword" style="width: 200px;"></el-input>
    </div>         

    <div class="baiduToolsBox">
      <baidu-map class="bm-view"
                :center="circlePath.center"
                :zoom="zoom"
                :map-click="true"
                @ready="handler"
                @click="handleClickMap"
                :scroll-wheel-zoom="true"
      >
        <!-- <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list> -->
        <!-- <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation> -->

        <!--定位搜索控件--start--->
        <bm-local-search
          @infohtmlset="infohtmlset"
          :keyword="locationKeyword"
          :auto-viewport="true"
          :location="location">
        </bm-local-search>
        <!--定位搜索控件--end--->  


        <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
                        :showAddressBar="true"
                        :autoLocation="true"
                        @locationSuccess="locationSuccess"
                        @locationError="locationError"
        ></bm-geolocation>

        <!--画圆控件--start--->
        <bm-circle :center="circlePath.center"
                  radius="300"
                  stroke-color="blue"
                  :stroke-opacity="0.5"
                  :stroke-weight="0.3"
                  :editing="false">
        </bm-circle>
        <!--画圆控件--end--->       

        <!----标记控件--start--->
        <bm-marker :position="circlePath.center" animation="BMAP_ANIMATION_BOUNCE">
        </bm-marker>
        <!----标记控件--end--->

        <!----地址控件--start-->
        <bm-info-window :position="circlePath.center" :closeOnClick="false" :title="`${obj.LocationName}`" :show="infoWindow">
          <p v-if="currentBusiness">地址：{{currentBusiness}}</p>
        </bm-info-window>
        <!----地址控件--end-->            

      </baidu-map>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelLocation()">取消</el-button>
      <el-button type="primary" @click="saveLocation()">保存</el-button>
    </div>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      obj: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
      return {
        addLocationObj: {
          LocationName: '',
          Longitude: '',
          Latitude: ''
        },
        circlePath: {
          center: {
            lng: 116.404,
            lat: 39.915
          }
        },
        zoom: 15,
        locationKeyword: '',
        location: '',
        currentLocation: '',
        currentBusiness: '',
        infoWindow: true
      }
    },
    methods: {
      // 地图初始化
      handler ({BMap, map}) {
        debugger
        this.geocoder = new BMap.Geocoder()
        let geolocation = new BMap.Geolocation()
        geolocation.getCurrentPosition((r) => {
          debugger
          this.circlePath.center.lng = r.longitude
          this.circlePath.center.lat = r.latitude
          this.obj.LocationName = `${r.address.province}${r.address.city}${r.address.district}${r.address.street}${r.address.street_number}`
        }, {enableHighAccuracy: true})

        this.zoom = 15
      },
      // 定位成功
      locationSuccess ({point, AddressComponent, marker}) {
        this.geocoder.getLocation(point, (r) => {
          this.circlePath.center.lng = r.point.lng
          this.circlePath.center.lat = r.point.lat
          this.obj.LocationName = r.address
          this.currentBusiness = r.business
        }, { enableHighAccuracy: true })
      },
      // 定位失败
      locationError ({StatusCode}) {
        console.log(StatusCode)
      },
      // 点击地图
      handleClickMap ({point}) {
        this.geocoder.getLocation(point, (r) => {
          this.circlePath.center.lng = r.point.lng
          this.circlePath.center.lat = r.point.lat
          this.obj.LocationName = r.surroundingPois[0].title
          this.currentBusiness = r.surroundingPois[0].address
          this.obj.Longitude = this.circlePath.center.lng
          this.obj.Latitude = this.circlePath.center.lat
          this.infoWindow = true
        }, { enableHighAccuracy: true })
      },
      // 标注气泡内容创建后的回调函数。
      infohtmlset (obj) {
        this.obj.LocationName = obj.title
        this.obj.Longitude = obj.point.lng
        this.obj.Latitude = obj.point.lat
      },
      saveLocation () {
        // 保存考勤地点
        this.$emit('saveLocaltion', this.obj)
      },
      // 取消
      cancelLocation () {
        this.$emit('cancelLocation')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/css/mixin.styl"
  .addLocation-dialog 
    .el-dialog__body
      padding-top 80px !important 
      padding-bottom 0 !important
      overflow-y auto
      .baiduToolsBox
        height 400px
        overflow-y auto
        margin-top 10px
        .bm-view
          width 100%
          height 80%
          margin-bottom 20px
          border-1px()
          box-shadow()
          border-radius 10px
          box-sizing border-box
          > div
            border-radius 10px
    .el-dialog__footer
      padding 0 !important
      .dialog-footer
        margin 10px 0 !important
</style>
