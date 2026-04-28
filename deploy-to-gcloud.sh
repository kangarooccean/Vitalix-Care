#!/bin/bash

# Vitalix Care - Google Cloud Run Deployment Script
# This script deploys Vitalix Care to Google Cloud Run

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}╔════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   Vitalix Care - Google Cloud Run Deployment      ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════╝${NC}"

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}✗ gcloud CLI is not installed${NC}"
    echo "Download from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

echo -e "${GREEN}✓ gcloud CLI found${NC}"

# Get project ID
read -p "Enter your Google Cloud Project ID: " PROJECT_ID
echo -e "${YELLOW}Using Project: $PROJECT_ID${NC}"

# Set project
gcloud config set project $PROJECT_ID

# Enable required APIs
echo -e "${YELLOW}Enabling required Google Cloud APIs...${NC}"
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Deploy
echo -e "${YELLOW}Building and deploying to Cloud Run...${NC}"
gcloud run deploy vitalix-care \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --timeout 3600 \
  --set-env-vars NODE_ENV=production

echo -e "${GREEN}╔════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   Deployment Complete!                            ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════╝${NC}"

# Get service URL
SERVICE_URL=$(gcloud run services describe vitalix-care --platform managed --region us-central1 --format='value(status.url)')

echo -e "${GREEN}✓ Service deployed successfully${NC}"
echo -e "${YELLOW}Your Vitalix Care is now live at:${NC}"
echo -e "${GREEN}$SERVICE_URL${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Test your deployment: $SERVICE_URL"
echo "2. Configure custom domain (optional)"
echo "3. View logs: gcloud run logs read vitalix-care --limit 50"
echo "4. Monitor: https://console.cloud.google.com/run"
