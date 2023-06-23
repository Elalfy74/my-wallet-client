import {
  createStyles,
  Navbar,
  Group,
  getStylesRef,
  rem,
  Title,
  Button,
  Anchor,
  Avatar,
} from '@mantine/core';
import { IconLogout, IconHome, IconUser, IconWallet } from '@tabler/icons-react';
import { Link, NavLink } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { logout } from '@/apis/auth';
import { useAuth } from '@/store/auth';

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      [`& .${getStylesRef('icon')}`]: {
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      },
    },
  },
}));

const data = [
  { link: '/', label: 'Home', icon: IconHome },
  { link: '/wallet', label: 'Wallet', icon: IconWallet },
];

export function MainNavbar({ close }: { close?: () => void }) {
  const { classes, cx } = useStyles();
  const handleClick = close || (() => {});

  const { logoutUser, currentUser } = useAuth();

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: logoutUser,
  });

  const links = data.map((item) => (
    <NavLink
      className={({ isActive }) => cx(classes.link, { [classes.linkActive]: isActive })}
      to={item.link}
      key={item.label}
      onClick={handleClick}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <Navbar width={{ lg: 300 }} p="md">
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <Avatar src={currentUser?.avatar} alt="avatar" />
          <Title order={3} tt="capitalize">
            {currentUser?.firstName} {currentUser?.lastName}
          </Title>
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Button fullWidth component={Link} to="/new" onClick={handleClick}>
          $New
        </Button>
        <Anchor className={classes.link} component="button" w="100%" onClick={() => mutate()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </Anchor>
      </Navbar.Section>
    </Navbar>
  );
}
