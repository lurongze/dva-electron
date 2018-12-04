
import { register } from '../services/register'
export default {
  namespace: 'register',
  state: {
    username: '',
    password: '',
    confirmPassword: '',
    tip: ''
  },
  subscriptions: {
  },
  effects: {
    *login({ payload }, { call, put, select }) {
      const state = yield select(state=> state.login);
      const res = yield call(register, state);
      yield put({
        type: 'save',
        payload: {
          text: JSON.stringify(res)
        }
      });
    },
    *inputChange({ payload }, { put, select}) {
      const name = payload.name;
      const value = payload.value;
      let tip = '';
      if (name === 'confirmPassword') {
        const state = yield select(state=> state.register);
        if (state.password !== value) {
          tip = '两次输入的密码不一致'
        }
      }
      yield put({
        type: 'save',
        payload: {
          [name]: value,
          tip
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
