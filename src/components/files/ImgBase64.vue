<template>
  <div class="ImgBase64">
    <el-button @click="onFile" :disabled="disabled">上传图片</el-button>
    <input :id="fileId" type="file" @change="onChange" hidden/>
    <div class="imgBox" v-if="value">
      <img :src="value" draggable="false" ondragstart="return false"/>
      <nav>
        <i class="el-icon-search" @click="onSearch"/>
        <i class="el-icon-delete" @click="onDelete"/>
      </nav>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
interface Roles {
  types: string[];
  size: number;
}
@Component
export default class ImgBase64 extends Vue {
  @Prop({
    default: ''
  })
  private value !: string;
  @Prop()
  private disabled!: boolean;
  private fileId: string = `f${Date.now() + Math.round(Math.random() * 1000)}`;
  private reader = new FileReader();
  private imgSrc = '';
  private roles: Roles = {
    types: ['image/jpeg', 'image/png'],
    size: 500
  };
  private onFile() {
    $(`#${this.fileId}`).click();
  }
  private check(file: File) {
    if (file.size > this.roles.size * 1024) {
      this.$message.warning(`文件不能超过${this.roles.size}KB`);
      return false;
    }
    if (this.roles.types.findIndex((type) => type === file.type) === -1) {
      this.$message.warning('文件类型不正确,支持jpg，png格式');
      return false;
    }
    return true;
  }
  private onChange(ev: any) {
    if (this.check(ev.target.files[0])) {
      this.reader.readAsDataURL(ev.target.files[0]);
      this.reader.onload = (e: any) => this.$emit('input', e.target.result);
    }
  }
  private onDelete() {
    $(`#${this.fileId}`).val('');
    this.$emit('input', '');
  }
  private onSearch() {
    const imgBase64Imgbox = $('.ImgBase64_imgbox');
    imgBase64Imgbox.length > 0 ? imgBase64Imgbox.show().find('img').attr('src', this.value) :
    $('body').append(`<div class="ImgBase64_imgbox">
    <i class="el-icon-close" onclick="$('.ImgBase64_imgbox').hide()"/><img src="${this.value}" />
    </div>`);
  }
}
</script>
<style lang="less">
.ImgBase64_imgbox{
  position: absolute;
  width: 100%;
  height:100%;
  background: rgba(0,0,0,.5);
  top:0;
  z-index: 2;
  text-align: center;
  img{
    max-width: 90%;
    max-height: 100%;
  }
  i{
    position: absolute;
    right:20px;
    color: #ccc;
    top:20px;
    font-size: 20px;
    cursor: pointer;
    &:hover{
      color: white;
    }
  }
}
</style>

<style lang="less" scoped>
.ImgBase64 {
  .imgBox {
    display: inline-block;
    position: relative;
    margin-left: 10px;
    img {
      height: 40px;
      max-width: 200px;
      vertical-align: bottom;
      box-shadow: 2px 2px 5px #222;
    }
    nav {
      display: inline-block;
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 40px;
      color: rgba(0, 0, 0, 0);
      background: rgba(255, 255, 255, 0);
      transition:~'background .5s';
      cursor: pointer;
      &:hover{
        background: rgba(0, 0, 0, 0.5);
        color: rgba(255, 255, 255, .5);
      }
      i{
        transition:~'color .5s';
        &:hover{
          color: #fff;
        }
      }
    }
  }
}
</style>



