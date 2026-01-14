// app/api/listings/route.js

export async function GET(req) {
  const username = 'simplyrets';
  const password = 'simplyrets';
  const auth = Buffer.from(`${username}:${password}`).toString('base64');

  const { searchParams } = new URL(req.url);

  const city = searchParams.get('city') || '';
  const minprice = searchParams.get('minprice') || '';
  const maxprice = searchParams.get('maxprice') || '';
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '10';

  // SimplyRETS does not support native pagination, so we'll simulate it
  const queryParams = new URLSearchParams();
  if (city) queryParams.append('city', city);
  if (minprice) queryParams.append('minprice', minprice);
  if (maxprice) queryParams.append('maxprice', maxprice);

  try {
    const res = await fetch(`https://api.simplyrets.com/properties?${queryParams}`, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch listings' }), { status: 500 });
    }

    const data = await res.json();

    // Simulate pagination (SimplyRETS doesn't support server-side pagination)
    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);
    const start = (pageInt - 1) * limitInt;
    const paginated = data.slice(start, start + limitInt);

    return new Response(JSON.stringify({
      listings: paginated,
      total: data.length,
      page: pageInt,
      limit: limitInt,
    }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
