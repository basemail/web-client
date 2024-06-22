'use client';
import React from 'react';
import { InboxSolid, ArchiveBox, Trash, FolderOpen } from '@medusajs/icons';
import { PaperPlaneIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Grid, ScrollArea, Box, Text, TextField, Button, Flex, Avatar } from '@radix-ui/themes';
import { useWindowSize } from '@uidotdev/usehooks';
import Image from 'next/image';
import MailRow from '@/components/MailDisplay/MailRow';
import ComposeMail from '@/components/MailDisplay/ComposeMail';
import MailView from '@/components/MailDisplay/MailView';
import { useMailAuth } from '@/hooks/useMailAuth';
import { useRouter } from 'next/navigation';
import { Email, Folder } from '@/components/MailDisplay/MailTypes';

// Mock data

const folders: Folder[] = [
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
  recipientEmail: 'user@basechain.email',
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

const mockEmail2: Email = {
  senderEmail: 'accountspayable@coinbase.com"',
  senderAvatar: '',
  senderName: 'Coinbase Accounting',
  recipientEmail: 'user@basechain.email',
  subject: 'Invoice Payment for May 2024',
  timestamp: '2024-06-09T10:00:00Z',
  content: `Dear [User's First Name],

  We have paid your May invoice for 1,000 USDC to your smart wallet (0x1234567890abcedffedcba098765432100000000).

  The transaction hash is 0x5555555....

  Thanks for your continued support.
  `,
  attachments: [],
  isRead: false,
  priority: 'High',
  replyTo: 'accountspayable@coinbase.com',
  cc: ['brian@coinbase.com'],
  bcc: [],
};

// Component

export default function Basemail() {
  // const { isAuthenticated, accountId } = useMailAuth(); Not currently working due to CB wallet issue
  const isAuthenticated = true;
  const accountId = '5';
  const username = 'loki@basechain.email'; // TODO - Fetch username from the server

  const router = useRouter();

  // Route to main page if not authenticated
  if (!isAuthenticated) {
    router.push('/');
  }

  let emails = Array.from({ length: 10 }).map((_, index) => ({
    ...mockEmail,
    timestamp: new Date(Date.now() - index * 1000 * 60 * 60).toISOString(),
  }));

  emails = emails.concat(
    Array.from({ length: 10 }).map((_, index) => ({
      ...mockEmail2,
      timestamp: new Date(Date.now() - index * 1000 * 60 * 60).toISOString(),
    })),
  );

  // Track the selected folder
  const [activeFolderIndex, setActiveFolderIndex] = React.useState<number>(0);
  const [activeEmailIndex, setActiveEmailIndex] = React.useState<number>(0);

  const { width } = useWindowSize();
  const isSmall = width && width > 500;
  console.log(width);

  const handleSelectFolder = (index: number) => {
    setActiveFolderIndex(index);

    // TODO load emails based on the selected folder
  };

  const handleSelectEmail = (index: number) => {
    setActiveEmailIndex(index);

    // TODO other actions?
  };

  return (
    <Grid
      columns="2"
      className="h-full"
      style={{
        gridTemplateColumns: isSmall ? `minmax(0, 300px) 1fr` : `minmax(0, ${width}px) 1fr`,
      }}
    >
      {isSmall && (
        <Box id="sidebar" p="4">
          <Flex align="center" gap="3" p="4" className="hover:cursor-pointer">
            <Image src="/icons/48x48.png" width={32} height={32} alt="logo" />
            <Button variant="ghost" color="gray" onClick={() => router.push('/')}>
              <Text size="6">BASEMAIL</Text>
            </Button>
          </Flex>
          <Flex align="center" gap="3" p="4">
            <Text size="3">{username}</Text>
          </Flex>

          <Flex direction="column" gap="3" m="4" mt="5">
            {folders.map(({ icon, label }, index) => (
              <Button
                variant="ghost"
                size="3"
                color={activeFolderIndex == index ? 'orange' : 'gray'}
                key={label}
                onClick={() => handleSelectFolder(index)}
              >
                {icon}
                <Text className="flex w-full justify-start">{label}</Text>
              </Button>
            ))}
          </Flex>
        </Box>
      )}

      <Box p="4" id="mails-section" className="overflow-hidden bg-zinc-900">
        <Box mb="4">
          <Flex>
            <TextField.Root mr="2" placeholder="Search mails…" size="3" className="flex-grow">
              <TextField.Slot>
                <MagnifyingGlassIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
            <Button m="2" variant="ghost" size="3" color="gray">
              <Text>Compose</Text>
            </Button>
          </Flex>
        </Box>

        <Grid columns="2" gap="4" style={{ gridTemplateColumns: `420px 1fr` }}>
          <ScrollArea style={{ height: '800px' }} type="always" scrollbars="vertical">
            <Flex height="full" direction="column" align="start" id="mail-list">
              {emails.map((email, index) => (
                <MailRow
                  email={email}
                  key={Number(index)}
                  selected={activeEmailIndex == index}
                  handleSelectEmail={() => handleSelectEmail(index)}
                />
              ))}
            </Flex>
          </ScrollArea>

          <Box id="mail-view" className="flex-grow">
            <MailView email={emails[activeEmailIndex]} />
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
}
