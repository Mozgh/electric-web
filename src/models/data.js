import {listFactory, listWorkshop, listCircuit, listData} from '../services/example';

export default {

  namespace : 'data',

  state : {
    factory : [],
    currentFactory : {},
    workshop : [],
    currentWorkshop : {},
    circuit : [],
    currentCircuit : {},
    electricData : {}, 
    dataA : [],
    dataB : [],
    dataC : []
  },

  subscriptions : {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects : {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type : 'save' });
    },

    *listFactory({payload}, {call, put}) {
      const {data} = yield call(listFactory, payload);
      yield put({
        type : 'setFactory',
        payload : data.res
      })
    },

    *listWorkshop({payload}, {call, put}) {
      const { data } = yield call(listWorkshop, payload);
      yield put()
    },

    *listData({payload}, {call, put}) { 
      const { data } = yield call(listData, payload);
      
      const {res} = data;
      let dataA = [];
      let dataB = [];
      let dataC = [];
      if (res) {
        res.map(record => {
          const {electricityA, voltageA, electricityB, voltageB, electricityC, voltageC, time} = record;
          dataA.push({
            electricity : electricityA,
            voltage : voltageA,
            time
          });
          dataB.push({
            electricity : electricityB,
            voltage : voltageB,
            time
          });
          dataC.push({
            electricity : electricityC,
            voltage : voltageC,
            time
          });
      })
      }

      yield put({
        type : 'setElectricData',
        payload : {
          dataA, dataB, dataC
        }
      }) 

    }
  },

  reducers : {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    setFactory(state, payload) {
      return { ...state, factory : payload.payload};
    },
    setCurrentFactory(state, payload) {
      return { ...state, currentFactory : payload.currentFactory};
    },
    setWorkshop(state, payload) {
      return { ...state, workshop : payload.workshop};
    },
    setCurrentWorkshop(state, payload) {
      return { ...state, currentWorkshop : payload.currentWorkshop};
    },
    setCircuit(state, payload) {
      return { ...state, circuit : payload.circuit};
    },
    setCurrentCircuit(state, payload) {
      return { ...state, currentCircuit : payload.currentCircuit};
    },
    setElectricData(state, payload) {
      const {dataA, dataB, dataC} = payload.payload;
      return { ...state, dataA, dataB, dataC};
    }
  },

};
