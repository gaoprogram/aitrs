<!--
  User: xxxxxxx
  Date: 2020/5/27
  功能：滑动验证
-->
<template>
  <div class="jc-component__range">
    <!-- validMaskStyle: {{validMaskStyle}} -->
    <div class="jc-range u-f-jst" :class="rangeStatus?'success':''">
        <span class="validMask" :style="validMaskStyle"></span>        
    	<span class="sucessTit ellipsis1">{{rangeStatus?successText:startText}}</span>
    	<i @mousedown="rangeMove" :class="['u-f-ajc', rangeStatus?successIcon:startIcon]"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getOrgList, getPositionList } from '@/api/permission'
  import { Message } from 'element-ui'
  import { REQ_OK } from '@/api/config'
  export default {
props: {
		// 成功之后的函数
		successFun: {
			type: Function
		},
		//成功图标
		successIcon: {
			type: String,
			default: 'el-icon-success'
		},
		//成功文字
		successText: {
			type: String,
			default: '验证成功'
		},
		//开始的图标
		startIcon: {
			type: String,
			default: 'el-icon-d-arrow-right'
		},
		//开始的文字
		startText: {
			type: String,
			default: '请按住滑块，拖动到最右边'
		},
		//失败之后的函数
		errorFun: {
			type: Function
		},
		//或者用值来进行监听
		status: {
			type: String
		}
	},
	data(){
		return {
            disX : 0, // 滑动距离
            MaxX: 0, // 最大滑动距离
            rangeStatus: false,
            validMaskStyle: 'display: inline-block;background-color: #67C23A;opacity: 0.2;width: 0px;height:45px'
		}
    },
    computed:{
    },
    watch: {
        disX: {
            handler(newValue, oldValue){
                // debugger
                if(newValue && newValue <= this.MaxX){
                    this.validMaskStyle = `display:inline-block;opacity:1;background-color: #67C23A;
                                            width:${newValue}px;height:45px;transition: all .05s`
                }else {
                    this.validMaskStyle = `display:inline-block;opacity:0;background-color: #67C23A;
                                            width:${newValue}px;height:45px;transition: all .05s`                    
                }
            }
        }
    },
    methods:{
        //滑块移动
        rangeMove(e){
            let ele = e.target;
            let startX = e.clientX;
            let eleWidth = ele.offsetWidth;
            let parentWidth =  ele.parentElement.offsetWidth;
            this.MaxX = parentWidth - eleWidth;
            if(this.rangeStatus){//不运行
                return false;
            }
            document.onmousemove = (e) => {
                let endX = e.clientX;
                this.disX = endX - startX;
                if(this.disX<=0){
                    this.disX = 0;
                }
                if(this.disX>=this.MaxX-eleWidth){//减去滑块的宽度,体验效果更好
                    this.disX = this.MaxX;
                }
                ele.style.transition = '.1s all';
                ele.style.transform = 'translateX('+this.disX+'px)';
                e.preventDefault();
            }
            document.onmouseup = ()=> {
                if(this.disX !== this.MaxX){
                    ele.style.transition = '.5s all';
                    ele.style.transform = 'translateX(0)';
                    //执行成功的函数
                    this.errorFun && this.errorFun();
                }else{
                    this.rangeStatus = true;
                    if(this.status){
                        // this.$parent[this.status] = true;
                        
                    }
                    this.$emit("slidingSuccess")
                    //执行成功的函数
                    this.successFun && this.successFun();
                }
                this.disX = 0
                document.onmousemove = null;
                document.onmouseup = null;
            }
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.jc-component__range{
	.jc-range{
		background-color: rgba(232,232,232,.9);
		position: relative;
		transition: 1s all;
		user-select: none;
		color: #333;
		height: 45px; /*no*/
        text-align center;
        font-size: 12px;
        line-height 45px;
        overflow hidden;
		&.success{
			background-color: #7AC23C;
			color: #fff;
			i{
				color: #7AC23C;
			}
		}
		i{
			position: absolute;
			left: 0;
            top:0;
			width: 45px;/*no*/
			height: 100%;
			color: #919191;
			background-color: #fff;
			border: 1px solid #bbb;
			cursor: move;
            box-sizing: border-box;
		}
        .sucessTit{
            position: absolute;
            left: 50%;
            top: 50%;
            transform translate(-50%, -50%)
        }
	}
}
</style>
