# Integration Testing Guide

## Overview
This document covers integration testing for Eboni Dating's critical features and third-party services.

## Supabase Integration

### Database Integration
\`\`\`sql
-- Test profile creation
INSERT INTO profiles (id, display_name, email, email_verified)
VALUES ('test-user-1', 'Test User', 'test@example.com', true);

-- Test match creation
INSERT INTO matches (user_id_1, user_id_2, matched_at)
VALUES ('test-user-1', 'test-user-2', NOW());

-- Test message creation
INSERT INTO messages (match_id, sender_id, receiver_id, content)
VALUES ('match-1', 'test-user-1', 'test-user-2', 'Hello!');
\`\`\`

### Authentication Integration
- Email/password signup
- Email verification
- Session management
- Token refresh
- Logout

### RLS Policy Testing
- User can only see own profile
- User can only see matches
- User can only see own messages
- Admin can see all data

## Stripe Integration

### Payment Processing
1. Create checkout session
2. Redirect to Stripe
3. Process payment
4. Webhook notification
5. Update subscription status

### Subscription Management
1. Create subscription
2. Update subscription
3. Cancel subscription
4. Handle failed payments
5. Retry payment

### Webhook Testing
\`\`\`bash
# Test webhook locally
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Trigger test events
stripe trigger payment_intent.succeeded
stripe trigger customer.subscription.updated
\`\`\`

## Google OAuth Integration

### OAuth Flow
1. User clicks "Sign up with Google"
2. Redirect to Google consent screen
3. User grants permissions
4. Redirect back with auth code
5. Exchange code for token
6. Create/update user profile

### Testing OAuth
- Test with test Google account
- Verify user data is captured
- Check profile creation
- Verify email verification

## Vercel Blob Integration

### File Upload
1. User selects file
2. Upload to Vercel Blob
3. Get file URL
4. Store URL in database
5. Display file

### Testing Upload
- Test with various file types
- Test file size limits
- Test error handling
- Verify CDN delivery

## Email Integration

### Email Sending
1. Verification email
2. Password reset email
3. Match notification email
4. Message notification email
5. Subscription confirmation email

### Testing Email
- Check email delivery
- Verify email content
- Test email templates
- Check spam folder

## API Integration Testing

### Authentication API
\`\`\`javascript
// Test signup
POST /api/auth/signup
{
  email: "test@example.com",
  password: "TestPassword123!"
}

// Test login
POST /api/auth/login
{
  email: "test@example.com",
  password: "TestPassword123!"
}
\`\`\`

### Profile API
\`\`\`javascript
// Test profile creation
POST /api/profiles
{
  display_name: "Test User",
  bio: "Test bio",
  interests: ["travel", "music"]
}

// Test profile update
PUT /api/profiles/:id
{
  bio: "Updated bio"
}
\`\`\`

### Discovery API
\`\`\`javascript
// Test get profiles
GET /api/discover/profiles?age_min=25&age_max=35

// Test like profile
POST /api/discover/like
{
  liked_id: "user-2"
}
\`\`\`

### Messaging API
\`\`\`javascript
// Test send message
POST /api/messages/send
{
  match_id: "match-1",
  content: "Hello!"
}

// Test get messages
GET /api/messages/:conversationId
\`\`\`

## End-to-End Testing Scenarios

### Scenario 1: Complete Signup Flow
1. Visit homepage
2. Click "Sign Up"
3. Enter email and password
4. Verify email
5. Complete profile
6. View dashboard

### Scenario 2: Discovery and Matching
1. Login
2. Go to discover
3. View profiles
4. Like a profile
5. Check for match
6. View matches

### Scenario 3: Messaging Flow
1. Login
2. Go to messages
3. Select conversation
4. Send message
5. Receive message
6. Mark as read

### Scenario 4: Subscription Purchase
1. Login
2. Go to pricing
3. Select plan
4. Enter payment details
5. Complete payment
6. Verify subscription

### Scenario 5: Admin Moderation
1. Login as admin
2. Go to reports
3. Review report
4. Take action
5. Verify action taken

## Performance Integration Testing

### Database Performance
- Query response time < 100ms
- Connection pool utilization
- Slow query identification

### API Performance
- Response time < 200ms
- Throughput > 1000 req/s
- Error rate < 0.1%

### Frontend Performance
- Page load time < 3s
- Time to interactive < 5s
- Lighthouse score > 90

## Security Integration Testing

### Authentication Security
- SQL injection prevention
- XSS prevention
- CSRF protection
- Rate limiting

### Data Security
- Encryption in transit
- Encryption at rest
- Access control
- Data validation

### API Security
- API key validation
- Request signing
- Response validation
- Error handling

## Monitoring Integration

### Error Tracking
- Sentry integration
- Error logging
- Error alerting
- Error analysis

### Performance Monitoring
- Vercel Analytics
- Database monitoring
- API monitoring
- User monitoring

### User Analytics
- Event tracking
- User behavior
- Conversion tracking
- Retention metrics
