import { Alert, Box, Button, Loader } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import { TextInput } from 'react-hook-form-mantine';

import { useWalletForm } from './use-waller-form';

export function CreateWalletForm() {
  const { control, error, handleSubmit, isLoading, onSubmit } = useWalletForm();

  return (
    <Box mt={20} component="form" onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Alert my={10} color="red" w="50%">
          {error}
        </Alert>
      )}
      <TextInput
        name="name"
        control={control}
        w="80%"
        placeholder="walletname"
        rightSection={
          <>
            <IconAt size="0.8rem" />
            mywallet
          </>
        }
        rightSectionWidth={120}
      />
      <Button mt={20} type="submit">
        {isLoading ? <Loader variant="dots" color="white" /> : 'Create'}
      </Button>
    </Box>
  );
}
