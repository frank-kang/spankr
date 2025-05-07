import { useNavigate, useParams } from 'react-router-dom';

export function PlayerProfile() {
  const navigate = useNavigate();
  const { userId } = useParams();
  return (
    <div>
      <h1>Player Profile</h1>
      <p>This is the player's profile page.</p>
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
  );
}
