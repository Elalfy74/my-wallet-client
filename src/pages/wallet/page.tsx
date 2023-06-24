import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Badge, Button, Card, Group, Skeleton, Stack, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { getWallet } from '@/apis/wallets';
import { CreateWallet } from './components/create-wallet';

export function Wallet() {
  const { data, isLoading, error } = useQuery({
    queryFn: getWallet,
    queryKey: ['wallet'],
  });

  const [opened, { open, close }] = useDisclosure(false);

  if (isLoading) {
    return (
      <Card withBorder shadow="sm">
        <Skeleton height={50} circle mb="xl" />
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} width="70%" radius="xl" />
      </Card>
    );
  }

  // Check Error
  if (error) {
    // Show Create Wallet Components if user doesn't have a wallet
    if (error instanceof AxiosError && error.response?.status === 404) {
      return (
        <>
          <CreateWallet opened={opened} close={close} />

          <Stack align="center" mt={60}>
            <Title order={2}>You don&apos;t have any wallet!</Title>
            <Button onClick={open}>Create Wallet</Button>
          </Stack>
        </>
      );
    }
    // Another Error
    return (
      <Stack align="center" mt={60}>
        <Title order={2}>Something Went Wrong Please try again</Title>
      </Stack>
    );
  }

  return (
    <Card withBorder shadow="sm">
      <Title order={4}>{data?.data.name}@mywallet</Title>
      <Group mt={10} align="center">
        Balance
        <Badge size="lg" radius="xs" variant="outline">
          {data?.data.balance}$
        </Badge>
      </Group>
    </Card>
  );
}
