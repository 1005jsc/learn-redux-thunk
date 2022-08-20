# redux-thunk

## thunk를 왜쓰냐?

기존 dispatch는 param으로 객체형태만 받아들였다

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

해주면

dispatch 에 객체뿐만 아니라 함수를 넣을 수 있다 그럼 코드가 보기 깔끔하다

dispatch(sampleFunc()) 예를들어 이런 식으로 넣는다

대신, 아무 함수나 넣는게 아니라 dispatch안에 넣을 함수는 형태가 아래처럼 넣는 것을 추천한다

const sampleFunc = (param) => async (dispatch) => {

    <!-- // 보통 이런꼴
    dispatch({ type, param });
    try {
      // 결과물의 이름을 payload 라는 이름으로 통일시킵니다.
      const payload = await promiseCreator(param);
      dispatch({ type: SUCCESS, payload }); // 성공
    } catch (e) {
      dispatch({ type: ERROR, payload: e, error: true }); // 실패
    } -->

};

아직 제대로 아는 것은 아니지만 이렇게 쓴다고 카드라~

더 공부해서 더 자세하게 나중에 적을거다~
