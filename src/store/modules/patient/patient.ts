const Patient = {
  state: {
    patient: {
      patientId: '',
      visitId: '',
      name: '',
      gender: '',
      birthday: '',
      age: 0,
      ageMonth: 0,
      ageDay: 0,
      section: '',
      bedCode: '',
      arrivalDate: '',
      severityLevelSys: '',
      diagnosisList: '',
      status: '',
      doctorName: '',
      nurseName: '',
      firstMedicalContact: '',
      endDate: '',
      nationId: '',
      residentIdentityCard: '',
      visitCard: '',
      nativePlace: '',
      addressDetail: '',
      maritalStatus: '',
      feeType: '',
      phone: '',
      arrivalMethod: '',
      ifWithoutId: '',
      accompany: '',
      accompanyAddress: '',
      accompanyPhone: '',
      accompanyRelation: '',
      ifGreenChannel: '',
      ifFever: '',
      ifThoracalgia: '',
      ifNoreasonDeath: '',
      breathe: '',
      temperature: '',
      heartRate: '',
      diastolicPressure: '',
      systolicPressure: '',
      so2: '',
      illnessState: ''
    }
  },
  actions: {
  },
  mutations: {
    SET_PATIENT: (state: any, value: any) => {
      state.patient = value;
      sessionStorage.setItem('currentPatient', JSON.stringify(value));
    }
  },
  getters: {
    GET_PATIENT: (state: any) => {
      return state.patient;
    }
  }
};
export default Patient;
