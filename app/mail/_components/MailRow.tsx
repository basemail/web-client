import React from 'react';
import { Box, Flex, Grid, Text, Button, Checkbox } from '@radix-ui/themes';
import { Email } from 'app/mail/_components/MailTypes';

export default function MailRow({
  email,
  selected,
  handleSelectEmail,
  key,
}: {
  email: Email;
  selected: boolean;
  handleSelectEmail: (e: unknown) => void;
  key: number;
}) {
  return (
    <Flex
      p="2"
      height="full"
      width="400px"
      direction="column"
      gap="2"
      align="start"
      className="border-b border-zinc-700 hover:bg-zinc-800"
      style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
      key={key}
    >
      <Grid width="394px" columns="2" rows="1">
        <Flex direction="row" align="center">
          <Checkbox mr="2" />
          <Button
            variant="ghost"
            size="2"
            color={selected ? 'orange' : 'gray'}
            onClick={handleSelectEmail}
          >
            <Text
              size="2"
              weight="regular"
              mr="4"
              style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {email.senderName || email.senderEmail}
            </Text>
          </Button>
        </Flex>
        <Text size="2" align="right" color="gray" style={{ justifySelf: 'flex-end' }}>
          {new Date(email.timestamp).toDateString()}
        </Text>
      </Grid>

      <Box>
        <Button
          variant="ghost"
          size="2"
          color={selected ? 'orange' : 'gray'}
          onClick={handleSelectEmail}
        >
          <Text
            size="2"
            mr="4"
            className="truncate font-medium"
            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {email.subject.substring(0, 100)}
          </Text>
        </Button>
      </Box>
      <Box>
        <Text
          size="2"
          color="gray"
          className="truncate text-gray-600"
          // style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {email.content.substring(0, 100)}
        </Text>
      </Box>
    </Flex>
  );
}
