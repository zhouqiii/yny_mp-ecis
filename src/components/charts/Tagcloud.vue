<template>
    <div class="Tagcloud">
        <div class="tagcloud fl" v-if="ifShow" v-show="show">
            <a href="#">急诊时间</a>
            <a href="#">急诊医生</a>
            <a href="#">就诊病人</a>
            <a href="#">医疗设备</a>
            <a href="#">其他询问</a>
            <a href="#">叫号大屏</a>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class Tagcloud extends Vue {
  @Prop()
  public option !: any;
  public id = 'c' + Date.now() + Math.round(Math.random() * 10000);
  public ifShow = true;
  public show = true;
  public mounted() {
    common.getScript(common.config.tempScript.TAGCLOUD, () => {
        $(window).resize(() => {
            this.ifShow = false;
            this.show = false;
            setTimeout(() => {
                this.ifShow = true;
                setTimeout(() => {
                    this.show = true;
                    /*3D标签云*/
                    tagcloud({
                        selector: '.tagcloud',  // 元素选择'
                        fontsize: 12,       // 基本字体大小, 单位px
                        radius: $('.Tagcloud').height() / 4,         // 滚动半径, 单位px
                        mspeed: 'normal',   // 滚动最大速度, 取值: slow, normal(默认), fast
                        ispeed: 'normal',   // 滚动初速度, 取值: slow, normal(默认), fast
                        direction: 135,     // 初始滚动方向, 取值角度(顺时针360): 0对应top, 90对应left, 135对应right-bottom(默认)...
                        keep: false          // 鼠标移出组件后是否继续随鼠标滚动, 取值: false, true(默认) 对应 减速至初速度滚动, 随鼠标滚动
                    });
                }, 100);
            }, 500);
        });
        $(window).resize();
    });
  }
}
</script>
<style lang="less" scoped>
.Tagcloud {
  color: #fff;
  position: relative;
  height: 100%;
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .wrapper {
    width: 1200px;
    height: 300px;
    margin: 0 auto;
  }
  .wrapper p {
    padding-top: 150px;
    line-height: 27px;
    color: #999;
    font-size: 14px;
    text-align: center;
  }
  .tagcloud {
    position: relative;
    margin-top: 10px;
  }
  .tagcloud a {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    padding: 11px 30px;
    color: #333;
    font-size: 16px;
    border: 1px solid #e6e7e8;
    border-radius: 18px;
    background-color: #f2f4f8;
    text-decoration: none;
    white-space: nowrap;
    -o-box-shadow: 6px 4px 8px 0 rgba(151, 142, 136, 0.34);
    -ms-box-shadow: 6px 4px 8px 0 rgba(151, 142, 136, 0.34);
    -moz-box-shadow: 6px 4px 8px 0 rgba(151, 142, 136, 0.34);
    -webkit-box-shadow: 6px 4px 8px 0 rgba(151, 142, 136, 0.34);
    box-shadow: 6px 4px 8px 0 rgba(151, 142, 136, 0.34);
    -ms-filter: "progid:DXImageTransform.Microsoft.Shadow(Strength=4,Direction=135, Color='#000000')"; /*兼容ie7/8*/
    filter: progid:DXImageTransform.Microsoft.Shadow(color='#969696', Direction=125, Strength=9);
    /*strength是阴影大小，direction是阴影方位，单位为度，可以为负数，color是阴影颜色 （尽量使用数字）使用IE滤镜实现盒子阴影的盒子必须是行元素或以行元素显示（block或inline-block;）*/
  }
  .tagcloud a:hover {
    color: #3385cf;
  }
}
</style>
