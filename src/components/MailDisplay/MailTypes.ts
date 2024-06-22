export type Email = {
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

export type Folder = {
  label: string;
  icon: JSX.Element;
};
