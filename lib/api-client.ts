
const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = process.env.TMDB_BASE_URL;


export async function getFromTMDB(endpoint: string) {
    const url = `${BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}`;

    const response = await fetch(url, {
        next: { revalidate: 3600 }
    });

    if (!response.ok) {
        throw new Error('Could not fetch data from the Movie Database.');
    }

    return response.json();
}