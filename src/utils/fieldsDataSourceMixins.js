/**
 * Created by Administrator on 2020/7/31.
 * function : fieldsMixins
 */

// 接口-----------------------------------------------------------------------------------------------------
import { REQ_OK, BASE_URL } from '@/api/config'

import { setLocalStorage, getLocalStorage } from '@/utils/auth.js'
import { newStyleGetDicTree } from '@/api/dic'

// 字段组件   mixins
export const fieldsDataSourceMixin = {
    props: {
        
    },
    data(){
        return {
           dataSource: [],  // 数据源
           localDicDataSourceList:  [], 
           dicKey: this.obj.dstype + this.obj.datasource,
           getDicSourceParams: {
                dsType: this.obj.dstype,
                dicCode: this.obj.datasource,
                levelNum: 0,                
                versions: 1,
                modulecode: 'PA'                              
            }                       
        }
    },  
    created(){
        if(this.isNeedGetDataSource){
            this._checkDicLocalStorage().then(res => {
                // debugger
                if(res){
                    // // 缓存中没有 则去获取 数据源 然后进行缓存
                    // this._newStyleGetDicTree( this.getDicSourceParams )                     
                    this.dataSource = this.localDicDataSourceList
                }else {
                    // 缓存中没有 则去获取 数据源 然后进行缓存
                    this._newStyleGetDicTree( this.getDicSourceParams )                
                }
            })
        }
    },
    methods: {        
        _checkDicLocalStorage(){
            // debugger
            return new Promise((resolve, reject) => {
                this.localDicDataSourceList = this.localDicDataSourceList.length? this.localDicDataSourceList: this.getDicDataSourceList(this.dicKey)
                // debugger
                if(this.localDicDataSourceList && this.localDicDataSourceList.length){
                    resolve(true) 
                }else {
                    resolve(false)
                }
            })
        },
        _changeDataM(data){
            if(data && data.length){
              data.forEach(item => {
                if(item.hasOwnProperty("childrenList")){
                  if(!item.childrenList.length){
                    delete item.childrenList
                  }else {
                    this._changeDataM(item.childrenList)
                  }
                }
              });
            }
          },        
        // 获取字典表
        _newStyleGetDicTree( getDicSourceParams ){
            // debugger
            newStyleGetDicTree( getDicSourceParams ).then(res => {
                // debugger
                if(res && res.data.State === REQ_OK){
                    this.dataSource = res.data.Data.records
                    // 处理数据源
                    this._changeDataM(this.dataSource)  
                    this.localDicDataSourceList = this.dataSource
                    // 将数据源 存储在缓存中 
                    this.setDicDataSourceList( this.dicKey ,JSON.stringify(this.localDicDataSourceList))
                }else {
                    // this.$message({
                    //     type: 'error',
                    //     message: `获取${this.dicKey}字典表数据源失败`
                    // })
                }
            })
        },
        getDicDataSourceList(key){
            let resKey = ''
            try {
                resKey = getLocalStorage(key)
            } catch (error) {
                console.log(`字典表获取${key}时出错了`)
            }
            return JSON.parse(resKey)                
        },
        setDicDataSourceList(key, val){
            try {
                setLocalStorage(key, val)
            } catch (error) {
                console.log(`字典表存储${key}时出错了`)
            }
        }
    }
}
