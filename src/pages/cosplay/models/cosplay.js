
import { getList } from '../services/cosplay';
export default {
  namespace: 'cosplay',
  state: {
    list: [],
    size: 10,
    page: 1
  },
  subscriptions: {
    setup({ dispatch, history }) {

      return history.listen(({ pathname }) => {
        console.log('pathname', pathname);
        if (pathname === '/cosplay') {
          dispatch({
            type: 'getList'
          });
        }
      });
    }
  },
  effects: {
    *getList({ payload }, { put, call, select }) {
      const state = yield select(state => state.cosplay);
      if (state.page < 1) {
        return false;
      }
      payload = { ...{ page: state.page, size: state.size}, ...payload };
      const res = yield call(getList, payload);
      const listData = res.data.data.list || [];
      let list = [];
      let page = +state.page;
      if (listData.length > 0) {
        page = page + 1;
        list = [ ...state.list, ...listData ];
      } else {
        page = 0;
        list = state.list;
      }
      yield put({
        type: 'save',
        payload: { page, list }
      })
    }
  },
  reducers: {
    save(state, action) {
        return { ...state, ...action.payload };
    },
  },
};        
