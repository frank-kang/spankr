import tennisCourtVideo from '../public/videos/tennis-court.mp4';

export function Welcome() {
  return (
    <div className="welcome">
      <h1>Welcome!</h1>
      <video src={tennisCourtVideo} autoPlay muted loop></video>
    </div>
  );
}
