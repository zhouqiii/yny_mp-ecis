<template>
  <div class="selectTree">
    <div class="selectTreeInput" @click="dialog">
      <el-tag class="miniTag" size="mini" :key="i" v-for="(tag,i) in dynamicTags" :closable="disabled" :disable-transitions="false" @close="handleClose(tag)">{{tag.label}}</el-tag>
    </div>
    <el-dialog title="症状列表" :visible.sync="dialogTableVisible" v-if="disabled">
      <el-tree class="treeContext" :data="tableData" show-checkbox node-key="value" :default-checked-keys="selectedTree" ref="tree" highlight-current :props="props" v-if="dialogTableVisible">
      </el-tree>
      <div class="tool">
        <el-button @click="getCheckedNodes">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
@Component
export default class SelectTree extends Vue {
  @Prop({ default: () => [] })
  private value!: string[];
  @Prop({ default: () => false })
  private disabled!: boolean;
  private dynamicTags: string[] = [];
  private dialogTableVisible = false;
  private tableData = [];
  private selectedTree: any[] = [];
  private props = {
    id: 'value',
    label: 'label',
    children: 'children'
  };
  // 弹窗
  private dialog() {
    this.selectSymptomList();
    this.dialogTableVisible = true;
  }
  /**
   * 查询主诉
   */
  private selectSymptomList() {
    this.$store.dispatch('SymptomTree').then(({ data }) => {
      this.tableData = data.data ? data.data : [];
    });
  }
  // 提交选择
  private getCheckedNodes() {
    // 获取展示的数据
    this.dynamicTags = (this.$refs.tree as any).getCheckedNodes().filter((item: any) => !item.children);
    // 获取选中的值
    this.selectedTree = this.dynamicTags.map((item: any) => item.value);
    // 修改传出的值
    this.$emit('input', this.selectedTree);
    // 关闭弹窗
    this.dialogTableVisible = false;

  }
  // 关闭标签
  private handleClose(tag: any) {
    // 删除展示的数据中对应的标签
    this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    // 删除选中数据中对应的标签
    this.selectedTree.splice(this.selectedTree.indexOf(tag.value), 1);
    // 修改传出的值
    this.$emit('input', this.selectedTree);
  }
}
</script>
<style lang="less">
.selectTree {
  .selectTreeInput {
    min-height: 30px;
    border: 1px solid #ccc;
  }
  .el-table .success-row {
    background: #f0f9eb;
  }
  .tool {
    text-align: right;
    position: relative;
  }
  .miniTag {
    margin: 0 5px;
    vertical-align: super;
  }
  .treeContext {
    .el-tree-node {
      display: inline-block;
      white-space: normal;
      width: 25%;
    }
    > .el-tree-node {
      display: block;
      &.is-expanded.is-focusable {
        width: 100%;
      }
    }
  }
}
</style>