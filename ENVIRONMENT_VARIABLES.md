# Environment Variables Required for Full Functionality

This document lists all environment variables needed for the Eboni Dating platform to function properly.

## Supabase Configuration (Required)

These are automatically provided when you connect the Supabase integration:

\`\`\`env
# Supabase Database URLs
POSTGRES_URL=                    # Main PostgreSQL connection URL
POSTGRES_PRISMA_URL=            # Prisma-compatible connection URL
POSTGRES_URL_NON_POOLING=       # Non-pooled connection URL
POSTGRES_HOST=                  # Database host
POSTGRES_USER=                  # Database user
POSTGRES_PASSWORD=              # Database password
POSTGRES_DATABASE=              # Database name

# Supabase API Configuration
SUPABASE_URL=                   # Supabase project URL
NEXT_PUBLIC_SUPABASE_URL=       # Public Supabase URL (client-side)
SUPABASE_ANON_KEY=             # Anonymous key for server-side
NEXT_PUBLIC_SUPABASE_ANON_KEY= # Anonymous key for client-side
SUPABASE_SERVICE_ROLE_KEY=     # Service role key (admin access)
SUPABASE_JWT_SECRET=           # JWT secret for token verification
\`\`\`

## Email Configuration (Required for Email Verification)

Supabase handles email verification automatically, but you need to configure:

1. **Email Templates** in Supabase Dashboard:
   - Go to Authentication > Email Templates
   - Customize the "Confirm signup" template
   - Set the redirect URL to: `{{ .SiteURL }}/auth/callback`

2. **Site URL Configuration** in Supabase Dashboard:
   - Go to Authentication > URL Configuration
   - Set Site URL to your production domain (e.g., `https://yourdomain.com`)
   - Add redirect URLs:
     - `http://localhost:3000/auth/callback` (development)
     - `https://yourdomain.com/auth/callback` (production)

## Development Configuration (Optional)

\`\`\`env
# Development Redirect URL
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/dashboard
\`\`\`

This is used during development to redirect users after email verification.

## Payment Integration (Optional - for Premium Features)

If you plan to implement payment features:

\`\`\`env
# Stripe Configuration
STRIPE_SECRET_KEY=              # Stripe secret key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY= # Stripe publishable key
STRIPE_WEBHOOK_SECRET=          # Stripe webhook secret
\`\`\`

## File Storage (Optional - for Profile Images)

Supabase Storage is already configured, but you may want to set:

\`\`\`env
# Supabase Storage Bucket
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=avatars
\`\`\`

## Additional Services (Optional)

\`\`\`env
# SMS Verification (if implementing phone verification)
TWILIO_ACCOUNT_SID=            # Twilio account SID
TWILIO_AUTH_TOKEN=             # Twilio auth token
TWILIO_PHONE_NUMBER=           # Twilio phone number

# Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID= # Google Analytics ID
\`\`\`

## Setup Instructions

### 1. Supabase Integration
- Connect Supabase integration from Project Settings in v0
- All Supabase environment variables will be automatically added

### 2. Email Verification Setup
1. In Supabase Dashboard, go to Authentication > Email Templates
2. Enable "Confirm email" template
3. Update the confirmation URL to: `{{ .SiteURL }}/auth/callback`
4. Go to Authentication > URL Configuration
5. Add your site URL and redirect URLs

### 3. Database Setup
Run the following SQL scripts in order (v0 can run these for you):
1. `scripts/009_add_registration_fields.sql` - Adds new registration fields
2. `scripts/010_update_profile_trigger.sql` - Updates the profile creation trigger

### 4. Testing Email Verification
- In development, Supabase will show confirmation links in the logs
- In production, emails will be sent to users' email addresses
- Users must click the verification link before they can log in

## Security Notes

- Never commit `.env` files to version control
- Use different keys for development and production
- Rotate keys regularly
- Keep `SUPABASE_SERVICE_ROLE_KEY` secure (it has admin access)
- Enable Row Level Security (RLS) on all tables (already configured)

## Verification Checklist

- [ ] Supabase integration connected
- [ ] Database scripts executed
- [ ] Email templates configured in Supabase
- [ ] Site URL and redirect URLs set in Supabase
- [ ] Terms and Privacy pages accessible
- [ ] Email verification working
- [ ] Login blocks unverified users
- [ ] All required fields in signup form
- [ ] Country and city dropdowns populated
- [ ] Date of birth validation (18+ only)
- [ ] Terms acceptance tracked with timestamp
