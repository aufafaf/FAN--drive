# 🚀 Deployment Guide

## Platform Options

Website Next.js ini bisa di-deploy ke berbagai platform. Berikut panduan untuk masing-masing:

---

## 1. Vercel (Recommended) ⭐

**Keuntungan:**
- ✅ Free tier generous
- ✅ Automatic deployments
- ✅ Built-in CI/CD
- ✅ Edge network global
- ✅ Zero configuration

### Steps:

#### A. Via GitHub

1. **Push ke GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Import ke Vercel**
   - Login ke [vercel.com](https://vercel.com)
   - Click **Add New Project**
   - Import your GitHub repository
   - Vercel auto-detects Next.js

3. **Configure Environment Variables**
   - Di Vercel dashboard → **Settings** → **Environment Variables**
   - Add:
     ```
     GOOGLE_CLIENT_EMAIL=xxx@xxx.iam.gserviceaccount.com
     GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
     GOOGLE_DRIVE_FOLDER_ID=your-folder-id
     ```

4. **Deploy!**
   - Click **Deploy**
   - Wait ~2 minutes
   - Your site is live! 🎉

#### B. Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Set environment variables
vercel env add GOOGLE_CLIENT_EMAIL
vercel env add GOOGLE_PRIVATE_KEY
vercel env add GOOGLE_DRIVE_FOLDER_ID

# Deploy to production
vercel --prod
```

**Auto Deploy:**
- Every push to main → auto deploy to production
- Every PR → preview deployment

---

## 2. Netlify

**Keuntungan:**
- ✅ Free tier
- ✅ Easy setup
- ✅ Edge functions support

### Steps:

1. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

2. **netlify.toml**
   Create `netlify.toml` in root:
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

3. **Environment Variables**
   Dashboard → Site Settings → Environment Variables
   Add sama seperti Vercel

4. **Deploy**
   Connect GitHub repo dan deploy!

---

## 3. Railway

**Keuntungan:**
- ✅ Simple pricing
- ✅ Database support
- ✅ Easy scaling

### Steps:

1. **Create Project**
   - Login [railway.app](https://railway.app)
   - New Project → Deploy from GitHub

2. **Configure**
   ```
   Start Command: npm start
   Build Command: npm run build
   ```

3. **Environment Variables**
   Add di Railway dashboard

4. **Deploy**
   Automatic on push!

---

## 4. Self-Hosted (VPS/Server)

**Requirements:**
- Node.js 18+
- PM2 or similar process manager
- Nginx/Apache (optional, for reverse proxy)

### Steps:

#### A. Setup Server

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2
```

#### B. Deploy Application

```bash
# Clone repository
git clone your-repo-url
cd google-drive-gallery

# Install dependencies
npm install

# Create .env file
nano .env
# Paste your environment variables

# Build
npm run build

# Start with PM2
pm2 start npm --name "gdrive-gallery" -- start

# Save PM2 process list
pm2 save

# Setup startup script
pm2 startup
```

#### C. Configure Nginx (Optional)

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### D. SSL with Let's Encrypt

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## 5. Docker

**Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - GOOGLE_CLIENT_EMAIL=${GOOGLE_CLIENT_EMAIL}
      - GOOGLE_PRIVATE_KEY=${GOOGLE_PRIVATE_KEY}
      - GOOGLE_DRIVE_FOLDER_ID=${GOOGLE_DRIVE_FOLDER_ID}
    restart: unless-stopped
```

**Deploy:**
```bash
docker-compose up -d
```

---

## Environment Variables Checklist

Pastikan semua variable ini sudah di-set di platform deployment:

- [ ] `GOOGLE_CLIENT_EMAIL`
- [ ] `GOOGLE_PRIVATE_KEY`
- [ ] `GOOGLE_DRIVE_FOLDER_ID`

**Important Notes:**
1. **Private Key**: Harus include quotes dan `\n` characters
2. **Folder ID**: Copy dari URL Google Drive
3. **Security**: Jangan expose credentials di client-side code

---

## Post-Deployment Checklist

- [ ] Website accessible via URL
- [ ] Media files loading correctly
- [ ] Thumbnails appearing
- [ ] Search functioning
- [ ] Filters working
- [ ] Favorites persisting (localStorage)
- [ ] Detail pages accessible
- [ ] Video/image players working
- [ ] Mobile responsive
- [ ] No console errors

---

## Monitoring

### Vercel Analytics
Enable di Vercel dashboard untuk:
- Page views
- Load times
- Web vitals

### Error Tracking
Consider adding:
- Sentry
- LogRocket
- Bugsnag

### Performance
Monitor:
- Core Web Vitals
- API response times
- Image loading times

---

## Custom Domain

### Vercel
1. Dashboard → Settings → Domains
2. Add your domain
3. Configure DNS records as shown
4. Wait for propagation (~5 minutes)

### Others
1. Point A record to platform's IP
2. Or CNAME to platform's URL
3. Configure SSL certificate
4. Wait for DNS propagation

---

## Troubleshooting

**Build Fails:**
- Check Node.js version (18+)
- Verify environment variables
- Check build logs

**API Errors:**
- Verify Google credentials
- Check folder permissions
- Ensure Drive API enabled

**Images Not Loading:**
- Check CORS settings
- Verify image URLs
- Check network requests

**Performance Issues:**
- Enable caching
- Optimize images
- Use CDN for assets

---

## Scaling Considerations

**High Traffic:**
1. Use Vercel's automatic scaling
2. Or setup load balancer for self-hosted
3. Enable caching (Redis)
4. Optimize API calls

**Large Media Libraries:**
1. Implement pagination
2. Add lazy loading
3. Use virtual scrolling
4. Cache API responses

---

## Backup & Recovery

**Code:**
- Always push to GitHub
- Tag releases: `git tag v1.0.0`

**Environment Variables:**
- Store securely (1Password, etc)
- Document in team wiki

**User Data:**
- localStorage backed up by users' browsers
- Consider export/import feature

---

## Updates & Maintenance

```bash
# Update dependencies
npm update

# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Test locally
npm run dev

# Deploy
git push origin main  # Auto-deploy if configured
```

---

**Need Help?**
- Vercel Discord: https://vercel.com/discord
- Next.js Docs: https://nextjs.org/docs
- GitHub Issues: Create issue in your repo

---

Happy deploying! 🚀
