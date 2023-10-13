import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Main from './pages/MainPage';
import ROUTER from './constants/router';
import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import Kakao from './pages/KakaoPage';
import AddPost from './pages/AddPostPage';
import Payment from './pages/PaymentPage';
import MyPage from './pages/MyPage';
import PostDetail from './pages/PostDetailPage';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: ROUTER.PATH.MAIN,
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
      },

      {
        path: ROUTER.PATH.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTER.PATH.SIGNUP,
        element: <Signup />,
      },
      {
        path: ROUTER.PATH.MYPAGE,
        element: <MyPage />,
      },
      {
        path: ROUTER.PATH.ADDPOST,
        element: <AddPost />,
      },
      {
        path: ROUTER.PATH.DETAIL,
        element: <PostDetail />,
      },
    ],
  },
  {
    path: ROUTER.PATH.KAKAO,
    element: <Kakao />,
  },
  {
    path: ROUTER.PATH.PAYMENT,
    element: <Payment />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={true} />
  </QueryClientProvider>
);
