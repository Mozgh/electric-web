import {listUsers, createUser, deleteUser} from '../services/example';

export default {

    namespace : 'user',
  
    state : {
        users : [],
        pageNum : 1,
        pageSize : 10,
        total : 0,
        createVisible : false
    },
  
    subscriptions : {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects : {
      *createUser({payload}, {call, put}) {
        yield call(createUser, payload);
      },

      *listUsers({payload}, {call, put}) {
          let response = yield call(listUsers, payload);
          yield put({
            type : 'setUser',
            payload : {
              datas : response.data.res
            }
          })
      },
      *deleteUser({payload}, {call, put}) {
        yield call(deleteUser, payload);
      }
    },
  
    reducers : {
      setUser(state, {payload : {datas, pageNum, pageSize, total}}) {
        return {...state, users : datas, pageNum : pageNum, pageSize : pageSize, total : total};
      },
      setCreateVisible(state, {payload : {visible}}) {
        return {...state, createVisible : visible}
      }
    },
  
  };
  