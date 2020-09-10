<!--
  User: gaol
  Date: 2019/5/14
  功能：页面 uptext 组件区
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

<template>
    <el-row class="uptextCmp">
        Uptext 组件
        <!-- ------
        textData: {{textData}} -->
        <!-- getText: {{getText}} -->
        <div 
            class="upTextWrap"
            v-for="(textCmpItem, key) in textData"
            :key="key"
        >
            <el-col :span="columnNum" class="marginT10">   
                <!-- 页面 uptext 组件区textCmpItem： {{ textCmpItem.Value }}  -->
                <div v-html="textCmpItem.Value"></div> 
            </el-col>   
        </div>
    </el-row>
</template>

<script type="text/ecmascript-6">
import SaveFooter from '@/base/Save-footer/Save-footer'
  // 底部保存组件
  export default {
    props: {
        columnNum: {
            type: [String, Number],
            default: () => {
                return 24
            }
        },
        sectionData: {
            type: Object,
            default: () => {
                return  {

                }     
            }
        },
        textData: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    components: {
        SaveFooter
    },
    computed: {
        getText(){
            // return this.sectionData.SectionData.map(item => {
            //     return  {
            //         "CombineType": item.CombineType,
            //         "AttriType": item.AttriType,
            //         "MetaCode": item.MetaCode,
            //         "MetaAttr": item.MetaAttr,
            //         "RelateId": item.RelateId,
            //         "RelateFieldAttr": item.RelateFieldAttr,
            //         "Collapsed": item.Collapsed,
            //         "ShowDiscrip": item.ShowDiscrip,
            //         "IsShow": item.IsShow,
            //         "Value": this.getHtml(item.Value),
            //         // "Value": `<p><span style="color: rgb(230, 0, 0);">P2上部文本区1</span></p>`,
            //         "SortId": item.SortId,
            //         "Paral": item.Paral,
            //         "State": item.State
            //     }
            // })
            let a = "<p><span&nbsp;style='color:&nbsp;rgb(230,&nbsp;0,&nbsp;0);'>p2上部文本区1</span></p>"
            console.log(a.replace(/&nbsp;/g, " "))
            // return .replace(/&nbsp;/g, "")
            return a
        },
        currentTextValue(){
            return  this.sectionData.Value || ''
        }
    },
    data(){
        return {
            getHtml(str) {
                // return `${str}.replace(/&nbsp;/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">")`
                console.log(str)
                console.log(str.replace(/&nbsp;/g, ""))
                let a = str.replace(/&nbsp;/g, "")
                return a
                // return '<div style="color: red">ceshi</div>'
            },            
            // html: `<span style="color:#E53333;">文本</span>`
            testData: [
                // {
                //     Value: "<p><span style="color: rgb(230, 0, 0);">P2上部文本区1</span></p>"
                // },
                // {
                //    Value: "<p><span style="color: rgb(230, 230, 230);">P2上部文本区2</span></p>"
                // }
            ]
        }
    },
    methods: {

    }
  }
</script>


