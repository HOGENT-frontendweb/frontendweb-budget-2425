// src/components/Layout.jsx

import { Outlet, ScrollRestoration } from 'react-router-dom';
import NavigationBar from '../components/Navbar';
import { useThemeColors } from '../contexts/theme';
import Container from 'react-bootstrap/Container';

export default function Layout() {
  const { theme, textTheme } = useThemeColors();
  return (
    <Container className={`bg-${theme} text-${textTheme} pb-4`}>
      <NavigationBar />
      <div className="m-4" >
        <Outlet />
      </div>
      <ScrollRestoration />
    </Container >
  );
}
