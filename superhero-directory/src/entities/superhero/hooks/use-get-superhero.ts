// Modules
import { skipToken, useQuery } from '@tanstack/react-query';
// Api
import { GET_SUPERHERO_KEY, getSuperhero } from '../api/get-superhero';

export type Params = {
  id?: string;
};

export function useGetSuperhero(params: Params) {
  const { id } = params;

  return useQuery({
    queryKey: [GET_SUPERHERO_KEY, id ?? ''],
    queryFn: id ? () => getSuperhero(id) : skipToken, // я обычно использую enabled: !!id
  });
}
