import { NextRequest, NextResponse } from 'next/server';

const apiUrl = (process.env.NEXT_PRIVATE_MAIL_SERVER_URL ?? 'http://localhost:8080').replace(/\/+$/, '');

export async function POST(req: NextRequest) {
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
    return fetch(apiUrl + '/api/oauth', req)
      .then(async (response) => {
        console.log(response);
        // Return the response data to the client
        return NextResponse.json(await response.json(), {
          status: response.status,
          statusText: response.statusText,
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        return NextResponse.json({}, { status: 500, statusText: 'Internal Server Error' });
      });
  }