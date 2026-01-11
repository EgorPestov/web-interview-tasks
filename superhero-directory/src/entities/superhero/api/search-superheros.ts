// Shared
import { config } from '~shared/config';
// Types
import { SearchSuperheroResult } from '../types';
import { ApiResponse } from '~shared/types';

export async function searchSuperheros(
  name: string
): Promise<SearchSuperheroResult> {
  const res = await fetch(
    `${config.apiHost}/api/${config.apiToken}/search/${encodeURIComponent(name)}`
  );

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  const data: ApiResponse<SearchSuperheroResult> = await res.json();

  // т.к. бэк всегда отвечает 200, проверки на ok не хватит, поэтому проверяем response, но лучше это починить на бэке
  if (data.response === 'error') {
    throw new Error(data.error || 'API error');
  }

  return data;
}

export const SEARCH_SUPERHEROS_KEY = 'searchSuperheros';
