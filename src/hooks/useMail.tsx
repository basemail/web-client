import { createContext, useContext, useEffect, useState } from 'react';
import JamClient from 'jmap-jam';
import { useMailAuth } from './useMailAuth';

type MailContextState = {
    client: JamClient | undefined;
};


const initialState: MailContextState = {} as MailContextState;
export const MailContext = createContext<MailContextState>(initialState);

export const useMail = () => {
    return useContext(MailContext);
};

export function MailProvider({ children }: { children: React.ReactNode }) {

    const { getAccessToken } = useMailAuth();
    const [client, setClient] = useState<JamClient | undefined>(undefined);

    const accessToken = getAccessToken();

    useEffect(() => {
        if (accessToken) {
            const newClient = new JamClient({
                bearerToken: accessToken,
                sessionUrl: 'http://localhost:8080/.well-known/jmap', // TODO set from environment variable
            });
            setClient(newClient);
        } else {
            setClient(undefined);
        }
    }, [accessToken]);

    return (
        <MailContext.Provider value={{ client }}>
            {children}
        </MailContext.Provider>
    );
}