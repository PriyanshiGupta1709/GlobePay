# 🌍 GlobePay: AI-Powered Global Fintech Node

GlobePay is a high-fidelity, real-time cross-border settlement prototype. It enables users to manage multi-currency vaults (INR/USD) and perform instant merchant payments using a unique **Emergency Shortfall Logic**—ensuring payments never fail even if a specific currency balance is low.

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

## 🛠 Tech Stack

* **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
* **Backend:** [Convex](https://convex.dev/) (Real-time Database & Serverless Functions)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Charts:** [Recharts](https://recharts.org/)

---

## 📦 Installation & Setup

Follow these steps to run the GlobePay Node locally:

1. **Clone the Repository:**
   ```bash
   git clone [https://github.com/PriyanshiGupta1709/GlobePay.git](https://github.com/PriyanshiGupta1709/GlobePay.git)
   cd globe-pay
