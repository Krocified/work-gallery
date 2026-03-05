# Work Gallery • Archive

A high-performance, visually immersive portfolio gallery for creative professionals. Built with **React 19**, **Vite**, and **TypeScript**, this archive efficiently manages and serves a large collection of social media layouts, brand assets, and video reels directly from **AWS S3**.

<div align="center">
  <img src="https://images.unsplash.com/photo-1724862936518-ae7fcfc052c1?q=80&w=2000&auto=format&fit=crop" width="100%" alt="Work Gallery Preview" />
</div>

## ✨ Key Features

- 🖼️ **Dynamic Media Gallery**: Seamlessly supports high-resolution images and short-form video content (Reels).
- 🏷️ **Brand-Centric Organization**: Projects are automatically grouped by brand and content type for intuitive navigation.
- ⚡ **S3 Content Delivery**: Direct integration with AWS S3 for scalable asset hosting, featuring signed URL generation and optional CDN support.
- 🎭 **Fluid Experience**: Smooth page transitions and micro-interactions powered by **Framer Motion**.
- 🧱 **Masonry Layout**: Elegant, responsive grid system for varying aspect ratios.
- 📱 **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **Styling**: Vanilla CSS (PostCSS)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Cloud Backend**: [AWS SDK for JavaScript](https://aws.amazon.com/sdk-for-javascript/) (S3)

## 🚀 Getting Started

### 1. Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- AWS S3 bucket with your portfolio assets

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/Krocified/work-gallery.git

# Navigate to the directory
cd work-gallery

# Install dependencies
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory and add your AWS credentials:

```env
VITE_AWS_REGION=
VITE_AWS_BUCKET_NAME=
VITE_CONTACT_EMAIL=
VITE_CONTACT_PHONE=
VITE_CDN_URL=

```

### 4. Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## 📁 Project Structure

- `src/components`: Reusable UI components (Nav, Gallery, Layouts).
- `src/data`: Project definitions and brand mappings.
- `src/pages`: Main application views (Home, Category, Brand).
- `src/utils`: Helper functions for S3 asset fetching and URL generation.
- `src/assets`: Local static assets and image metadata.

## 🤝 Collaboration

Developed as a collaborative project with [Michael Jong](https://github.com/Krocified).

---

© 2026 Archive. All rights reserved.
