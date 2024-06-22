'use client';
import React from 'react';
import { InboxSolid, ArchiveBox, Trash, FolderOpen } from '@medusajs/icons';
import { PaperPlaneIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Grid, Box, Text, TextField, Button, Flex, Avatar } from '@radix-ui/themes';
import { useWindowSize } from '@uidotdev/usehooks';
import Image from 'next/image';
import MailRowDisplay from '@/components/MailDisplay / MailDisplay';

// Define Email interface
type Email = {
  senderEmail: string;
  senderAvatar: string;
  senderName: string;
  recipientEmail: string;
  subject: string;
  timestamp: string;
  content: string;
  attachments: string[];
  isRead: boolean;
  priority: 'Low' | 'Normal' | 'High';
  replyTo: string;
  cc: string[];
  bcc: string[];
};

const folders = [
  { label: 'Inbox', icon: <InboxSolid /> },
  { label: 'Saved', icon: <ArchiveBox /> },
  { label: 'Drafts', icon: <FolderOpen /> },
  { label: 'Sent', icon: <PaperPlaneIcon className="h-4 w-5" /> },
  { label: 'Trash', icon: <Trash /> },
];

const mockEmail: Email = {
  senderEmail: 'hello@basechain.email',
  senderAvatar:
    'https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop',
  senderName: 'Basemail Official',
  recipientEmail: 'user@example.com',
  subject: 'Welcome to Basemail!',
  timestamp: '2024-06-10T10:00:00Z',
  content: `**Welcome to Basemail!**

  Hi [User's First Name],

  We're excited to have you on board. Basemail is designed to make your email experience smooth and efficient. Here are a few things you can do to get started:

  - **Set Up Your Profile:** Personalize your account to make it uniquely yours.
  - **Explore Features:** Check out our intuitive features to help you manage your emails better.
  - **Get Support:** Have questions? Our support team is here to help you 24/7.

  Thank you for choosing Basemail. We look forward to providing you with the best email service experience.

  Best regards,
  The Basemail Team
`,
  attachments: [],
  isRead: false,
  priority: 'Normal',
  replyTo: 'support@basechain.email',
  cc: [],
  bcc: [],
};

export default function Basemail() {
  const { width } = useWindowSize();
  const isSmall = width && width > 500;
  console.log(width);

  const emails = Array.from({ length: 10 }).map((_, index) => ({
    ...mockEmail,
    timestamp: new Date(Date.now() - index * 1000 * 60 * 60).toISOString(),
  }));

  return (
    <Grid
      columns="2"
      className="h-full"
      style={{
        gridTemplateColumns: isSmall ? `minmax(0, 400px) 1fr` : `minmax(0, ${width}px) 1fr`,
      }}
    >
      {isSmall && (
        <Box id="sidebar" p="4">
          <Flex align="center" gap="3" p="4" className="hover:cursor-pointer">
            <Image src="/icons/48x48.png" width={32} height={32} alt="logo" />
            <Text size="6" weight="bold">
              BaseMail
            </Text>
          </Flex>

          <Flex direction="column" gap="3" m="4" mt="5">
            {folders.map(({ icon, label }) => (
              <Button variant="ghost" size="3" color="gray" key={label}>
                {icon}
                <Text className="flex w-full justify-start">{label}</Text>
              </Button>
            ))}
          </Flex>
        </Box>
      )}

      <Box p="4" id="mails-section" className="overflow-hidden bg-zinc-900">
        <Box mb="4">
          <TextField.Root placeholder="Search mails…" size="3">
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        </Box>

        {emails.map((email, index) => (
          <MailRowDisplay email={email} key={Number(index)} />
        ))}
      </Box>
    </Grid>
  );
}
