import { SiweMessage } from 'siwe';
import { Account } from 'viem';
import { useSignMessage } from 'wagmi';

// TODO get a TS client for the SIWE_OIDC service
// main routes are authorize and sign-in

const scheme = window.location.protocol.slice(0, -1);
const domain = window.location.host;
const origin = window.location.origin;
const statement = `${scheme}://${domain} would like you to login with your Smart Wallet to authenticate with the offchain mail service.`;

export const useSIWE = (account: Account) => {
  // TODO have to rethink this logic based on the OIDC provider and redirect URLs

  // 1. Call the authorize endpoint to get the nonce and other variables
  // { nonce, ... } = oidc.authorize({
  //   client_id,
  //   redirect_uri: origin,
  //   scope: "openid",
  //   response_type: "code",
  //   state: TODO,
  //   nonce: TODO,
  //
  // });
  // This is called when the page loads

  // 2. Prepare the message
  const message = '';

  // 3. Get the sign message function from the wagmi hook
  const sign = useSignMessage();

  // 4. Return a function that will asynchronously prompt the user to sign the message and then send to the sign-in endpoint on the siwe-oidc service
  return () => {
    const signature = sign.signMessageAsync({ message });

    // oidc.signIn(...)
  };
};
