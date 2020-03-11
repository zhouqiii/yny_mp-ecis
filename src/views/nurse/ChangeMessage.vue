<template>
  <div class="changeMessage">
    <el-form ref="form" :model="form" label-width="90px" :rules="rules">
    <el-tabs v-model="activeName">
      <el-tab-pane label="个人信息" name="first" style="font-size:16px;">
        <el-form-item label="用户名">{{form.username}}
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" style="width:50%;"></el-input>
        </el-form-item>
        <el-form-item label="签名">
          <ImgBase64 v-model="form.sign"/>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="修改密码" name="second">
        <el-form ref="form" :model="form" label-width="90px" :rules="rules">
          <el-form-item label="原密码" prop="oldPassword" style="width:50%;">
            <el-input type="password" v-model="form.oldPassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword" style="width:50%;">
            <el-input type="password" v-model="form.newPassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="check" style="width:50%;">
            <el-input type="password" v-model.number="form.check"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div class="btn">
            <el-button type="primary" icon="el-icon-check" @click="submitForm">提交</el-button>
    </div>
  </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ImgBase64 from '@/components/files/ImgBase64.vue';
@Component({ components: { ImgBase64 } })
export default class ChangeMessage extends Vue {
  private activeName = 'first';
  private form = JSON.parse(localStorage.getItem('admin_info') as string).data.sysUser;
  private rules={
    phone: [
      { required: true, message: '请输入电话', trigger: 'blur' },
      { min: 11, max: 11, message: '手机号长度为11位', trigger: 'blur' }
    ],
  };
  private submitForm() {
    (this.$refs.form as any).validate((valid: any) => {
        if (!valid) {
          return false;
        }
        this.$store.dispatch('UpdateUser',{phone:this.form.phone,sign:this.form.sign,username:this.form.username}).then(
          (data) => {
            this.$message.success('保存成功');
        });
      });
  }
}
</script>

<style lang="less" scoped>
.changeMessage {
  .btn{
    text-align: center;
  }
  .bian {
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
  }
}
</style>