# 🌍 GlobePay: AI-Powered Global Fintech Node

GlobePay isn’t just another payment app—it’s a real-world problem solver.
We make sending money worldwide as easy as scanning a QR code, and as profitable as having an AI financial advisor in your pocket.” That help users to reduce poor forex timing, avoid blind top-ups, and make smarter international payment decisions.

![GlobePay Header](https://raw.githubusercontent.com/PriyanshiGupta1709/GlobePay/main/public/dashboard-preview.png) *(Note: Add a screenshot here later!)*

## 🚀 Core Features

### 1. Smart Multi-Currency Vault
* **Real-time Sync:** Powered by **Convex**, balances update instantly across all devices without page refreshes.
* **Dual-Currency Support:** Manage both INR (Paisa-precision) and USD (Cent-precision) in a single unified interface.

### 2. Intelligent Settlement Logic
* **Emergency Shortfall Protection:** If a USD payment is made but USD funds are insufficient, the system automatically calculates the gap, converts INR at the live rate, and applies a **2% automated settlement fee** to complete the transaction.
* **Global Ledger:** A tamper-proof transaction history that tracks base amounts, FX fees, and merchant metadata.

### 3. AI Market Intelligence
* **Dynamic Forecasting:** Integrated charts showing currency trends (USD, EUR, GBP, JPY).
* **Signal Integration:** The UI suggests "Buy" or "Hold" actions based on simulated travel corridor liquidity, which dynamically updates the app's internal exchange rates.

### 4. High-Fidelity UX
* **Interactive QR Scanner:** Simulated biometric scanning and camera integration for merchant auth.
* **Glassmorphic Design:** A sleek, dark-mode interface built with **Tailwind CSS** and **Framer Motion** for buttery-smooth transitions.

---

## 🛠 Tech Stack & Tools

* **Frontend:** [Next.js 16](https://nextjs.org/) (App Router) for a high-performance, SEO-friendly interface.
* **Backend & Real-time Database:** [Convex](https://convex.dev/) for serverless functions and instant reactive state management.
* **AI Engine:** [OpenAI API](https://openai.com/) (GPT-4o) powering the Market Intelligence forecasting and automated settlement summaries.
* **IDE & AI Pairing:** [Cursor](https://cursor.com/) was utilized throughout the development process to accelerate UI component generation and complex backend logic refactoring.
* **Animations:** [Framer Motion](https://www.framer.com/motion/) for professional-grade fintech transitions.
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) for a sleek, glassmorphic design system.

---
## 🏆 Hackathon Track Integration

This project was built specifically for the following tracks:

* **[OpenAI Track]:** Leveraging GPT-4o to analyze travel corridors and provide real-time "Buy/Hold" signals for international travelers based on simulated market volatility.
* **[Convex Track]:** Utilizing Convex's reactive queries to ensure that cross-border settlements update the user's global vault balance in under 50ms, providing a seamless financial experience.
* **[Cursor / AI Tools Track]:** Developed 100% using Cursor's AI-native IDE features, including Composer and codebase indexing, to bridge the gap between complex fintech logic and high-fidelity design.

## 📦 Installation & Setup

Follow these steps to run the GlobePay Node locally:

1. **Clone the Repository:**
   ```bash
   git clone [https://github.com/PriyanshiGupta1709/GlobePay.git](https://github.com/PriyanshiGupta1709/GlobePay.git)
   cd globe-pay
