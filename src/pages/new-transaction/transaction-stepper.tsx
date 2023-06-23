import { useState } from 'react';
import { Stepper, Paper, Alert, Button, Stack } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ChooseContact } from './choose-contact';
import { Payment } from './payment';
import { Verify } from './verify';

export function TransactionStepper({
  active,
  nextStep,
  setActive,
  handleTransPay,
  error,
  isLoading,
}: {
  active: number;
  nextStep: () => void;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  handleTransPay: (createTans: CreateTransaction) => void;
  error: string;
  isLoading: boolean;
}) {
  const [trans, setTrans] = useState<CreateTransaction | null>(null);

  const [selectedContact, setContact] = useState<null | FoundContact>(null);

  const handleTrans = (data: CreatePaymentInput) => {
    setTrans({
      receiverName: selectedContact!.name,
      ...data,
    });
    nextStep();
  };

  function handleContact(contact: FoundContact) {
    setContact(contact);
    nextStep();
  }
  return (
    <Paper shadow="xs" withBorder p="xl" radius="md">
      {error && (
        <Alert mb={4} color="red">
          {error}{' '}
        </Alert>
      )}
      <Stepper active={active} onStepClick={setActive} breakpoint="sm" allowNextStepsSelect={false}>
        <Stepper.Step label="Select a contact">
          <ChooseContact handleContact={handleContact} />
        </Stepper.Step>
        <Stepper.Step label="Payment">
          <Payment contact={selectedContact!} handleTrans={handleTrans} />
        </Stepper.Step>
        <Stepper.Step label="Complete">
          <Verify
            contact={selectedContact!}
            trans={trans}
            handleTransPay={handleTransPay}
            isLoading={isLoading}
          />
        </Stepper.Step>
        <Stepper.Completed>
          <Stack>
            Completed, click back button to get to Home
            <Button component={Link} to="/">
              Back
            </Button>
          </Stack>
        </Stepper.Completed>
      </Stepper>
    </Paper>
  );
}
