import { type FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { type Player, updateUser, readUsers } from '../../lib/data';
import tennisPicture from '../public/images/smallTennisBall.jpg';

export function EditPlayerProfile() {
  // This component is used to edit a player's profile.
  const { userId } = useParams();
  const [player, setPlayer] = useState<Player>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const isEditing = userId && userId !== 'new';

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
    if (isEditing) {
      const id = parseInt(userId as string);
      fetchPlayer(+id);
    }
  }, [userId, isEditing]);
  console.log('player', player);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const htmlFormData = new FormData(event.currentTarget);
      const newPlayer = Object.fromEntries(htmlFormData) as unknown as Player;
      if (!isEditing) {
        updateUser({ ...player, ...newPlayer });
      }
      navigate(`/player/profile/${userId}`);
    } catch (err) {
      console.error(`Error updating player data. ${err}`);
    }
  }

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
      <form onSubmit={handleSubmit}>
        <div className="container">
          <img className="logo" src={tennisPicture} alt="pic of tennis ball" />
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base/7 font-semibold text-gray-900">
                Edit Player Profile
              </h2>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm/6 font-medium text-gray-900">
                  Playing style Description
                </label>
                <div className="mt-2">
                  <textarea
                    required
                    defaultValue={player?.longDescription}
                    name="about"
                    id="about"
                    rows={3}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"></textarea>
                </div>
                <p className="mt-3 text-sm/6 text-gray-600">
                  Write a few sentences about your style of play to improve
                  search results
                </p>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">
              Personal Information
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm/6 font-medium text-gray-900">
                  First name
                </label>
                <div className="mt-2">
                  <input
                    required
                    defaultValue={player?.firstName}
                    type="text"
                    name="first-name"
                    id="first-name"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm/6 font-medium text-gray-900">
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    required
                    defaultValue={player?.lastName}
                    type="text"
                    name="last-name"
                    id="last-name"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    required
                    defaultValue={player?.email}
                    id="email"
                    name="email"
                    type="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="zip-code"
                  className="block text-sm/6 font-medium text-gray-900">
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    defaultValue={player?.zipCode}
                    type="text"
                    name="zip-code"
                    id="zip-code"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select your gender
            </label>
            <select
              value={player?.genderId}
              name="gender-id"
              id="gender-id"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option>Choose a gender</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="handedness"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select an option
            </label>
            <select
              value={player?.handedNessId}
              name="handedness-id"
              id="handedness-id"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option>Which hand do you play with?</option>
              <option value="1">Right</option>
              <option value="2">Left</option>
              <option value="3">Both</option>
            </select>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              onClick={() => navigate(`/player/profile/${player?.userId}`)}
              type="button"
              className="text-sm/6 font-semibold text-gray-900">
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
