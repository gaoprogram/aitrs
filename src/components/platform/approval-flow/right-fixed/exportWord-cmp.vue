<!--
  User: xxxxxxx
  Date: 2019/6/28
  功能：right-fixed 中 导出word 格式的 主表
-->
<template>
    <div id="exportMainTableHtml">
        <main-table-html  v-bind="$attrs" v-on="$listeners" ref="exportMainTableHtml"/>
    </div>
</template>

<script type="text/ecmascript-6">
    import {exportDoc} from '@/api/approve'
    import mainTableHtml from './mainTableHtml'
    import writer from 'file-writer'
    // import {resumecss} from '@/assets/style/download/resume.css.js'
    export default {
        components:{
            mainTableHtml
        },
        props: {
            form: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            workId: {
                type: [Number, String],
                default: ''
            },
            nodeId: {
                type: [Number, String],
                default: ''
            }
        },
        inheritAttrs: true,
        data () {
            return {
            
            }
        },
        created () {
            // this.$bus.$on("exportWord", () => {
            //     this.downWord()
            // })
        },
        beforeDestroy() {
            // 销毁
            // this.$bus.$off("exportWord")
        },
        watch: {
        
        },   
        methods: {
            // 导出 html 文件
            downloadHtml(name){               
                let html = this.getHtmlContent()
                let s = writer(`${name}的简历.html`, html, 'utf-8')
                console.log('s stream',s)
            },
            // 导出 word 文件
            downWord () {
                debugger
                let word = this.getHtmlContent()
                // 构造blob文件流
                let word_ = new Blob([word],{ "type" : "text/html;charset=utf-8" })
                // let formdata = new FormData();
                // formdata.append('file', word_, `XXX.html`);//sdf.html是设置文件名
                debugger

                exportDoc(word_, form.Flow.WorkId, form.Flow.nodeId, form.MainTableInfos.TableCode).then((res) => {
                    debugger 
                    console.log(res)
                })
                // axios({
                // method: 'post',
                // url: url,
                // data:formdata,
                // responseType:'blob',//这里如果不设置，下载会打不开文件
                // })
                // .then(res=>{
                //     console.log('download res',res)
                    //通过后台返回 的word文件流设置文件名并下载
                    // var blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8'}); //application/vnd.openxmlformats-officedocument.wordprocessingml.document这里表示doc类型
                    // var downloadElement = document.createElement('a')
                    // var href = window.URL.createObjectURL(blob) //创建下载的链接
                    // downloadElement.href = href;
                    // downloadElement.download ='s.doc' //下载后文件名
                    // document.body.appendChild(downloadElement)
                    // downloadElement.click() //点击下载
                    // document.body.removeChild(downloadElement) //下载完成移除元素
                    // window.URL.revokeObjectURL(href) //释放掉blob对象
                // }),          
            },
            getHtmlContent(){
                //获取html另外一种方式：this.$el.outerHTML
                const template = this.$refs.exportMainTableHtml.$el.innerHTML;            
                let html = `<!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width,initial-scale=1.0">
                        <title>表单导出</title>
                        <link rel="stylesheet" href=""/>
                        <style>
    
                        </style>
                    </head>
                    <body>
                        <div class="resume_preview_page" style="margin:0 auto;width:1200px">
                        ${template}
                        </div>
                    </body>
                </html>`;
                debugger
                return html;
            } 
        } 
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
 
</style>
