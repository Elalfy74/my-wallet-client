import { Container, Title, Text, Paper, Alert, Button, Loader, Stack } from '@mantine/core';
import { PasswordInput } from 'react-hook-form-mantine';

import { useResetPasswordForm } from './useResetPasswordForm';

export const ResetPassword = () => {
  const { control, handleSubmit, onSubmit, error, isLoading, message, checkLoading } =
    useResetPasswordForm();

  if (checkLoading) {
    return (
      <Stack my={60} align="center">
        <Loader />
      </Stack>
    );
  }

  return (
    <Container size={500} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Reset Password
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Enter your new password
      </Text>

      <Paper
        component="form"
        noValidate
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
        onSubmit={handleSubmit(onSubmit)}
      >
        {error && <Alert color="red">{error}</Alert>}
        {message && <Alert color="green">{message}</Alert>}

        <PasswordInput
          label="Password"
          placeholder="******"
          size="md"
          withAsterisk
          name="password"
          control={control}
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="******"
          size="md"
          withAsterisk
          name="confirmPassword"
          control={control}
        />
        <Button fullWidth mt="xl" type="submit">
          {isLoading ? <Loader variant="dots" color="white" /> : 'Update Password'}
        </Button>
      </Paper>
    </Container>
  );
};
