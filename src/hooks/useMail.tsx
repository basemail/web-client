import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import JamClient, { Mailbox } from 'jmap-jam';
import { useMailAuth } from './useMailAuth';

type MailContextState = {
  mailboxes: UseQueryResult<readonly Mailbox[], Error>;
};

const initialState: MailContextState = {} as MailContextState;
export const MailContext = createContext<MailContextState>(initialState);

export const useMail = () => {
  return useContext(MailContext);
};

export function MailProvider({ children }: { children: React.ReactNode }) {
  const { getAccessToken, accountId } = useMailAuth();
  const [client, setClient] = useState<JamClient | undefined>(undefined);

  const accessToken = getAccessToken();

  useMemo(() => {
    if (accessToken) {
      console.log('setting client with:', accessToken);
      const newClient = new JamClient({
        bearerToken: accessToken,
        sessionUrl: (process.env.NEXT_PUBLIC_MAIL_SERVER_URL ?? '') + '/.well-known/jmap', // TODO set from environment variable
      });

      setClient(newClient);
    } else {
      setClient(undefined);
    }
  }, [accessToken]);

  // Queries

  const getMailboxes = async (): Promise<readonly Mailbox[]> => {
    try {
      const result = await client?.api.Mailbox.get({ accountId: accountId ?? '' });
      console.log({ result_from_getMailboxes: result, accountId});
      const [data] = result ?? [];
      return data?.list ?? [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const mailboxes = useQuery<readonly Mailbox[]>({
    queryKey: ['mailboxes', accessToken, accountId],
    queryFn: getMailboxes,
  });

  // Updates

  // If the user has no mailboxes, initialize the standard set
  const initializeMailboxes = async () => {
    try {
      console.log('initializing mailboxes with:', accountId, client?.api.Mailbox.set);
      await client?.api.Mailbox.set({
        accountId: accountId ?? '',
        create: {
          '0': {
            name: 'Inbox',
            id: '0',
            parentId: null,
            role: 'inbox',
            sortOrder: 0,
            totalEmails: 0,
            unreadEmails: 0,
            totalThreads: 0,
            unreadThreads: 0,
            iSubscribed: true,
            myRights: {
              mayAddItems: true,
              mayCreateChild: true,
              mayDelete: false,
              mayReadItems: true,
              mayRemoveItems: true,
              mayRename: false,
              maySetKeywords: true,
              maySetSeen: true,
              maySubmit: false,
            },
          },
        },
        ifInState: null,
        update: null,
        destroy: null,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log({ mailboxes_effect: mailboxes.data });
    if (mailboxes.data && mailboxes.data.length === 0) {
      initializeMailboxes().catch((error) => console.error(error));
    }
  }, [mailboxes.data, accountId]);

  return <MailContext.Provider value={{ mailboxes }}>{children}</MailContext.Provider>;
}
