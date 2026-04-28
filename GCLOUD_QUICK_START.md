# Deploy Vitalix Care to Google Cloud Run

Your Vitalix Care application is now configured for deployment on Google Cloud Run. Follow these steps:

## Quickest Way (Automated)

1. **Download your project** from v0
2. **Open terminal** and navigate to the project folder
3. **Run the deployment script:**
   ```bash
   chmod +x deploy-to-gcloud.sh
   ./deploy-to-gcloud.sh
   ```
4. **Follow the prompts** to enter your Google Cloud Project ID
5. **Done!** Your app will be deployed in ~5-10 minutes

## Manual Deployment Steps

### Prerequisites
- Google Cloud Account: https://cloud.google.com
- Google Cloud CLI: https://cloud.google.com/sdk/docs/install
- Your existing Google Cloud Project ID

### Step 1: Install gcloud CLI
```bash
# Download and install from: https://cloud.google.com/sdk/docs/install
gcloud --version  # Verify installation
```

### Step 2: Authenticate
```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
```

### Step 3: Enable APIs
```bash
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

### Step 4: Deploy
```bash
cd /path/to/vitalix-care
gcloud run deploy vitalix-care \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 512Mi
```

### Step 5: Get Your URL
After deployment, you'll get a URL like:
```
https://vitalix-care-xxxxx-uc.a.run.app
```

## What's Included

✓ **Dockerfile** - Container configuration for Cloud Run
✓ **.gcloudignore** - Files excluded from deployment
✓ **package.json** - Updated with start script
✓ **deploy-to-gcloud.sh** - Automated deployment script
✓ **GOOGLE_CLOUD_DEPLOYMENT.md** - Detailed documentation

## Key Features

- **Serverless** - No infrastructure management
- **Auto-scaling** - Handles traffic automatically
- **Pay-per-use** - Only pay for what you use
- **Free tier** - 2M requests/month free
- **Fast deployment** - Deploy in minutes

## Pricing Estimate

| Traffic Level | Monthly Cost |
|---|---|
| Light (10K requests) | ~$2-5 |
| Medium (100K requests) | ~$5-15 |
| Heavy (1M requests) | ~$15-50 |

*Based on current Cloud Run pricing (subject to change)*

## Monitoring Your Deployment

```bash
# View logs
gcloud run logs read vitalix-care --limit 50

# Get service details
gcloud run services describe vitalix-care

# Update deployment
gcloud run deploy vitalix-care --source . --region us-central1
```

## Environment Variables

Set environment variables during deployment:
```bash
gcloud run deploy vitalix-care \
  --source . \
  --set-env-vars NODE_ENV=production
```

## Need Help?

- **Google Cloud Documentation**: https://cloud.google.com/run/docs
- **Troubleshooting**: See GOOGLE_CLOUD_DEPLOYMENT.md
- **GitHub Issues**: https://github.com/kangarooccean/Vitalix-Care/issues

## Next Steps

1. Deploy using the automated script above
2. Test your application at the provided URL
3. Submit your Google Cloud URL to Google Solution Challenge
4. Optionally configure a custom domain

Your Vitalix Care application is ready for Google Cloud!
