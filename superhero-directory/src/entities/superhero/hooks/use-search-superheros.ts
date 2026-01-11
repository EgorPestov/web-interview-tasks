// Modules
import { useQuery } from '@tanstack/react-query';
// Api
import { SEARCH_SUPERHEROS_KEY, searchSuperheros } from '../api/search-superheros';

export function useSearchSuperheros(searchName: string) {
  return useQuery({
    queryKey: [SEARCH_SUPERHEROS_KEY, searchName],
    queryFn: () => searchSuperheros(searchName),
    enabled: searchName.length >= 3, // чтобы не грузить бэк
    staleTime: 1000 * 60 * 5, // наврядли данные будут меняться чаще
    retry: false,
  });
}
