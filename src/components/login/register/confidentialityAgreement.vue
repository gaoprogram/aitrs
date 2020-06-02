<!--
  User: xxxxxxx
  Date: 2020/06/01
  功能：保密协议
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
<template>
    <div class="confidentiality" v-html="serviceContent">

    </div>
</template>

<script type="text/ecmascript-6">
  import * as config from 'api/config'
  export default {
    props: {

    },
    components: {
    },
    data () {
      return {
        serviceContent: `
            <p>
                <p style="font-size:14px;color:#676A6C;font-family:&quot;background-color:#FFFFFF;">
                    1.&nbsp;保密的内容和范围
                </p>
                <p style="font-size:14px;color:#676A6C;font-family:&quot;background-color:#FFFFFF;">
                    涉及用户的信息，仅限于企业会员使用爱拓瑞思管理软件系统并保存在爱拓瑞思服务器上的数据。
                </p>
                <p style="font-size:14px;color:#676A6C;font-family:&quot;background-color:#FFFFFF;">
                    2.&nbsp;双方的权利与义务、责任
                </p>
                <p style="font-size:14px;color:#676A6C;font-family:&quot;background-color:#FFFFFF;">
                    2.1&nbsp;我方将自觉维护企业会员及其员工的合法利益，严格遵守本保密协议的保密规定。
                </p>
                <p style="font-size:14px;color:#676A6C;font-family:&quot;background-color:#FFFFFF;">
                    2.2未经贵单位授权，我方不论在任何情况下，均不会主动向任何单位和个人泄露有关贵单位和员工的任何资料信息。
                </p>
                <p style="font-size:14px;color:#676A6C;font-family:&quot;background-color:#FFFFFF;">
                    2.3我方对系统信息采取高度的权限管控机制。所以在系统使用出现问题的时候，我们建议贵公司使用在线功能演示。
                </p>
                <p style="font-size:14px;color:#676A6C;font-family:&quot;background-color:#FFFFFF;">
                    2.4我方由于提供技术服务，或者商业价值等为客户提供更好服务的目的，在某些情况下有可能会访问这些数据，分析市场趋势和动态，分享给企业会员。但我方承诺，在未获得贵单位许可的情况下，不会将您的具体细致的信息披露给他人。
                </p>
                <p style="font-size:14px;color:#676A6C;font-family:&quot;background-color:#FFFFFF;">
                    3.&nbsp;本协议的保密义务不适用于如下情况：
                </p>
                <p style="margin-left:21.2pt;font-size:14px;color:#676A6C;font-family:&quot;background-color:#FFFFFF;">
                    （1）我方提供的为产品服务和系统解决方案，在我方为贵单位提供服务过程中需要的有限的必要信息；
                </p>
                <p style="margin-left:21.2pt;font-size:14px;color:#676A6C;font-family:&quot;background-color:#FFFFFF;">
                    （2）贵公司在本网站购买的服务需要使用的有限的必要信息；
                </p>
                <p style="margin-left:21.2pt;font-size:14px;color:#676A6C;font-family:&quot;background-color:#FFFFFF;">
                    （3）因紧急情况下，为维护和保护用户的合法权益；
                </p>
                <p style="margin-left:21.2pt;font-size:14px;color:#676A6C;font-family:&quot;background-color:#FFFFFF;">
                    （4）非由于本网站的原因已经为社会公众所知的信息；<br />
            （5）通过本网站以外其他渠道被他人获知的信息，这些渠道并不受本保密义务的限制；
                </p>
                <p style="margin-left:21.2pt;font-size:14px;color:#676A6C;font-family:&quot;background-color:#FFFFFF;">
                    （6）根据国家法律、法规、政策要求或其他国家有权机关的要求而披露的信息。
                </p>
                <p style="font-size:14px;color:#676A6C;font-family:&quot;background-color:#FFFFFF;">
                    4.&nbsp;法律
                </p>
                <p style="font-size:14px;color:#676A6C;font-family:&quot;background-color:#FFFFFF;">
                    4.1本协议的效力、解释、变更、执行与争议解决均适用中华人民共和国大陆地区法律。
                </p>
                <p style="font-size:14px;color:#676A6C;font-family:&quot;background-color:#FFFFFF;">
                    4.2如有纠纷，双方应友好协商解决。如协商未成，双方均同意约定向本网站的设立主体即爱拓瑞思管理咨询（北京）有限公司所在地的人民法院起诉。
                </p>
            </p>
            <p>
                <br />
            </p>       
        `
      }
    },
    created(){

    },
    methods: {

    }
  }
</script>

