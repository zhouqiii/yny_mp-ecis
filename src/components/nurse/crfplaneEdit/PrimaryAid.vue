<template>
    <div class="PrimaryAid">
     <el-scrollbar :style="{height:'100%'}">
      <el-form :model="value" ref="form" label-width="170px" :rules="rules">
    <section>
        <fieldset class="fieldset">
        <legend>基本信息</legend>
        </fieldset>
        <el-form-item label="姓名：" prop="name" style="width:30%">
          <el-input type="name" v-model="value.cpcRegModel.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="年龄：" prop="age" style="width:30%">
          <el-input type="age" v-model="value.cpcRegModel.ageValue" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="住院ID：" prop="inpatientId" style="width:30%">
          <el-input type="inpatientId" v-model="value.cpcRegModel.inpatientId" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="发病地址：" prop="attackAddress" style="width:30%">
          <el-input type="attackAddress" v-model="value.cpcRegModel.attackAddress" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="联系电话：" prop="contactPhone" style="width:30%">
          <el-input type="contactPhone" v-model="value.cpcRegModel.contactPhone" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="性别：" prop="gender" style="width:30%">
          <el-radio v-model="value.cpcRegModel.gender" v-for="(item,i) in sex" :key="i" :label="item.value">{{item.label}}</el-radio>
        </el-form-item>
        <el-form-item label="发病时间：" prop="attackTime" style="width:33.3%">
          <yn-date-time-pick
            v-model="value.cpcRegModel.attackTime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss">
          </yn-date-time-pick>
        </el-form-item>
        <el-form-item class="timeBox" label="发病时间无法精确到分钟？" style="width:44%">
          <el-checkbox v-model="value.cpcRegModel.isNullAttackDetailTime"></el-checkbox>
          <el-select style="width:33.33%;margin-left:0px;" v-if="value.cpcRegModel.isNullAttackDetailTime"
                v-model="value.cpcRegModel.attackZone"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item,i) in dictFilter('attackZone')"
                  :label="item.label"
                  :key="i"
                  :value="item.value"
                />
              </el-select>
        </el-form-item>
        <el-form-item label="呼救：" style="width:66%">
          <el-checkbox v-model="value.cpcRegModel.isHelp">有</el-checkbox>
          <el-radio-group v-model="value.cpcRegModel.helpCode" style="margin-left:20px;" v-if="value.cpcRegModel.isHelp">
            <el-radio v-for="(item,i) in helpCode" :key="i" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
    </section>
    <section>
      <fieldset class="fieldset">
        <legend>病情评估</legend>
      </fieldset>
        <el-checkbox v-model="value.cpcRegModel.isPersistent">持续性胸闷/胸痛</el-checkbox>
        <el-checkbox v-model="value.cpcRegModel.isIntermittent">间断性胸闷/胸痛</el-checkbox>
        <el-checkbox v-model="value.cpcRegModel.isLaxation">胸痛症状已缓解</el-checkbox>
        <el-checkbox v-model="value.cpcRegModel.isBellyache">腹痛</el-checkbox>
        <el-checkbox v-model="value.cpcRegModel.isDyspnea">呼吸困难</el-checkbox>
        <el-checkbox v-model="value.cpcRegModel.isShock">休克</el-checkbox>
        <el-checkbox v-model="value.cpcRegModel.isHeartAttack">心衰</el-checkbox>
        <el-checkbox v-model="value.cpcRegModel.isMalignantArrhythmia">恶性心律失常</el-checkbox>
        <el-checkbox v-model="value.cpcRegModel.isCpr">心肺复苏</el-checkbox>
        <el-checkbox v-model="value.cpcRegModel.isHemorrhage">合并出血</el-checkbox>
    </section>
      <section>
      <fieldset class="fieldset">
        <legend>来院方式</legend>
      </fieldset>
        <el-form-item label="来院方式：" prop="getToHospitalType" class="widthAll">
          <el-radio-group v-model="value.cpcRegModel.comingWayCode">
            <el-radio v-for="(item,i) in getToHospitalType" :key="i" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出车单位：" v-if="value.cpcRegModel.comingWayCode===getToHospitalType[0].value||value.cpcRegModel.comingWayCode===getToHospitalType[1].value" class="widthAll">
          <el-radio-group v-model="value.cpcEmergenModel.dispatchUnitCode">
            <el-radio v-for="(item,i) in dispatchUnitCode" :key="i" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="转出医院入门时间：" v-if="value.cpcRegModel.comingWayCode===getToHospitalType[1].value">
          <yn-date-time-pick v-model="value.cpcEmergenModel.outhospitalVisitTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item>
        <el-form-item label="决定转院时间：" v-if="value.cpcRegModel.comingWayCode===getToHospitalType[1].value">
          <yn-date-time-pick v-model="value.cpcEmergenModel.transferTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item>
        <el-form-item label="转运救护车到达时间：" v-if="value.cpcRegModel.comingWayCode===getToHospitalType[1].value">
          <yn-date-time-pick v-model="value.cpcEmergenModel.ambulanceArrivedTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item>
        <el-form-item label="离开转出医院：" v-if="value.cpcRegModel.comingWayCode===getToHospitalType[1].value">
          <yn-date-time-pick v-model="value.cpcEmergenModel.leaveOuthospitalTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item>
          <el-form-item label="是否网络医院：" v-if="value.cpcRegModel.comingWayCode===getToHospitalType[1].value">
          <el-radio-group v-model="value.cpcEmergenModel.isNetwordHospital">
            <el-radio v-for="(item,i) in isIf" :key="i" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="医院名称：" v-if="value.cpcRegModel.comingWayCode===getToHospitalType[1].value||value.cpcRegModel.comingWayCode===getToHospitalType[4].value">
            <el-input type="text" v-model="value.cpcEmergenModel.hospitalName" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="医生到达现场时间：" v-if="value.cpcRegModel.comingWayCode===getToHospitalType[0].value">
          <yn-date-time-pick v-model="value.cpcEmergenModel.arrivedSceneTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item>
        <el-form-item label="到达本院大门："
          v-if="value.cpcRegModel.comingWayCode===getToHospitalType[0].value">
          <yn-date-time-pick v-model="value.cpcEmergenModel.arrivedHospitalTime" type="datetime" placeholder="选择日期时间"  value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item>
        <el-form-item label="院内接诊时间：" v-if="value.cpcRegModel.comingWayCode===getToHospitalType[0].value">
          <yn-date-time-pick v-model="value.cpcEmergenModel.inhospitalAdmissionTime" type="datetime" placeholder="选择日期时间"  value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item>
        <el-form-item label="院前首份心电图时间：" v-if="value.cpcRegModel.comingWayCode===getToHospitalType[0].value">
            <yn-date-time-pick v-model="value.cpcEmergenModel.phepEcgTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
          </el-form-item>
        <el-form-item label="远程心电传输：" v-if="value.cpcRegModel.comingWayCode===getToHospitalType[0].value" >
            <el-radio-group v-model="value.cpcEmergenModel.isRemoteEcgtranChecked">
              <el-radio v-for="(item,i) in isIf" :key="i" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="传输时间：" v-if="value.cpcEmergenModel.isRemoteEcgtranChecked===isIf[1].value&&value.cpcRegModel.comingWayCode===getToHospitalType[0].value" >
            <yn-date-time-pick v-model="value.cpcEmergenModel.tranDate" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
          </el-form-item>
            <el-form-item label="传输方式：" v-if="value.cpcEmergenModel.isRemoteEcgtranChecked===isIf[1].value&&value.cpcRegModel.comingWayCode===getToHospitalType[0].value">
            <el-select
                v-model="value.cpcEmergenModel.isRemoteEcgtran"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item,i) in dictFilter('isRemoteEcgtran')"
                  :label="item.label"
                  :key="i"
                  :value="item.value"
                />
            </el-select>
          </el-form-item>
        <!-- <el-form-item label="患者绕行CCU：" v-if="value.cpcRegModel.comingWayCode===getToHospitalType[2].value">
          <el-radio-group v-model="value.cpcEmergenModel.isBypassCcu">
            <el-radio v-for="(item,i) in isIf" :key="i" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="患者绕行急诊：" v-if="value.cpcRegModel.comingWayCode===getToHospitalType[0].value||value.cpcRegModel.comingWayCode===getToHospitalType[1].value">
          <el-radio-group v-model="value.cpcEmergenModel.isBypassEmergency">
            <el-radio v-for="(item,i) in isIf" :key="i" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="到达时间：" v-if="value.cpcRegModel.comingWayCode===getToHospitalType[0].value||value.cpcRegModel.comingWayCode===getToHospitalType[1].value">
          <yn-date-time-pick v-model="value.cpcEmergenModel.arrivedEmergencyTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item> -->
        <el-form-item label="发病科室：" v-if="value.cpcRegModel.comingWayCode===getToHospitalType[3].value">
          <el-input type="attackDepartment" v-model="value.cpcEmergenModel.attackDepartment" autocomplete="off"/>
          </el-form-item>
        <el-form-item label="会诊时间：" v-if="value.cpcRegModel.comingWayCode===getToHospitalType[3].value">
          <yn-date-time-pick v-model="value.cpcEmergenModel.consultationTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
          </el-form-item>
        <el-form-item label="离开科室时间：" v-if="value.cpcRegModel.comingWayCode===getToHospitalType[3].value">
          <yn-date-time-pick v-model="value.cpcEmergenModel.leaveDepartmentTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item>
    </section>
    <section>
        <fieldset class="fieldset">
        <legend>其他信息</legend>
      </fieldset>
        <el-form-item label="院内接诊时间：" >
          <yn-date-time-pick v-model="value.cpcEmergenModel.inhospitalAdmissionTime" type="datetime" placeholder="选择日期时间"  value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item>
        <el-form-item label="接诊医生：" prop="age" style="width:25%">
          <el-input v-model="value.cpcEmergenModel.firstDoctorName" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="院内首份心电图时间：" style="width:25%">
          <yn-date-time-pick v-model="value.cpcEmergenModel.inhospitalEcgTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item>
        <el-form-item label="首份心电图确诊时间：" prop="age" style="width:25%">
          <yn-date-time-pick v-model="value.cpcEmergenModel.ecgDiagnoseTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item>
          <el-form-item label="患者绕行急诊：">
          <el-radio-group v-model="value.cpcEmergenModel.isBypassEmergency">
            <el-radio v-for="(item,i) in isIf" :key="i" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="到达导管室时间：" v-if="value.cpcEmergenModel.isBypassEmergency===isIf[1].value">
          <yn-date-time-pick v-model="value.cpcDiagTreatModel.arriveConduitTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item>
        </section>
        <section>
        <fieldset class="fieldset">
        <legend>辅助化验</legend>
        </fieldset>
        <el-form-item label="肌钙蛋白：抽血时间 ：" prop="samplingTime" style="width:33.3%">
          <yn-date-time-pick v-model="value.cpcEmergenModel.samplingTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item>
        <el-form-item label="报告时间：" prop="reportTime" style="width:33.3%;margin-left:-3%">
          <yn-date-time-pick v-model="value.cpcEmergenModel.reportTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item>
        <div>
        <el-form-item label="cTnI：" prop="ctniValue" style="width:30%;">
          <el-input type="ctniValue" v-model="value.cpcEmergenModel.ctniValue" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="单位：" style="width:30.5%">
          <el-select
              v-model="value.cpcEmergenModel.ctniUnit"
              placeholder="ng/ml"
            >
              <el-option
                v-for="(item,i) in dictFilter('ctniUnit')"
                :label="item.label"
                :key="i"
                :value="item.value"
              />
          </el-select>
        </el-form-item>
        </div>
        <div>
        <el-form-item label="血清肌酐：" prop="age" style="width:30%">
          <el-input type="age" v-model="value.cpcEmergenModel.crValue" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="单位：" style="width:30.5%">
          <el-select
          v-model="value.cpcEmergenModel.crUnit"
          placeholder="umol/L"
          >
            <el-option
              v-for="(item,i) in dictFilter('crUnit')"
              :label="item.label"
              :key="i"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        </div>
      </section>
      <section>
        <fieldset class="fieldset">
          <legend>生命体征</legend>
        </fieldset>
          <el-form-item label="意识：" prop="consciousnessType" style="width:30%">
            <el-select
                  v-model="value.cpcEmergenModel.consciousnessType"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item,i) in dictFilter('consciousnessType')"
                    :label="item.label"
                    :key="i"
                    :value="item.value"
                  />
                </el-select>
          </el-form-item>
          <el-form-item label="呼吸：" prop="respirationRate" style="width:35%">
            <el-input placeholder="" v-model="value.cpcEmergenModel.respirationRate">
              <template slot="append">次/分钟</template>
            </el-input>
          </el-form-item>
          <el-form-item label="脉搏：" prop="pulseRate" style="width:35%">
            <el-input placeholder="" v-model="value.cpcEmergenModel.pulseRate">
              <template slot="append">次/分钟</template>
            </el-input>
          </el-form-item>
          <el-form-item label="心率：" prop="heartRate" style="width:31.3%">
            <el-input placeholder="" v-model="value.cpcEmergenModel.heartRate">
              <template slot="append">次/分钟</template>
            </el-input>
          </el-form-item>
          <el-form-item label="血压：" prop="bloodPressure" style="width:35%;margin-left:-1.2%;">
            <el-input placeholder="--/--" v-model="value.cpcEmergenModel.bloodPressure">
              <template slot="append">mmHg格式(--/--) </template>
            </el-input>
        </el-form-item>
        <el-form-item label="Killip分级：" prop="killipLevel" style="width:33.3%">
          <el-select
              v-model="value.cpcEmergenModel.killipLevel"
              placeholder="请选择"
            >
              <el-option
                v-for="(item,i) in dictFilter('killipLevel')"
                :label="item.label"
                :key="i"
                :value="item.value"
              />
          </el-select>
        </el-form-item>
      </section>
    <section>
    <fieldset class="fieldset">
      <legend>检查</legend>
    </fieldset>
      <el-form-item label="急诊超声开始时间：" style="width:33.3%">
        <yn-date-time-pick v-model="value.cpcEmergenModel.outhospitalVisitTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
      </el-form-item>
      <el-form-item label="超声结束时间：" style="width:35%;margin-left:-3%;">
        <yn-date-time-pick v-model="value.cpcEmergenModel.transferTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
      </el-form-item>
      <el-form-item label="诊断时间：" style="width:33.3%">
        <yn-date-time-pick v-model="value.cpcEmergenModel.ambulanceArrivedTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
      </el-form-item>
    <el-form-item label="医生签字：" prop="age" style="width:30%">
        <el-input v-model="value.cpcEmergenModel.firstDoctorName" autocomplete="off"/>
      </el-form-item>
    </section>
    <section>
    <fieldset class="fieldset">
    <legend>诊断</legend>
    </fieldset>
    <div style="width:100%">
    <el-radio-group v-model="value.cpcEmergenModel.cpDiagnosisCode" style="margin-left:110px;">
      <el-radio v-for="(item,i) in cpDiagnosisCode" :key="i" :label="item.value">{{item.label}}</el-radio>
    </el-radio-group>
    </div>
    <el-form-item label="初步诊断时间：" style="width:33.3%">
      <yn-date-time-pick v-model="value.cpcDiagTreatModel.firstTreatmentTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled">
      </yn-date-time-pick>
    </el-form-item>
    <el-form-item label="医生：" prop="age" style="width:33.3%">
      <el-input v-model="value.cpcEmergenModel.firstDoctorName" autocomplete="off"/>
    </el-form-item>
    <!-- <div style="margin-left:120px;">
      <el-radio v-model="value.cpcDiagTreatModel.cpDiagnosisCode" label="2" >STEMI</el-radio>
      <el-radio v-model="value.cpcDiagTreatModel.cpDiagnosisCode" label="3" >NSTEMI</el-radio>
      <el-radio v-model="value.cpcDiagTreatModel.cpDiagnosisCode" label="4" >UA</el-radio>
      <el-radio v-model="value.cpcDiagTreatModel.cpDiagnosisCode" label="5" >主动脉夹层</el-radio>
      <el-radio v-model="value.cpcDiagTreatModel.cpDiagnosisCode" label="6" >肺动脉栓塞</el-radio>
      <el-radio v-model="value.cpcDiagTreatModel.cpDiagnosisCode" label="7" >非ACS胸痛</el-radio>
      <el-radio v-model="value.cpcDiagTreatModel.cpDiagnosisCode" label="8" >非心源性胸痛</el-radio>
    </div> -->
    <div style="margin-left:110px;" v-if="value.cpcEmergenModel.cpDiagnosisCode===cpDiagnosisCode[6].value">
      <el-checkbox v-model="value.cpcEmergenModel.arrhythmia" >心律失常</el-checkbox>
      <el-checkbox v-model="value.cpcEmergenModel.dcm">扩张性心肌病</el-checkbox>
      <el-checkbox v-model="value.cpcEmergenModel.icm">缺血性心肌病</el-checkbox>
      <el-checkbox v-model="value.cpcEmergenModel.hcm">肥厚型心肌病</el-checkbox>
      <el-checkbox v-model="value.cpcEmergenModel.carditis">心肌炎</el-checkbox>
      <el-checkbox v-model="value.cpcEmergenModel.chd">冠心病</el-checkbox>
      <el-checkbox v-model="value.cpcEmergenModel.avhd">瓣膜性心脏病</el-checkbox>
    </div>
    <div style="margin-left:110px;" v-if="value.cpcEmergenModel.cpDiagnosisCode===cpDiagnosisCode[7].value">
      <el-checkbox v-model="value.cpcEmergenModel.rd" >呼吸系统病</el-checkbox>
      <el-checkbox v-model="value.cpcEmergenModel.dsd">消化系统病</el-checkbox>
      <el-checkbox v-model="value.cpcEmergenModel.nsd">神经系统病</el-checkbox>
      <el-checkbox v-model="value.cpcEmergenModel.pd">精神系统病</el-checkbox>
      <el-checkbox v-model="value.cpcEmergenModel.md">肌肉骨骼病</el-checkbox>
      <el-checkbox v-model="value.cpcEmergenModel.ssd">皮肤系统病</el-checkbox>
      <el-checkbox v-model="value.cpcEmergenModel.other">其他</el-checkbox>
    </div>
    <el-form-item label="24小时强化他汀治疗：" class="levelClass">
      <el-radio-group v-model="value.cpcDiagTreatModel.intensifyStatinsTreat" :disabled="isDisabled">
        <el-radio v-for="(item,i) in isIf" :key="i" :label="item.value">{{item.label}}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="β受体阻滞剂使用：" style="width:33%">
      <el-radio-group v-model="value.cpcDiagTreatModel.receptorRetardantUsing" :disabled="isDisabled">
        <el-radio v-for="(item,i) in isIf" :key="i" :label="item.value">{{item.label}}</el-radio>
      </el-radio-group>
    </el-form-item>
    </section>
    <section>
        <fieldset class="fieldset">
        <legend>ACS</legend>
      </fieldset>
        <el-form-item label="抗血小板首次药时间：" prop="acsDeliveryTime"  style="width:33.3%">
          <yn-date-time-pick v-model="value.cpcEmergenModel.acsDeliveryTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item>
        <el-form-item label="阿司匹林：" prop="aspirinDose" style="width:37%">
          <el-input placeholder="" v-model="value.cpcEmergenModel.aspirinDose">
            <template slot="append">mg</template>
          </el-input>
        </el-form-item>
        <el-form-item label="" class="followSpan" prop="age" style="margin-left:10px;width:16%">
          <el-radio-group v-model="value.cpcEmergenModel.acsDrugType">
            <el-radio v-for="(item,i) in acsDrugType" :key="i" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="" class="followSpan" style="margin-left:10px;width:12%" prop="age">
          <el-input placeholder="" v-model="value.cpcEmergenModel.acsDrugDose">
            <template slot="append">mg</template>
          </el-input>
        </el-form-item>
          <el-form-item label="给药时间：" prop="anticoagulationDate" style="width:33.3%">
          <yn-date-time-pick v-model="value.cpcEmergenModel.anticoagulationDate" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item>
        <el-form-item label="药物：" prop="anticoagulationDrug" style="width:32.8%">
          <el-select
              v-model="value.cpcEmergenModel.crUnit"
              placeholder="请选择"
            >
              <el-option
                v-for="(item,i) in dictFilter('anticoagulationDrug')"
                :label="item.label"
                :key="i"
                :value="item.value"
              />
          </el-select>
        </el-form-item>
        <el-form-item label="剂量（含单位）：" prop="anticoagulationUnit" style="width:33.3%">
          <el-input type="anticoagulationUnit" v-model="value.cpcEmergenModel.anticoagulationUnit" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="开始溶栓时间：" prop="thromCheckDate" style="width:30%">
          <yn-date-time-pick v-model="value.cpcDiagTreatModel.thromCheckDate" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item>
        <el-form-item label="首次抗凝给药：" prop="anticoagulationDrug" style="width:80%">
          <el-radio-group v-model="value.cpcEmergenModel.anticoagulationDrug">
            <el-radio v-for="(item,i) in isIf" :key="i" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否适合溶栓：" style="width:33%">
        <el-radio-group v-model="value.cpcDiagTreatModel.thromCheck">
          <el-radio v-for="(item,i) in dictFilter('ifSuitable')" :key="i" :label="item.value" :disabled="isDisabled">{{item.label}}</el-radio>
        </el-radio-group>
        </el-form-item>
    </section>
      <section>
    <fieldset class="fieldset">
      <legend>STEMI（收入CCU）</legend>
    </fieldset>
    <el-form-item label="心内科医生首诊时间：" style="width:33.3%">
      <yn-date-time-pick v-model="value.cpcDiagTreatModel.firstTreatmentTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled">
      </yn-date-time-pick>
    </el-form-item>
    <el-form-item label="溶栓核查：" style="width:33.3%">
      <el-radio-group v-model="value.cpcDiagTreatModel.thromCheck">
        <el-radio v-for="(item,i) in dictFilter('ifSuitable')" :key="i" :label="item.value" :disabled="isDisabled">{{item.label}}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="再灌注措施：" style="width:100%">
        <el-checkbox v-model="value.cpcDiagTreatModel.isEmpci" >紧急介入治疗</el-checkbox>
        <el-checkbox v-model="value.cpcDiagTreatModel.isEmradiography">紧急仅造影</el-checkbox>
        <el-checkbox v-model="value.cpcDiagTreatModel.isRepci">24小时介入治疗</el-checkbox>
        <el-checkbox v-model="value.cpcDiagTreatModel.isTpci">72小时介入治疗</el-checkbox>
        <el-checkbox v-model="value.cpcDiagTreatModel.isElradiography">早期仅造影</el-checkbox>
        <el-checkbox v-model="value.cpcDiagTreatModel.isElpci">择期介入治疗</el-checkbox>
        <el-checkbox v-model="value.cpcDiagTreatModel.isCabg">CABG</el-checkbox>
        <el-checkbox v-model="value.cpcDiagTreatModel.isRepother">其他</el-checkbox>
    </el-form-item>
    <el-form-item label="靶血管血流（TIMI）等级：手术前：" class="levelClass">
      <el-radio-group v-model="value.cpcDiagTreatModel.preoperativeTimiLevel" :disabled="isDisabled">
        <el-radio v-for="(item,i) in dictFilter('preoperativeTmiLevel')" :key="i" :label="item.value">{{item.label}}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="手术后：" style="width:33.3%">
      <el-radio-group v-model="value.cpcDiagTreatModel.postoperativeTimiLevel" :disabled="isDisabled">
        <el-radio v-for="(item,i) in dictFilter('postoperativeTimiLevel')" :key="i" :label="item.value">{{item.label}}</el-radio>
      </el-radio-group>
    </el-form-item>
    </section>
    <section>
    <fieldset class="fieldset">
      <legend>STEMI-溶栓</legend>
    </fieldset>
    <el-form-item label="院前溶栓：筛查：" style="width:33.3%">
      <el-radio-group v-model="value.cpcDiagTreatModel.thromCheck">
        <el-radio v-for="(item,i) in dictFilter('ifSuitable')" :key="i" :label="item.value" :disabled="isDisabled">{{item.label}}</el-radio>
      </el-radio-group>
      <el-checkbox v-model="value.cpcRegModel.isThrombolysisDt" style="margin-left:30px;">有</el-checkbox>
    </el-form-item>
    <el-form-item label="溶栓场所：" style="width:40%">
    <el-radio-group v-model="value.cpcDiagTreatModel.thromTreatmentPlace" @change="onThromTreatmentPlace" :disabled="isDisabled">
      <el-radio v-for="(item,i) in dictFilter('diagnosisUnitCodeDt')" :key="i" :label="item.value">{{item.label}}</el-radio>
    </el-radio-group>
    </el-form-item>
      <el-form-item label="药物：" style="width:33.3%">
      <el-radio-group v-model="value.cpcDiagTreatModel.thromDrugTypeDt" :disabled="isDisabled">
        <el-radio v-for="(item,i) in thromDrug" :key="i" :label="item.value">{{item.label}}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="溶栓再通："  style="width:33.3%">
      <el-radio-group v-model="value.cpcDiagTreatModel.isRepatencyDt" :disabled="isDisabled">
        <el-radio v-for="(item,i) in isIf" :key="i" :label="item.value">{{item.label}}</el-radio>
      </el-radio-group>
    </el-form-item>
      <el-form-item label="剂量："  style="width:33.3%">
      <el-radio-group v-model="value.cpcDiagTreatModel.thromDrugCodeDt" :disabled="isDisabled">
        <el-radio v-for="(item,i) in thromDrugUnit" :key="i" :label="item.value">{{item.label}}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="溶栓开始知情同意：" style="width:33.3%">
      <yn-date-time-pick v-model="value.cpcDiagTreatModel.thromStartAgreeTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
    </el-form-item>
    <el-form-item label="签署知情同意书：" style="width:33.3%">
      <yn-date-time-pick v-model="value.thromSignAgreeTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
    </el-form-item>
    <el-form-item label="开始溶栓时间：" style="width:33.3%">
      <yn-date-time-pick v-model="value.cpcDiagTreatModel.thromStartTimeDt" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
    </el-form-item>
    <el-form-item label="溶栓结束时间：" style="width:33.3%">
      <yn-date-time-pick v-model="value.cpcDiagTreatModel.thromEndTimeDt" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
    </el-form-item>
    <el-form-item label="溶栓后造影时间：" style="width:33.3%">
      <yn-date-time-pick v-model="value.cpcDiagTreatModel.timeInterval" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
    </el-form-item>
    </section>
    <section>
    <fieldset class="fieldset">
      <legend>STEMI-急诊PCI</legend>
    </fieldset>
      <el-form-item label="决定医生：" style="width:30%">
      <el-input type="text" v-model="value.cpcDiagTreatModel.doctorName" autocomplete="off"/>
    </el-form-item>
    <el-form-item label="介入人员：" style="width:30%;margin-left:3%;">
      <el-input type="age" v-model="value.cpcDiagTreatModel.interventionPerson" autocomplete="off" />
    </el-form-item>
    <div>
    <el-form-item label="决定介入手术时间：" style="width:33%">
      <yn-date-time-pick v-model="value.cpcDiagTreatModel.decisionOperationTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
    </el-form-item>
    <el-form-item label="启动导管室时间：" style="width:33%">
      <yn-date-time-pick v-model="value.cpcDiagTreatModel.startConduitTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
    </el-form-item>
    <el-form-item label="开始知情同意时间：" style="width:33%">
      <yn-date-time-pick v-model="value.cpcDiagTreatModel.startAgreeTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
    </el-form-item>
    <el-form-item label="签署知情同意时间：" style="width:33%">
      <yn-date-time-pick v-model="value.cpcDiagTreatModel.signAgreeTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
    </el-form-item>
    <el-form-item label="导管室激活时间：" style="width:33%">
      <yn-date-time-pick v-model="value.cpcDiagTreatModel.activateConduitTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
    </el-form-item>
    <el-form-item label="患者到达导管室：" style="width:33%">
      <yn-date-time-pick v-model="value.cpcDiagTreatModel.arriveConduitTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
    </el-form-item>
    <el-form-item label="开始穿刺时间：" style="width:33%">
      <yn-date-time-pick v-model="value.cpcDiagTreatModel.startPunctureTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
    </el-form-item>
    <el-form-item label="穿刺成功时间：" style="width:33%">
      <yn-date-time-pick v-model="value.cpcDiagTreatModel.successPunctureTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
    </el-form-item>
    <el-form-item label="造影开始时间：" style="width:33%">
      <yn-date-time-pick v-model="value.cpcDiagTreatModel.startRadiographyTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
    </el-form-item>
    <el-form-item label="造影结束时间：" style="width:33%">
      <yn-date-time-pick v-model="value.cpcDiagTreatModel.endRadiographyTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
    </el-form-item>
    <el-form-item label="导丝通过时间：" style="width:33%">
      <yn-date-time-pick v-model="value.cpcDiagTreatModel.tranDate" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
    </el-form-item>
    <el-form-item label="手术结束时间：" style="width:33%">
      <yn-date-time-pick v-model="value.cpcDiagTreatModel.endOperationTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
    </el-form-item>
    </div>
    </section>
    </el-form>
    </el-scrollbar>   
   </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import ImgBase64 from '@/components/files/ImgBase64.vue';
const df = Vue.filter('dictFilter');
@Component({components: {ImgBase64}})
export default class PrimaryAid extends Vue {
  @Prop({default: {
    cpcRegModel: {
      name: ''
    },
    cpcOutModel: {},
    cpcEmergenModel: {},
    cpcDiagTreatModel: {
    cpDiagnosisCodeList: []
    },
  }})
  public value!: any;
  public gg = [];
  public isIf = df('is_if');
  public helpCode = df('helpCode');
  public cpDiagnosisCode1 = df('cpDiagnosisCode1');
  public firstMedicalContact = df('first_medical_contact');
  public getToHospitalType = df('get_to_hospital_type');
  public dispatchUnitCode = df('dispatchUnitCode');
  public firstMcCode = df('firstMcCode');
  public consciousnessType = df('consciousnessType');
  public cpDiagnosisCode = df('cpDiagnosisCode');
  public acsDrugType = df('acsDrugType');
  public sex = df('sex');
  public ifSuitable = df('ifSuitable');
  public riskLamination = df('riskLamination');
  public thromTreatmentPlace = df('thromTreatmentPlace');
  public thromDrug = df('thromDrug');
  public thromDrugUnit = df('thromDrugUnit');
  public dictFilter = (type: string) => df(type);
}
</script>
<style lang="less">
    .PrimaryAid{
      .el-form-item{
        width: 25%;
        display: inline-block;
        margin-bottom: 0px;
      }
      .el-form-item.widthAll{
        width: 100%;
        margin-left: -20px;
      }
      .el-checkbox-group{
        margin-left: 110px;
      }
      .timeBox{
        width: 66.7%;
        .el-form-item__label{
          width: 183px !important;
        }
        .el-form-item__content{
          margin-left: 183px !important;
        }
      }
      .el-form-item__label{
        color: #606266;
      }
      .el-select.el-date-editor.el-input{
        margin-left: 20px;
      }
      .el-input-group__append, .el-input-group__prepend{
            background-color: #fff;
            color: #909399;
            vertical-align: middle;
            display: table-cell;
            position: relative;
            border: 0px solid #fff;
            border-radius: 4px;
            padding: 0 20px;
            width: 1px;
            white-space: nowrap;
      }
      .followSpan{
        .el-form-item__content{
          margin-left: 10px !important;
        }
      }
      .drugUnitClass{
        .el-form-item__label{
          width:90px !important;
        }
        .el-form-item__content{
          margin-left: 90px !important;
        }
      }
      .levelClass {
		width: 40%;
		.el-form-item__label {
			width: 250px !important;
		}
		.el-form-item__content {
			margin-left: 290px !important;
		}
	}
    }
</style>
<style lang="less" scoped>
    .PrimaryAid{
      height: 100%;
      h1{
        border-bottom: 1px solid #ccc;
        margin: 0 0 10px;
        padding-bottom: 10px;
      }
      .submitBtn{
        text-align: center;
        display: block;
        width: 100%;
      }
      .fieldset{
        margin-top: 20px;
        margin: 10px 0 0px;
        border-width: 1px 0 0;
        border-color: #409eff;
        border-style: solid;
        padding: 0;
        legend{
          margin-left: 26px;
          padding: 0 5px;
          font-size: 18px;
          font-weight: 300;
          color: #409eff;
        }
      }
      .buttonBox{
        margin: 20px 0;
        text-align: center;
      }
    }
</style>
