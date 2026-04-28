# Vitalix Care - Google Cloud Run Deployment Guide

## Overview
Vitalix Care is configured for deployment on Google Cloud Run, a serverless container platform that automatically scales based on traffic.

## Prerequisites
1. Google Cloud Account with billing enabled
2. Existing Google Cloud Project
3. Google Cloud CLI installed locally
4. Docker installed (for local testing)

## Quick Deployment Steps

### 1. Install Google Cloud CLI
Download and install from: https://cloud.google.com/sdk/docs/install

### 2. Authenticate with Google Cloud
```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
```

### 3. Enable Required APIs
```bash
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

### 4. Deploy to Cloud Run
```bash
# Clone the repository
git clone https://github.com/kangarooccean/Vitalix-Care.git
cd Vitalix-Care

# Deploy directly using gcloud
gcloud run deploy vitalix-care \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --timeout 3600
```

### 5. Get Your Cloud Run URL
After deployment completes, you'll receive a service URL like:
```
https://vitalix-care-xxxxx-uc.a.run.app
```

## Detailed Deployment Options

### Option A: Deploy via gcloud CLI (Recommended)
```bash
gcloud run deploy vitalix-care \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars NODE_ENV=production
```

### Option B: Deploy via Docker Image
```bash
# Build Docker image
docker build -t vitalix-care .

# Tag for Google Container Registry
docker tag vitalix-care gcr.io/YOUR_PROJECT_ID/vitalix-care:latest

# Push to Container Registry
docker push gcr.io/YOUR_PROJECT_ID/vitalix-care:latest

# Deploy from image
gcloud run deploy vitalix-care \
  --image gcr.io/YOUR_PROJECT_ID/vitalix-care:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 512Mi
```

## Configuration

### Environment Variables
Set environment variables for your deployment:
```bash
gcloud run deploy vitalix-care \
  --set-env-vars \
  NODE_ENV=production,\
  PORT=3000
```

### Resource Allocation
- **Memory**: 512Mi (default, can increase to 4Gi if needed)
- **CPU**: 1 (or 2, 4 cores available)
- **Timeout**: 3600 seconds
- **Concurrency**: 80 (default)

### Scaling
Cloud Run automatically scales based on traffic:
- **Min instances**: 0 (scales down to zero when idle)
- **Max instances**: 100 (can be increased)

## Monitoring

### View Logs
```bash
gcloud run logs read vitalix-care --limit 50
```

### Monitor Service
```bash
gcloud run services describe vitalix-care
```

### Update Service
```bash
gcloud run deploy vitalix-care --source . --region us-central1
```

## Troubleshooting

### Build Fails
- Check Dockerfile syntax
- Ensure all dependencies are in package.json
- Run `npm ci` instead of `npm install` for production

### Service Won't Start
- Check logs: `gcloud run logs read vitalix-care`
- Verify PORT is set to 3000
- Ensure Node.js version compatibility

### High Memory Usage
- Increase memory allocation: `--memory 1Gi`
- Check for memory leaks in application
- Optimize dependencies

## Performance Tips
1. Use lighter base images (node:18-alpine)
2. Enable Cloud CDN for static content
3. Use Cloud SQL for database (if needed)
4. Set appropriate concurrency limits
5. Configure minimum instances if consistent traffic

## Cost Estimation
- Cloud Run pricing: $0.00001667 per vCPU-second
- Free tier: 2 million requests/month, 360,000 GB-seconds/month
- Estimated monthly cost for moderate traffic: $5-50

## Next Steps
1. Deploy to Cloud Run using above commands
2. Configure custom domain (optional)
3. Set up continuous deployment from GitHub
4. Monitor performance and costs

## Additional Resources
- Cloud Run Documentation: https://cloud.google.com/run/docs
- Pricing Calculator: https://cloud.google.com/products/calculator
- GitHub Integration: https://cloud.google.com/run/docs/quickstarts/build-and-deploy

## Support
For issues or questions:
- GitHub Issues: https://github.com/kangarooccean/Vitalix-Care/issues
- Google Cloud Support: https://cloud.google.com/support
