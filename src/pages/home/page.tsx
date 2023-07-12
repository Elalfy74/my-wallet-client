import { Box, Card, Skeleton, Stack, Tabs, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import { getTransactions } from '@/apis/transactions';

import { Transaction } from './transaction';

// This Page shows Old Transactions
export function Home() {
  const { data, isLoading } = useQuery({
    queryFn: getTransactions,
    queryKey: ['transactions'],
  });

  if (isLoading) {
    return (
      <Stack align="center" w="100%">
        <Card withBorder shadow="sm" w="100%">
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} mt={6} radius="xl" />
          <Skeleton height={8} mt={6} width="70%" radius="xl" />
        </Card>

        <Card withBorder shadow="sm" w="100%">
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} mt={6} radius="xl" />
          <Skeleton height={8} mt={6} width="70%" radius="xl" />
        </Card>

        <Card withBorder shadow="sm" w="100%">
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} mt={6} radius="xl" />
          <Skeleton height={8} mt={6} width="70%" radius="xl" />
        </Card>
      </Stack>
    );
  }

  if (!data?.data) {
    return (
      <Stack align="center">
        <Title order={3}>No Transactions</Title>
      </Stack>
    );
  }
  return (
    <Box sx={{ flex: 1 }}>
      <Tabs defaultValue="sent">
        <Tabs.List sx={{ justifyContent: 'center' }}>
          <Tabs.Tab value="sent" sx={{ flex: 1 }}>
            Sent
          </Tabs.Tab>
          <Tabs.Tab value="received" sx={{ flex: 1 }}>
            Received
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="received" pt="xs">
          {data?.data?.receivedTransactions.map((tran) => (
            <Transaction type="received" trans={tran} key={tran.id} />
          ))}
        </Tabs.Panel>

        <Tabs.Panel value="sent" pt="xs">
          {data?.data?.sentTransactions.map((tran) => (
            <Transaction type="sent" trans={tran} key={tran.id} />
          ))}
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
}
