import { Modal, useMantineTheme } from '@mantine/core';

import { CreateWalletForm } from './create-wallet-form';

export function CreateWallet({ opened, close }: { opened: boolean; close: () => void }) {
  const theme = useMantineTheme();

  return (
    <Modal
      zIndex={3000}
      size="lg"
      yOffset={200}
      radius="md"
      title="Create Wallet"
      styles={{
        title: {
          fontSize: '2rem',
          fontWeight: 'bold',
          textTransform: 'capitalize',
        },
      }}
      withinPortal
      overlayProps={{
        color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
      opened={opened}
      onClose={close}
    >
      <CreateWalletForm />
    </Modal>
  );
}
