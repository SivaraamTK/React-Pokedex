import { FC, useEffect, useState } from 'react';
import { Pokemon, PokemonClient } from 'pokenode-ts';
import { HomeNavigationButtons } from '../Buttons/NavigationButton';
import pokeballImage from '../../../public/assets/images/Pokeball_icon.svg';
import { typeColor } from '../../models/TypeColor';

const Logo: FC = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold my-2">Reactdex</h1>
      <img className="w-24 h-24" src={pokeballImage} alt="Pokeball Icon" />
    </div>
  );
};

interface PokemonCardProps {
  name: string;
  id: number;
  imageUrl: string;
  type: string;
}

const PokemonCard: FC<PokemonCardProps> = ({ name, id, imageUrl, type }) => {
  return (
    <div
      className={`card max-w-sm rounded bg-white text-center capitalize overflow-hidden shadow-lg m-4 transform transition duration-500 ease-in-out hover:scale-105 border-2 border-gray-500`}
    >
      <a href={`/pokemon/${id}`}>
        <img className="w-full" src={imageUrl} alt={name} />
        <div
          className={`px-6 py-4 ${
            typeColor[type as keyof typeof typeColor] || 'bg-gray-500'
          }`}
        >
          <h2 className="font-bold text-xl mb-2 text-white">{name}</h2>
        </div>
      </a>
    </div>
  );
};

const HomePage: FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [currentOffset, setcurrentOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchPokemons = async () => {
      setIsLoading(true);
      const client = new PokemonClient({ logs: true });
      try {
        const response = await client.listPokemons(currentOffset, itemsPerPage);
        const fullPokemons = await Promise.all(
          response.results.map((resource) =>
            client.getPokemonByName(resource.name)
          )
        );
        setPokemons(fullPokemons);
        console.log(
          `Fetched pokemons of id ${currentOffset} to ${
            currentOffset + itemsPerPage
          }`
        );
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemons();
  }, [currentOffset]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-red-500 text-white p-4">
        <Logo />
        <HomeNavigationButtons
          currentOffset={currentOffset}
          setOffset={setcurrentOffset}
        />
      </header>
      <main className="flex-grow bg-black text-white p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {pokemons.map((pokemon, index) => (
          <PokemonCard
            key={index}
            name={pokemon.name}
            id={pokemon.id}
            type={pokemon.types[0].type.name}
            imageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
          />
        ))}
      </main>
      <footer className="bg-white text-black p-4">
        <HomeNavigationButtons
          currentOffset={currentOffset}
          setOffset={setcurrentOffset}
        />
      </footer>
    </div>
  );
};

export default HomePage;
