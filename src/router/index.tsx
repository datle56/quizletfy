import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/Layout';
import LandingPage from '../pages/LandingPage';
import Dashboard from '../pages/Dashboard';
import QuizSetDetail from '../pages/QuizSetDetail';
import FlashcardStudy from '../pages/FlashcardStudy';
import MatchGame from '../pages/MatchGame';
import CreateSet from '../pages/CreateSet';
import Analytics from '../pages/Analytics';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import LoginForm from '../components/Auth/LoginForm';
import SignupForm from '../components/Auth/SignupForm';
import ProtectedRoute from '../components/ProtectedRoute';
import NotFound from '../components/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <NotFound />
  },
  {
    path: '/login',
    element: <LoginForm />
  },
  {
    path: '/signup',
    element: <SignupForm />
  },
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'quiz/:id',
        element: <QuizSetDetail />
      },
      {
        path: 'quiz/:id/flashcards',
        element: <FlashcardStudy />
      },
      {
        path: 'quiz/:id/match',
        element: <MatchGame />
      },
      {
        path: 'create',
        element: <CreateSet />
      },
      {
        path: 'analytics',
        element: <Analytics />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'settings',
        element: <Settings />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;