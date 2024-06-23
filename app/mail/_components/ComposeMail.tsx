import React from 'react';
import { Container, Button, Box, Flex, Text, TextField, TextArea } from '@radix-ui/themes';
import { Email } from 'app/mail/_components/MailTypes';

export default function ComposeMail() {
  const [toEmails, setToEmails] = React.useState<string>('');
  const [ccEmails, setCcEmails] = React.useState<string>('');
  const [bccEmails, setBccEmails] = React.useState<string>('');
  const [subject, setSubject] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');

  return (
    <Container>
      <Flex mb="4" gap="2" width="full" direction="column" align="stretch">
        <Flex direction="row" wrap="nowrap">
          <Box width="100px">
            <Text>To:</Text>
          </Box>
          <Box width="100%">
            <TextField.Root
              placeholder="vitalik@basechain.email"
              value={toEmails}
              onChange={(e) => setToEmails(e.target.value)}
            />
          </Box>
        </Flex>
        <Flex direction="row" wrap="nowrap">
          <Box width="100px">
            <Text>Cc:</Text>
          </Box>
          <Box width="100%">
            <TextField.Root value={ccEmails} onChange={(e) => setCcEmails(e.target.value)} />
          </Box>
        </Flex>
        <Flex direction="row" wrap="nowrap">
          <Box width="100px">
            <Text>Bcc:</Text>
          </Box>
          <Box width="100%">
            <TextField.Root value={bccEmails} onChange={(e) => setBccEmails(e.target.value)} />
          </Box>
        </Flex>
        <Flex direction="row" wrap="nowrap">
          <Box width="100px">
            <Text>Subject:</Text>
          </Box>
          <Box width="100%">
            <TextField.Root value={subject} onChange={(e) => setSubject(e.target.value)} />
          </Box>
        </Flex>
        <Box width="200px">
          <Text>Attachments:</Text>
        </Box>
        <Flex direction="row" wrap="nowrap" justify="between">
          <Box flexGrow="1">
            <input type="file" />
          </Box>

          <Flex
            gap="2"
            direction="row"
            wrap="nowrap"
            justify="end"
            style={{ justifySelf: 'flex-end' }}
          >
            <Button variant="soft">
              <Text>Add Action</Text>
            </Button>

            <Button variant="soft">
              <Text>Save Draft</Text>
            </Button>

            <Button variant="solid">
              <Text>Send</Text>
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <Box minHeight="50vh" flexGrow="1" asChild>
        <TextArea
          placeholder="write something great..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Box>
    </Container>
  );
}
