export default {
  path: '/emergency',
  component: (r: any) => require(['@/views/Nurse.vue'], r),
  children: [
    {
      path: 'patientInfo',
      name: 'patientInfo', // 病人信息
      components: {
        nurse: (r: any) =>
          require(['@/views/nurse/patientInfo/PatientInfo.vue'], r)
      }
    },
    {
      path: 'patientInfo/patienInfotEdit',
      name: 'patienInfotEdit', // 编辑病人信息
      components: {
        nurse: (r: any) =>
          require(['@/views/nurse/patientInfo/patienInfotEdit.vue'], r)
      }
    },
    {
      path: 'calledManage',
      name: 'calledManage', // 叫号管理
      components: {
        nurse: (r: any) =>
          require(['../../views/calledManage/CalledManage.vue'], r)
      }
    },
    {
      path: 'notes',
      name: 'notes', // 护理列表页
      components: {
        nurse: (r: any) => require(['../../views/nurse/notes/Notes.vue'], r)
      }
    },
    {
      path: 'notes/add',
      name: 'notes_add', // 护理新建页面
      components: {
        nurse: (r: any) =>
          require(['../../views/nurse/notes/NotesDetail.vue'], r)
      }
    },
    {
      path: 'notes/edit',
      name: 'notes_edit', // 护理编辑页面
      components: {
        nurse: (r: any) =>
          require(['../../views/nurse/notes/NotesDetail.vue'], r)
      }
    },
    {
      path: 'notes/detail',
      name: 'notes_detail', // 护理详情页面
      components: {
        nurse: (r: any) =>
          require(['../../views/nurse/notes/NotesDetail.vue'], r)
      }
    },
    {
      path: 'bedCard',
      name: 'bedCard', // 床位安排
      components: {
        nurse: (r: any) => require(['../../views/nurse/bed/BedCard.vue'], r)
      }
    },
    {
      path: 'systemSetting/beds',
      name: 'bed', // 床位管理
      components: {
        nurse: (r: any) =>
          require(['../../views/systemSetting/bed/Beds.vue'], r)
      }
    },
    {
      path: 'systemSetting/beds/add',
      name: 'beds_add', // 床位管理添加
      components: {
        nurse: (r: any) =>
          require(['../../views/systemSetting/bed/BedDetail.vue'], r)
      }
    },
    {
      path: 'systemSetting/beds/edit',
      name: 'beds_edit', // 床位管理编辑
      components: {
        nurse: (r: any) =>
          require(['../../views/systemSetting/bed/BedDetail.vue'], r)
      }
    },
    {
      path: 'prescription',
      name: 'prescription', // 医嘱列表页
      components: {
        nurse: (r: any) =>
          require(['../../views/nurse/prescription/Prescription.vue'], r)
      }
    },
    {
      path: 'splitPrescription',
      name: 'splitPrescription', // 拆分医嘱列表页
      components: {
        nurse: (r: any) =>
          require(['../../views/nurse/prescription/SplitPrescription.vue'], r)
      }
    },
    {
      path: 'i',
      name: 'i', // 演示图片
      components: {
        nurse: (r: any) => require(['@/views/nurse/I.vue'], r)
      }
    },
    {
      path: 'medicalRecord',
      name: 'medical_record_edit', // 电子病历
      components: {
        nurse: (r: any) => require.ensure([], () => r(require('../../views/nurse/medicalRecord/MedicalRecord.vue')))
      }
    },
    // 胸痛中心编辑
    {
      path: 'crfplane/edit',
      name: 'crfplane_edit',
      components: {
        nurse: (r: any) => require.ensure([], () => r(require('../../views/nurse/crfplane/CrfplaneEdit.vue')))
      }
    },
    {
      path: 'crfplanedata/edit',
      name: 'crfplanedata_edit',
      components: {
        nurse: (r: any) => require.ensure([], () => r(require('../../views/nurse/crfplane/CrfplaneDataEdit.vue')))
      }
    },
    // 胸痛中心列表
    {
      path: 'crfplane',
      name: 'crfplane',
      components: {
        nurse: (r: any) =>
          require(['../../views/nurse/crfplane/Crfplane.vue'], r)
      }
    },
    {
      path: 'crfplanedata',
      name: 'crfplanedata',
      components: {
        nurse: (r: any) =>
          require(['../../views/nurse/crfplane/CrfplaneData.vue'], r)
      }
    },
    // {
    //   path: 'bigScreen',
    //   name: 'bigScreen',
    //   components: {
    //     nurse: (r: any) =>
    //       require(['../../views/bigScreen/ConsumablesStatistics.vue'], r)
    //   }
    // },
    // his住院历史记录列表
    {
      path: 'his-hospital-log',
      name: 'hisHospitalLog',
      components: {
        nurse: (r: any) => require(['../../views/nurse/his/HisHospitalLog.vue'], r)
      }
    },
    // his门急诊挂号历史记录列表
    {
      path: 'his-clinic-log',
      name: 'hisClinicLog',
      components: {
        nurse: (r: any) => require(['../../views/nurse/his/HisClinicLog.vue'], r)
      }
    },
    // 医生交接班
    {
      path: 'handover/doctor',
      name: 'handoverDoctor',
      components: {
        nurse: (r: any) => require(['../../views/nurse/handover/HandoverDoctor.vue'], r)
      }
    },
    // 护士交接班
    {
      path: 'handover/nurse',
      name: 'handoverNurse',
      components: {
        nurse: (r: any) => require(['../../views/nurse/handover/HandoverNurse.vue'], r)
      }
    },
    // 大屏
    {
      path: 'screenList',
      name: 'ScreenList',
      components: {
        nurse: (r: any) => require.ensure([], () =>
        r(require('@/views/nurse/screen/ScreenList.vue')), () => null , 'screenList')
      }
    },
    {
      path: '/',
      name: 'nurse', // 预检分诊
      components: {
        nurse: (r: any) => require(['@/views/nurse/Index.vue'], r)
      }
    },
    // 彩色多普勒床旁超声报告单
    {
      path: 'b-ultrasonic',
      name: 'BUltrasonic',
      components: {
        nurse: (r: any) => require(['@/views/nurse/BUltrasonic.vue'], r)
      }
    },
    // 彩色多普勒床旁超声报告单
    {
      path: 'b-ultrasonic/edit',
      name: 'BUltrasonicEdit',
      params: {
        type: 'edit'
      },
      components: {
        nurse: (r: any) => require(['@/views/nurse/BUltrasonic.vue'], r)
      }
    },
    // 彩色多普勒床旁超声报告单
    {
      path: 'b-ultrasonic-list',
      name: 'BUltrasonicList',
      components: {
        nurse: (r: any) => require(['@/views/nurse/BUltrasonicList.vue'], r)
      }
    },
    {
      path: 'patient/analysis',
      name: 'patient/analysis', // 病人检验
      components: {
        nurse: (r: any) => require(['../../views/nurse/patientInfo/Analysis.vue'], r)
      }
    },
    {
      path: 'patient/examine',
      name: 'patient/examine', // 病人检查
      components: {
        nurse: (r: any) => require(['../../views/nurse/patientInfo/Examine.vue'], r)
      }
    },
    {
      path: 'duty',
      name: 'duty', // 人数统计
      components: {
        nurse: (r: any) => require(['../../views/nurse/duty/DutyTable.vue'], r)
      }
    },
    {
      path:'changeMessage',
      name:'changeMessage',
      components: {
        nurse:(r: any) => require(['@/views/nurse/ChangeMessage.vue'],r)
      }
    }
  ]
};
