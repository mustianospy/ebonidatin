import { NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';

export function GET(request: NextRequest) {
  const languages = request.headers.get('accept-language');
  acceptLanguage.languages(['en-US', 'es-ES', 'fr-FR']);
  const language = acceptLanguage.get(languages);
  return NextResponse.json({ language });
}