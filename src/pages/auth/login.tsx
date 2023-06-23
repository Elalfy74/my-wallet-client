import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import { useLoginForm } from './useLoginForm';

export function Login() {
  const { register, handleSubmit, onSubmit } = useLoginForm();

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
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
        <TextInput label="Email" placeholder="you@email.com" required {...register('email')} />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          {...register('password')}
        />
        <Group position="apart" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" type="submit">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
