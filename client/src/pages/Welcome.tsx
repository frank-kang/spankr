import tennisCourtVideo from '../public/videos/tennis-court.mp4';
import { Link } from 'react-router-dom';

export function Welcome() {
  return (
    <>
      <div className="video-wrapper">
        <video
          id="background-video"
          src={tennisCourtVideo}
          autoPlay
          muted></video>
        <div className="content">
          <span>
            <h1>
              <Link to="/signin">Login</Link>{' '}
            </h1>
          </span>
          <span>
            <h1>
              <Link to="/registration">Register</Link>
            </h1>
          </span>
        </div>
      </div>
    </>
  );
}
