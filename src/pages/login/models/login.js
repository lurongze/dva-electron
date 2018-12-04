
import { login } from '../services/login'
export default {
  namespace: 'login',
  state: {
    username: '',
    password: ''
  },
  subscriptions: {
  },
  effects: {
    *login({ payload }, { call, put, select }) {
      const state = yield select(state=> state.login);
      const res = yield call(login, state);
      yield put({
        type: 'save',
        payload: {
          text: JSON.stringify(res)
        }
      });
    },
    *inputChange({ payload }, { put }) {
      const name = payload.name;
      const value = payload.value;
      yield put({
        type: 'save',
        payload: {
          [name]: value
        }
      })
    }
  },
  reducers: {
    save(state, action) {
        return { ...state, ...action.payload };
    },
  },
};        
