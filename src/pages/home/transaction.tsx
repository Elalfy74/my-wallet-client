import { Badge, Paper, Text, Title } from '@mantine/core';

export function Transaction({ type, trans }: { type: 'sent' | 'received'; trans: Transaction }) {
  return (
    <Paper withBorder p={10} mb={20}>
      <Title order={3} fz={{ base: 'md', md: 'xl' }}>
        <span> You have {type === 'sent' ? 'sent ' : 'received'}</span>
        <Text color={type === 'sent' ? 'red' : 'green'} ml={3} component="span">
          {trans.amount}$
        </Text>
        <span>{type === 'sent' ? ' to ' : ' from '}</span>

        <Text component="span">
          <Badge color="gray" size="lg" radius="sm" variant="outline">
            {type === 'sent' ? trans.receiverName : trans.senderName}@mywallet
          </Badge>
        </Text>
      </Title>

      {trans.note && <Text>Note: {trans.note}</Text>}
    </Paper>
  );
}
