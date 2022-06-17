/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import CommonLayout from '@/components/CommonLayout';
import PostsContainer from '@/features/postWall/components/PostsContainer';
import PostsConsole from '@/features/postWall/components/PostsConsole';
import { useQuery } from 'react-query';
import { useSnackbar } from 'notistack';
import generateJoiError from '@/utils/formatters/generateJoiError';
import getPosts from '@/features/postWall/api/getPosts';
import { useAuth } from '@/lib/auth';

function PostWallPage(props) {
  const amounts = [
    10,
    20,
    30,
    40,
    50,
  ]
  const searchRef = useRef();
  const usernameRef = useRef();
  const [categoryRef, setCategoryRef] = useState();
  const likesRef = useRef();
  const auth = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(1);
  const [pageAmount, setPageAmount] = useState(amounts[0]);
  const { data, isPreviousData, refetch } = useQuery(['users', page, pageAmount], async () => {
    const response = await getPosts(pageAmount, page, searchRef.current && searchRef.current.value, usernameRef.current && usernameRef.current.value, categoryRef, likesRef.current && likesRef.current.value, auth.user && auth.user.account_id);
    if (response === 'ASYNCERROR') {
      enqueueSnackbar('The server could not process the request.', { variant: 'error' })
    } else if (response === 'UNAUTHORIZED') {
      enqueueSnackbar('You were not authorized to view posts.', { variant: 'error' })
    } else if (response === 'FAILURE') {
      enqueueSnackbar('There was a problem retrieving the posts.', { variant: 'error' })
    } else if (response.details) {
      generateJoiError(response.details, enqueueSnackbar);
    } else {
      return response;
    }
    return null;
  }, { keepPreviousData: true });
  window.refetchPosts = refetch;
  
  const leftPageButton = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  const rightPageButton = () => {
    if (!isPreviousData && data.hasMore) {
      setPage(page + 1);
    }
  }

  useEffect(() => {
    refetch();
    console.log('data', data)
  }, [data, categoryRef])

  return (
    <CommonLayout
      useMobileDrawer
      mobileDrawerHeaders={[
        'Posts',
        `Search${auth.user ? ' / New Post' : ''}`,
      ]}
    >
      <PostsContainer
        page={page}
        setPage={setPage}
        refetch={refetch}
        posts={data && data.data && Array.isArray(data.data) ? data.data : []}
        rightPageButton={rightPageButton}
        leftPageButton={leftPageButton}
      />
      <PostsConsole
        amounts={amounts}
        postData={data}
        page={page}
        setPage={setPage}
        setPageAmount={setPageAmount}
        isPreviousData={isPreviousData}
        refetchPostData={refetch}
        searchRef={searchRef}
        usernameRef={usernameRef}
        categoryRef={categoryRef}
        setCategoryRef={setCategoryRef}
        likesRef={likesRef}
        rightPageButton={rightPageButton}
        leftPageButton={leftPageButton}
      />
    </CommonLayout>
  );
}

export default PostWallPage;