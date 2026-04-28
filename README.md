<div align="center">
<h1>Vitalix Care</h1>
<p>AI-Powered Healthcare Management Platform</p>
</div>

# Vitalix Care - Healthcare Portal & Clinical Management System

Vitalix Care is a comprehensive healthcare management platform designed for patients, families, and healthcare providers. Built with modern web technologies and deployed on both Vercel and Google Cloud.

## 🚀 Live Deployments

- **Vercel**: https://vitalix-care-8o6b.vercel.app
- **Google Cloud Run**: Follow the deployment guide below
- **GitHub Repository**: https://github.com/kangarooccean/Vitalix-Care

## ✨ Features

### Patient Portal
- Health monitoring dashboard
- Appointment scheduling
- Medication management
- Medical records access
- Real-time notifications

### Family Portal
- Caregiver interface
- Multi-family member management
- Emergency coordination
- Health tracking

### Clinical Support
- Telehealth scheduling
- Secure chat with nursing staff
- Resource directory
- Compliance documentation
- Emergency alert system

## 🛠 Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4
- **UI Library**: Motion/React (animations), Recharts (data visualization)
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS v4, Material Design 3
- **Icons**: Lucide React
- **Deployment**: Vercel + Google Cloud Run

## 🏃 Run Locally

**Prerequisites**: Node.js 18+

1. **Clone the repository**:
   ```bash
   git clone https://github.com/kangarooccean/Vitalix-Care.git
   cd Vitalix-Care
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   ```
   http://localhost:3000
   ```

## 📦 Build for Production

```bash
npm run build
npm run preview
```

## 🌐 Deploy to Google Cloud Run

### Quick Deployment (Automated)
```bash
chmod +x deploy-to-gcloud.sh
./deploy-to-gcloud.sh
```

### Manual Deployment
```bash
gcloud run deploy vitalix-care \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

**See [GCLOUD_QUICK_START.md](./GCLOUD_QUICK_START.md) for detailed instructions.**

## 📄 Documentation

- **Google Cloud Deployment**: [GOOGLE_CLOUD_DEPLOYMENT.md](./GOOGLE_CLOUD_DEPLOYMENT.md)
- **Quick Start Guide**: [GCLOUD_QUICK_START.md](./GCLOUD_QUICK_START.md)

## 📊 Project Structure

```
Vitalix-Care/
├── src/
│   ├── components/          # React components
│   ├── dashboard/           # Portal dashboards
│   ├── modals/              # Modal components
│   ├── App.tsx              # Main app
│   └── main.tsx             # Entry point
├── public/                  # Static assets
├── Dockerfile               # Container config
├── deploy-to-gcloud.sh      # Deployment script
└── package.json             # Dependencies
```

## 🔧 Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check TypeScript |
| `npm run clean` | Remove build artifacts |
| `npm start` | Start production server |

## 🎯 Use Cases

- **Patient Management**: Real-time health monitoring and records
- **Family Caregiving**: Coordinate care for multiple family members
- **Emergency Response**: Rapid alert system for critical situations
- **Telehealth**: Schedule and conduct video consultations
- **Clinical Support**: Direct access to healthcare professionals

## 📱 Responsive Design

- ✓ Desktop optimized
- ✓ Tablet compatible
- ✓ Mobile-first approach
- ✓ Touch-friendly interfaces

## 🔒 Security Features

- HIPAA-compliant architecture (design)
- Secure authentication patterns
- Row-level security implementation
- Data encryption standards

## 🌍 Deployment Options

### Vercel (Current)
- Automatic deployment from Git
- Global CDN
- Live at: https://vitalix-care-8o6b.vercel.app

### Google Cloud Run (Recommended for Challenge)
- Serverless containers
- Auto-scaling
- Follow deployment guide: [GCLOUD_QUICK_START.md](./GCLOUD_QUICK_START.md)

## 💰 Pricing

**Google Cloud Run Free Tier**:
- 2 million requests/month
- 360,000 GB-seconds/month
- Perfect for development and testing

## 📞 Support

- **Issues**: https://github.com/kangarooccean/Vitalix-Care/issues
- **Documentation**: See docs/ folder
- **Google Cloud Help**: https://cloud.google.com/support

## 📝 License

This project is provided as-is for educational and hackathon purposes.

## 🚀 Next Steps

1. Clone the repository
2. Run locally: `npm run dev`
3. Deploy to Google Cloud: `./deploy-to-gcloud.sh`
4. Submit to challenges and competitions

---

**Built with ❤️ for better healthcare access**
