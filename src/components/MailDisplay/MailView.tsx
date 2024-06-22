import React from 'react';
import { Container, Grid, Box, Flex, Text, Checkbox } from '@radix-ui/themes';
import { Email } from '@/components/MailDisplay/MailTypes';

export default function MailView({ email }: { email: Email }) {
  return (
    <Container>
      <Flex mb="4" width="full" direction="column" align="start">
        <Flex direction="row" wrap="nowrap">
          <Box width="100px">
            <Text>From:</Text>
          </Box>
          <Text>
            {email.senderName} ({email.senderEmail})
          </Text>
        </Flex>
        <Flex direction="row" wrap="nowrap">
          <Box width="100px">
            <Text>To:</Text>
          </Box>
          <Text>{email.recipientEmail}</Text>
        </Flex>
        <Flex direction="row" wrap="nowrap">
          <Box width="100px">
            <Text>Cc:</Text>
          </Box>
          <Text>{email.cc.join(',')}</Text>
        </Flex>
        <Flex direction="row" wrap="nowrap">
          <Box width="100px">
            <Text>Bcc:</Text>
          </Box>
          <Text>{email.bcc.join(',')}</Text>
        </Flex>
        <Flex direction="row" wrap="nowrap">
          <Box width="100px">
            <Text>Subject:</Text>
          </Box>
          <Text>{email.subject}</Text>
        </Flex>
        <Flex direction="row" wrap="nowrap">
          <Box width="100px">
            <Text>Attachments:</Text>
          </Box>
          <Text>{email.attachments.join(',')}</Text>
        </Flex>
      </Flex>

      <Box>
        <Text size="2">{email.content}</Text>
      </Box>
    </Container>
  );
}
