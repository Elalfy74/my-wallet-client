import { Container, Title, Text, Anchor, Paper, Alert, Button, Loader } from '@mantine/core';
import { TextInput } from 'react-hook-form-mantine';
import { Link } from 'react-router-dom';

import { useForgotPasswordForm } from './useForgotPasswordForm';

export const ForgotPassword = () => {
  const { control, handleSubmit, onSubmit, error, isLoading, message } = useForgotPasswordForm();

  return (
    <Container size={500} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Password Recovery
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Enter your email to recover your password{' '}
        <Anchor size="sm" component={Link} to="/auth/register">
          Create account
        </Anchor>
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

        <TextInput
          label="Email"
          placeholder="you@email.com"
          size="md"
          withAsterisk
          name="email"
          control={control}
        />

        <Button fullWidth mt="xl" type="submit">
          {isLoading ? <Loader variant="dots" color="white" /> : 'Reset Password'}
        </Button>
      </Paper>
    </Container>
  );
};
