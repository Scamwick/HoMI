# Admin Dashboard Access

## Password

**Default Admin Password:** `homi2025secret`

## Accessing the Dashboard

1. **Local Development:**
   ```
   http://localhost:3000/admin
   ```

2. **Production:**
   ```
   https://your-domain.vercel.app/admin
   ```

## Setup for Vercel Deployment

Add this environment variable in your Vercel project settings:

```
ADMIN_PASS=homi2025secret
```

**Steps:**
1. Go to Vercel Dashboard → Your Project → Settings
2. Click "Environment Variables"
3. Add: `ADMIN_PASS` = `homi2025secret`
4. Select environments: Production, Preview, Development
5. Click "Save"
6. Redeploy your application

## Security Recommendations

⚠️ **Current Implementation:** Client-side password check
✅ **Production Recommendation:** Implement server-side authentication

### Upgrade Options:

**1. Server-Side API Route (Recommended)**
- Create `/api/admin/verify` endpoint
- Check password server-side
- Set HTTP-only session cookie

**2. Supabase Auth**
- Use Supabase authentication
- Create admin user in Supabase
- Implement Row Level Security

**3. NextAuth.js**
- Full authentication solution
- Multiple providers support
- Session management

**4. Vercel Password Protection**
- Project-level password protection
- Settings → Password Protection
- Simple but effective

## Changing the Password

1. Update `.env.local`:
   ```
   ADMIN_PASS=your_new_password
   ```

2. Update password check in `app/admin/page.tsx`:
   ```typescript
   if (password === 'your_new_password') {
     setAuthenticated(true);
   }
   ```

3. Update Vercel environment variable

## Dashboard Features

- 📊 Total assessments count
- 👥 Waitlist signups
- 📈 Average HōMI score
- 📋 Recent assessments table
- ✉️ Waitlist emails with source tracking
- 🎨 Color-coded decisions (YES/NOT YET/NO)

## Troubleshooting

**Password not working?**
- Check for typos (case-sensitive)
- Verify environment variable is set
- Restart development server after .env changes

**Dashboard empty?**
- Check Supabase connection
- Verify Row Level Security policies
- Check browser console for errors
