<template>
    <div class="FirstAid">
      <el-scrollbar :style="{height:'100%'}">
        <el-form :model="value" ref="form" label-width="170px">
          <section>
            <fieldset class="fieldset">
              <legend>基本信息</legend>
            </fieldset>
              <el-form-item label="姓名：" prop="name">
                <el-input type="name" v-model="value.cpcRegModel.name" autocomplete="off"/>
              </el-form-item>
              <el-form-item label="年龄：" prop="age">
                <el-input type="age" v-model="value.cpcRegModel.ageValue" autocomplete="off"/>
              </el-form-item>
              <el-form-item label="性别：" prop="gender">
                <el-radio v-model="value.cpcRegModel.gender" v-for="(item,i) in sex" :key="i" :label="item.value">{{item.label}}</el-radio>
              </el-form-item>
              <el-form-item label="住院ID：" prop="inpatientId">
                <el-input type="inpatientId" v-model="value.cpcRegModel.inpatientId" autocomplete="off"/>
              </el-form-item>
              <el-form-item label="门诊ID：" prop="outpatientId">
                <el-input type="outpatientId" v-model="value.cpcRegModel.outpatientId" autocomplete="off"/>
              </el-form-item>
              <el-form-item label="发病地址：" prop="attackAddress">
                <el-input type="attackAddress" v-model="value.cpcRegModel.attackAddress" autocomplete="off"/>
              </el-form-item>
              <el-form-item label="身份证号码：" prop="idCard">
                <el-input type="idCard" v-model="value.cpcRegModel.idcard" autocomplete="off"/>
              </el-form-item>
              <el-form-item label="联系电话：" prop="contactPhone">
                <el-input type="contactPhone" v-model="value.cpcRegModel.contactPhone" autocomplete="off"/>
              </el-form-item>
              <el-form-item label="发病时间：" prop="attackTime" style="width:33.3%">
                <yn-date-time-pick
                  v-model="value.cpcRegModel.attackTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  value-format="yyyy-MM-dd HH:mm:ss">
                </yn-date-time-pick>
              </el-form-item>
              <el-form-item class="timeBox" label="发病时间无法精确到分钟？">
                <el-checkbox v-model="value.cpcRegModel.isNullAttackDetailTime"></el-checkbox>
                <el-select style="width:33.33%;margin-left:30px;" v-if="value.cpcRegModel.isNullAttackDetailTime"
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
              <el-form-item label="呼救：" class="widthAll">
                <el-checkbox v-model="value.cpcRegModel.isHelp">有</el-checkbox>
                <el-radio-group v-model="value.cpcRegModel.helpCode" style="margin-left:20px;" v-if="value.cpcRegModel.isHelp">
                  <el-radio v-for="(item,i) in helpCode" :key="i" :label="item.value">{{item.label}}</el-radio>
                </el-radio-group>
                <yn-date-time-pick style="margin-left: 30px;width: 200px;" v-if="value.cpcRegModel.isHelp"
                  v-model="value.cpcRegModel.helpDate"
                  type="datetime"
                  placeholder="选择日期时间"  value-format="yyyy-MM-dd HH:mm:ss">
                </yn-date-time-pick>
              </el-form-item>
              <!-- <el-form-item label="病历归属日期：" prop="dedicalTime" class="widthAll" style="width:33.33%">
                <yn-date-time-pick v-model="value.cpcRegModel.dedicalTime" type="datetime" placeholder="选择日期时间"/>
              </el-form-item> -->
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
              <el-checkbox v-model="value.cpcRegModel.isOther">其它</el-checkbox>
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
              <el-form-item label="是否网络医院：" v-if="value.cpcRegModel.comingWayCode===getToHospitalType[1].value">
                <el-radio-group v-model="value.cpcEmergenModel.isNetwordHospital">
                  <el-radio v-for="(item,i) in isIf" :key="i" :label="item.value">{{item.label}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="医院名称：" v-if="value.cpcRegModel.comingWayCode===getToHospitalType[1].value||value.cpcRegModel.comingWayCode===getToHospitalType[4].value">
                  <el-input type="text" v-model="value.cpcEmergenModel.hospitalName" autocomplete="off"/>
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
              <el-form-item label="出诊医生到达现场时间：" v-if="value.cpcRegModel.comingWayCode===getToHospitalType[0].value">
                <yn-date-time-pick v-model="value.cpcEmergenModel.arrivedSceneTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
              </el-form-item>
              <el-form-item label="到达本院大门："
                v-if="value.cpcRegModel.comingWayCode===getToHospitalType[0].value||
                  value.cpcRegModel.comingWayCode===getToHospitalType[1].value||
                  value.cpcRegModel.comingWayCode===getToHospitalType[2].value">
                <yn-date-time-pick v-model="value.cpcEmergenModel.arrivedHospitalTime" type="datetime" placeholder="选择日期时间"  value-format="yyyy-MM-dd HH:mm:ss"/>
              </el-form-item>
              <el-form-item label="院内接诊时间：" v-if="value.cpcRegModel.comingWayCode===getToHospitalType[0].value||
              value.cpcRegModel.comingWayCode===getToHospitalType[1].value||value.cpcRegModel.comingWayCode===getToHospitalType[2].value">
                <yn-date-time-pick v-model="value.cpcEmergenModel.inhospitalAdmissionTime" type="datetime" placeholder="选择日期时间"  value-format="yyyy-MM-dd HH:mm:ss"/>
              </el-form-item>
              <el-form-item label="患者绕行CCU：" v-if="value.cpcRegModel.comingWayCode===getToHospitalType[2].value">
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
              </el-form-item>
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
              <legend>首次医疗接触</legend>
            </fieldset>
              <el-form-item label="方式：" prop="firstMcCode" class="widthAll">
                <el-radio-group v-model="value.cpcEmergenModel.firstMcCode">
                  <el-radio v-for="(item,i) in firstMcCode" :key="i" :label="item.value">{{item.label}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="医护人员：" prop="age" style="width:30%">
                <el-input v-model="value.cpcEmergenModel.firstDoctorName" autocomplete="off"/>
              </el-form-item>
              <el-form-item label="首次医疗接触时间：" style="width:30%">
                <yn-date-time-pick v-model="value.cpcEmergenModel.firstMcTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
              </el-form-item>
              <el-form-item label="院前首份心电图：" v-if="value.cpcEmergenModel.handleWay===firstMcCode[0].value||value.cpcEmergenModel.handleWay===firstMcCode[1].value" style="width:50%">
                <yn-date-time-pick v-model="value.cpcEmergenModel.phepEcgTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
              </el-form-item>
              <el-form-item label="上传心电图：" v-if="value.cpcEmergenModel.handleWay===firstMcCode[0].value||value.cpcEmergenModel.handleWay===firstMcCode[1].value" style="width:50%">
                <ImgBase64 v-model="value.cpcEmergenModel.phepEcgBlobBase64"/>
              </el-form-item>
              <el-form-item label="院内首份心电图：" style="width:50%">
                <yn-date-time-pick v-model="value.cpcEmergenModel.inhospitalEcgTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
              </el-form-item>
              <el-form-item label="上传心电图：" prop="age" style="width:50%">
                <ImgBase64 v-model="value.cpcEmergenModel.inhospitalEcgBlobBase64"/>
              </el-form-item>
              <el-form-item label="首份心电图确诊时间：" prop="age" style="width:50%">
                <yn-date-time-pick v-model="value.cpcEmergenModel.ecgDiagnoseTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>

              </el-form-item>
               <el-form-item label="" class="followSpan" style="margin-left:0px;">发病后专科医生针对首份心电图解读确诊时间！ </el-form-item>

              <el-form-item label="远程心电传输：" style="width:33%">
                <el-radio-group v-model="value.cpcEmergenModel.isRemoteEcgtranChecked">
                  <el-radio v-for="(item,i) in isIf" :key="i" :label="item.value">{{item.label}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="传输时间：" v-if="value.cpcEmergenModel.isRemoteEcgtranChecked===isIf[1].value"  style="width:33%">
                <yn-date-time-pick v-model="value.cpcEmergenModel.tranDate" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
              </el-form-item>
               <el-form-item label="传输方式：" v-if="value.cpcEmergenModel.isRemoteEcgtranChecked===isIf[1].value" style="width:33%">
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
          </section>
          <section>
            <fieldset class="fieldset">
              <legend>生命特征</legend>
            </fieldset>
              <el-form-item label="意识：" prop="consciousnessType" style="width:33.3%%">
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
              <el-form-item label="呼吸：" prop="respirationRate" style="width:33.3%">
                <el-input placeholder="" v-model="value.cpcEmergenModel.respirationRate">
                  <template slot="append">次/分钟</template>
                </el-input>
              </el-form-item>
              <el-form-item label="脉搏：" prop="pulseRate" style="width:33.3%">
                <el-input placeholder="" v-model="value.cpcEmergenModel.pulseRate">
                  <template slot="append">次/分钟</template>
                </el-input>
              </el-form-item>
              <el-form-item label="心率：" prop="heartRate" >
                <el-input placeholder="" v-model="value.cpcEmergenModel.heartRate">
                  <template slot="append">次/分钟</template>
                </el-input>
              </el-form-item>
              <el-form-item label="血压：" prop="bloodPressure" style="width:33.3%">
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
              <legend>辅助检查</legend>
            </fieldset>
              <el-form-item label="肌钙蛋白：抽血时间 ：" prop="samplingTime" style="width:34%">
                <yn-date-time-pick v-model="value.cpcEmergenModel.samplingTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
              </el-form-item>
              <el-form-item label="报告时间：" prop="reportTime" style="width:66%">
                <yn-date-time-pick v-model="value.cpcEmergenModel.reportTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
              </el-form-item>
              <el-form-item label="cTnI：" prop="ctniValue" style="width:33%">
                <el-input type="ctniValue" v-model="value.cpcEmergenModel.ctniValue" autocomplete="off"/>
              </el-form-item>
              <el-form-item label="单位：" style="margin-left:10px;">
                <el-select
                    v-model="value.cpcEmergenModel.ctniUnit"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item,i) in dictFilter('ctniUnit')"
                      :label="item.label"
                      :key="i"
                      :value="item.value"
                    />
                </el-select>
                </el-form-item>
                <el-form-item label="" class="followSpan" style="margin-left:10px;">
                <el-select
                    v-model="value.cpcEmergenModel.ctniStatus"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item,i) in dictFilter('negative')"
                      :label="item.label"
                      :key="i"
                      :value="item.value"
                    />
                </el-select>
              </el-form-item>
              <el-form-item label="cTnT：" prop="ctntValue" style="width:33%">
                <el-input type="ctntValue" v-model="value.cpcEmergenModel.ctntValue" autocomplete="off"/>
              </el-form-item>
              <el-form-item label="单位：" style="margin-left:10px;">
                <el-select
                    v-model="value.cpcEmergenModel.ctntUnit"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item,i) in dictFilter('ctntUnit')"
                      :label="item.label"
                      :key="i"
                      :value="item.value"
                    />
                </el-select>
                </el-form-item>
                <el-form-item label="" class="followSpan" style="margin-left:10px;">
                <el-select
                    v-model="value.cpcEmergenModel.ctntStatus"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item,i) in dictFilter('negative')"
                      :label="item.label"
                      :key="i"
                      :value="item.value"
                    />
                </el-select>
              </el-form-item>
              <el-form-item label="血清肌酐（cr）： " prop="age" style="width:33%">
                <el-input type="age" v-model="value.cpcEmergenModel.crValue" autocomplete="off"/>
              </el-form-item>
              <el-form-item label="单位：" style="margin-left:10px;">
                <el-select
                    v-model="value.cpcEmergenModel.crUnit"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item,i) in dictFilter('crUnit')"
                      :label="item.label"
                      :key="i"
                      :value="item.value"
                    />
                </el-select>
                </el-form-item>
                <el-form-item label="" class="followSpan" style="margin-left:0px;color:red">和UA的Grace评估的必要条件！</el-form-item>
          </section>
          <section>
            <fieldset class="fieldset">
              <legend>初步诊断</legend>
            </fieldset>
              <div style="width:100%">
              <el-radio-group v-model="value.cpcEmergenModel.cpDiagnosisCode" style="margin-left:110px;">
                <el-radio v-for="(item,i) in cpDiagnosisCode" :key="i" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
              </div>
              <el-form-item label="初步诊断时间： "
              v-if="value.cpcEmergenModel.cpDiagnosisCode===cpDiagnosisCode[1].value||
              value.cpcEmergenModel.cpDiagnosisCode===cpDiagnosisCode[2].value||
              value.cpcEmergenModel.cpDiagnosisCode===cpDiagnosisCode[3].value||
              value.cpcEmergenModel.cpDiagnosisCode===cpDiagnosisCode[4].value||
              value.cpcEmergenModel.cpDiagnosisCode===cpDiagnosisCode[5].value"
               style="width:50%">
                <yn-date-time-pick v-model="value.cpcEmergenModel.diagnosisTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
              </el-form-item>
              <el-form-item label="医生：" v-if="value.cpcEmergenModel.cpDiagnosisCode===cpDiagnosisCode[1].value||
              value.cpcEmergenModel.cpDiagnosisCode===cpDiagnosisCode[2].value||
              value.cpcEmergenModel.cpDiagnosisCode===cpDiagnosisCode[3].value||
              value.cpcEmergenModel.cpDiagnosisCode===cpDiagnosisCode[4].value||
              value.cpcEmergenModel.cpDiagnosisCode===cpDiagnosisCode[5].value" style="width:50%" >
                <el-input type="age" v-model="value.cpcEmergenModel.diagnosisDoctorName" autocomplete="off"/>
              </el-form-item>
              <div v-if="value.cpcEmergenModel.cpDiagnosisCode===cpDiagnosisCode[6].value" style="color:red;margin:10px 0px 10px 110px">
                此选择表示胸痛急救结束，不再继续跟踪患者的救治情况！
              </div>
              <div v-if="value.cpcEmergenModel.cpDiagnosisCode===cpDiagnosisCode[8].value" style="color:red;margin:10px 0px 10px 110px">
                选择此项表明本次诊疗结束，后续项目不用再跟踪填写！
              </div>
              <div style="margin-left:110px;" v-if="value.cpcEmergenModel.cpDiagnosisCode===cpDiagnosisCode[6].value">
                <el-checkbox v-model="value.cpcEmergenModel.arrhythmia" >心率失常</el-checkbox>
                <el-checkbox v-model="value.cpcEmergenModel.dcm">扩张性心肌病</el-checkbox>
                <el-checkbox v-model="value.cpcEmergenModel.icm">缺血性心肌病</el-checkbox>
                <el-checkbox v-model="value.cpcEmergenModel.hcm">肥厚型心肌病</el-checkbox>
                <el-checkbox v-model="value.cpcEmergenModel.carditis">心肌炎</el-checkbox>
                <el-checkbox v-model="value.cpcEmergenModel.chd">冠心病</el-checkbox>
                <el-checkbox v-model="value.cpcEmergenModel.avhd">瓣膜性心脏病</el-checkbox>
                <el-checkbox v-model="value.cpcEmergenModel.omi">陈旧性心肌梗死</el-checkbox>
                <el-checkbox v-model="value.cpcEmergenModel.ap">心绞痛</el-checkbox>
                <el-checkbox v-model="value.cpcEmergenModel.palpitate">心悸</el-checkbox>
                <el-checkbox v-model="value.cpcEmergenModel.af">房颤</el-checkbox>
                <el-checkbox v-model="value.cpcEmergenModel.hypertension">高血压</el-checkbox>
                <el-checkbox v-model="value.cpcEmergenModel.hf">心衰</el-checkbox>
                <el-checkbox v-model="value.cpcEmergenModel.atrialflutter">房扑</el-checkbox>
                <el-checkbox v-model="value.cpcEmergenModel.vpc">室早</el-checkbox>
                <el-checkbox v-model="value.cpcEmergenModel.apb">房早</el-checkbox>
                <el-checkbox v-model="value.cpcEmergenModel.st">室上速</el-checkbox>
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
              <el-form-item label="处理措施：" v-if="value.cpcEmergenModel.cpDiagnosisCode===cpDiagnosisCode[6].value||
              value.cpcEmergenModel.cpDiagnosisCode===cpDiagnosisCode[7].value" style="width:50%">
                <el-input type="text" v-model="value.cpcEmergenModel.handleWay" autocomplete="off"/>
              </el-form-item>
              <el-form-item label="时间： " v-if="value.cpcEmergenModel.cpDiagnosisCode===cpDiagnosisCode[6].value||
              value.cpcEmergenModel.cpDiagnosisCode===cpDiagnosisCode[7].value"  style="width:50%">
                <yn-date-time-pick v-model="value.cpcEmergenModel.handleTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
              </el-form-item>
              <el-form-item label="患者去向：" v-if="value.cpcEmergenModel.cpDiagnosisCode===cpDiagnosisCode[6].value||
              value.cpcEmergenModel.cpDiagnosisCode===cpDiagnosisCode[7].value" style="width:50%">
                <el-input type="text" v-model="value.cpcEmergenModel.patientOutcome" autocomplete="off"/>
              </el-form-item>
              <el-form-item label="医生：" v-if="value.cpcEmergenModel.cpDiagnosisCode===cpDiagnosisCode[6].value||
              value.cpcEmergenModel.cpDiagnosisCode===cpDiagnosisCode[7].value" style="width:50%">
                <el-input type="text" v-model="value.cpcEmergenModel.doctorName" autocomplete="off"/>
              </el-form-item>
          </section>
          <section v-if="value.cpcEmergenModel.cpDiagnosisCode===cpDiagnosisCode[1].value||
          value.cpcEmergenModel.cpDiagnosisCode===cpDiagnosisCode[2].value||
          value.cpcEmergenModel.cpDiagnosisCode===cpDiagnosisCode[3].value">
            <fieldset class="fieldset">
              <legend>ACS给药</legend>
            </fieldset>
              <el-form-item label="抗血小板首次药时间：" prop="acsDeliveryTime">
                <yn-date-time-pick v-model="value.cpcEmergenModel.acsDeliveryTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
              </el-form-item>
              <el-form-item label="阿司匹林：" prop="aspirinDose" style="width:25%">
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
              <el-form-item label="首次抗凝给药：" prop="anticoagulationDrug" style="width:80%">
                <el-radio-group v-model="value.cpcEmergenModel.anticoagulationDrug">
                  <el-radio v-for="(item,i) in isIf" :key="i" :label="item.value">{{item.label}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="给药时间：" prop="anticoagulationDate" style="width:30%">
                <yn-date-time-pick v-model="value.cpcEmergenModel.anticoagulationDate" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
              </el-form-item>
              <el-form-item label="药物：" prop="anticoagulationDrug" style="width:30%">
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
              <el-form-item label="剂量（含单位）：" prop="anticoagulationUnit" style="width:30%">
                <el-input type="anticoagulationUnit" v-model="value.cpcEmergenModel.anticoagulationUnit" autocomplete="off"/>
              </el-form-item>
          </section>
          <section v-if="value.cpcEmergenModel.cpDiagnosisCode===cpDiagnosisCode[2].value||
          value.cpcEmergenModel.cpDiagnosisCode===cpDiagnosisCode[3].value">
            <fieldset class="fieldset">
              <legend>Grace评估</legend>
            </fieldset>
              <div style="margin-left:110px;">
                <el-checkbox v-model="value.cpcEmergenModel.isArrest" >发病后曾出现心脏骤停</el-checkbox>
                <el-checkbox v-model="value.cpcEmergenModel.isChange">心电图ST段改变</el-checkbox>
                <el-checkbox v-model="value.cpcEmergenModel.isRise">心肌坏死标志物升高</el-checkbox>
              </div>
              <el-form-item label="Grance分值：" prop="graceValue" >
                <el-input type="text" v-model="value.cpcEmergenModel.graceValue" autocomplete="off"/>

              </el-form-item>
              <el-form-item label="危险分层：" prop="doctorName" style="width:50%">
                <el-radio-group v-model="value.cpcEmergenModel.riskLamination">
                  <el-radio v-for="(item,i) in riskLamination" :key="i" :label="item.value">{{item.label}}</el-radio>
                </el-radio-group>
              </el-form-item>
          </section>
          <section>
              <fieldset class="fieldset">
              <legend>患者情况备注</legend>
              </fieldset>
              <el-form-item label=" " prop="patientCaseNote" class="widthAll">
                <el-input type="textarea" v-model="value.cpcEmergenModel.thromResultDesc" autocomplete="off"/>
              </el-form-item>
               <!-- <el-form-item label="急救操作日志：" prop="patientCaseNote" class="widthAll"/> -->
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
export default class FirstAid extends Vue {
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
    .FirstAid{
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
    }
</style>
<style lang="less" scoped>
    .FirstAid{
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

