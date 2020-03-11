<template>
  <div class="nurseIndex">
    <div class="box">
      <el-form :model="patientData" status-icon :rules="rules" ref="patientData" label-width="170px">
        <div class="leftPannel">
          <div class="basicInfo">
            <h1>病人基本信息</h1>
            <el-scrollbar style="height:calc(100% - 60px)">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="挂号ID：" prop="patientVisit.hisCode">
                    <el-input type="text" v-model="patientData.patient.visitCard" autocomplete="off" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="姓名：">
                    <el-input type="text" v-model="patientData.patient.name" autocomplete="off" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证：" prop="patient.residentIdentityCard">
                    <el-input type="text" v-model="patientData.patient.residentIdentityCard" autocomplete="off" @change="hisLogInfo" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="出生日期：" prop="patient.birthday">
                    <yn-date-time-pick v-model="patientData.patient.birthday" style="width:100%" type="date" placeholder="选择日期" @change="onBirthday" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="年龄：">
                    <el-input type="text" v-model="patientData.patient.age" autocomplete="off">
                      <template slot="append">岁</template>
                    </el-input>
                    <!-- <el-row class="ageClass">
                      <el-col :span="8">
                        <el-input
                          type="text"
                          v-model="patientData.patient.age"
                          autocomplete="off"
                        >
                          <template slot="append">岁</template>
                        </el-input>
                      </el-col> -->
                    <!-- <el-col :span="8">
                        <el-input
                          type="text"
                          v-model="patientData.patient.ageMonth"
                          autocomplete="off"
                        >
                          <template slot="append">月</template>
                        </el-input>
                      </el-col> -->
                    <!-- <el-col :span="8">
                        <el-input
                          type="text"
                          v-model="patientData.patient.ageDay"
                          autocomplete="off"
                        >
                          <template slot="append">天</template>
                        </el-input>
                      </el-col> -->
                    <!-- </el-row> -->
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="性别：" prop="patient.gender">
                    <el-radio-group v-model="patientData.patient.gender">
                      <el-radio v-for="(item,i) in dictFilter('sex')" :label="item.value" :key="i">{{item.label}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="费别：" prop="patientVisit.feeType">
                    <el-select v-model="patientData.patientVisit.feeType" placeholder="请选择费别">
                      <el-option v-for="(item,i) in dictFilter('cost_type')" :label="item.label" :key="i" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="婚姻状况：" prop="patient.maritalStatus">
                    <el-radio-group v-model="patientData.patient.maritalStatus">
                      <el-radio :label="item.value" v-for="(item, i) in dictFilter('marital_status')" :key="i">{{item.label}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="民族：" prop="patient.nationId">
                    <el-select v-model="patientData.patient.nationId" placeholder="请选择民族" filterable>
                      <el-option v-for="(item,i) in nations" :label="item.name" :value="item.id" :key="i"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="电话：" prop="patient.phone">
                    <el-input type="text" v-model="patientData.patient.phone" autocomplete="off" />
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item label="原籍：" prop="patient.nativePlace">
                    <el-input type="text" v-model="patientData.patient.nativePlace" autocomplete="off" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="住址：" prop="patient.addressDetail">
                    <el-input type="text" v-model="patientData.patient.addressDetail" autocomplete="off" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="门急诊记录：">
                    <el-table :data="hisLogData.clinic" border style="width: 100%" highlight-current-row ref="singleTable">
                      <!-- <el-table-column prop="visitDate" label="就诊日期" /> -->
                      <el-table-column prop="registeringDate" label="挂号日期" />
                      <el-table-column prop="firstVisitIndicator" label="初诊标志" />
                      <el-table-column prop="visitDept" label="就诊科室" />
                      <el-table-column prop="visitSpecialClinic" label="就诊专科" />
                      <el-table-column prop="symptom" label="症状" />
                    </el-table>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="住院记录：">
                    <el-table :data="hisLogData.hospital" border style="width: 100%" highlight-current-row ref="singleTable">
                      <el-table-column prop="admissionDateTime" label="入院日期" />
                      <el-table-column prop="deptAdmissionTo" label="入院科室" />
                      <el-table-column prop="dischargeDateTime" label="出院日期" />
                      <el-table-column prop="deptDischargeFrom" label="出院科室" />
                      <el-table-column prop="patientClass" label="入院方式" />
                      <el-table-column prop="patAdmCondition" label="入院病情" />
                    </el-table>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-scrollbar>
          </div>
          <div class="admissionInfo">
            <h1>到院信息</h1>
            <el-scrollbar style="height:calc(100% - 60px)">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="到院时间：" prop="patientTriage.arrivalDate">
                    <yn-date-time-pick v-model="patientData.patientTriage.arrivalDate" type="datetime" placeholder="选择日期时间" />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="主诉：" prop="patientTriage.illnessState">
                    <!-- <el-input
                      type="text"
                      v-model="patientData.patientTriage.illnessState"
                      autocomplete="off"
                    /> -->
                    <SelectTree v-model="patientData.patientTriage.illnessState" :disabled="true" :default-expand-all="true"></SelectTree>
                    <!-- <el-cascader v-if="symptomList.length > 0" :options="symptomList" v-model="patientData.patientTriage.illnessState" style="width: 100%;" /> -->
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="到院方式：" prop="patientTriage.arrivalMethod">
                    <el-radio-group v-model="patientData.patientTriage.arrivalMethod">
                      <el-radio :label="x.value" v-for="(x, index) in dictFilter('get_to_hospital_type')" :key="index">{{x.label}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="首次医疗接触：" prop="patientTriage.firstMedicalContact">
                    <el-radio-group v-model="patientData.patientTriage.firstMedicalContact">
                      <el-radio :label="x.value" v-for="(x, index) in dictFilter('first_medical_contact')" :key="index">{{x.label}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="出车单位：" v-if="patientData.patientTriage.firstMedicalContact===getToHospitalType[0].value||patientData.patientTriage.firstMedicalContact===getToHospitalType[1].value" class="widthAll">
                    <el-radio-group v-model="patientData.patientTriage.dispatchUnitName">
                      <el-radio v-for="(item,i) in dictFilter('dispatchUnitCode')" :key="i" :label="item.value">{{item.label}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否网络医院：" v-if="patientData.patientTriage.firstMedicalContact===getToHospitalType[1].value">
                    <el-radio-group v-model="patientData.patientTriage.isNetWordHospital">
                      <el-radio v-for="(item,i) in isIf" :key="i" :label="item.value">{{item.label}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="医院名称：" v-if="patientData.patientTriage.firstMedicalContact===getToHospitalType[1].value||patientData.patientTriage.firstMedicalContact===getToHospitalType[4].value">
                    <el-input type="text" v-model="patientData.patientTriage.hospitalName" autocomplete="off" />
                  </el-form-item>
                  <el-form-item label="转出医院入门时间：" v-if="patientData.patientTriage.firstMedicalContact===getToHospitalType[1].value">
                    <yn-date-time-pick v-model="patientData.patientTriage.outHospitalVisitTime" type="datetime" placeholder="选择日期时间" />
                  </el-form-item>
                  <el-form-item label="决定转院时间：" v-if="patientData.patientTriage.firstMedicalContact===getToHospitalType[1].value">
                    <yn-date-time-pick v-model="patientData.patientTriage.transferTime" type="datetime" placeholder="选择日期时间" />
                  </el-form-item>
                  <el-form-item label="转运救护车到达时间：" v-if="patientData.patientTriage.firstMedicalContact===getToHospitalType[1].value">
                    <yn-date-time-pick v-model="patientData.patientTriage.ambulanceArrivedTime" type="datetime" placeholder="选择日期时间" />
                  </el-form-item>
                  <el-form-item label="离开转出医院：" v-if="patientData.patientTriage.firstMedicalContact===getToHospitalType[1].value">
                    <yn-date-time-pick v-model="patientData.patientTriage.leaveOuthospitalTime" type="datetime" placeholder="选择日期时间" />
                  </el-form-item>
                  <el-form-item label="出诊医生到达现场时间：" v-if="patientData.patientTriage.firstMedicalContact===getToHospitalType[0].value">
                    <yn-date-time-pick v-model="patientData.patientTriage.arrivedSceneTime" type="datetime" placeholder="选择日期时间" />
                  </el-form-item>
                  <el-form-item label="到达本院大门：" v-if="patientData.patientTriage.firstMedicalContact===getToHospitalType[0].value||
                      patientData.patientTriage.firstMedicalContact===getToHospitalType[1].value||
                      patientData.patientTriage.firstMedicalContact===getToHospitalType[2].value">
                    <yn-date-time-pick v-model="patientData.patientTriage.arrivedHospitalTime" type="datetime" placeholder="选择日期时间" />
                  </el-form-item>
                  <el-form-item label="院内接诊时间：" v-if="patientData.patientTriage.firstMedicalContact===getToHospitalType[0].value||
                  patientData.patientTriage.firstMedicalContact===getToHospitalType[1].value||patientData.patientTriage.firstMedicalContact===getToHospitalType[2].value">
                    <yn-date-time-pick v-model="patientData.patientTriage.inhospitalAdmissionTime" type="datetime" placeholder="选择日期时间" />
                  </el-form-item>
                  <el-form-item label="患者绕行CCU：" v-if="patientData.patientTriage.firstMedicalContact===getToHospitalType[2].value">
                    <el-radio-group v-model="patientData.patientTriage.isBypassCcu">
                      <el-radio v-for="(item,i) in isIf" :key="i" :label="item.value">{{item.label}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="患者绕行急诊：" v-if="patientData.patientTriage.firstMedicalContact===getToHospitalType[0].value||patientData.patientTriage.firstMedicalContact===getToHospitalType[1].value">
                    <el-radio-group v-model="patientData.patientTriage.isBypassEmergency">
                      <el-radio v-for="(item,i) in isIf" :key="i" :label="item.value">{{item.label}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="到达时间：" v-if="patientData.patientTriage.firstMedicalContact===getToHospitalType[0].value||patientData.patientTriage.firstMedicalContact===getToHospitalType[1].value">
                    <yn-date-time-pick v-model="patientData.patientTriage.arrivedEmergencyTime" type="datetime" placeholder="选择日期时间" />
                  </el-form-item>
                  <el-form-item label="发病科室：" v-if="patientData.patientTriage.firstMedicalContact===getToHospitalType[3].value">
                    <el-input type="attackDepartment" v-model="patientData.patientTriage.attackDepartment" autocomplete="off" />
                  </el-form-item>
                  <el-form-item label="会诊时间：" v-if="patientData.patientTriage.firstMedicalContact===getToHospitalType[3].value">
                    <yn-date-time-pick v-model="patientData.patientTriage.consultationTime" type="datetime" placeholder="选择日期时间" />
                  </el-form-item>
                  <el-form-item label="离开科室时间：" v-if="patientData.patientTriage.firstMedicalContact===getToHospitalType[3].value">
                    <yn-date-time-pick v-model="patientData.patientTriage.leaveDepartmentTime" type="datetime" placeholder="选择日期时间" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="是否绿色通道：">
                    <el-radio-group v-model="patientData.patientTriage.ifGreenChannel">
                      <el-radio v-for="(item,i) in isIf" :key="i" :label="item.value">{{item.label}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否胸痛：">
                    <el-radio-group v-model="patientData.patientTriage.ifThoracalgia">
                      <el-radio v-for="(item,i) in isIf" :key="i" :label="item.value">{{item.label}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="发热门诊：">
                    <el-radio-group v-model="patientData.patientTriage.ifFever">
                      <el-radio v-for="(item,i) in isIf" :key="i" :label="item.value">{{item.label}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>

              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="不明原因死亡：">
                    <el-radio-group v-model="patientData.patientTriage.ifNoreasonDeath">
                      <el-radio v-for="(item,i) in isIf" :key="i" :label="item.value">{{item.label}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="三无人员：">
                    <el-radio-group v-model="patientData.patientTriage.ifWithoutId">
                      <el-radio v-for="(item,i) in isIf" :key="i" :label="item.value">{{item.label}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="陪送人员：" prop="patientTriage.accompany">
                    <el-input :disabled="patientData.patientTriage.ifWithoutId==0" type="text" v-model="patientData.patientTriage.accompany" autocomplete="off" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="陪送电话：" prop="patientTriage.accompanyPhone">
                    <el-input :disabled="patientData.patientTriage.ifWithoutId==0" type="text" v-model="patientData.patientTriage.accompanyPhone" autocomplete="off" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="陪送关系：" prop="patientTriage.accompanyRelation">
                    <el-select :disabled="patientData.patientTriage.ifWithoutId==0" v-model="patientData.patientTriage.accompanyRelation" placeholder="请选择陪送关系">
                      <el-option :label="x.label" :value="x.value" v-for="(x, index) in dictFilter('leave_status')" :key="index" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="陪送地址：" prop="patientTriage.accompanyAddress">
                    <el-input :disabled="patientData.patientTriage.ifWithoutId==0" type="text" v-model="patientData.patientTriage.accompanyAddress" autocomplete="off" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-scrollbar>
          </div>
        </div>
        <div class="rightPannel">
          <div class="vitalSign">
            <h1>生命特征</h1>
            <el-scrollbar style="height:calc(100% - 60px)">
              <!-- <el-row>
                <el-col :span="24">
                  <el-form-item
                    label="生命体征："
                    prop="vitalSign.visitId"
                  >
                    <el-radio-group v-model="patientData.vitalSign.visitId">
                      <el-radio
                        v-for="(item, i) in dictFilter('life_characteristics')"
                        :key="i"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row> -->
              <el-row>
                <el-col :span="24">
                  <el-form-item label="获取设备信息：">
                    <el-button @click="onWorkstation">获取</el-button>
                    <!-- <el-cascader v-if="workstationList.length > 0" :options="workstationList" @change="onWorkstation"
                v-model="patientData.vitalSign.equipmentId" style="width: 100%;"/> -->
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="收缩压(mmHg)：" prop="vitalSign.systolicPressure">
                    <!-- @change="onVitalSign" -->
                    <el-input type="number" v-model="patientData.vitalSign.systolicPressure" autocomplete="off" @focus="onSetValue('systolicPressure', '')" min='0' />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="舒张压(mmHg)：" prop="vitalSign.diastolicPressure">
                    <el-input type="number" v-model="patientData.vitalSign.diastolicPressure" autocomplete="off" @focus="onSetValue('diastolicPressure', '')" min='0' />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="心率(次/分)：" prop="vitalSign.heartRate">
                    <el-input type="number" v-model="patientData.vitalSign.heartRate" autocomplete="off" @focus="onSetValue('heartRate', '')" min='0' />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="血氧饱和度(%)：" prop="vitalSign.so2">
                    <el-input type="number" v-model="patientData.vitalSign.so2" autocomplete="off" @focus="onSetValue('so2', '')" min='0' />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="体温(℃)：" prop="vitalSign.temperature">
                    <el-input type="number" v-model="patientData.vitalSign.temperature" autocomplete="off" @focus="onSetValue('temperature', '')" min='0' />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="呼吸(次/分)：" prop="vitalSign.breathe">
                    <el-input type="number" v-model="patientData.vitalSign.breathe" autocomplete="off" @focus="onSetValue('breathe', '')" min='0' />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div style="margin-left: 79px;">意识：</div>
                  <el-form-item style="margin-left: -100px;" prop="vitalSign.status">
                    <el-radio-group v-model="consciousness" @change="setValue">
                      <el-radio v-for="(item,i) in consciousnessArray" :key="i" :label="item.value">{{item.label}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-scrollbar>
          </div>
          <div class="score">
            <h1>评分</h1>
            <el-scrollbar style="height:calc(100% - 60px);">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="MEWS评分：">
                    <el-input type="text" v-model="patientData.patientTriage.severityLevelScore" autocomplete="off" :disabled="true" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-scrollbar>
          </div>
          <div class="allergy">
            <h1>过敏状况</h1>
            <router-link :to="{name:'hisHospitalLog'}">
              <h1 style="color:#0071BC">住院历史记录{{hisLog.inHospitalTimes}}</h1>
            </router-link>
            <div class="tool">
              <el-tooltip effect="dark" content="添加" placement="top-end">
                <el-button icon="el-icon-plus" size="mini" circle @click="onAddPatientIrritability"></el-button>
              </el-tooltip>
            </div>
            <el-scrollbar style="height:calc(100% - 60px)">
              <el-row v-for="(item,i) in patientData.patientIrritability" :key="i">
                <el-col :span="11">
                  <el-form-item label="过敏对象：" :prop="`objectType${i}`">
                    <el-input type="text" v-model="item.objectType" autocomplete="off" />
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="对象类型：" :prop="`anaphylactogen${i}`">
                    <el-input type="text" v-model="item.anaphylactogen" autocomplete="off" />
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <el-tooltip effect="dark" content="删除" placement="top-end">
                    <el-button v-if="i!=0" @click="onDelectPatientIrritability(i)" icon="el-icon-delete" class="delete" size="mini" circle></el-button>
                  </el-tooltip>
                </el-col>
              </el-row>
            </el-scrollbar>
          </div>
        </div>
        <div class="footer">
          <el-row>
            <el-col :span="4">
              <el-form-item label="科室：" prop="patientTriage.departmentId">
                <el-cascader v-if="deptList.length > 0" :options="deptList" v-model="patientData.patientTriage.departmentId" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="系统分级：">
                <el-radio-group v-model="patientData.patientTriage.severityLevelSys">
                  <el-radio :disabled="true" v-for="(item,i) in dictFilter('grade')" :key="i" :label="item.value" :class="{grade1:i===0||i===1, grade2:i===2, grade3:i===3}">{{item.label}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="手动分级：" prop="patientTriage.severityLevelMannul">
                <el-radio-group v-model="patientData.patientTriage.severityLevelMannul">
                  <el-radio v-for="(item,i) in dictFilter('grade')" :key="i" :label="item.value" :class="{grade1:i===0||i===1, grade2:i===2, grade3:i===3}">{{item.label}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="4" class="levelNote">
              <el-form-item label="修订分级说明：" prop="patientTriage.severityLevelReason">
                <el-input type="text" v-model="patientData.patientTriage.severityLevelReason" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button class="triage" @click="onSave">确认分诊</el-button>
              <!-- <el-button>打印</el-button> -->
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
    <SelectPatient :tableData="patientTableData" @submit="onSubmit" @search="onSearch" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Config from '@/util/config';
import { mews, deepClone, systemClass } from '@/util/util';
import SelectPatient from '@/components/nurse/SelectPatient.vue';
import SelectTree from '@/components/SelectTree.vue';
const df = Vue.filter('dictFilter');
const isIf = df('is_if').sort((a: any, b: any) => a.sort - b.sort);
interface Common {
  config: any;
}
interface PatientIrritability {
  // 就诊ID
  visitId: string;
  // 过敏原类型
  objectType: string;
  // 过敏原
  anaphylactogen: string;
  // 症状
  symptom: string;
}
/**
 * 病人数据
 */
interface PatientData {
  /**
   * 病人过敏
   */
  patientIrritability: PatientIrritability[];
  /**
   * 分诊信息
   */
  patientTriage: {
    // 就诊ID
    visitId: number;
    // 监护仪ID
    monitorId: string;
    // 生命体征ID
    vitalSignId: string;
    // 心电图机ID
    eegId: string;
    // 心电图ID
    eegRecordId: string;
    // 系统判定得分
    severityLevelScore: string;
    // 系统判定严重程度
    severityLevelSys: string;
    // 调整后严重程度
    severityLevelMannul: string;
    // 调整原因
    severityLevelReason: string;
    // 科室
    departmentId: number | string[];
    // 主治医生
    doctorId: string;
    // 责任护士
    nurseId: string;
    // 区域
    section: string;
    // 床号
    bedCode: string;
    // 诊断编码
    diagnosisCode: string;
    // 诊断
    diagnosis: string;
    // 是否三无人员
    ifWithoutId: string;
    // 陪送人员
    accompany: string;
    // 陪送人员电话
    accompanyPhone: string;
    // 陪送人员关系
    accompanyRelation: string;
    // 陪送人员地址
    accompanyAddress: string;
    // 首次医疗接触
    firstMedicalContact: string;
    // 是否绿色通道
    ifGreenChannel: string;
    // 是否发热
    ifFever: string;
    // 是否胸痛
    ifThoracalgia: string;
    // 不明原因死亡
    ifNoreasonDeath: string;
    // 发病时间
    diseaseDate: string;
    // 首次急救时间
    firstAidDate: string;
    // 首次急救人员
    firstAidPersonId: string;
    // 救护车接到时间
    onAmbulanceDate: string;
    // 到院时间
    arrivalDate: number;
    // 接诊时间
    treatDate: string;
    // 出急诊时间
    outDate: string;
    // 出急诊方式
    outType: string;
    // 出急诊目的地
    outDest: string;
    // 到院方式
    arrivalMethod: string;
    // 到院来源
    arrivalSource: string;
    // 病情
    illnessState: string | string[];
    // 状态
    status: string;
    ambulanceArrivedTime: string;
    arrivedSceneTime: string;
    transferTime: string;
    outHospitalVisitTime: string;
    leaveOuthospitalTime: string;
    arrivedHospitalTime: string;
  };
  /**
   * 病人传染病学史
   */
  patientEpidemiologyHistory: {
    // 病人ID
    patientId: string;
    // 就诊ID
    visitId: string;
    // 34小时体温超过38
    if38In34hour: string;
    // 入院前3天有发热病学史
    ifFeverIn3day: string;
    // 最近一周疫区旅游史地区
    travelInfectedArea: string;
  };
  /**
   * 就诊基础信息
   */
  patientVisit: {
    // HIS编码
    hisCode: string;
    // 身份类型
    identityType: string;
    // 就诊类型
    visitType: string;
    // 价格
    price: string;
    // 是否付费
    ifPaid: number;
    // 就诊编码
    visitCode: string;
    // 费别
    feeType: string;
    // 科室
    departmentId: number;
    // 主治医生
    doctorId: number;
    // 责任护士
    nurseId: number;
    // 诊断
    diagnosis: string;
    // 叫号时间
    callDate: string;
    // 接诊时间
    visitDate: string;
    // 结束时间
    endDate: string;
    // 病情
    illnessState: string | string[],
    // 状态
    status: string;
  };
  /**
   * 病人医学评估
   */
  patientMedicalEvaluation: {
    // 就诊ID
    visitId: string;
    // 医学评估ID
    medicalEvaluationId: number;
    // 结果
    score: number;
    // 结果
    level: number;
  };
  /**
   * 病人医学评估参数表
   */
  patientMedicalEvaluationParam: {
    // 就诊ID
    visitId: number;
    // 病人医学评估ID
    patientMedicalEvaluationId: number;
    // 名称
    name: string;
    // 指向对象
    referenceObject: string;
    // 指向对象ID
    referenceObjectId: string;
    // 指向对象Json
    referenceObjectValue: string;
  };
  /**
   * 病人信息
   */
  patient: {
    // HIS编码
    hisCode: string;
    // 身份证号
    residentIdentityCard: string;
    // 医保卡号
    medicalInsuranceId: string;
    // 就诊卡号
    visitCard: string;
    // 病人姓名
    name: string;
    // 病人性别
    gender: string;
    // 出生日期
    birthday: string;
    // 年龄
    age: string;
    ageMonth: string;
    ageDay: string;
    // 婚姻状况
    maritalStatus: string;
    // 民族
    nationId: string;
    // 籍贯
    nativePlace: string;
    // 联系电话
    phone: string;
    // 详情地址
    addressDetail: string

  };
  /**
   * 病人位置
   */
  patientPosition: {
    // 就诊ID
    visitId: number;
    // 来源位置ID
    previousPositionId: number;
    // 科室ID
    departmentId: number;
    // 原因
    reason: string;
    // 主治医生
    doctorId: number;
    // 责任护士
    nurseId: number;
    // 区域
    section: string;
    // 床号
    bedCode: string;
    // 开始时间
    beginDate: string;
    // 结束时间
    endDate: string;
    // 状态
    status: string
  };
  /**
   * 病人等级
   */
  patientLevel: {
    // 就诊ID
    visitId: number;
    // 严重程度
    severityLevelSys: string;
    // 医生
    doctorId: number;
    // 状态
    status: string
  };
  /**
   * 生命特征
   */
  vitalSign: {
    id: number | null;
    /**
     * 就诊ID
     */
    visitId: number;
    /**
     * 设备ID
     */
    equipmentId: number | string[];
    /**
     * 呼吸次数
     */
    breathe: string;
    /**
     * 体温
     */
    temperature: string;
    /**
     * 心率
     */
    heartRate: string;
    /**
     * 舒张压
     */
    diastolicPressure: string;
    /**
     * 收缩压
     */
    systolicPressure: string;
    /**
     * 血氧饱和度
     */
    so2: string;
    /**
     * 采样时间
     */
    samplingDate: string;
    /**
     * 记录时间
     */
    recordDate: string;
    /**
     * 状态
     */
    status: string;
  };

}
interface PatientVO {
  patientId: string;
  visitId: string;
  name: string;
  gender: string;
  birthday: string;
  age: 0;
  ageMonth: 0;
  ageDay: 0;
  section: string;
  bedCode: string;
  arrivalDate: string;
  severityLevelSys: string;
  diagnosisList: string;
  status: string;
  doctorName: string;
  nurseName: string;
  firstMedicalContact: string;
  endDate: string;
  nationId: string;
  residentIdentityCard: string;
  visitCard: string;
  nativePlace: string;
  addressDetail: string;
  maritalStatus: string;
  feeType: string;
  phone: string;
  arrivalMethod: string;
  ifWithoutId: string;
  accompany: string;
  accompanyAddress: string;
  accompanyPhone: string;
  accompanyRelation: string;
  ifGreenChannel: string;
  ifFever: string;
  ifThoracalgia: string;
  ifNoreasonDeath: string;
  breathe: string;
  temperature: string;
  heartRate: string;
  diastolicPressure: string;
  systolicPressure: string;
  so2: string;
  illnessState: string;
}
@Component({
  components: {
    SelectPatient,
    SelectTree
  },
  metaInfo: {
    titleTemplate: '%s-预检分诊'
  }
})
export default class PreTriage extends Vue {
  public ruleForm2: any = {};
  public hisLog: any = {};
  public rules: any = {
    patient: {
      // name: [common.rules().required()],
      // residentIdentityCard: [common.rules().required()],
      // visitCard: [common.rules().required()],
      // birthday: [common.rules().required()],
      // age: [common.rules().required()],
      // gender: [common.rules().required()],
      // feeType: [common.rules().required()],
      // maritalStatus: [common.rules().required()],
      // nationId: [common.rules().required()],
      // phone: [common.rules().required()],
      // nativePlace: [common.rules().required()],
      // addressDetail: [common.rules().required()]
    },
    patientTriage: {
      arrivalDate: [common.rules().required()],
      arrivalMethod: [common.rules().required()],
      // accompany: [common.rules().required()],
      // accompanyPhone: [common.rules().required()],
      // accompanyRelation: [common.rules().required()],
      // accompanyAddress: [common.rules().required()],
      // illnessState: [common.rules().required()],
      // departmentId: [common.rules().required()],
      // severityLevelSys: [common.rules().required()],
      severityLevelMannul: [common.rules().required()],
      // severityLevelReason: [common.rules().required()]
    }
    ,
    vitalSign: {
      // visitId: [common.rules().required()],
      // equipmentId: [common.rules().required()],
      // breathe: [common.rules().required()],
      // temperature: [common.rules().required()],
      // heartRate: [common.rules().required()],
      // diastolicPressure: [common.rules().required()],
      // systolicPressure: [common.rules().required()],
      // so2: [common.rules().required()]
    }
  };
  public nations = ((common as any).config as any).nations;
  public patientData: PatientData = {
    // 病人过敏
    patientIrritability: [{
      // 就诊ID
      visitId: '',
      // 过敏原类型
      objectType: '',
      // 过敏原
      anaphylactogen: '',
      // 症状
      symptom: ''
    }],
    // 分诊信息
    patientTriage: {
      // 就诊ID
      visitId: 0,
      // 监护仪ID
      monitorId: '',
      // 生命体征ID
      vitalSignId: '',
      // 心电图机ID
      eegId: '',
      // 心电图ID
      eegRecordId: '',
      // 系统判定得分
      severityLevelScore: '',
      // 系统判定严重程度
      severityLevelSys: '4',
      // 调整后严重程度
      severityLevelMannul: '4',
      // 调整原因
      severityLevelReason: '',
      // 科室
      departmentId: ['1', '12'],
      // 主治医生
      doctorId: '',
      // 责任护士
      nurseId: '',
      // 区域
      section: '',
      // 床号
      bedCode: '',
      // 诊断编码
      diagnosisCode: '',
      // 诊断
      diagnosis: '',
      // 是否三无人员
      ifWithoutId: '0',
      // 陪送人员
      accompany: '',
      // 陪送人员电话
      accompanyPhone: '',
      // 陪送人员关系
      accompanyRelation: '',
      // 陪送人员地址
      accompanyAddress: '',
      // 首次医疗接触
      firstMedicalContact: '',
      // 是否绿色通道
      ifGreenChannel: '0',
      // 是否发热
      ifFever: '0',
      // 是否胸痛
      ifThoracalgia: '0',
      // 不明原因死亡
      ifNoreasonDeath: '0',
      // 发病时间
      diseaseDate: '',
      // 首次急救时间
      firstAidDate: '',
      // 首次急救人员
      firstAidPersonId: '',
      // 救护车接到时间
      onAmbulanceDate: '',
      // 到院时间
      arrivalDate: Date.now(),
      // 接诊时间
      treatDate: '',
      // 出急诊时间
      outDate: '',
      // 出急诊方式
      outType: '',
      // 出急诊目的地
      outDest: '',
      // 到院方式
      arrivalMethod: '3',
      // 到院来源
      arrivalSource: '',
      // 病情
      illnessState: '',
      // 状态
      status: '',
      ambulanceArrivedTime: '',
      arrivedSceneTime: '',
      transferTime: '',
      outHospitalVisitTime: '',
      leaveOuthospitalTime: '',
      arrivedHospitalTime: ''
    },
    // 病人传染病学史
    patientEpidemiologyHistory: {
      // 病人ID
      patientId: '',
      // 就诊ID
      visitId: '',
      // 34小时体温超过38
      if38In34hour: '',
      // 入院前3天有发热病学史
      ifFeverIn3day: '',
      // 最近一周疫区旅游史地区
      travelInfectedArea: ''
    },
    // 就诊基础信息
    patientVisit: {
      // HIS编码
      hisCode: '',
      // 身份类型
      identityType: '',
      // 就诊类型
      visitType: '',
      // 价格
      price: '',
      // 是否付费
      ifPaid: 0,
      // 就诊编码
      visitCode: '',
      // 费别
      feeType: '',
      // 科室
      departmentId: 0,
      // 主治医生
      doctorId: 0,
      // 责任护士
      nurseId: 0,
      // 诊断
      diagnosis: '',
      // 叫号时间
      callDate: '',
      // 接诊时间
      visitDate: '',
      // 结束时间
      endDate: '',
      // 病情
      illnessState: '',
      // 状态
      status: ''
    },
    // 病人医学评估
    patientMedicalEvaluation: {
      // 就诊ID
      visitId: '',
      // 医学评估ID
      medicalEvaluationId: 0,
      // 结果
      score: 0,
      // 结果
      level: 0
    },
    // 病人医学评估参数表
    patientMedicalEvaluationParam: {
      // 就诊ID
      visitId: 0,
      // 病人医学评估ID
      patientMedicalEvaluationId: 0,
      // 名称
      name: '',
      // 指向对象
      referenceObject: '',
      // 指向对象ID
      referenceObjectId: '',
      // 指向对象Json
      referenceObjectValue: ''
    },
    // 病人信息
    patient: {
      // HIS编码
      hisCode: '',
      // 身份证号
      residentIdentityCard: '',
      // 医保卡号
      medicalInsuranceId: '',
      // 就诊卡号
      visitCard: '',
      // 病人姓名
      name: '',
      // 病人性别
      gender: '1',
      // 出生日期
      birthday: '',
      // 年龄
      age: '',
      ageMonth: '',
      ageDay: '',
      // 婚姻状况
      maritalStatus: '1',
      // 民族
      nationId: '1',
      // 籍贯
      nativePlace: '',
      // 联系电话
      phone: '',
      // 详情地址
      addressDetail: ''

    },
    // 病人位置
    patientPosition: {
      // 就诊ID
      visitId: 0,
      // 来源位置ID
      previousPositionId: 0,
      // 科室ID
      departmentId: 0,
      // 原因
      reason: '',
      // 主治医生
      doctorId: 0,
      // 责任护士
      nurseId: 0,
      // 区域
      section: '',
      // 床号
      bedCode: '',
      // 开始时间
      beginDate: '',
      // 结束时间
      endDate: '',
      // 状态
      status: ''
    },
    // 病人等级
    patientLevel: {
      // 就诊ID
      visitId: 0,
      // 严重程度
      severityLevelSys: '',
      // 医生
      doctorId: 0,
      // 状态
      status: ''
    },
    /**
     * 生命特征
     */
    vitalSign: {
      id: 0,
      visitId: 0,
      equipmentId: [],
      breathe: '',
      temperature: '',
      heartRate: '',
      diastolicPressure: '',
      systolicPressure: '',
      so2: '',
      samplingDate: '',
      recordDate: '',
      status: ''
    }
  };
  public isIf = isIf;
  public deptList = [];
  public symptomList = [];
  public workstationList = [];
  public stompClient: any = {};
  /**
   * 挂号列表
   */
  public patientTableData = [];
  public consciousnessArray = [
    {
      label: '完全清醒',
      value: 0
    },
    {
      label: '无反应',
      value: 3
    },
    {
      label: '对疼痛有反应',
      value: 2
    },
    {
      label: '对声音有反应',
      value: 1
    }
  ];

  public consciousness = -1;
  public getToHospitalType = df('get_to_hospital_type');
  private hisLogData: any = {};
  public dictFilter = (type: string) => df(type);
  // 选择器递归
  public recursion = (dept: any) => {
    return dept.map((item: any) => {
      return {
        label: String(item.name),
        value: String(item.id),
        children: item.children && item.children.length > 0 ? this.recursion(item.children) : null
      };
    });
  }
  /**
   * 查询部门
   */
  public selectDeptList() {
    this.$store.dispatch('DeptList').then(({ data }) => {
      const obj = data.data;
      this.deptList = this.recursion(obj);
    });
  }
  /**
   * 查询工作站
   */
  public selectWorkstationList() {
    this.$store.dispatch('Workstation').then(({ data }) => {
      this.workstationList = data.data;
    });
  }
  /**
   * 查询主诉
   */
  public selectSymptomList() {
    this.$store.dispatch('SymptomTree').then(({ data }) => {
      this.symptomList = data.data;
    });
  }
  /**
   * 工作站事件
   */
  public onWorkstation() {
    // last/equipmentId  设备获取生命特征
    this.$store.dispatch('LifeCharacteristicsByEquipment', { id: 8 }).then(({ data }) => {
      // data.data.equipmentId = this.patientData.vitalSign.equipmentId;
      if(!data.data) {
        return;
      }
      this.patientData.vitalSign = data.data;
      this.setValue();
    });
  }
  /**
   * 设置评分
   */
  public setValue() {
    if (this.patientData.vitalSign.systolicPressure === '') {
      this.$message.error('收缩压不能为空');
      return;
    }
    if (this.patientData.vitalSign.diastolicPressure === '') {
      this.$message.error('舒张压不能为空');
      return;
    }
    if (this.patientData.vitalSign.heartRate === '') {
      this.$message.error('心率不能为空');
      return;
    }
    if (this.patientData.vitalSign.so2 === '') {
      this.$message.error('血氧饱和度不能为空');
      return;
    }
    if (this.patientData.vitalSign.temperature === '') {
      this.$message.error('体温不能为空');
      return;
    }
    if (this.patientData.vitalSign.breathe === '') {
      this.$message.error('呼吸次数不能为空');
      return;
    }
    const consciousnessArr = [0, 1, 2, 3];
    const consciousnessVal = this.consciousness !== -1 ? consciousnessArr[this.consciousness] : 0;
    this.patientData.vitalSign.status = this.consciousnessArray[consciousnessVal].label;
    this.patientData.patientTriage.severityLevelScore = String(mews(this.patientData.vitalSign) + consciousnessVal);
    this.patientData.patientTriage.severityLevelSys = String(
      systemClass(Number(this.patientData.patientTriage.severityLevelScore)));
    this.patientData.patientTriage.severityLevelMannul = this.patientData.patientTriage.severityLevelSys;
  }
  public onVitalSign() {
    this.patientData.vitalSign.id = null;
    this.setValue();
  }
  /**
   * 过敏状况添加
   */
  public onAddPatientIrritability() {
    this.patientData.patientIrritability.unshift({
      // 就诊ID
      visitId: '',
      // 过敏原类型
      objectType: '',
      // 过敏原
      anaphylactogen: '',
      // 症状
      symptom: ''
    });
  }
  /**
   * 过敏状况删除
   */
  public onDelectPatientIrritability(i: number) {
    this.patientData.patientIrritability.splice(i, 1);
  }
  /**
   * 保存
   */
  public onSave() {
    const patientData = JSON.parse(JSON.stringify(this.patientData));
    patientData.patientTriage.departmentId = (this.patientData.patientTriage.departmentId as any)
    [(this.patientData.patientTriage.departmentId as any).length - 1];
    patientData.vitalSign.equipmentId = (patientData.vitalSign.equipmentId as any)
    [(patientData.vitalSign.equipmentId as any).length - 1];
    patientData.patientTriage.arrivalDate = new Date(this.patientData.patientTriage.arrivalDate as any)
      .format('yyyy-MM-dd hh:mm:ss');
    patientData.patientTriage.arrivedSceneTime = patientData.patientTriage.arrivedSceneTime ?
      new Date((this.patientData.patientTriage as any).arrivedSceneTime as any).format('yyyy-MM-dd hh:mm:ss') : '';
    patientData.patientTriage.ambulanceArrivedTime = patientData.patientTriage.ambulanceArrivedTime ?
      new Date((this.patientData.patientTriage as any).ambulanceArrivedTime as any).format('yyyy-MM-dd hh:mm:ss') : '';
    patientData.patientTriage.transferTime = patientData.patientTriage.transferTime ?
      new Date(((this.patientData.patientTriage as any).transferTime as any)).format('yyyy-MM-dd hh:mm:ss') : '';
    patientData.patientTriage.outHospitalVisitTime = patientData.patientTriage.outHospitalVisitTime ?
      new Date(((this.patientData.patientTriage as any).outHospitalVisitTime as any))
        .format('yyyy-MM-dd hh:mm:ss') : '';
    patientData.patientTriage.leaveOuthospitalTime = patientData.patientTriage.leaveOuthospitalTime ?
      new Date(((this.patientData.patientTriage as any).leaveOuthospitalTime as any))
        .format('yyyy-MM-dd hh:mm:ss') : '';
    patientData.patientTriage.arrivedHospitalTime = patientData.patientTriage.arrivedHospitalTime ?
      new Date(((this.patientData.patientTriage as any).arrivedHospitalTime as any))
        .format('yyyy-MM-dd hh:mm:ss') : '';
    patientData.patientTriage.arrivedEmergencyTime = patientData.patientTriage.arrivedEmergencyTime ?
      new Date(((this.patientData.patientTriage as any).arrivedEmergencyTime as any))
        .format('yyyy-MM-dd hh:mm:ss') : '';
    patientData.patientTriage.inhospitalAdmissionTime = patientData.patientTriage.inhospitalAdmissionTime ?
      new Date(((this.patientData.patientTriage as any).inhospitalAdmissionTime as any))
        .format('yyyy-MM-dd hh:mm:ss') : '';
    patientData.patientTriage.consultationTime = patientData.patientTriage.consultationTime ?
      new Date(((this.patientData.patientTriage as any).consultationTime as any))
        .format('yyyy-MM-dd hh:mm:ss') : '';
    patientData.patientTriage.leaveDepartmentTime = patientData.patientTriage.leaveDepartmentTime ?
      new Date(((this.patientData.patientTriage as any).leaveDepartmentTime as any))
        .format('yyyy-MM-dd hh:mm:ss') : '';
    patientData.patientTriage.illnessState = patientData.patientTriage.illnessState ?
      patientData.patientTriage.illnessState.join(',') : patientData.patientTriage.illnessState;
    if (patientData.patient.name === '') {
      this.$message.warning('请填写姓名！');
      return '';
    }
    if (patientData.patient.visitCard === '') {
      this.$message.warning('请填写挂号ID！');
      return '';
    }
    if (patientData.patient.birthday !== '') {
      patientData.patient.birthday = new Date(patientData.patient.birthday as any).format('yyyy-MM-dd hh:mm:ss');
    }
    patientData.patientVisit.hisCode = this.patientData.patient.visitCard;
    patientData.patientLevel.severityLevelSys = this.patientData.patientTriage.severityLevelMannul;
    // 校验
    (this.$refs.patientData as any).validate((valid: any) => {
      if (!valid) {
        return;
      }
      this.$store.dispatch('TriageInfo', patientData).then(({ data }: any) => {
        this.$message.success('保存成功');
        this.sendMessage(data.data);
      });
    });
  }
  /**
   * 设置采集的数据
   */
  public onSetValue(parm: string, value: string | number) {
    (this.patientData.vitalSign as any)[parm] =
      (this.patientData.vitalSign as any)[parm] ? (this.patientData.vitalSign as any)[parm] : value;
  }
  public onBirthday() {
    this.patientData.patient.age = this.patientData.patient.birthday ? String(new Date().getFullYear() -
      new Date(this.patientData.patient.birthday).getFullYear()) : '';
  }
  public getPatientTableData(startDate: any, endDate: any) {
    const param = {
    searchText: null,
    startDate,
    endDate
    };
    // this.$store.dispatch('GetPatientListByParam', param)
    // this.$store.dispatch('HispatientvisitList').then(({ data }) => {
    //   this.patientTableData = data.data;
    // });
    axios.all([this.$store.dispatch('HispatientvisitList'),
    this.$store.dispatch('GetPatientListByParam', param)]).then(([r, r1]: any[]) => {
      const hispatientvisitList = (r.data.data as any[]);
      const getPatientListByParam = (r1.data.data as any[]);
      const hisData: any = [];
      if (getPatientListByParam.length <= 0) {
        return this.patientTableData = hispatientvisitList as any;
      }
      const patientListByParamFun = (item: any, arri: number) => {
        for (const obj of getPatientListByParam) {
          if (item.visitHisCode && String(item.visitHisCode) === String(obj.hisCode)) {
            hispatientvisitList.splice(arri, 1);
            return --arri;
          }
        }
        return arri;
      };
      for (let i = 0; i < hispatientvisitList.length; i++) {
        i = patientListByParamFun(hispatientvisitList[i], i);
      }
      this.patientTableData = hispatientvisitList as any;
    });
  }
  /**
   * 挂号数据提交赋值到界面
   */
  public onSubmit(row: any) {
    // console.log(row);
    this.patientData.patient.name = row.name;
    this.patientData.patient.hisCode = row.patientHisCode;
    this.patientData.patient.visitCard = row.visitCode;
    this.patientData.patient.birthday = row.birthday;
    this.patientData.patient.age = row.birthday ? String(
      new Date().getFullYear() - new Date(row.birthday).getFullYear()) : '';
    // this.patientData.patient.ageMonth = row.ageMonth;
    // this.patientData.patient.ageDay = row.ageDay;
    this.patientData.patient.addressDetail = row.addressDetail;
    this.patientData.patient.gender = row.gender;
    this.patientData.patient.residentIdentityCard = row.residentIdentityCard;
    this.patientData.patient.maritalStatus = row.maritalStatus;
    this.patientData.patient.phone = row.phone;
    this.patientData.patient.nationId = row.nationId;
    this.patientData.patient.nativePlace = row.nativePlace;
    this.patientData.patientVisit.feeType = row.feeType;
    this.getData(row.patientHisCode);
  }

  public onSearch(startDate: any, endDate: any) {
    this.getPatientTableData(startDate, endDate);
  }

  public sendMessage(patientVO: PatientVO) {
    // 地址+端点路径，构建websocket链接地址
    const socket = new SockJS((common.config as any).webSocketUrl + '/core/bullet');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, (frame: any) => {
      this.stompClient.send('/chat', {}, {});
      // 传送数据
      this.stompClient.send('/patient', {}, JSON.stringify(patientVO));
      this.stompClient.disconnect();
      window.location.reload();
    });
  }
  public idcord() {
    this.$wSocket('ws://localhost:8082/websocket/1', (evt) => {
      if (evt.data === '连接成功') {
        return;
      }
      const data = JSON.parse(evt.data);
      this.patientData.patient.name = data.name;
      // this.patientData.patient.visitCard = row.visitCode;
      this.patientData.patient.birthday = data.birth.replace(/(.{4})(.{2})/, '$1-$2-');
      this.patientData.patient.age = data.birth ? String(new Date().getFullYear() -
        new Date(this.patientData.patient.birthday).getFullYear()) : '';
      // this.patientData.patient.ageMonth = row.ageMonth;
      // this.patientData.patient.ageDay = row.ageDay;
      this.patientData.patient.addressDetail = data.add;
      this.patientData.patient.gender = data.sex ? '1' : '0';
      this.patientData.patient.residentIdentityCard = data.code;
      // this.patientData.patient.maritalStatus = row.maritalStatus;
      // this.patientData.patient.phone = row.phone;
      this.patientData.patient.nationId = (common.config as any).
          nations.find((item: any) => item.name === data.folk).id;
      // this.patientData.patient.nativePlace = row.nativePlace;
      // this.patientData.patientVisit.feeType = row.feeType;
    });
  }
  private async getData(patientId: string) {
    if (!patientId) {
      return;
    }
    // const form = {
    //   startDate: '',
    //   endDate: ''
    // };
    const resData = await this.$store.dispatch('HisLogGet', { patientId});
    this.hisLogData = resData && resData.data ? resData.data : [];
  }
  private mounted() {
    // 查询部门
    this.selectDeptList();
    // 查询主诉
    this.selectSymptomList();
    // 工作站查询
    this.selectWorkstationList();
    // 获得挂号数据
    this.getPatientTableData(new Date().format('yyyy-MM-dd')
      + ' 00:00:00', new Date().format('yyyy-MM-dd') + ' 23:59:59');
    this.idcord();
  }
  private async hisLogInfo() {
    const { data } = await this.$store.dispatch('HisLogTimes', this.patientData.patient.residentIdentityCard);
    this.hisLog = data.data;
  }
}
</script>
<style lang="less" scoped>
.nurseIndex {
  height: 100%;
  .box {
    padding: 10px;
    height: calc(~'(100% - 20px)');
    .leftPannel {
      width: calc(~'100% - 500px');
      height: calc(~'(100% - 75px)');
      float: left;
      .basicInfo {
        background-color: #ffffff;
        width: 100%;
        height: 50%;
        margin-bottom: 10px;
        // margin-right: 10px;
        display: inline-block;
        h1 {
          margin-top: 0px;
          font-size: 16px;
          color: #1f1f1f;
          padding-left: 10px;
          padding-top: 10px;
        }
      }
      .admissionInfo {
        background-color: #ffffff;
        width: 100%;
        height: 50%;
        margin-bottom: 10px;
        // margin-right: 10px;
        display: inline-block;
        h1 {
          margin-top: 0px;
          font-size: 16px;
          color: #1f1f1f;
          padding-left: 10px;
          padding-top: 10px;
        }
      }
    }
    .rightPannel {
      width: 490px;
      height: calc(~'(100% - 75px)');
      float: right;
      .vitalSign {
        background-color: #ffffff;
        height: 42%;
        margin-bottom: 10px;
        display: inline-block;
        h1 {
          margin-top: 0px;
          font-size: 16px;
          color: #1f1f1f;
          padding-left: 10px;
          padding-top: 10px;
        }
      }
      .score {
        background-color: #ffffff;
        height: 25%;
        margin-bottom: 10px;
        display: inline-block;
        width: 100%;
        h1 {
          margin-top: 0px;
          font-size: 16px;
          color: #1f1f1f;
          padding-left: 10px;
          padding-top: 10px;
        }
      }
      .allergy {
        background-color: #ffffff;
        height: 31%;
        margin-bottom: 10px;
        display: inline-block;
        overflow-y: auto;
        h1 {
          margin-top: 0px;
          font-size: 16px;
          color: #1f1f1f;
          padding-left: 10px;
          padding-top: 10px;
          display: inline-block;
        }
        .tool {
          float: right;
          margin: 10px 10px 0 10px;
        }
        .delete {
          left: 3px;
          position: relative;
          top: 5px;
        }
      }
    }
    .footer {
      background-color: #ffffff;
      width: 100%;
      height: 50px;
      //margin-bottom: 10px;
      margin-right:2px;
      display: inline-block;
      padding-top: 5px;
      margin-top: 20px;
    }
  }
  .el-tree-node__children {
    min-width: 900px;
    .el-tree-node{
      width: 25%;
    }
  }
}
</style>
<style lang="less">
.nurseIndex {
  .el-form {
    height: 100%;
    color: #1c81c3;
    .el-form-item__label {
      color: #1c81c3;
      padding-right: 0px;
    }
    .el-form-item__content {
      padding-right: 10px;
    }
    .el-form-item {
      margin-bottom: 0px;
      .el-input__inner {
        height: 30px;
        line-height: 30px;
      }
    }
    .el-radio + .el-radio {
      margin-left: 0px;
    }
    .el-radio__label {
      padding-left: 10px;
    }
    .rightPannel .el-form-item__label {
      width: 120px !important;
    }
    .rightPannel .el-form-item__content {
      margin-left: 120px !important;
    }
    .levelNote .el-form-item__label {
      width: 120px !important;
    }
    .levelNote .el-form-item__content {
      margin-left: 120px !important;
    }
    .grade1 {
      .el-radio__input.is-disabled + span.el-radio__label {
        color: red;
      }
      .el-radio__input + span.el-radio__label {
        color: red;
      }
    }
    .grade2 {
      .el-radio__input.is-disabled + span.el-radio__label {
        color: orange;
      }
      .el-radio__input + span.el-radio__label {
        color: orange;
      }
    }
    .grade3 {
      .el-radio__input.is-disabled + span.el-radio__label {
        color: green;
      }
      .el-radio__input + span.el-radio__label {
        color: green;
      }
    }
  }
  .ageClass {
    .el-input__inner {
      padding: 0px;
    }
  }
  .el-form-item__error {
    top: 78%;
  }
  .footer {
    .el-button {
      margin-top: 5px;
      margin-left: 10px;
      background: #0071bc;
      color: #fff;
      padding: 6px 10px;
      &.triage {
        background: #ffd04b;
        border: 1px solid #ffd04b;
      }
    }
  }
}
</style>
