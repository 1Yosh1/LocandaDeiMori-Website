# Locanda dei Mori Website

A premium, visually stunning restaurant website for "Locanda dei Mori" in Taormina, Sicily. Built with Next.js 15+, Tailwind CSS v4, and Framer Motion.

## 🚀 Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
cd website
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root directory and add your API keys:

```env
# Google Places API (For Reviews)
GOOGLE_PLACES_API_KEY=your_google_api_key
GOOGLE_PLACE_ID=ChIJS_z9I9-xExMR8LzLzLzLzLz (Locanda dei Mori Place ID)

# Instagram Basic Display API (For Gallery)
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token
```

### 3. Development
Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Deployment

### Vercel (Recommended)
The easiest way to deploy is using the Vercel Platform:
1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. Configure the Environment Variables in the Vercel Dashboard.
4. Deploy!

### Netlify
1. Connect your GitHub repo to Netlify.
2. Set the build command to `npm run build` and the publish directory to `.next`.
3. Add environment variables in the Netlify site settings.

## 🎨 Customization
- **Colors**: Modify the `@theme` block in `src/app/globals.css`.
- **Menu Items**: Update the `MENU_ITEMS` constant in `src/components/DigitalMenu.tsx`.
- **Images**: Replace the placeholder Unsplash URLs in components with your high-resolution photos.

## 🛠 Tech Stack
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **API**: Serverless Routes (Google Places & Instagram)
