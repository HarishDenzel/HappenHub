import axios from 'axios';

const API_KEY = 'AZFiQXhWP1ZGRGI8GvpjHX1dEuvC6jae';
const BASE = 'https://app.ticketmaster.com/discovery/v2';

export const searchEvents = async (keyword: string, city: string, page = 0) => {
  const q = `${BASE}/events.json`;
  const params: Record<string, any> = { apikey: API_KEY, keyword, city, size: 20, page };
  const res = await axios.get(q, { params });
  return res.data;
};
export async function getEventById(eventId: string) {
  const url = `${BASE}/events/${eventId}.json?apikey=${API_KEY}`;
  const res = await fetch(url);
  return res.json();
}