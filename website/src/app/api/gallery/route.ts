import { NextResponse } from 'next/server';

export const dynamic = "force-static";

const MOCK_GALLERY = [
  { id: '1', url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop', caption: 'Fresh Pasta' },
  { id: '2', url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=800&auto=format&fit=crop', caption: 'Sicilian Salad' },
  { id: '3', url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop', caption: 'Burrata Delight' },
  { id: '4', url: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=800&auto=format&fit=crop', caption: 'Wine Selection' },
  { id: '5', url: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=800&auto=format&fit=crop', caption: 'Cozy Atmosphere' },
  { id: '6', url: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?q=80&w=800&auto=format&fit=crop', caption: 'Pistachio Semifreddo' },
];

export async function GET() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!accessToken) {
    return NextResponse.json(MOCK_GALLERY);
  }

  try {
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption,timestamp&access_token=${accessToken}`
    );
    const data = await response.json();

    if (data.data) {
      const photos = data.data
        .filter((item: any) => item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM')
        .map((item: any) => ({
          id: item.id,
          url: item.media_url,
          caption: item.caption,
        }));
      return NextResponse.json(photos);
    }

    return NextResponse.json(MOCK_GALLERY);
  } catch (error) {
    console.error('Error fetching Instagram Gallery:', error);
    return NextResponse.json(MOCK_GALLERY);
  }
}
