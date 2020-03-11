export default {
  path: '/doctor',
  component: (r: any) => require(['../../views/Nurse.vue'], r),
  children: [
    {
      path: 'patientInfo',
      name: 'doctor/patientInfo', // 病人信息
      components: {
        nurse: (r: any) =>
          require(['../../views/nurse/patientInfo/PatientInfo.vue'], r)
      }
    },
    {
      path: 'calledManage',
      name: 'doctor/calledManage', // 叫号管理
      components: {
        nurse: (r: any) =>
          require(['../../views/calledManage/CalledManage.vue'], r)
      }
    },
    {
      path: 'notes',
      name: 'doctor/notes', // 护理列表页
      components: {
        nurse: (r: any) => require(['../../views/nurse/notes/Notes.vue'], r)
      }
    },
    {
      path: 'notes/add',
      name: 'doctor/notes/add', // 护理新建页面
      components: {
        nurse: (r: any) =>
          require(['../../views/nurse/notes/NotesDetail.vue'], r)
      }
    },
    {
      path: 'notes/edit',
      name: 'doctor/notes/edit', // 护理编辑页面
      components: {
        nurse: (r: any) =>
          require(['../../views/nurse/notes/NotesDetail.vue'], r)
      }
    },
    {
      path: 'notes/detail',
      name: 'doctor/notes/detail', // 护理详情页面
      components: {
        nurse: (r: any) =>
          require(['../../views/nurse/notes/NotesDetail.vue'], r)
      }
    },
    {
      path: 'bedCard',
      name: 'doctor/bedCard', // 床位安排
      components: {
        nurse: (r: any) => require(['../../views/nurse/bed/BedCard.vue'], r)
      }
    },
    {
      path: 'systemSetting/beds',
      name: 'systemSetting/beds', // 床位管理
      components: {
        nurse: (r: any) =>
          require(['../../views/systemSetting/bed/Beds.vue'], r)
      }
    },
    {
      path: 'systemSetting/beds/add',
      name: 'systemSetting/beds/add', // 床位管理添加
      components: {
        nurse: (r: any) =>
          require(['../../views/systemSetting/bed/BedDetail.vue'], r)
      }
    },
    {
      path: 'systemSetting/beds/edit',
      name: 'systemSetting/beds/edit', // 床位管理编辑
      components: {
        nurse: (r: any) =>
          require(['../../views/systemSetting/bed/BedDetail.vue'], r)
      }
    },
    {
      path: 'prescription',
      name: 'doctor/prescription', // 医嘱列表页
      components: {
        nurse: (r: any) =>
          require(['../../views/nurse/prescription/Prescription.vue'], r)
      }
    },
    {
      path: 'splitPrescription',
      name: 'doctor/splitPrescription', // 拆分医嘱列表页
      components: {
        nurse: (r: any) =>
          require(['../../views/nurse/prescription/SplitPrescription.vue'], r)
      }
    },
    {
      path: 'i',
      name: 'i', // 演示图片
      components: {
        nurse: (r: any) => require(['../../views/nurse/I.vue'], r)
      }
    },
    {
      path: 'medicalRecord',
      name: 'medicalRecordEdit', // 电子病历
      components: {
        nurse: (r: any) => require.ensure([], () => r(require('../../views/nurse/medicalRecord/MedicalRecord.vue')))
      }
    },
    // 胸痛中心编辑
    {
      path: 'crfplane/edit',
      name: 'crfplaneEdit',
      components: {
        nurse: (r: any) => require.ensure([], () => r(require('../../views/nurse/crfplane/CrfplaneEdit.vue')))
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
    {
      path: '/',
      name: 'doctor', // 预检分诊
      components: {
        nurse: (r: any) => require(['../../views/nurse/Index.vue'], r)
      }
    }
  ]
};
