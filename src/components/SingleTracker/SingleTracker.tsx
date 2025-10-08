import { Button } from "primereact/button";
import { Tracker } from "../../utils/types/Tracker";
import { Divider } from "primereact/divider";
import "./SingleTracker.css";

function SingleTracker({ tracker }: { tracker: Tracker }) {
  const handleStart = () => {
    console.log(`Starting tracker: ${tracker.title}`);
  };

  const handleStop = () => {
    console.log(`Stopping tracker: ${tracker.title}`);
  };

  const handlePause = () => {
    console.log(`Pausing tracker: ${tracker.title}`);
  };

  return (
    <>
      <div className="single_tracker">
        <div className="tracker_info">
          <h4>{tracker.title}</h4>
          <h4>{tracker.description}</h4>
        </div>
        <div className="tracker_actions">
          <h4>{tracker.duration}</h4>
          <Button
            icon="pi pi-play"
            onClick={handleStart}
            className="p-button-success p-mr-2"
          />
          <Button
            icon="pi pi-pause"
            onClick={handlePause}
            className="p-button-warning p-mr-2"
          />
          <Button
            icon="pi pi-stop"
            onClick={handleStop}
            className="p-button-danger"
          />
        </div>
      </div>
      <Divider></Divider>
    </>
  );
}

export default SingleTracker;
