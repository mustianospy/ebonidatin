# Eboni Dating - Production Deployment Guide

## Overview
Eboni Dating is a modern, feature-rich dating platform for the Black diaspora community. This guide covers the complete production deployment setup.

## Pre-Deployment Checklist

### Environment Variables
All required environment variables are configured:
- Supabase: `SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- Stripe: `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`
- Blob Storage: `BLOB_READ_WRITE_TOKEN`
- Google OAuth: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- Email: `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL`

### Database
All tables are created and configured with RLS policies:
- `profiles` - User profiles with verification status
- `matches` - Mutual matches between users
- `likes` - User likes and interactions
- `messages` - Direct messaging
- `posts` - Video posts and content
- `chat_messages` - Chat functionality
- `subscriptions` - Stripe subscription tracking
- `admin_users` - Admin access control
- `reports` - User reports and moderation
- `blocks` - User blocking functionality

## Features Implemented

### Authentication
- Email/password signup and login
- Google OAuth integration
- Email verification required before login
- Session management with Supabase

### User Profiles
- Comprehensive profile creation with country/city selection
- Phone number verification
- User type selection (regular/model)
- Profile photo uploads via Vercel Blob
- Bio, interests, and relationship preferences
- Verification badges

### Discovery & Matching
- Swipe-based profile discovery
- Advanced filtering (age, distance, interests, education)
- Automatic match detection
- Match notifications

### Messaging
- Real-time messaging between matches
- Message read status tracking
- Conversation history
- Unread message indicators

### Video Features
- Video upload and storage via Vercel Blob
- Video posts with titles and descriptions
- Community feed with all user posts
- Like and view tracking

### Subscriptions
- Four-tier subscription system (Starter, Advanced, Premium, Gold)
- Stripe payment integration
- Subscription management
- Feature access control based on tier

### Admin Dashboard
- User management and statistics
- Content moderation
- Report review and action
- Platform settings

### Security
- Row-Level Security (RLS) policies on all tables
- Email verification requirement
- Rate limiting
- User activity tracking
- Report and blocking functionality

## Deployment Steps

### 1. Vercel Deployment
\`\`\`bash
# Push to GitHub
git push origin main

# Deploy via Vercel
vercel deploy --prod
\`\`\`

### 2. Domain Configuration
- Add `ebonidating.com` in Vercel project settings
- Configure DNS records (CNAME for www subdomain)
- Enable SSL/HTTPS (automatic with Vercel)

### 3. Database Setup
- All SQL migrations are in `/scripts` folder
- Run migrations in order (001-010)
- Verify RLS policies are active

### 4. Stripe Configuration
- Create products for each subscription tier
- Set up webhook endpoint: `https://ebonidating.com/api/webhooks/stripe`
- Configure webhook events: `customer.subscription.updated`, `customer.subscription.deleted`

### 5. Google OAuth Setup
- Add authorized redirect URIs in Google Cloud Console
- Configure in Supabase Auth settings
- Test OAuth flow

## Performance Optimization

### Image Optimization
- All images use Vercel Blob for CDN delivery
- Automatic image optimization
- Responsive image sizing

### Caching
- Static pages cached at edge
- API responses cached with SWR
- Database queries optimized with indexes

### Code Splitting
- Dynamic imports for heavy components
- Lazy loading for images and videos
- Tree-shaking for unused code

## Monitoring & Maintenance

### Analytics
- Vercel Analytics enabled
- User activity tracking in database
- Subscription metrics

### Error Handling
- Global error boundary component
- Graceful error messages
- Error logging for debugging

### Backups
- Supabase automatic backups
- Database point-in-time recovery
- Regular security audits

## Support & Troubleshooting

### Common Issues

**Email verification not working:**
- Check `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` environment variable
- Verify Supabase email templates are configured
- Check spam folder for verification emails

**Stripe payments failing:**
- Verify webhook endpoint is accessible
- Check Stripe API keys are correct
- Review webhook logs in Stripe dashboard

**Image uploads not working:**
- Verify `BLOB_READ_WRITE_TOKEN` is set
- Check Vercel Blob storage quota
- Ensure file size is within limits

## Security Considerations

1. All user data is encrypted in transit (HTTPS)
2. Passwords are hashed by Supabase Auth
3. RLS policies prevent unauthorized data access
4. Rate limiting prevents abuse
5. User reports are reviewed by admins
6. Blocking functionality prevents harassment

## Future Enhancements

- Video calling with WebRTC
- Live streaming features
- Advanced matching algorithm
- AI-powered recommendations
- Mobile app development
- Push notifications
- Events and meetups system
