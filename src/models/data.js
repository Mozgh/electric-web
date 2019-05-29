import {listFactory, listWorkshop, listCircuit, listData, createFactory, createWorkshop, createCircuit, downloadTemplate} from '../services/example';
import moment from "moment";

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
    dataC : [],
    modalVisible : false,
    modalType : "",     //factory,workshop,circuit,data
    modalInfo : {},
    startTime : moment().add(-1, 'days').format("YYYY-MM-DD HH-mm-ss"),
    endTime : moment().format("YYYY-MM-DD HH-mm-ss"),
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
    *createFactory({payload}, {call, put}) {
      yield call(createFactory, payload);
    },

    *listWorkshop({payload}, {call, put}) {
      const { data } = yield call(listWorkshop, payload);
    },

    *createWorkshop({payload}, {call, put}) {
      yield call(createWorkshop, payload);
    },

    *createCircuit({payload}, {call, put}) {
      yield call(createCircuit, payload);
    },

    *downloadTemplate({payload}, {call, put}) {
      yield call(downloadTemplate, payload);
    },

    *listData({payload}, {call, put}) { 
      const { data } = yield call(listData, payload);
      
      const {res} = data;
      let dataAMap = new Map();
      let dataA = [];
      let dataBMap = new Map();
      let dataB = [];
      let dataCMap = new Map();
      let dataC = [];
      if (res) {
        res.map(record => {
          const {
            electricityA, voltageA, activePowerA, reactivePowerA, apparentPowerA,
            electricityB, voltageB, activePowerB, reactivePowerB, apparentPowerB,
            electricityC, voltageC, activePowerC, reactivePowerC, apparentPowerC,
            time
          } = record;
          dataAMap.set(time, {
            electricity : electricityA,
            voltage : voltageA,
            activePower : activePowerA,
            reactivePower : reactivePowerA,
            apparentPower : apparentPowerA,
            time
          });
          dataBMap.set(time, {
            electricity : electricityB,
            voltage : voltageB,
            activePower : activePowerB,
            reactivePower : reactivePowerB,
            apparentPower : apparentPowerB,
            time
          });
          dataCMap.set(time, {
            electricity : electricityC,
            voltage : voltageC,
            activePower : activePowerC,
            reactivePower : reactivePowerC,
            apparentPower : apparentPowerC,
            time
          });
      })
      }
      dataAMap.forEach((value, key, map) => {
        dataA.push(value);
      });
      dataBMap.forEach((value, key, map) => {
        dataB.push(value);
      });
      dataCMap.forEach((value, key, map) => {
        dataC.push(value);
      });
      yield put({
        type : 'setCurrentCircuit',
        payload : payload.cid
      });
      yield put({
        type : 'setTime',
        payload : {
          startTime : payload.start,
          endTime : payload.end
        }
      })
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
      return { ...state, currentCircuit : payload.payload};
    },
    setElectricData(state, payload) {
      const {dataA, dataB, dataC} = payload.payload;
      return { ...state, dataA, dataB, dataC};
    },
    setModalInfo(state, payload) {
      const {modalVisible, modalType, modalInfo} = payload.payload;
      return {
        ...state,
        modalVisible,
        modalType,
        modalInfo
      }
    },
    setTime(state, payload) {
      const {startTime, endTime} = payload.payload;
      return {
        ...state,
        startTime,
        endTime
      }
    }
  },

};
