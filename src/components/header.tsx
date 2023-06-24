import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  rem,
  Title,
  Drawer,
  Box,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import { MainNavbar } from './nav';

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
}));

export function MainHeader() {
  const [opened, { open, close }] = useDisclosure(false);
  const { classes } = useStyles();

  return (
    <>
      <Drawer opened={opened} onClose={close} withinPortal lockScroll>
        <MainNavbar close={close} />
      </Drawer>
      <Header height={60} mb={20}>
        <Container className={classes.header}>
          <Burger opened={opened} onClick={open} size="sm" />

          <Title order={3}>My Wallet</Title>
        </Container>
      </Header>
    </>
  );
}
