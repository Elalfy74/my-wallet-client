import { Avatar, Box, Button, Stack, Text } from '@mantine/core';
import { NumberInput, TextInput } from 'react-hook-form-mantine';
import { usePaymentForm } from './use-payment-form';

export function Payment({
  contact,
  handleTrans,
}: {
  contact: FoundContact;
  handleTrans: (data: CreatePaymentInput) => void;
}) {
  const { control, handleSubmit, onSubmit } = usePaymentForm(handleTrans);
  return (
    <Stack align="center" mt={10}>
      <Avatar src={contact.user.avatar} alt="avatar" radius="xl" />
      <Text size={20} color="blue" fw="bold" tt="capitalize">
        {`${contact.user.firstName} ${contact.user.lastName}`}
      </Text>

      <Box
        component="form"
        w="100%"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        <NumberInput
          placeholder="Amount"
          hideControls
          name="amount"
          w="80%"
          size="md"
          withAsterisk
          control={control}
        />
        <TextInput placeholder="Add a note" w="80%" size="md" name="note" control={control} />

        <Button size="md" type="submit">
          Send
        </Button>
      </Box>
    </Stack>
  );
}
