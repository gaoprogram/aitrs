<!--
  User: xxxxxxx
  Date: 2018/10/23
  功能：时间轴
-->

<template>
  <div class="timeline-container">
    <div class="name">审批进度</div>  
    <ul class="timeline-content">
      <slot></slot>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        
      }
    },
    methods: {

    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .timeline-container
    background-color: #fff;
    font-size: 13px;
    color: #6e6e6e;
    overflow: hidden;
    position: relative;
    z-index: 1;
    .name
      font-size 14px
      font-weight bold
      color #000000
      margin-bottom 20px !important
    .timeline-content
      margin-left: 16px;
      border-left: 1px solid #e4e5e9;
      .timeline-item
        padding: 0 12px 16px 0;
        margin-left: 16px;
        position: relative;
        &:first-child
          margin-top: 16px;
          padding-top: 0;
        &:last-child
          margin-top: 16px;
          color: #000;
        .timeline-icon
          content: "";
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 99px;
          background-color: #e4e5e9;
          z-index: 1;
          left: -16px;
          top: 5px;
          display: block;
          transform: translate(-50%);
        &:first-child >
          .timeline-icon
            background-color: #67C23A;
            width: 10px;
            height: 10px;
            top: 8px;   
        &:first-child:before  
          content: "";
          width: 1px;
          height: 16px;
          background-color: #fff;
          position: absolute;
          left: -17px;
          top: 0;                 
        &:last-child >
          .timeline-icon
            background-color: #f23030;
            width: 10px;
            height: 10px;
            top: 17px;
        &:last-child:after
          content: "";
          width: 16px;
          height: 16px;
          position: absolute;
          z-index: 0;
          top: 14px;
          left: -24px;
          background-color: #fbbfbf;
          border-radius: 99px
        &:last-child:before
          content: "";
          width: 1px;
          height: 100%;
          background-color: #fff;
          position: absolute;
          left: -17px;
          top: 19px;
        .travelBtn
          display none
          opacity 0 
          position absolute 
          top 0
          right 0
          &.showTravelBtn
            transition all .5s
            display inline-block
            opacity 1
        .nodeName
          margin-bottom 5px
          font-weight bold
          font-size 14px
          .tit
            color #000000
      // &:hover
      //   .travelBtn
      //     transition all .5s
      //     display inline-block
      //     opacity 1

  *, :after, :before
    box-sizing: border-box;
    outline: none;
</style>
