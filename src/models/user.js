import {listUsers} from '../services/example';

export default {

    namespace : 'user',
  
    state : {
        datas : [
            {id : 1, username : "admin", email : "admin.test@test.com"},
            {id : 2, username : "user1"}
        ]
    },
  
    subscriptions : {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects : {
      *fetch({ payload }, { call, put }) {  // eslint-disable-line
        yield put({ type : 'save' });
      },

      *listUsers({payload}, {call, put}) {
          let response = yield call(listUsers, payload);
      }
    },
  
    reducers : {
      save(action) {
        console.log(action);
        return { ...action.payload };
      },
    },
  
  };
  