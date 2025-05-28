import { UserCard } from '../components/UserCard';
import { FormEvent, useState } from 'react';
import { Player, readUserByZipCode } from '../../lib/data';
import tennisPicture from '../public/images/smallTennisBall.jpg';
import { useNavigate, useParams } from 'react-router-dom';

export function SearchPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [zipCode, setZipCode] = useState('');
  const { userId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const users = await readUserByZipCode(Number(zipCode));
      setPlayers(users);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        Error Loading Players by ZipCode
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  }

  return (
    <>
      <div className="image-container w-[300px]">
        <img src={tennisPicture} alt="picture of tennis ball" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center  ">
          <h1 className="text-3xl font-bold mb-4">
            Search By Players' ZipCode
          </h1>
          <input
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            type="text"
            placeholder="Enter ZipCode"
            className="p-2 border border-gray-300 rounded mb-4"
          />
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Search
            </button>
            <button
              onClick={() => navigate(`/player/profile/${userId}`)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Back to Profile
            </button>
          </div>
        </div>
      </form>
      <div>
        <ul className="flex flex-1 gap-4 mt-4">
          {players.map((player) => (
            <UserCard player={player} />
          ))}
        </ul>
      </div>
    </>
  );
}
