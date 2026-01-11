// Shared
import { config } from '~shared/config';
// Types
import { Superhero } from '../types';

export async function getSuperhero(id: string): Promise<Superhero> {
  const res = await fetch(`${config.apiHost}/api/${config.apiToken}/${id}`);

  if (!res.ok) {
    const error = await res.json(); // слабое место если сервак вернет не json, а какой-нить html от nginx
    // для безопасности я бы тут попробовал try catch или явную проверку распарсенного error
    throw new Error(`Error ${res.status}: ${res.statusText} - ${error.error}`);
  }

  return res.json();
}

export const GET_SUPERHERO_KEY = 'getSuperhero';
