import { NextResponse, type NextRequest } from 'next/server';
import { middleware as paraglide } from '@/lib/i18n';
import { updateSession } from './utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  // First handle the Supabase session
  const sessionResponse = await updateSession(request);

  // Then handle the i18n routing
  const i18nResponse = paraglide(request);

  // Merge cookies from i18nResponse into sessionResponse
  i18nResponse.cookies.getAll().forEach((cookie) => {
    sessionResponse.cookies.set(cookie.name, cookie.value, {
      domain: cookie.domain,
      expires: cookie.expires,
      httpOnly: cookie.httpOnly,
      maxAge: cookie.maxAge,
      path: cookie.path,
      sameSite: cookie.sameSite,
      secure: cookie.secure
    });
  });
  // Merge headers from i18nResponse into sessionResponse
  i18nResponse.headers.forEach((value, key) => {
    sessionResponse.headers.set(key, value);
  });

  // Return the session response with merged headers and cookies
  return sessionResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
