import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PokemonClient, Pokemon } from 'pokenode-ts';
import { DetailNavigationButtons } from '../Buttons/NavigationButton';
import { typeColor } from '../../models/TypeColor';

const PokemonDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      setIsLoading(true);
      const client = new PokemonClient({ logs: true });
      try {
        const data = await client.getPokemonById(parseInt(id as string));
        setPokemon(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  const prevId = parseInt(id as string) - 1;
  const nextId = parseInt(id as string) + 1;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700 text-gray-900 p-4">
      <header className="w-full max-w-2xl bg-red-500 text-white rounded-lg shadow-md p-6 mb-4">
        <h1 className="text-4xl font-bold text-center mb-2">Pokemon Info</h1>
        <DetailNavigationButtons prevId={prevId} nextId={nextId} />
      </header>
      <main className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 mb-4">
        {pokemon && (
          <div className="pokemon-details space-y-4">
            <div className="flex items-center space-x-4">
              <img
                className="w-120 h-120 object-cover rounded-full border-2 border-gray-500"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                alt={pokemon.name}
              />
              <div>
                <h2 className="text-2xl font-bold capitalize">
                  {pokemon.name}
                </h2>
                <h3 className="text-xl text-gray-500">#{pokemon.id}</h3>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <p>
                <span className="font-bold">Base Experience:</span>{' '}
                {pokemon.base_experience}
              </p>
              <p>
                <span className="font-bold"> Order:</span> {pokemon.order}
              </p>
              <p>
                <span className="font-bold">Height: </span>
                {pokemon.height} dm
              </p>
              <p>
                <span className="font-bold">Weight: </span>
                {pokemon.weight} hg
              </p>
            </div>
            <h3 className="text-xl font-bold">Types</h3>
            <div className="flex flex-wrap gap-2">
              {pokemon.types.map((type, index) => (
                <div
                  key={index}
                  className={`px-2 py-1 rounded text-white font-bold text-sm ${
                    typeColor[type.type.name as keyof typeof typeColor] ||
                    'bg-gray-500'
                  }`}
                >
                  {type.type.name}
                </div>
              ))}
            </div>
            <details className="mb-4 overflow-auto max-h-60">
              <summary className="text-xl font-bold cursor-pointer">
                {`Stats (EV = Effort Value, BV = Base Value)`}
              </summary>
              <ul className="list-disc list-inside">
                {pokemon.stats.map((stat, index) => (
                  <li key={index}>
                    {stat.stat.name} : EV = {stat.effort} BV= {stat.base_stat}
                  </li>
                ))}
              </ul>
            </details>
            <details className="mb-4 overflow-auto max-h-60">
              <summary className="text-xl font-bold cursor-pointer">
                Abilities
              </summary>
              <ul className="list-disc list-inside">
                {pokemon.abilities.map((ability, index) => (
                  <li key={index}>{ability.ability.name}</li>
                ))}
              </ul>
            </details>
            <details className="mb-4 overflow-auto max-h-60">
              <summary className="text-xl font-bold cursor-pointer">
                Held Items
              </summary>
              <ul className="list-disc list-inside">
                {pokemon.held_items.length === 0
                  ? 'None'
                  : pokemon.held_items.map((item, index) => (
                      <li key={index}>{item.item.name}</li>
                    ))}
              </ul>
            </details>
            <details className="mb-4 overflow-auto max-h-60">
              <summary className="text-xl font-bold cursor-pointer">
                Moves
              </summary>
              <ul className="list-disc list-inside">
                {pokemon.moves.map((move, index) => (
                  <li key={index}>{move.move.name}</li>
                ))}
              </ul>
            </details>
            <a
              href={pokemon.location_area_encounters}
              className="text-blue-500 hover:text-blue-700 underline"
            >
              <br />
              <h3 className="text-xl font-bold">Encountered Locations</h3>
            </a>
            <h3 className="text-xl font-bold">Images</h3>
            <div className="grid grid-cols-3 gap-4">
              {pokemon.sprites
                ? Object.values(pokemon.sprites).map((sprite, index) => {
                    if (typeof sprite === 'string') {
                      return (
                        <div
                          key={index}
                          className="flex justify-center items-center"
                        >
                          <img src={sprite} alt={`sprite ${index}`} />
                        </div>
                      );
                    } else if (sprite && typeof sprite === 'object') {
                      return Object.values(sprite).map(
                        (nestedSprite, nestedIndex) => {
                          if (typeof nestedSprite === 'string') {
                            return (
                              <div
                                key={`${index}-${nestedIndex}`}
                                className="flex justify-center items-center"
                              >
                                <img
                                  src={nestedSprite}
                                  alt={`sprite ${index}-${nestedIndex}`}
                                />
                              </div>
                            );
                          }
                          return null;
                        }
                      );
                    }
                    return null;
                  })
                : 'Not Found'}
            </div>
          </div>
        )}
      </main>
      <footer className="w-full max-w-2xl bg-gray-300 rounded-lg shadow-md p-6">
        <DetailNavigationButtons prevId={prevId} nextId={nextId} />
      </footer>
    </div>
  );
};

export default PokemonDetails;
