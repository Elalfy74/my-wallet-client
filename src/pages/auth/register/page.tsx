import {
  Container,
  Title,
  Anchor,
  Paper,
  Text,
  Button,
  SimpleGrid,
  Loader,
  Alert,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { NumberInput, PasswordInput, TextInput } from 'react-hook-form-mantine';

import { useRegisterForm } from './useRegisterForm';

export const Register = () => {
  const { control, handleSubmit, onSubmit, isLoading, error } = useRegisterForm();

  return (
    <Container size={600} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Join Now!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an Account?{' '}
        <Anchor size="sm" component={Link} to="/auth/login">
          Login
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

        <SimpleGrid
          cols={1}
          spacing="md"
          breakpoints={[{ minWidth: 'sm', cols: 2, spacing: 'lg' }]}
        >
          <TextInput
            label="First Name"
            placeholder="First Name"
            size="md"
            withAsterisk
            name="firstName"
            control={control}
          />
          <TextInput
            label="Last Name"
            placeholder="Last Name"
            size="md"
            withAsterisk
            name="lastName"
            control={control}
          />
        </SimpleGrid>
        <TextInput
          label="Email"
          placeholder="you@email.com"
          mt="md"
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

        <NumberInput
          label="National ID"
          placeholder="12345678912345"
          mt="md"
          size="md"
          hideControls
          withAsterisk
          name="nationalId"
          control={control}
        />

        <NumberInput
          label="Phone Number"
          placeholder="12345678912345"
          icon="+20"
          mt="md"
          size="md"
          hideControls
          withAsterisk
          name="phone"
          control={control}
        />

        <Button fullWidth mt="xl" type="submit" size="md">
          {isLoading ? <Loader variant="dots" color="white" /> : 'Register'}
        </Button>
      </Paper>
    </Container>
  );
};
