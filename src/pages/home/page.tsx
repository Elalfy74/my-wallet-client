import { Box, Stack, Tabs, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getTransactions } from '@/apis/transactions';
import { Transaction } from './transaction';

export function Home() {
  const { data } = useQuery({
    queryFn: getTransactions,
    queryKey: ['transactions'],
  });

  if (!data || !data?.data) {
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
            <Transaction type="received" trans={tran} />
          ))}
        </Tabs.Panel>

        <Tabs.Panel value="sent" pt="xs">
          {data?.data?.sentTransactions.map((tran) => (
            <Transaction type="sent" trans={tran} />
          ))}
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
}
