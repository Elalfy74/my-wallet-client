import { Paper, Stack, Title, Text, Badge, Group, Button, Loader } from '@mantine/core';
import { Link } from 'react-router-dom';

export function Verify({
  isLoading,
  contact,
  trans,
  handleTransPay,
}: {
  isLoading: boolean;
  contact: FoundContact;
  trans: CreateTransaction | null;
  handleTransPay: (createTans: CreateTransaction) => void;
}) {
  return (
    <Paper withBorder p={10}>
      <Title order={3} mb={10}>
        Your About to Make Transaction
      </Title>
      <Stack spacing="sm">
        <Text tt="capitalize" display="flex">
          To:
          <Text color="blue" fw="bold" ml={4}>
            {contact.user.firstName} {contact.user.lastName}
          </Text>
        </Text>
        <Text>
          Amount:{' '}
          <Badge color="blue" size="lg">
            {trans?.amount}$
          </Badge>
        </Text>
        <Text>
          Wallet:{' '}
          <Badge color="gray" size="lg" radius="sm" variant="outline" mt={10} ml={4}>
            {contact.name} @mywallet
          </Badge>
        </Text>

        {trans?.note && <Text>Note: {trans?.note}</Text>}
        <Group position="center">
          <Button variant="default" component={Link} to="/">
            Cancel
          </Button>

          <Button onClick={() => handleTransPay(trans!)}>
            {isLoading ? <Loader variant="dots" color="white" /> : 'Verify'}
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
}
