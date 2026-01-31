# NaturePure Cleaning - Project & Business Guide

## 1. Project Overview (项目概览)
- **Brand Name**: NaturePure Cleaning
- **Core Value**: 0 Chemical, Pure Water + Premium Microfibre
- **Location**: Hobart, Tasmania
- **Website**: [naturepurecleaning.com.au](https://naturepurecleaning.com.au)
- **Stack**: Next.js 15, TypeScript, Tailwind CSS, Web3Forms
- **Hosting**: Vercel

---

## 2. Website Features (网站功能)

### 🏡 Page Structure
1. **Hero Section**: 
   - High-conversion headline
   - "Instant Quote" CTA button
   - Trust badges (Fully Insured, Chemical-Free)
2. **Instant Quote Calculator (Core Feature)**:
   - Inputs: Bedrooms, Bathrooms, Frequency, Extras
   - Logic: Base $60 + Bed $20 + Bath $35
   - Output: Estimated Price Range (Protected by -5% to +10% buffer)
   - Action: Direct booking via Email or Call
3. **Service Details (What We Clean)**:
   - Clear "Standard Maintenance Clean" scope
   - Kitchen, Bathroom, Floors, Dusting
4. **Differentiation (Why Us)**:
   - "0 Chemical" explanation
   - Microfibre vs Traditional comparison
5. **Contact & Footer**:
   - Working contact form (Web3Forms)
   - Local SEO keywords

### 🔧 Technical Setup
- **SEO Optimized**: 
  - Custom Meta Title & Description
  - JSON-LD Structured Data (LocalBusiness)
  - Sitemap & Robots.txt
  - Suburb-specific keywords (Sandy Bay, Kingston, etc.)
- **Mobile Responsive**: Perfect display on iPhone/Android
- **Performance**: High Speed (Next.js App Router)

---

## 3. SEO & Marketing Checklist (营销清单)

### ✅ Completed
- [x] Website Deployed & Domain Connected
- [x] Google Search Console Verified
- [x] Sitemap Submitted
- [x] Google Business Profile Registered (Waiting for verification)

### 🚀 Next Steps (Your To-Do)
1. **Google Business Profile (Crucial)**:
   - Update hours to real business hours (e.g., Mon-Fri 8-6)
   - Upload 10+ real photos immediately after verification
   - Get 5 reviews from friends/family ASAP
2. **Local Promotion**:
   - Post in local FB groups (Hobart/Kingston community)
   - Offer "First Clean 20% Off" for portfolio building
3. **Google Ads (Optional)**:
   - Start small ($10/day) targeting "house cleaning hobart"

---

## 4. Equipment Shopping List (装备清单)

### 🧵 Microfibre System (The Soul)
- **Glass Cloths (Fishscale)** x 5: For mirrors/glass (No streaks!)
- **General Cloths (Blue)** x 10: Dusting/Surfaces
- **Heavy Duty Cloths (Green)** x 10: Kitchen grease
- **Bathroom Cloths (Red)** x 10: Toilet/Shower (Strict color coding!)
- **Flat Mop System**: Rubbermaid Pulse or Sabco Professional

### 💨 Steam & Vacuum (The Power)
- **Steam Cleaner**: Karcher SC 2 or SC 3 (For sanitizing without chemicals)
- **Backpack Vacuum**: Pacvac Superpro 700 + **HEPA Filter** (Professional standard)

### 🛠️ Accessories
- **Continuous Spray Bottles**: Labelled "PURE WATER"
- **Squeegee**: For shower screens
- **Magic Sponges**: For wall marks
- **Professional Caddy**: To carry everything neatly
- **Indoor Shoes**: Dedicated clean shoes for inside homes

### 🌿 Eco-Backup (Just in case)
- Eucalyptus Oil (Sticky marks)
- White Vinegar (Limescale)
- Baking Soda (Oven/Drains)

---

## 5. Pricing Strategy (定价策略)

**Base Model:**
- **Rate**: Aim for **$50 - $65 / hour** equivalent
- **Minimum Call-out**: $90 - $99

**Calculator Logic (Internal):**
- **Base**: $60
- **Bedroom**: +$20
- **Bathroom**: +$35
- **Oven**: +$80
- **Windows**: +$40
- **Fridge**: +$40

**Frequency Discounts:**
- Weekly: -15%
- Fortnightly: -10%

---

## 6. How to Maintain Website (网站维护)

### Update Pricing
Edit `src/components/CTASection.tsx`:
```typescript
const BASE_PRICE = 60;
const PRICE_PER_BED = 20;
// ... adjust numbers here
```

### Check Emails
- Form submissions go to: **qhdwq27@gmail.com**
- Service provider: Web3Forms (Free tier)

### Deploy Changes
```bash
git add .
git commit -m "update message"
git push
# Vercel will auto-deploy
```
