// src/components/Layout.jsx
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useThemeColors } from '../contexts/theme';

export default function Layout() {
  const { theme, textTheme } = useThemeColors();
  return (
    <div className="max-w-6xl bg-dark text-white mx-auto p-4 pt-0">
      <Navbar />
      <Outlet />
      <ScrollRestoration />
    </div >
  );
}
