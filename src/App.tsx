import React, { useEffect } from 'react';
import { useUserStore } from './store/userStore';
import { useAuthStore } from './store/authStore';
import AppRouter from './router';

function App() {
  const { initializeUser } = useUserStore();
  const { autoLogin } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      await autoLogin();
      initializeUser();
    };
    
    init();
  }, [autoLogin, initializeUser]);

  return <AppRouter />;
}

export default App;