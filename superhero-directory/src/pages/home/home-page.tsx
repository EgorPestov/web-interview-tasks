// Modules
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
// UI
import { SuperheroCard } from '~entities/superhero';
// Hooks
import { useSearchSuperheros } from '~entities/superhero';
import { useDebounce } from '~shared/hooks/useDebounce';
// Consts
import { USER_INPUT_CHANGE_DELAY, DEBOUNCED_SEARCH_MIN_LENGTH } from '~shared/consts/user-interactions'; 
// Types
import type { Superhero } from '~entities/superhero'; // специально не стал объединять в один импорт, чтобы было читаемее - вкусовщина

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearchName = searchParams.get('search') || '';

  const [inputValue, setInputValue] = useState(initialSearchName);
  const debouncedSearchName = useDebounce(inputValue, USER_INPUT_CHANGE_DELAY);

  useEffect(() => {
    if (debouncedSearchName) {
      setSearchParams({ search: debouncedSearchName }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  }, [debouncedSearchName, setSearchParams]);

  const {
    data: superheroesData,
    isLoading,
    error,
    isFetching,
  } = useSearchSuperheros(debouncedSearchName);

  const results: Superhero[] = superheroesData?.results ?? []; // мемоизация не нужна, т.к. кверя кэширует данные по ключу

  const showNoResults =
    !isLoading && debouncedSearchName.length >= DEBOUNCED_SEARCH_MIN_LENGTH && results.length === 0 && !error;

  return (
    <div className="flex flex-col gap-6">
      <header className="text-center">
        <h1 className="font-display text-center text-4xl">
          Superhero Directory
        </h1>
        <p>
          Welcome to the Superhero Directory! Here you can find information
          about your favorite superheroes.
        </p>
      </header>

      <div className="relative mx-auto w-full max-w-xl">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter superhero name (min. 3 characters)..."
          className="w-full rounded-xl border-4 border-amber-400 bg-white px-5 py-4 text-lg shadow-[4px_4px_0px_#000] transition-all outline-none focus:border-amber-500 focus:shadow-[6px_6px_0px_#000]"
        />
        {isFetching && (
          <div className="absolute top-1/2 right-4 -translate-y-1/2">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-amber-400 border-t-transparent"></div>
          </div>
        )}
      </div>

      {inputValue.length > 0 && inputValue.length < DEBOUNCED_SEARCH_MIN_LENGTH && (
        <p className="text-center text-gray-500">
          Enter {3 - inputValue.length} more character(s) for search
        </p>
      )}

      {isLoading && debouncedSearchName.length >= DEBOUNCED_SEARCH_MIN_LENGTH && (
        <div className="flex flex-col items-center gap-4 py-12">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-amber-400 border-t-transparent"></div>
          <p className="text-lg text-gray-600">Searching for superheroes...</p>
        </div>
      )}

      {error && (
        <div className="mx-auto max-w-md rounded-xl border-4 border-red-400 bg-red-50 p-4 text-center shadow-[4px_4px_0px_#000]">
          <p className="font-bold text-red-600">Oops! An error occurred</p>
          <p className="text-red-500">
            {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        </div>
      )}

      {showNoResults && (
        <div className="mx-auto max-w-md rounded-xl border-4 border-gray-300 bg-gray-50 p-6 text-center shadow-[4px_4px_0px_#000]">
          <p className="text-xl text-gray-600">No superheroes found</p>
          <p className="mt-2 text-gray-500">Try another superhero name</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {results.map((hero) => (
            <SuperheroCard key={hero.id} hero={hero} />
          ))}
        </div>
      )}

      {!debouncedSearchName && (
        <div className="mx-auto max-w-lg text-center">
          <p className="mt-4 text-gray-500">
            Start typing a name to find a superhero
          </p>
        </div>
      )}
    </div>
  );
}
