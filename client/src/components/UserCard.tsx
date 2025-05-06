import { Player } from '../../lib/data';
import logo from '../public/images/smallTennisBall.jpg';
import { useNavigate } from 'react-router-dom';

type Props = {
  player: Player;
};

export function UserCard({ player }: Props) {
  const navigate = useNavigate();
  return (
    <li>
      <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md">
        <img
          src={logo}
          alt="image of tennis ball"
          className="w-24 h-24 rounded-full mb-4"
        />
        <h2 className="text-xl font-semibold">{`${player.firstName} ${player.lastName}`}</h2>
        <p className="text-gray-600">ZipCode: ${player.zipCode}</p>
        <button
          onClick={() => navigate(`/player/profile/${player?.userId}`)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          View Profile
        </button>
      </div>
    </li>
  );
}
