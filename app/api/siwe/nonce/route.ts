import { NextRequest, NextResponse } from 'next/server';

const apiUrl = (process.env.NEXT_PRIVATE_AUTH_API_URL ?? 'http://localhost:8081').replace(/\/+$/, '');
console.log(apiUrl);

export async function GET(req: NextRequest) {
  if (apiUrl === undefined) {
    return NextResponse.json(
      {},
      {
        status: 401,
        statusText:
        'Auth server url not defined.',
      },
    );
  }

  // forward to API URL
  return fetch(apiUrl + '/nonce', req)
    .then(async (response) => {
      // Return the response data to the client
      return NextResponse.json(await response.text(), {
        status: response.status,
        statusText: response.statusText,
      });
    })
    .catch((error) => {
      console.error('Error:', error);
      return NextResponse.json({}, { status: 500, statusText: 'Internal Server Error' });
    });
}