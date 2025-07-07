import React from 'react';
import { Outlet } from 'react-router-dom';
import { useThemeStore } from '../store/themeStore';
import Header from './Header';

const Layout: React.FC = () => {
  const { isDarkMode } = useThemeStore();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;