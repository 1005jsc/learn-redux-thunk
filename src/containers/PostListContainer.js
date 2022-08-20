import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostList from '../components/PostList';
import { getPosts } from '../modules/posts';

function PostListContainer() {
  const { data, loading, error } = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  // 컴포넌트 마운트 후 포스트 목록 요청
  useEffect(() => {
    // console.log(dispatch);
    dispatch(getPosts());
    // getPosts는 이렇게 생겼다
    //  async (dispatch) => {
    // dispatch({ type: GET_POSTS });
    // try {
    //   const response = await postsApi.getPosts();
    //   dispatch({ type: GET_POSTS_SUCCESS, posts: response });
    // } catch (error) {
    //   dispatch({ type: GET_POSTS_ERROR, error: error }); // 실패
    // }

    // dispatch안에 위와같은 형식으로 넣어주면 dispatch가 동작 한다는 의미이다
  }, [dispatch]);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;
  return <PostList posts={data} />;
}

export default PostListContainer;
