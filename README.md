# Chaipal Garden Cafe Management System

Chaipal Garden Cafe is a real, production-ready full-stack cafe management system. It features persistent cloud database integration, rule-based AI chatbot automation, a premium dark-green nature-themed UI, live crowd levels, reviews approval panels, table QR generation, and automated WhatsApp order redirects.

---

## 🚀 Features

- **Dual-Mode Data Sync:** Connected to Supabase Cloud Database by default, with automatic, transparent local fallback to `LocalStorage` if offline, pauses, or missing keys occur.
- **Admin Connection Monitor:** Live top-bar indicators show connection state (Green = Cloud Connected, Yellow = Local Demo Mode, Red = Connection Failed) with manual diagnostic "Test Ping" tools.
- **Local QR Code Generator:** Uses `qrcode.react` to generate high-resolution print cards and PNG downloads for local tables without query limits or external API dependencies.
- **Lightweight AI Chatbot:** Rule-based FAQs trained instantly through the admin manager panel.
- **Reservations & Analytics:** Operational charts tracking reservation volume, peak hourly demand, seating capacity shares, and QR menu scan hits.

---

## 📋 Prerequisites

- **Node.js:** v16.x or higher
- **npm** or **yarn**
- **Supabase Account:** Access to a free/paid project database instance.

---

## 🛠️ Supabase Cloud Setup Guide

### 1. Create a Supabase Project
1. Log in to the [Supabase Console](https://supabase.com/).
2. Click **New Project** and select your organization.
3. Choose a project name (e.g., `Chaipal Cafe`), set a secure Database Password, and select the region closest to your business.
4. Wait for the database instance to provision.

### 2. Apply Database Migrations
1. Once your project is ready, click on **SQL Editor** in the left sidebar of the Supabase dashboard.
2. Click **New Query** to open an empty SQL window.
3. Open the file `supabase_schema.sql` at the root of the project, copy the entire SQL script, paste it into the Supabase SQL editor, and click **Run**.
   * This instantly builds the tables (`menu_items`, `reservations`, `crowd_status`, `offers`, `reviews`, `qr_tables`, `analytics`, `ai_faq_rules`, `user_profiles`), configures Row-Level Security (RLS) policies, and populates initial cafe default data.

### 3. Create Storage Buckets
1. Click on **Storage** in the Supabase left sidebar.
2. Create two new buckets (both **MUST be set to Public**):
   * `menu-images` (for uploading dish cards)
   * `offer-banners` (for uploading deal banners)
3. Set up bucket access policies to allow authenticated admin users to upload files.

### 4. Create an Admin Account
1. Click on **Authentication** in the Supabase left sidebar.
2. Under the **Users** tab, click **Add User** -> **Create User**. Enter an admin email and password.
3. Copy the newly created User's **User ID (UUID)**.
4. Go back to the **SQL Editor**, open a new query, insert a record linking this UUID to the `user_profiles` table, and click **Run**:
   ```sql
   INSERT INTO public.user_profiles (id, email, role)
   VALUES ('PASTE_USER_UUID_HERE', 'admin@email.com', 'admin');
   ```

---

## 🔑 Environment Variables Configuration

To connect the frontend application to your newly created Supabase project, modify the `.env` file at the root of your workspace:

```ini
# Core Supabase credentials
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-public-key
```

* **Vite Server Restart:** Whenever you update variables in the `.env` file, you **must restart the Vite development server** for Vite to load the new config variables into the environment:
  ```bash
  # Press Ctrl+C to stop, then run:
  npm start
  ```

---

## 🚀 Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the local server:
   ```bash
   npm start
   ```
3. Open the application:
   - **Customer Website:** [http://localhost:4028](http://localhost:4028)
   - **Admin Panel:** [http://localhost:4028/admin](http://localhost:4028/admin)
     - *In Demo Mode:* Enter password `admin` to gain entry.
     - *In Cloud Mode:* Sign in using the admin account email and password created in your Supabase Auth dashboard.

---

## ⚙️ Testing Database Connections

1. Log into the **Admin Panel**.
2. Locate the database status indicator in the top right header:
   - 🟢 **Supabase Sync**: Successfully connected to Supabase Cloud database. All operations read/write directly to the cloud.
   - 🟡 **Demo Mode**: Keys are unset or set to dummy placeholders in `.env`. Using offline LocalStorage.
   - 🔴 **Unreachable**: Keys are configured in `.env`, but the database failed to respond (e.g. project is paused, network is down, or wrong keys were pasted).
3. Click the **Test Ping** button in the header at any time to run a dynamic connection test. Success/error toast alerts will pop up on the dashboard.

