import { UserCard } from '../components/UserCard';
/*import { useState } from 'react';
import React from 'react';
import { Player, readUserByZipCode } from '../../lib/data';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';*/

export function SearchPage() {
  /*const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function load() {
      const zipCode = useParams<{ zipCode: string }>;
      try {
        const users = await readUserByZipCode(+zipCode);
        setPlayers(users);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);
  */
  return (
    <>
      <form>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-3xl font-bold mb-4">Search for Players</h1>
          <input
            type="text"
            placeholder="Enter your location"
            className="p-2 border border-gray-300 rounded mb-4"
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Search
          </button>
        </div>
      </form>
      <div>
        <ul className="flex flex-1 gap-4 mt-4">
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
        </ul>
      </div>
    </>
  );
}
