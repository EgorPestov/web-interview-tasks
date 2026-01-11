// Shared
import { config } from '~shared/config';
// Types
import { Superhero } from '../types';
import { ApiResponse } from '~shared/types';

export async function getSuperhero(id: string): Promise<Superhero> {
  const res = await fetch(`${config.apiHost}/api/${config.apiToken}/${id}`);

  if (!res.ok) {
    const error = await res.json(); // слабое место если сервак вернет не json, а какой-нить html от nginx
    // для безопасности я бы тут попробовал try catch или явную проверку распарсенного error
    throw new Error(`Error ${res.status}: ${res.statusText} - ${error.error}`);
  }

  const data: ApiResponse<Superhero> = await res.json();

  // т.к. бэк всегда отвечает 200, проверки на ok не хватит, поэтому проверяем response, но лучше это починить на бэке
  if (data.response === 'error') {
    throw new Error(data.error || 'API error');
  }

  return data;
}

export const GET_SUPERHERO_KEY = 'getSuperhero';
