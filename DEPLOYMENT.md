# Deployment Guide for Eboni Dating

## Pre-Deployment Checklist

### Environment Variables
Ensure all required environment variables are set in your Vercel project:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
- `NEXT_PUBLIC_VAPID_PUBLIC_KEY` - For push notifications (optional)

### Security Headers
The application automatically includes security headers:
- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

### Build Optimization
- SWC minification enabled
- Image optimization with AVIF and WebP formats
- Compression enabled
- Powered-by header removed

## Deployment Steps

### 1. Vercel Deployment
\`\`\`bash
# Push to GitHub
git push origin main

# Vercel will automatically deploy on push
# Monitor deployment at https://vercel.com/dashboard
\`\`\`

### 2. Database Setup
Ensure your Supabase database has the following tables:
- `users` - User profiles
- `messages` - Chat messages
- `matches` - User matches
- `analytics_events` - Analytics tracking

### 3. Post-Deployment Verification
- Check health endpoint: `https://your-domain.com/api/health`
- Verify analytics: `https://your-domain.com/api/analytics`
- Test message upload: `https://your-domain.com/api/upload`

## Performance Optimization

### Caching Strategy
- Client-side caching: 5 minutes default TTL
- Message caching: Reduces database queries
- User profile caching: 10 minutes TTL

### Rate Limiting
- Upload endpoint: 10 requests per minute per IP
- API endpoints: Configurable per route

### Monitoring
- Web Vitals tracking via `/api/metrics`
- Error logging and reporting
- Analytics event batching

## Troubleshooting

### Build Errors
If you encounter build errors:
1. Check environment variables are set correctly
2. Verify Supabase connection
3. Review error logs in Vercel dashboard

### Runtime Errors
- Check browser console for client-side errors
- Review server logs in Vercel dashboard
- Use `/api/health` endpoint to verify service status

### Performance Issues
- Monitor Web Vitals at `/api/metrics`
- Check database query performance
- Review image optimization settings

## Rollback Procedure
1. Go to Vercel dashboard
2. Select the project
3. Go to Deployments
4. Click on a previous deployment
5. Click "Redeploy"

## Support
For issues or questions, contact the development team or check the documentation.
