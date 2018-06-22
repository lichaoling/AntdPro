import { setMyWords } from '../services/Test';

export default {
  namespace: 'Test',
  state: {
    myTestUsers: {},
  },

  effects: {
    *fetchMyWords({ words }, { call, put }) {
      const response = yield call(setMyWords, words);
      yield put({
        type: 'setMyUser',
        payload: response,
      });
    },
  },

  reducers: {
    setMyUser(state, action) {
      return {
        myTestUsers: action.payload,
      };
    },
  },
};
