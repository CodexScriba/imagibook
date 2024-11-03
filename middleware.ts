import { type NextRequest } from 'next/server'
import { middleware as paraglide } from "@/lib/i18n"
import { updateSession } from './utils/supabase/middleware'

export async function middleware(request: NextRequest) {
	// First handle the Supabase session
	const sessionResponse = await updateSession(request)
	
	// Then handle the i18n routing
	const i18nResponse = paraglide(request)
	
	// Return the session response with any i18n headers/cookies merged
	return sessionResponse
}

export const config = {
	matcher: [
		'/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
	],
}