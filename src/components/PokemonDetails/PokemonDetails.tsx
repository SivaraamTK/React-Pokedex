import { FC, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PokemonClient, Pokemon } from 'pokenode-ts';

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
    <div className="text-center">
      <h3 className="text-4xl font-bold my-2">Pokemon Details page</h3>
      <div className="button-group">
        {prevId > 0 && <Link to={`/pokemon/${prevId}`}>Previous</Link>}
        <Link to="/">Home</Link>
        <Link to={`/pokemon/${nextId}`}>Next</Link>
      </div>
      {pokemon && (
        <div className="pokemon-details">
          <h2>{pokemon.name}</h2>
          <h3>#{pokemon.id}</h3>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            alt={pokemon.name}
          />
          <p>Base Experience: {pokemon.base_experience}</p>
          <p>Height: {pokemon.height}</p>
          <p>Order: {pokemon.order}</p>
          <p>Weight: {pokemon.weight}</p>
          <h3>Types</h3>
          <ul>
            {pokemon.types.map((type, index) => (
              <li key={index}>{type.type.name}</li>
            ))}
          </ul>
          <h3>Abilities</h3>
          <ul>
            {pokemon.abilities.map((ability, index) => (
              <li key={index}>{ability.ability.name}</li>
            ))}
          </ul>
          <h3>Held Items</h3>
          <ul>
            {pokemon.held_items.map((item, index) => (
              <li key={index}>{item.item.name}</li>
            ))}
          </ul>
          <h3>Moves</h3>
          <ul>
            {pokemon.moves.map((move, index) => (
              <li key={index}>{move.move.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;
