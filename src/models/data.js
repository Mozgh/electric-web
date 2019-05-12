import {listFactory} from '../services/example';

export default {

  namespace : 'data',

  state : {
    factory : [],
    currentFactory : {},
    workshop : [],
    currentWorkshop : {},
    circuit : [],
    currentCircuit : {},
    electricData : {}
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
      yield call(listFactory, payload)
    }
  },

  reducers : {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
