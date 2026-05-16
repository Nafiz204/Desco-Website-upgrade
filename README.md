# Desco Monitor ⚡️

A premium, fintech-style dashboard for monitoring DESCO prepaid electricity consumption. 

## ✨ Key Features
- **Modern UI**: Built with a "Stripe-meets-Apple" aesthetic using Tailwind CSS and Framer Motion.
- **Smart Analytics**: In-depth usage trends and recharge history visualization with Recharts.
- **State Management**: Real-time reactive state using Zustand.
- **Static First**: Fully compatible with GitHub Pages deployment.
- **Responsive**: Mobile-first design with a focus on high-density usability.

## 🚀 Deployment to GitHub Pages

1. **Configure Base Path**:
   Open `vite.config.ts` and set the `base` property to your repository name:
   ```ts
   export default defineConfig({
     base: '/your-repo-name/',
     // ...
   })
   ```

2. **Push to GitHub**:
   The included `.github/workflows/deploy.yml` will automatically build and deploy your app whenever you push to the `main` branch.

3. **Enable Pages**:
   Go to your GitHub Repository Settings > Pages and set the Source to "GitHub Actions".

## 📊 Data Integration
The app currently uses a `MOCK_DESCO_DATA` structure based on official customer portal responses. To connect real data:
- Update `src/store/useDashboardStore.ts` to include your API fetching logic.
- Note: Direct browser-to-DESCO API calls may be blocked by CORS; a lightweight proxy or GitHub Action-based JSON generator is recommended for production.

---
*Created with ⚡️ for DESCO Consumers.*
