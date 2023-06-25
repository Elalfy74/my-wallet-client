import { Outlet } from 'react-router-dom';
import { Container, Group } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { MainNavbar } from './components/nav';
import { MainHeader } from './components/header';

export const MainLayout = () => {
  const matches = useMediaQuery('(min-width: 1024px)');

  return (
    <>
      {!matches && <MainHeader />}
      <Group align="start">
        {matches && <MainNavbar />}
        <Container
          mt={{
            lg: 80,
          }}
          sx={{ flex: 1 }}
        >
          <Outlet />
        </Container>
      </Group>
    </>
  );
};
