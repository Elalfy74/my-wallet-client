import { useState } from 'react';
import { Stepper, Paper } from '@mantine/core';
import { ChooseContact } from './choose-contact';
import { Payment } from './payment';
import { Verify } from './verify';

export function TransactionStepper({
  handleTransPay,
}: {
  handleTransPay: (createTans: CreateTransaction) => void;
}) {
  const [trans, setTrans] = useState<CreateTransaction | null>(null);

  const [selectedContact, setContact] = useState<null | FoundContact>(null);
  const [active, setActive] = useState(0);

  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

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
      <Stepper active={active} onStepClick={setActive} breakpoint="sm" allowNextStepsSelect={false}>
        <Stepper.Step label="Select a contact">
          <ChooseContact handleContact={handleContact} />
        </Stepper.Step>
        <Stepper.Step label="Payment">
          <Payment contact={selectedContact!} handleTrans={handleTrans} />
        </Stepper.Step>
        <Stepper.Step label="Complete">
          <Verify contact={selectedContact!} trans={trans} handleTransPay={handleTransPay} />
        </Stepper.Step>
        <Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed>
      </Stepper>
    </Paper>
  );
}
