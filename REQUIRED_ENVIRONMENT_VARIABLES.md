# Required Environment Variables for Eboni Dating Platform

## Authentication & Database
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `SUPABASE_JWT_SECRET` - JWT secret for token verification
- `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` - Development redirect URL for auth

## Google OAuth
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret

## Stripe Payments
- `STRIPE_PUBLISHABLE_KEY` - Stripe public key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe public key (client-side)
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook signing secret

## Storage
- `BLOB_READ_WRITE_TOKEN` - Vercel Blob storage token

## Email & Notifications
- `SENDGRID_API_KEY` - SendGrid email service API key (optional)
- `TWILIO_ACCOUNT_SID` - Twilio SMS account SID (optional)
- `TWILIO_AUTH_TOKEN` - Twilio SMS auth token (optional)
- `VAPID_PUBLIC_KEY` - Web push notifications public key
- `VAPID_PRIVATE_KEY` - Web push notifications private key
- `VAPID_EMAIL` - Email for push notifications

## Analytics & Monitoring
- `SENTRY_DSN` - Sentry error tracking DSN (optional)
- `NEXT_PUBLIC_SITE_URL` - Public site URL for analytics

## Admin Configuration
- `NEXT_PUBLIC_URL` - Application URL

## Database Connection (Neon/PostgreSQL)
- `POSTGRES_URL` - PostgreSQL connection URL
- `POSTGRES_URL_NON_POOLING` - Non-pooling connection URL
- `POSTGRES_PRISMA_URL` - Prisma connection URL
- `POSTGRES_HOST` - Database host
- `POSTGRES_PORT` - Database port
- `POSTGRES_USER` - Database user
- `POSTGRES_PASSWORD` - Database password
- `POSTGRES_DATABASE` - Database name

## Missing Keys to Add

### Email Verification
- `SENDGRID_FROM_EMAIL` - Sender email for verification emails
- `SENDGRID_TEMPLATE_ID_VERIFY` - SendGrid template ID for verification emails

### SMS Verification (Optional)
- `TWILIO_PHONE_NUMBER` - Twilio phone number for SMS

### Payment Processing
- `STRIPE_WEBHOOK_ENDPOINT_SECRET` - Webhook endpoint secret

### Analytics
- `GOOGLE_ANALYTICS_ID` - Google Analytics tracking ID
- `MIXPANEL_TOKEN` - Mixpanel analytics token (optional)

### AI/ML Features
- `OPENAI_API_KEY` - OpenAI API key for smart matching (optional)

### Admin Dashboard
- `ADMIN_EMAIL` - Primary admin email
- `ADMIN_PASSWORD_HASH` - Admin password hash

### Feature Flags
- `FEATURE_SMART_MATCHING_ENABLED` - Enable/disable smart matching
- `FEATURE_VIDEO_CALLS_ENABLED` - Enable/disable video calls
- `FEATURE_LIVE_STREAMING_ENABLED` - Enable/disable live streaming

## Setup Instructions

1. Copy all required variables to your Vercel project environment variables
2. For local development, create a `.env.local` file with these variables
3. Ensure all sensitive keys are kept secure and never committed to version control
4. Test each integration after adding environment variables
5. Set up webhook endpoints for Stripe and SendGrid
