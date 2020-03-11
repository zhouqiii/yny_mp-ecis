const Opbtn = {
  state: {
    opbtn: []
  },
  actions: {
  },
  mutations: {
    SET_OPBTN_VALUE: (state: any, value: any) => {
      state.opbtn = value;
    }
  },
  getters: {
    GET_OPBTN_VALUE: (state: any) => {
      return state.opbtn;
    }
  }
};
export default Opbtn;
