import { Outlet } from 'react-router-dom';
import { Container, Group } from '@mantine/core';
import { MainNavbar } from './components/nav';

export const MainLayout = () => (
  <Group align="start">
    <MainNavbar />
    <Container mt={80} sx={{ flex: 1 }}>
      <Outlet />
    </Container>
  </Group>
);
