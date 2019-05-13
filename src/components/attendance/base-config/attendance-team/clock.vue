<!--
  User: xxxxxxx
  Date: 2018/5/7
  功能：打卡
-->

<template>
  <div class="clock-container">
    <div class="item-row">
      <span class="text">打卡方式：</span>
      <el-radio-group v-model="strJson.Method">
        <el-radio :label="1">GPS打卡</el-radio>
        <el-radio :label="2">wifi打卡</el-radio>
      </el-radio-group>
    </div>
    <div class="item-row">
      <span class="text">签到提醒：</span>
      <el-select class="filter-item"
                 v-model="strJson.CheckIn"
                 style="width: 200px"
      >
        <el-option v-for="item in checkInSelect" :key="item.code" :label="item.value" :value="item.code">
        </el-option>
      </el-select>
    </div>
    <div class="item-row">
      <span class="text">签退提醒：</span>
      <el-select class="filter-item"
                 v-model="strJson.CheckOut"
                 style="width: 200px"
      >
        <el-option v-for="item in checkOutSelect" :key="item.code" :label="item.value" :value="item.code">
        </el-option>
      </el-select>
    </div>
    <div class="item-row" v-if="strJson.Method === 1">
      <span class="text ver-top">考勤地点：</span>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>考勤地点列表</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="addLocationFn()">新增地点</el-button>
        </div>
        <div v-for="(item, index) in strJson.Location" :key="index" class="item" style="margin-bottom: 10px">
          {{index + 1}}. 考勤地点：{{item.LocationName}}，有效距离：{{item.Range}}
          <el-button type='text' icon="el-icon-delete"
                     style="margin-left: 20px"
                     size="mini" @click="handlerDelLocation(index)">
          </el-button>
        </div>
      </el-card>
    </div>
    <div class="item-row" v-if="strJson.Method === 2">
      <span class="text ver-top">办公wifi：</span>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>办公wifi列表</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="addWifi()">新增wifi</el-button>
        </div>
        <div v-for="(item, index) in strJson.WiFi" :key="index" class="item" style="margin-bottom: 10px">
          {{index + 1}}. WiFi名称：{{item.WiFiName}}，MAC地址：{{item.WiFiCode}}
          <el-button type='text' icon="el-icon-delete"
                     style="margin-left: 20px"
                     size="mini" @click="handlerDelWifi(index)">
          </el-button>
        </div>
      </el-card>
    </div>
    <div class="item-row">
      <span class="text">允许外勤打卡：</span>
      <el-checkbox v-model="permitOutsideClock">开启后，员工不在打卡范围内，也可以进行打卡</el-checkbox>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">保存</el-button>
    </div>
    <el-dialog title="新增办公Wifi"
               :visible.sync="addWifiVisible"
               class="dialog-item"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="false"
               :modal-append-to-body="false"
    >
      <div>
        WiFi 名称：
        <el-input style="margin-top: 10px;width: 350px"
                  class="filter-item"
                  v-model="defaultWifiObj.WiFiName"
                  placeholder="wifi名称">
        </el-input>
      </div>
      <div>
        MAC地址：
        <el-input style="margin-top: 10px;width: 350px"
                  class="filter-item"
                  v-model="defaultWifiObj.WiFiCode"
                  placeholder="MAC地址">
        </el-input>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addWifiVisible = false">取消</el-button>
        <el-button type="primary" @click="saveWifi()">保存</el-button>
      </div>

    </el-dialog>
    <el-dialog title="新增考勤地点"
               width="700px"
               :visible="addLocationVisible"
               v-if="addLocationVisible"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="false"
               append-to-body
               custom-class="addLocation-dialog"
    >
      <div class="div-item" style="display: inline-block;">
        地点名称：
        <el-input v-model="addLocationObj.LocationName" style="width: 200px"></el-input>
      </div>

      <div class="div-item" style="display: inline-block;margin-left: 20px;">
        有效距离：
        <el-input v-model="addLocationObj.Range" style="width: 200px;"></el-input>
      </div>

      <div class="div-item" style="display: inline-block;margin-top: 10px">
        地点搜索：
        <el-input v-model="locationKeyword" style="width: 200px;"></el-input>
      </div>

      <div class="div-item" style="display: inline-block;margin-left: 20px;">
        当前地点：{{currentLocation}}
      </div>

      <baidu-map class="bm-view"
                 :center="circlePath.center"
                 :zoom="zoom"
                 :map-click="true"
                 @ready="handler"
                 @click="handleClickMap"
                 :scroll-wheel-zoom="true"
      >
        <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
        <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
                        :showAddressBar="true"
                        :autoLocation="true"
                        @locationSuccess="locationSuccess"
                        @locationError="locationError"
        ></bm-geolocation>
        <bm-circle :center="circlePath.center"
                   :radius="addLocationObj.Range"
                   stroke-color="blue"
                   :stroke-opacity="0.5"
                   :stroke-weight="2"
                   :editing="false">
        </bm-circle>
        <bm-local-search :keyword="locationKeyword" :auto-viewport="true" :location="location"></bm-local-search>
        <bm-marker :position="circlePath.center" animation="BMAP_ANIMATION_BOUNCE">
        </bm-marker>
        <bm-info-window :position="circlePath.center" :closeOnClick="false" :title="`${currentLocation}`" :show="infoWindow">
        </bm-info-window>
      </baidu-map>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addLocationVisible = false">取消</el-button>
        <el-button type="primary" @click="saveLocation()">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable no-unneeded-ternary */

  import { REQ_OK } from '@/api/config'
  import { addWiFi, addGroupLocation, getGroupLocation, addLocation } from '@/api/attendance'
  import { Message } from 'element-ui'
  export default {
    data () {
      return {
        checkInSelect: [
          {
            value: '上班前5分钟',
            code: -5
          },
          {
            value: '上班前10分钟',
            code: -10
          },
          {
            value: '上班后5分钟',
            code: 5
          },
          {
            value: '上班后10分钟',
            code: 10
          }
        ],
        checkOutSelect: [
          {
            value: '下班前5分钟',
            code: -5
          },
          {
            value: '下班前10分钟',
            code: -10
          },
          {
            value: '下班后5分钟',
            code: 5
          },
          {
            value: '下班后10分钟',
            code: 10
          }
        ],
        strJson: {
          Id: 0,
          GroupCode: '',
          Method: 1,
          CheckIn: '',
          CheckOut: '',
          Location: [],
          WiFi: [],
          EnableOutSide: ''
        },
        defaultLocationObj: {
          LocationCode: '',
          LocationName: '',
          Longitude: 123,
          Latitude: 456,
          Range: 500
        },
        defaultWifiObj: {
          Id: 0,
          WiFiCode: '',
          WiFiName: ''
        },
        permitOutsideClock: false,
        addWifiVisible: false,
        addLocationVisible: false,
        addLocationObj: {
          Id: 0,
          LocationCode: '',
          LocationName: '',
          Longitude: '',
          Latitude: '',
          Range: 500
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
    created () {
      if (this.$route.query.groupCode) {
        this._getGroupLocation()
      }
    },
    methods: {
      // 地图初始化
      handler ({BMap, map}) {
        console.log(BMap, map)
        this.geocoder = new BMap.Geocoder()
        let geolocation = new BMap.Geolocation()
        geolocation.getCurrentPosition((r) => {
          console.log(r)
          this.circlePath.center.lng = r.longitude
          this.circlePath.center.lat = r.latitude
          this.currentLocation = `${r.address.province}${r.address.city}${r.address.district}${r.address.street}${r.address.street_number}`
        }, {enableHighAccuracy: true})

        this.zoom = 15
      },
      // 定位成功
      locationSuccess ({point, AddressComponent, marker}) {
        console.log(point, AddressComponent, marker)
        this.geocoder.getLocation(point, (r) => {
          console.log(r)
          this.circlePath.center.lng = r.point.lng
          this.circlePath.center.lat = r.point.lat
          this.currentLocation = r.address
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
          console.log(r)
          this.circlePath.center.lng = r.point.lng
          this.circlePath.center.lat = r.point.lat
          this.currentLocation = r.address
          this.currentBusiness = r.business
          this.infoWindow = true
        }, { enableHighAccuracy: true })
      },
      async _getGroupLocation () {
        // 获取考勤组打卡
        await getGroupLocation(this.$route.query.groupCode).then(res => {
          if (res.data.State === REQ_OK) {
            this.strJson = res.data.Data
            this.permitOutsideClock = this.strJson.EnableOutside === 1 ? true : false
          } else {
            Message.error('考勤组打卡获取失败，请刷新页面重试！')
          }
        }).catch(() => {
          Message.error('考勤组打卡获取失败，请刷新页面重试！')
        })
      },
      async _addLocation () {
        await addLocation(JSON.stringify(this.addLocationObj)).then(res => {
          if (res.data.State === REQ_OK) {
            Message.success('保存考勤地点成功')
          } else {
            Message.error('保存考勤地点失败，请重试！')
          }
        }).catch(() => {
          Message.error('保存考勤地点失败，请重试！')
        })
      },
      async _addWiFi () {
        await addWiFi(JSON.stringify(this.defaultWifiObj)).then(res => {
          if (res.data.State === REQ_OK) {
            Message.success('新增办公WiFi成功！')
            this.strJson.WiFi.push({...this.defaultWifiObj})
            this.addWifiVisible = false
          } else {
            Message.error('新增办公WiFi失败，请重试')
          }
        }).catch(() => {
          Message.error('新增办公WiFi失败，请重试')
        })
      },
      addWifi () {
        // 新增wifi
        this.addWifiVisible = true
      },
      handlerDelWifi (index) {
        this.strJson.WiFi.splice(index, 1)
      },
      saveWifi () {
        this._addWiFi()
      },
      addLocationFn () {
        // 新增地点
        this.addLocationVisible = true
      },
      handlerDelLocation (index) {
        this.strJson.Location.splice(index, 1)
      },
      saveLocation () {
        // 保存考勤地点
        this.addLocationObj.Longitude = this.circlePath.center.lng
        this.addLocationObj.Latitude = this.circlePath.center.lat
        this._addLocation()
        this._getGroupLocation()
        this.addLocationVisible = false
      },
      save () {
        // 保存
        this.strJson.EnableOutSide = this.permitOutsideClock ? 1 : 0
        addGroupLocation(JSON.stringify(this.strJson)).then(res => {
          if (res.data.State === REQ_OK) {
            Message.success('保存考勤组打卡成功！')
          } else {
            Message.error('保存考勤组打卡失败，请重试！')
          }
        }).catch(() => {
          Message.error('保存考勤组打卡失败，请重试！')
        })
      }
    },
    components: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/mixin.styl"
  .clock-container
    .item-row
      margin-bottom 20px
      .text
        display inline-block
        width 100px;
        margin-right 20px
        text-align right
      .ver-top
        vertical-align top
      .box-card
        width 500px
        display inline-block

  .addLocation-dialog
    .el-dialog__body
      overflow: auto;
      .bm-view
        width: 100%;
        height: 400px;
        margin-top 20px
        margin-bottom: 20px
        border-1px()
        box-shadow()
        border-radius 10px
        > div
          border-radius 10px
</style>
