export const createPromiseThunk = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return (param) => async (dispatch) => {
    // 요청 시작
    dispatch({ type, param });
    try {
      // 결과물의 이름을 payload 라는 이름으로 통일시킵니다.
      const payload = await promiseCreator(param);
      dispatch({ type: SUCCESS, payload }); // 성공
    } catch (e) {
      dispatch({ type: ERROR, payload: e, error: true }); // 실패
    }
  };
};

export const reducerUtils = {
  initial: (initialData = null) => ({
    loading: false,
    data: initialData,
    error: null,
  }),
  loading: (prevState = null) => ({
    loading: true,
    data: prevState,
    error: null,
  }),
  success: (payload) => ({
    loading: false,
    data: payload,
    error: null,
  }),
  error: (error) => ({
    loading: false,
    data: null,
    error: error,
  }),
};

// 비동기 관련 액션들을 처리하는 리듀서를 만들어줍니다.
// type 은 액션의 타입, key 는 상태의 key (예: posts, post) 입니다.
export const handleAsyncActions = (type, key) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading(),
        };
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.success(action.payload),
        };
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.payload),
        };
      default:
        return state;
    }
  };
};
