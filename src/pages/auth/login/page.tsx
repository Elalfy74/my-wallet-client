import { Anchor, Paper, Title, Text, Container, Group, Button, Alert, Loader } from '@mantine/core';
import { PasswordInput, TextInput, Checkbox } from 'react-hook-form-mantine';
import { Link } from 'react-router-dom';

import { useLoginForm } from './useLoginForm';

export function Login() {
  const { control, handleSubmit, onSubmit, error, isLoading } = useLoginForm();

  return (
    <Container size={500} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
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
        <TextInput
          label="Email"
          placeholder="you@email.com"
          size="md"
          withAsterisk
          name="email"
          control={control}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
          withAsterisk
          name="password"
          control={control}
        />
        <Group position="apart" mt="lg">
          <Checkbox label="Remember me" control={control} name="remember" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" type="submit">
          {isLoading ? <Loader variant="dots" color="white" /> : 'Log in'}
        </Button>
      </Paper>
    </Container>
  );
}
