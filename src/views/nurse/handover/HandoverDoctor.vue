<template>
  <div class="HandoverDoctor">
    <div class="leftBox">
      <h1>
        <div>交班{{role.name}}</div>
        <el-select v-model="form.handoverUserId" filterable :disabled="transferSelecteds.length>0" :placeholder="`选择交接${role.name}`" @change="onHandoverSubmit">
          <el-option
            v-for="item in doctorList"
            :key="item.userId"
            :label="item.username"
            :value="item.userId"
          />
        </el-select>
      </h1>
      <el-table
        ref="handOverTable"
        :height="tableHeight"
        :data="transferList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="病人" width="70"></el-table-column>
        <el-table-column label="性别" width="70">
          <template slot-scope="scope">
            {{scope.row.gender|dict("sex")}}
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="70"></el-table-column>
        <el-table-column prop="diagnosis" label="诊断" header-align="center"></el-table-column>
        <el-table-column :label="role.name" width="70">
          <template>
            <span
              v-for="item in doctorList"
              :key="item.userId"
            >{{form.handoverUserId==item.userId?item.username:''}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="buttonBox">
      <div>
        <div>
          <el-button icon="el-icon-d-arrow-right" circle @click="onSelectedAll('forward')"></el-button>
        </div>
        <div>
          <el-button icon="el-icon-arrow-right" circle @click="onSelected('forward')"></el-button>
        </div>
        <div>
          <el-button icon="el-icon-arrow-left" circle @click="onSelected('backward')"></el-button>
        </div>
        <div>
          <el-button icon="el-icon-d-arrow-left" circle @click="onSelectedAll('backward')"></el-button>
        </div>
      </div>
    </div>

    <div class="rightBox">
      <h1>
        <div>接班{{role.name}}</div>
        <el-select v-model="form.workUserId" :disabled="transferSelecteds.length>0" filterable :placeholder="`选择交接${role.name}`" @change="onWorkSubmit">
          <el-option
            v-for="item in doctorList.filter((obj)=>form.handoverUserId!=obj.userId)"
            :key="item.userId"
            :label="item.username"
            :value="item.userId"
          />
        </el-select>
      </h1>
      <el-table
        ref="toHandOverTable"
        :height="tableHeight"
        :data="transferSelecteds"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
       <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="病人" width="70"></el-table-column>
        <el-table-column label="性别" width="70">
          <template slot-scope="scope">
            {{scope.row.gender|dict("sex")}}
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="70"></el-table-column>
        <el-table-column prop="diagnosis" label="诊断" header-align="center"></el-table-column>
        <el-table-column :label="role.name" width="70">
          <template>
            <span
              v-for="item in doctorList"
              :key="item.userId"
            >{{form.workUserId==item.userId?item.username:''}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tool">
        <el-button @click="onSave" class="save">保存</el-button>
    </div>
  </div>
</template>
<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator';
interface Roles {
  mark: string;
  name: string;
  isRole: boolean;
}
@Component
export default class HandoverDoctor extends Vue {
  /**
   * 穿梭框数据
   */
  private transferList: Transfer[] = [];
  /**
   * 返回的值
   */
  private transferSelecteds: Transfer[] = [];
  /**
   * 医生列表
   */
  private doctorList: User[] = [];
  // 选中的复选框值
  private multipleSelection: Transfer[] = [];
  /**
   * 选中的值班医生
   */
  private workDoctor: User = {
    userId: ''
  };
  /**
   * 选中的交接医生
   */
  private handoverDoctor: User = {
    userId: ''
  };
  private form = {
    handoverUserId: '',
    workUserId: ''
  };
  private rules = {
    handoverUserId: [
      { required: true, message: '输入框不能为空', trigger: 'blur' }
    ],
    workUserId: [{ required: true, message: '输入框不能为空', trigger: 'blur' }]
  };
  private tableHeight = window.innerHeight - 220;
  /**
   * 当前医生
   */
  private get currentDoctor() {
    return this.$store.getters.GET_ADMIN_INFO.data.sysUser;
  }
  /**
   * 获得权限
   */
  private get role(): Roles {
    return {
      mark: 'doctor',
      name: /^(doctor)$/g.test('doctor') ? '医生' : '护士',
      isRole: /^(doctor|nurse)$/g.test('doctor')
    };
  }
  /**
   * 获取医生列表
   */
  private async getDoctorList() {
    // const {
    //   data: {
    //     data: { records }
    //   }
    // } = await this.$store.dispatch('UserList');
    const records = await this.$store.dispatch('UserList');
    const roleMark: any = {
      doctor: 'ROLE_DOCTOR',
      nurse: 'ROLE_NURSE'
    };
    // 获取医生
    this.doctorList = records.filter((item: User) => {
      for (const iterator of item.roleList ? item.roleList : []) {
        if (iterator.roleCode === roleMark.doctor) {
          this.form.handoverUserId = this.currentDoctor.userId;
          return true;
        }
      }
      return false;
    });
    this.onHandoverSubmit();
  }
  /**
   * 确定选中的交接医生
   */
  private onHandoverSubmit() {
    this.handoverDoctor.userId = this.form.handoverUserId;
    if (this.form.handoverUserId === this.form.workUserId) {
      this.form.workUserId = '';
    }
    this.getTransferList();
  }
  /**
   * 确定选中的交接医生
   */
  private onWorkSubmit() {
    this.workDoctor.userId = this.form.workUserId;
    this.transferList.forEach(
      (item) => (item.disabled = !this.workDoctor.userId)
    );
  }
  /**
   * 获取交接医生病人信息
   */
  private async getTransferList() {
    if (!this.handoverDoctor.userId) {
      return (this.transferList = []);
    }

    const { data } = await this.$store.dispatch('GetPatientList', {
      mark: 'doctor',
      userId: this.handoverDoctor.userId
    });
    this.transferList = data.data.map((item: any) => {
      item.disabled = !this.workDoctor.userId;
      return item;
    });
  }
  /**
   * 保存值班医生数据
   */
  private onSave() {
    const data = this.transferSelecteds.map((item: any) => {
      item.doctorId = this.workDoctor.userId;
      // item.nurseId = this.workDoctor.userId;
      item.createdBy = this.currentDoctor.userId;
      item.createdOn = new Date().format('yyyy-MM-dd hh:mm:ss');
      return item;
    });
    this.$store
      .dispatch('PutDoctorHandover', { mark: 'doctor', data })
      .then(() => {
        this.$message.success('交接成功');
        this.getTransferList();
        (this.$refs.handOverTable as any).clearSelection();
        this.transferSelecteds = [];
        this.$webSocket((stompClient: StompClient) => {
          stompClient.send('/bed', {});
          stompClient.disconnect();
        });
      })
      .catch((error) => {
        this.$message.error(error);
      });
  }
  private onRenderContent(h: any, option: any) {
    return (
      <span>
        {option.name}-{this.workDoctor.username}
      </span>
    );
  }
  // 自适应
  private resize() {
    this.tableHeight = window.innerHeight - 220;
  }
  // 判断是否选择接班医生
  private hasHandover(): boolean {
    return !this.form.workUserId;
  }

  // 全选
  private onSelectedAll(direction: string) {
    if (this.hasHandover()) {
      return this.$message.warning('请选择要交接的医生');
    }
    if (direction === 'forward') {
    this.transferSelecteds.push(
      ...this.transferList.map((item: any) => {
        item.userId = this.form.workUserId;
        return item;
      })
    );
    this.transferList = [];
    } else {
    this.transferList.push(
      ...this.transferSelecteds.map((item: any) => {
        item.userId = this.form.handoverUserId;
        return item;
      })
    );
    this.transferSelecteds = [];
    }
  }
  // 单选
  private onSelected(direction: string) {
    if (this.hasHandover()) {
      return this.$message.warning('请选择要交接的医生');
    }
    if (direction === 'forward') {
      this.transferSelecteds.push(
        ...this.multipleSelection.map((item: any) => {
          item.userId = this.form.handoverUserId;
          return item;
        })
      );
      this.multipleSelection.forEach((item: any) => {
        this.transferList = this.transferList.filter((iterator) => item.id !== (iterator as any).id);
      });
    } else {
      this.transferList.push(
        ...this.multipleSelection.map((item: any) => {
          item.userId = this.form.handoverUserId;
          return item;
        })
      );
      this.multipleSelection.forEach((item: any) => {
        this.transferSelecteds = this.transferSelecteds.filter((iterator) => item.id !== (iterator as any).id);
      });
    }
  }
  // 获取选中的值
  private handleSelectionChange(val: any) {
    this.multipleSelection = val;
  }
  private mounted() {
    this.getDoctorList();
    $(window).resize(this.resize);
    this.$store.commit('SET_OPBTN_VALUE', [
    {name: '保存', event: 'onSave'}
    ]);
  }
}
</script>
<style lang="less" scoped>
.HandoverDoctor {
  height: 100%;
  position: relative;
  .leftBox,
  .buttonBox,
  .rightBox {
    position: absolute;
    display: inline-block;
    top: 0;
  }
  .leftBox {
    width: calc(~"(50% - 50px)");
    height: 100%;
  }
  .buttonBox {
    width: 100px;
    left: calc(~"(50% - 50px)");
    text-align: center;
    height: 50%;
    > div {
      position: absolute;
      bottom: -39.6px;
      width: 100%;
    }
    .el-button {
      margin-top: 8px;
      margin-bottom: 8px;
    }
  }
  .rightBox {
    width: calc(~"(50% - 50px)");
    height: 100%;
    right: 0;
  }
  .tool {
    text-align: center;
    position: relative; 
    bottom: -80%;
  }
}
</style>
