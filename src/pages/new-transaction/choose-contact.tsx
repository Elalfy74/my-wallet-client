import { Box, Paper, TextInput, Text, Group, Avatar, Badge } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getWalletsByQuery } from '@/apis/wallets';

export function ChooseContact({
  handleContact,
}: {
  handleContact: (contact: FoundContact) => void;
}) {
  const [search, setSearch] = useState('');
  const [contacts, setContacts] = useState<FoundContact[]>([]);

  function searchQuery() {
    if (search.trim().length >= 2) {
      getWalletsByQuery({ search }).then((res) => setContacts(res.data));
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      searchQuery();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  return (
    <Box mih={400} mt={10}>
      <TextInput
        placeholder="Search"
        withAsterisk
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {contacts.map((contact) => (
        <Paper
          key={contact.name}
          radius="sm"
          p="md"
          withBorder
          mt={20}
          sx={{
            ':hover': {
              backgroundColor: 'ButtonFace',
              transitionDuration: '200ms',
              cursor: 'pointer',
            },
          }}
          onClick={() => handleContact(contact)}
        >
          <Group>
            <Avatar src={contact.user.avatar} alt="avatar" radius="xl" />
            <Text>{`${contact.user.firstName} ${contact.user.lastName}`}</Text>
          </Group>
          Wallet:{' '}
          <Badge color="gray" size="lg" radius="sm" variant="outline" mt={10} ml={4}>
            {contact.name} @mywallet
          </Badge>
        </Paper>
      ))}
    </Box>
  );
}
