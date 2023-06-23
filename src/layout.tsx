import { Outlet } from 'react-router-dom';
import { Group } from '@mantine/core';
import { MainNavbar } from './components/nav';

export const MainLayout = () => (
  <Group align="start">
    <MainNavbar />
    <Outlet />
  </Group>
);
