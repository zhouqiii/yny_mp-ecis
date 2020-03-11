export default {
    path: '/systemSetting',
    component: (r: any) => require(['../../views/Nurse.vue'], r),
    children: [
    {
      path: 'beds',
      name: 'systemSetting/beds', // 床位管理列表
      components: {
        nurse: (r: any) => require(['../../views/systemSetting/bed/Beds.vue'], r)
      }
    },
      {
        path: '/',
        name: 'nurse', // 预检分诊
        components: {
          nurse: (r: any) => require(['../../views/nurse/Index.vue'], r)
        }
    },
      ]
  };
