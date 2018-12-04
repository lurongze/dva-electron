import { getBaseData, getList } from '../services/global';

export default {
  namespace: "global",
  state: {
    title: '首页',
    categories: [],
    list: [],
    size: 10,
    page: 1
  },
  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({
        type: 'getBaseData'
      });
      dispatch({
        type: 'getList'
      });
      return history.listen(({ pathname }) => {
        console.log('pathname', pathname);
      });
    }
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  },
  effects: {
    *getBaseData({ payload }, { put, call }) {
      const res = yield call(getBaseData);
      const categories = res.data.categories || [];
      console.log('res', res);
      yield put({
        type: 'save',
        payload: {
          categories
        }
      })
    },
    *getList({ payload }, { put, call, select }) {
      const state = yield select(state => state.global);
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
  }
};
