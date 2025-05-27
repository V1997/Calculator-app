# Deployment Guide

This guide covers how to deploy the Enhanced Calculator to various platforms.

## 🚀 Quick Deploy

### GitHub Pages (Recommended)
The easiest way to deploy:

```bash
# Build and deploy to GitHub Pages
npm run deploy:gh-pages
```

Your calculator will be available at: `https://yourusername.github.io/enhanced-calculator`

### Netlify
Deploy to Netlify with drag-and-drop:

```bash
# Build the project
npm run build

# The 'public' folder is ready for deployment
# Drag the 'public' folder to netlify.com/drop
```

## 🔧 Platform-Specific Instructions

### GitHub Pages

#### Automatic Deployment
1. Push to `main` branch
2. GitHub Actions will automatically build and deploy
3. Site available at `https://yourusername.github.io/enhanced-calculator`

#### Manual Deployment
```bash
# Install gh-pages package
npm install --save-dev gh-pages

# Deploy
npm run deploy:gh-pages
```

#### Custom Domain
1. Add `CNAME` file to `public/` folder with your domain
2. Configure DNS records:
   - CNAME record: `www.yourdomain.com` → `yourusername.github.io`
   - A records for apex domain

### Netlify

#### Continuous Deployment
1. Connect GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `public`
4. Deploy on every push to `main`

#### Environment Variables
```bash
# Set in Netlify dashboard
NODE_VERSION=18.x
```

#### Custom Headers (netlify.toml)
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/sw.js"
  [headers.values]
    Cache-Control = "no-cache"
```

### Vercel

#### Quick Deploy
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

#### Configuration (vercel.json)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "public/**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/public/$1"
    }
  ]
}
```

### Firebase Hosting

#### Setup
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and initialize
firebase login
firebase init hosting

# Select your project
# Set public directory to 'public'
# Configure as single-page app: No
# Set up automatic builds: Yes
```

#### Deploy
```bash
npm run build
firebase deploy
```

### Amazon S3 + CloudFront

#### S3 Setup
1. Create S3 bucket
2. Enable static website hosting
3. Upload `public/` folder contents
4. Set bucket policy for public read

#### CloudFront Setup
1. Create CloudFront distribution
2. Set S3 bucket as origin
3. Configure custom error pages
4. Set caching behavior

### Heroku

#### Setup
```bash
# Install Heroku CLI
# Create Procfile
echo "web: npx serve -s public -l $PORT" > Procfile

# Deploy
heroku create your-app-name
git push heroku main
```

## 🔒 Security Considerations

### Content Security Policy
Add to your HTML `<head>`:
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  style-src 'self' 'unsafe-inline';
  script-src 'self';
  img-src 'self' data:;
  connect-src 'self';
">
```

### HTTPS
- Always serve over HTTPS in production
- Most platforms provide free SSL certificates
- Use HSTS headers for additional security

## 📊 Monitoring & Analytics

### Google Analytics
Add to `public/index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### Performance Monitoring
- Use Lighthouse CI in GitHub Actions
- Monitor Core Web Vitals
- Set up error tracking (Sentry, LogRocket)

## 🚀 Performance Optimization

### Before Deployment
```bash
# Run performance audit
npm run test:perf

# Check bundle size
npm run analyze

# Optimize images
npm run optimize:images
```

### PWA Optimization
- Ensure service worker is properly configured
- Test offline functionality
- Validate web app manifest
- Check installability

## 🔄 CI/CD Pipeline

### GitHub Actions
The included workflow automatically:
1. Runs tests on every PR
2. Builds the application
3. Deploys to GitHub Pages on merge to main
4. Runs security audits
5. Generates performance reports

### Manual Deployment Steps
```bash
# 1. Run full test suite
npm run ci

# 2. Build for production
npm run build

# 3. Test production build locally
npm run preview

# 4. Deploy
npm run deploy:gh-pages
```

## 🐛 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version  # Should be 16+
```

#### Deployment Issues
- Check build logs for errors
- Verify environment variables
- Ensure correct file paths
- Check platform-specific requirements

#### Performance Issues
- Optimize images and assets
- Enable compression
- Use CDN for static assets
- Implement proper caching headers

### Debug Commands
```bash
# Check bundle size
npm run analyze

# Lighthouse audit
npm run test:perf

# Accessibility audit
npm run test:a11y
```

## 📈 Post-Deployment

### Verification Checklist
- [ ] Site loads correctly
- [ ] All features work as expected
- [ ] PWA installation works
- [ ] Offline functionality works
- [ ] Performance scores are good
- [ ] Accessibility compliance
- [ ] SEO optimization
- [ ] Analytics tracking

### Monitoring
- Set up uptime monitoring
- Monitor performance metrics
- Track user analytics
- Monitor error rates

---

Need help with deployment? Check our [Contributing Guide](CONTRIBUTING.md) or open an issue!
