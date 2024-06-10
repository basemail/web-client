'use client';
import React from 'react';
import {InboxSolid, ArchiveBox, Trash, FolderOpen} from '@medusajs/icons';
import {
  PaperPlaneIcon,
  MagnifyingGlassIcon
} from '@radix-ui/react-icons';
import { Grid, Box, Text, TextField, Button, Flex, Card, Avatar } from "@radix-ui/themes";
import Header from "@/components/layout/header/Header";

const folders = [
  { label: 'Inbox', icon: <InboxSolid /> },
  { label: 'Saved', icon: <ArchiveBox /> },
  { label: 'Drafts', icon: <FolderOpen /> },
  { label: 'Sent', icon: <PaperPlaneIcon className='w-5 h-4'/> },
  { label: 'Trash', icon: <Trash /> }
];

const mockEmail = {
  senderEmail: 'hello@basedMail.com',
  senderAvatar: 'https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop',
  senderName: 'BaseMail Official',
  recipientEmail: 'user@example.com',
  subject: 'Welcome to BaseMail!',
  timestamp: '2024-06-10T10:00:00Z',
  content: `**Welcome to BaseMail!**

  Hi [User's First Name],

  We're excited to have you on board. BaseMail is designed to make your email experience smooth and efficient. Here are a few things you can do to get started:

  - **Set Up Your Profile:** Personalize your account to make it uniquely yours.
  - **Explore Features:** Check out our intuitive features to help you manage your emails better.
  - **Get Support:** Have questions? Our support team is here to help you 24/7.

  Thank you for choosing BaseMail. We look forward to providing you with the best email service experience.

  Best regards,
  The BaseMail Team
`,
  attachments: [],
  isRead: false,
  priority: 'Normal',
  replyTo: 'support@basedMail.com',
  cc: [],
  bcc: []
}


export default function BaseMail() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-8 py-16 h-full">
        <Grid columns="4" gap="3" width="auto" className="h-full">
          <Box id="mail-boxes">
          <TextField.Root placeholder="Search folders…">
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
          <Flex className='flex-col gap-3 m-4 mt-5'>
            {folders.map(({ icon, label }) => (
              <Button variant='ghost' size='2' color='gray' key={label} >
                {icon}
                <Text className='w-full flex justify-start'>
                {label}
                </Text>
              </Button>
            ))}
            </Flex>
          </Box>
          <Box id="mails" style={{ gridColumn: 'span 3' }}>
          <Box className='w-full'>
            <Flex className='flex-row w-fit'>
              <Flex gap="3" align="center">
                <Avatar
                  size="3"
                  src={mockEmail.senderAvatar}
                  radius="full"
                  fallback={mockEmail.senderName.substring(0,1).toUpperCase()}
                />
                <Box>
                  <Text as="div" size="2" weight="regular">
                    {mockEmail.senderName || mockEmail.senderEmail}
                  </Text>
                </Box>
                <Box>
                <Text as="div" size="2" truncate className='max-w-prose text-white font-medium'>
                  {mockEmail.subject}
                </Text>
                <Text as="div" size="2" color="gray" truncate className='max-w-prose'>
                  {mockEmail.content}
                </Text>
                </Box>
              </Flex>
            </Flex>
          </Box>
          </Box>
        </Grid>
      </main>
    </>
  );
}
