import React from 'react';
import { Flex, Text, Avatar } from '@radix-ui/themes';

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

export default function MailRowDisplay({ email }: { email: Email }) {
  return (
    <Flex
      width="full"
      gap="3"
      align="center"
      p="2"
      className="flex-wrap border-b border-zinc-700 hover:bg-zinc-800"
      style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
    >
      <Flex align="center" justify="between" className="flex-grow">
        <Flex gap="3" align="center">
          <Avatar
            size="2"
            src={email.senderAvatar}
            highContrast
            fallback={email.senderName.substring(0, 1).toUpperCase()}
          />
          <Text size="2" weight="regular">
            {email.senderName || email.senderEmail}
          </Text>
        </Flex>
        <Flex gap="4">
          <Text
            size="2"
            className="truncate font-medium"
            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {email.subject.substring(0, 100)}
          </Text>
          <Text
            size="2"
            color="gray"
            className="truncate text-gray-600"
            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {email.content.substring(0, 200)}
          </Text>
        </Flex>
        <Text size="2" color="gray">
          {new Date(email.timestamp).toDateString()}
        </Text>
      </Flex>
    </Flex>
  );
}
