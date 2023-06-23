import { Paper, Stack, Title, Text, Badge, Group, Button } from '@mantine/core';

export function Verify({ contact, trans }: { contact: FoundContact; trans: Transaction | null }) {
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
          <Button variant="default">Cancel</Button>

          <Button>Verify</Button>
        </Group>
      </Stack>
    </Paper>
  );
}
