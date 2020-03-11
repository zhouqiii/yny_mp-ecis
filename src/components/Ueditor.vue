<template>
  <div :id="`box_${this.ueid}`" class="ueditor">
    <div :id="ueid" class="ueditor_ueid"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
@Component
export default class Ueditor extends Vue {
  public ueid = 'u_';
  public ue: any = {};
  public setValue(val: string) {
    this.ue.setContent(val);
  }
  public created() {
    this.ueid = 'u_' + Date.now();
    this.ue = UE.getEditor(this.ueid, {
      toolbars: [[
        'fullscreen', 'source', '|', 'undo', 'redo', '|',
        'bold', 'italic', 'underline', 'fontborder',
        'strikethrough', 'superscript', 'subscript',
        'removeformat', 'formatmatch', 'autotypeset',
        'blockquote', 'pasteplain', '|', 'forecolor',
        'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
        'rowspacingtop', 'rowspacingbottom', 'lineheight'
      ]]
    });
    this.ue.on('contentChange', () => {
      this.$emit('input', this.ue.getContent());
    });
  }
}
</script>



