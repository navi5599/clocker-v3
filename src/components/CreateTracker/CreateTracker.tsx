import "./CreateTracker.css";
import { Dialog } from "primereact/dialog";

interface CreateTrackerProps {
  visible: boolean;
  setVisible: (type: boolean) => void;
}

function CreateTracker(props: CreateTrackerProps) {
  const { visible, setVisible } = props;

  return (
    <div>
      <Dialog
        header="Add timer"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <p className="m-0">this is modal</p>

        <button
          className="start_btn modal_btn"
          onClick={() => setVisible(true)}
        >
          <i className="pi pi-check"></i>Add
        </button>
        <button
          className="stop_btn modal_btn"
          onClick={() => setVisible(false)}
        >
          <i className="pi pi-times"></i>Cancel
        </button>
      </Dialog>
    </div>
  );
}

export default CreateTracker;
