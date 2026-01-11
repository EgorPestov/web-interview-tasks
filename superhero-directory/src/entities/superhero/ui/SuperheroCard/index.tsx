// Modules
import { Link } from 'react-router-dom';
// Types
import { Superhero } from '~entities/superhero';

export function SuperheroCard({ hero }: { hero: Superhero }) {
  return (
    <Link
      to={`/${hero.id}`}
      className="group relative overflow-hidden rounded-xl border-4 border-amber-400 bg-white shadow-[4px_4px_0px_#000] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000]"
    >
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={hero.image.url}
          alt={hero.name}
          className="h-full w-full object-cover transition-transform group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-3">
        <h3 className="font-display truncate text-lg text-white drop-shadow-[1px_1px_0px_#000]">
          {hero.name}
        </h3>
        <p className="truncate text-sm text-amber-300">
          {hero.biography['full-name'] || 'Unknown'}
        </p>
      </div>
    </Link>
  );
}
