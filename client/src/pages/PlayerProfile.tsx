import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Player, readUsers } from '../../lib/data';
import tennisPicture from '../public/images/smallTennisBall.jpg';

export function PlayerProfile() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [player, setPlayer] = useState<Player>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlayer(id: number) {
      setIsLoading(true);
      try {
        const player = await readUsers(id);
        if (!player) {
          setError('Player not found');
          return;
        }
        setPlayer(player);
      } catch (err) {
        console.error(`Error fetching player data. ${err}`);
      } finally {
        setIsLoading(false);
      }
    }

    const id = parseInt(userId as string);
    fetchPlayer(+id);
  }, [userId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        Error Loading Entry with ID {userId}: {error}
      </div>
    );
  }

  return (
    <>
      <div className="image-container w-[300px]">
        <img src={tennisPicture} alt="picture of tennis ball" />
      </div>
      <div className="bg-white overflow-hidden shadow rounded-lg border">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            User Profile
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            This is some information about the player.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {`${player?.firstName} ${player?.lastName}`}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {`${player?.email}`}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">ZipCode</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {`${player?.zipCode}`}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Gender</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {player?.genderId === 1 ? <p>Male</p> : <p>Female</p>}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate('/player/search')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Find Players
        </button>
        <button
          onClick={() => navigate(`/player/editprofile/${userId}`)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Edit Profile
        </button>
      </div>
    </>
  );
}
