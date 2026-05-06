import { NextResponse } from 'next/server';

const AUTHENTIC_REVIEWS = [
  {
    id: 'google-1',
    author: 'Stefan Pacyński',
    rating: 5,
    text: 'Involtini perfetti di pesce spada e manzo al pistacchio! Incredibili! (Perfect swordfish and beef rolls with pistachio! Incredible!)',
    relative_time: '5 days ago',
  },
  {
    id: 'google-2',
    author: 'Monica Masi',
    rating: 5,
    text: 'Splendida cena, personale estremamente gentile e disponibile, consigliatissimo il tiramisù di mamma Pina. Ottimo rapporto qualità prezzo, consigliatissimo!',
    relative_time: '6 days ago',
  },
  {
    id: 'google-3',
    author: 'Léa Tholey',
    rating: 5,
    text: 'Una splendida gita in famiglia in questo ristorante con cibo delizioso e fatto in casa! Situato in un piccolo vicolo lontano dalla folla, e con un servizio eccellente!',
    relative_time: '1 week ago',
  },
  {
    id: 'google-4',
    author: 'Andrea de Martini',
    rating: 5,
    text: 'Per chi vuole un posto sincero e non un acchiappa turisti. Personale e cibo molto buono. Il tiramisù...bhe...fantastico. consigliatissimo.',
    relative_time: '1 week ago',
  },
  {
    id: 'google-5',
    author: 'Nadine',
    rating: 5,
    text: "Un ottimo ristorante un po' fuori dai soliti circuiti turistici di Taormina. Il cibo era superbo, il servizio attento e molto cordiale. Il ristorante merita sicuramente una visita.",
    relative_time: '2 weeks ago',
  },
];

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    // Return authentic scraped data if API key is not configured
    return NextResponse.json(AUTHENTIC_REVIEWS);
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`
    );
    const data = await response.json();

    if (data.result && data.result.reviews) {
      const filteredReviews = data.result.reviews
        .filter((r: any) => r.rating >= 4)
        .map((r: any) => ({
          id: r.time.toString(),
          author: r.author_name,
          rating: r.rating,
          text: r.text,
          relative_time: r.relative_time_description,
        }));
      return NextResponse.json(filteredReviews);
    }

    return NextResponse.json(AUTHENTIC_REVIEWS);
  } catch (error) {
    console.error('Error fetching Google Reviews:', error);
    return NextResponse.json(AUTHENTIC_REVIEWS);
  }
}
