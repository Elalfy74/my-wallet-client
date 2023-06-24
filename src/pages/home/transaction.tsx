import { Badge, Paper, Text, Title } from '@mantine/core';

export function Transaction({ type, trans }: { type: 'sent' | 'received'; trans: Transaction }) {
  return (
    <Paper withBorder p={10} mb={20}>
      {type === 'sent' && (
        <Title order={3} display="flex" sx={{ alignItems: 'center' }}>
          You have sent{' '}
          <Text color="red" ml={3}>
            {trans.amount}
          </Text>
          $
          <Text ml={5}>
            to{' '}
            <Badge color="gray" size="lg" radius="sm" variant="outline" mt={10} ml={4}>
              {trans.receiverName} @mywallet
            </Badge>
          </Text>
        </Title>
      )}
      {type === 'received' && (
        <Title order={3} display="flex" sx={{ alignItems: 'center' }}>
          You have received{' '}
          <Text color="green" ml={3}>
            {trans.amount}
          </Text>
          $
          <Text ml={5}>
            from{' '}
            <Badge color="gray" size="lg" radius="sm" variant="outline" mt={10} ml={4}>
              {trans.senderName} @mywallet
            </Badge>
          </Text>
        </Title>
      )}
      {trans.note && <Text>Note: {trans.note}</Text>}
    </Paper>
  );
}
