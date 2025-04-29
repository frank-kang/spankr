import tennisCourtVideo from '../public/videos/tennis-court.mp4';

export function Welcome() {
  return (
    <div className="welcome">
      <video src={tennisCourtVideo} autoPlay muted loop></video>
    </div>
  );
}
