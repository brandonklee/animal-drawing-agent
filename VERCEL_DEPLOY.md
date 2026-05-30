# 🚀 Deploy to Vercel - Complete Guide

Your Animal Drawing Agent is now **ready to deploy** to Vercel with serverless functions!

## ✅ What's Ready

- ✅ Frontend builds successfully
- ✅ Serverless function created (`/api/analyze-drawing.js`)
- ✅ No browser-incompatible dependencies
- ✅ All components working

## 📦 Deploy to Vercel

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

```bash
cd "/Users/brandon.lee/Documents/Claude/Animal Drawing Agent/animal-drawing-app"
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No
- **Project name?** → animal-drawing-agent (or your choice)
- **Directory?** → ./ (current directory)
- **Override settings?** → No

### Step 4: Add Environment Variable

After deployment, add your Anthropic API key:

#### Option A: Via Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Add:
   - **Name**: `ANTHROPIC_API_KEY`
   - **Value**: `sk-ant-your-key-here`
   - **Environments**: Production, Preview, Development

#### Option B: Via CLI
```bash
vercel env add ANTHROPIC_API_KEY
```
Then paste your API key when prompted.

### Step 5: Redeploy

After adding the environment variable:

```bash
vercel --prod
```

## 🎉 Your App is Live!

Vercel will give you a URL like:
```
https://animal-drawing-agent.vercel.app
```

## 📁 Project Structure

```
animal-drawing-app/
├── api/
│   └── analyze-drawing.js      ← Serverless function (Node.js)
├── src/
│   ├── components/              ← React components
│   ├── data/                    ← Breed data
│   ├── services/
│   │   └── claudeService.js     ← Calls /api/analyze-drawing
│   ├── App.js
│   └── App.css
├── public/
│   └── _redirects               ← SPA routing
└── build/                       ← Production build
```

## 🔒 Security

✅ **API Key is Server-Side Only**
- Never exposed to browser
- Only accessible in `/api` functions
- Vercel environment variables are encrypted

✅ **CORS Enabled**
- Serverless function handles CORS headers
- Frontend can call backend API

## 🧪 Test Your Deployment

1. Visit your Vercel URL
2. Click on a breed (e.g., Corgi)
3. View the guide
4. Upload a test image
5. Get AI feedback ✨

## 🐛 Troubleshooting

### "API key not configured" error

- Make sure `ANTHROPIC_API_KEY` is set in Vercel dashboard
- Redeploy after adding environment variables

### API function not found

- Verify `/api/analyze-drawing.js` exists
- Check Vercel function logs in dashboard

### Build fails

```bash
# Clean and rebuild
rm -rf node_modules build
npm install
npm run build
```

### CORS errors

- The serverless function already handles CORS
- If you see errors, check browser console

## 📊 Monitor Usage

### Vercel Dashboard

- Function invocations
- Bandwidth usage
- Build logs

### Anthropic Dashboard

https://console.anthropic.com/

- API usage
- Token consumption
- Rate limits

## 💰 Cost Estimates

### Vercel (Free Tier)
- 100 GB bandwidth/month
- 100,000 serverless function invocations/month
- Unlimited sites

### Anthropic API
- Pay per token used
- ~$0.003 per image analysis (Sonnet 4)
- Set spending limits in dashboard

## 🔄 Update Your App

1. Make changes locally
2. Test: `npm start`
3. Deploy: `vercel --prod`

That's it! Vercel auto-builds and deploys.

## 🌐 Custom Domain (Optional)

### Add your own domain:

1. Go to Vercel dashboard → Your project → **Settings** → **Domains**
2. Add your domain (e.g., `drawing.mydomain.com`)
3. Follow DNS instructions
4. SSL certificate is automatic!

## 📱 PWA Support (Future Enhancement)

Want to make it installable as an app?

1. Update `public/manifest.json`
2. Add service worker
3. Users can install to home screen

## 🎨 Environment-Specific Builds

### Production
```bash
vercel --prod
```

### Preview (testing)
```bash
vercel
```

Each git push creates a preview URL automatically!

## 📖 Helpful Commands

```bash
# View deployments
vercel list

# View logs
vercel logs

# Remove environment variable
vercel env rm ANTHROPIC_API_KEY

# Link local to Vercel project
vercel link

# Check deployment status
vercel inspect <deployment-url>
```

## ✨ Next Steps

Your app is deployed! Now you can:

1. ✅ Share the URL with users
2. ✅ Test with real kid drawings
3. ✅ Monitor usage in Anthropic/Vercel dashboards
4. ✅ Add more breeds (edit `src/data/breeds.js`)
5. ✅ Customize UI colors (edit `src/App.css`)
6. ✅ Set up custom domain

## 🎉 Congratulations!

You now have a **production-ready**, **fully-functional** Animal Drawing Agent deployed on Vercel!

**App Features:**
- 🎨 6 animal breeds with drawing guides
- 📸 Photo upload
- 🤖 AI-powered feedback from Claude
- 🎤 Voice memo recording
- 📱 Mobile-friendly design
- 🔒 Secure API key handling

**Share it with kids and let them learn to draw!** 🐕🐈✨

---

*Need help? Check DEPLOYMENT_NOTE.md for alternative deployment options.*