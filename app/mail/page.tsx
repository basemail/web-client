'use client';
import React from 'react';
import { InboxSolid, ArchiveBox, Trash, FolderOpen } from '@medusajs/icons';
import {
  PaperPlaneIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons';
import { Grid, Box, Text, TextField, Button, Flex, Avatar } from "@radix-ui/themes";
import Image from 'next/image';

const folders = [
  { label: 'Inbox', icon: <InboxSolid /> },
  { label: 'Saved', icon: <ArchiveBox /> },
  { label: 'Drafts', icon: <FolderOpen /> },
  { label: 'Sent', icon: <PaperPlaneIcon className='w-5 h-4' /> },
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

    <Grid columns="10" gap="3" width="auto" className="h-full">
      <Box id="mail-boxes" style={{ gridColumn: 'span 1' }}>
        <Flex align="center" gap="3" p="4" className='hover:cursor-pointer hover:bg-gray-900'>
          <Image
            src='/icons/48x48.png'
            width={32}
            height={32}
            alt="logo" />
          <Text size="6" weight="bold">
            Basemail
          </Text>
        </Flex>

        <Flex className='flex-col gap-3 m-4 mt-5'>
          {folders.map(({ icon, label }) => (
            <Button variant='ghost' size='3' color='gray' key={label} >
              {icon}
              <Text className='w-full flex justify-start'>
                {label}
              </Text>
            </Button>
          ))}
        </Flex>
      </Box>
      <Box id="mails" style={{ gridColumn: 'span 9' }} >
        <Box p="2">
          <TextField.Root placeholder="Search folders…" size="3">
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        </Box>
        <Flex width="full" gap="3" align="center" p="2" className='hover:bg-gray-900'>
          <Flex gap="3" align="center">
            <Avatar
              size="2"
              src={mockEmail.senderAvatar}
              highContrast
              fallback={mockEmail.senderName.substring(0, 1).toUpperCase()}
            />

            <Text as="div" size="2" weight="regular">
              {mockEmail.senderName || mockEmail.senderEmail}
            </Text>

          </Flex>
          <Flex gap="3" align="center">
            <Text as="div" size="2" truncate className='text-white font-medium'>
              {mockEmail.subject}
            </Text>
            <Text as="div" size="2" color="gray" truncate className='max-w-prose'>
              {mockEmail.content}
            </Text>
          </Flex>
        </Flex>

      </Box>
    </Grid>
  );
}
