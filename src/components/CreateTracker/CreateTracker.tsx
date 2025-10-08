import { useState } from "react";
import { useCreateTrackerMutation } from "../../store/api/firebaseApi";
import "./CreateTracker.css";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Timestamp } from "firebase/firestore";

interface CreateTrackerProps {
  visible: boolean;
  setVisible: (type: boolean) => void;
  toastRef?: any;
}

function CreateTracker(props: CreateTrackerProps) {
  const { visible, setVisible, toastRef } = props;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createTracker, { isLoading }] = useCreateTrackerMutation();

  const handleModalCLose = () => {
    setVisible(false);
    setTitle("");
    setDescription("");
  };

  const showSucess = (msg: string) => {
    toastRef.current.show({
      severity: "success",
      summary: msg,
      detail: "Success",
      life: 3000,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const now = Timestamp.now();
      await createTracker({
        title,
        description,
        duration: 0,
        startedAt: null,
        finishedAt: null,
        createdAt: now,
      }).unwrap();
      setTitle("");
      setDescription("");
      showSucess("Tracker created");
      setVisible(false);
    } catch (err) {
      console.error("Failed to create tracker:", err);
    }
  };

  return (
    <div>
      <Dialog
        header="Create new tracker"
        visible={visible}
        style={{ width: "20vw", height: "25vW" }}
        onHide={() => setVisible(false)}
      >
        <FloatLabel>
          <InputText
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="create_tracker_input"
          />
          <label htmlFor="title">Title</label>
        </FloatLabel>
        <FloatLabel>
          <InputText
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="create_tracker_input"
          />
          <label htmlFor="title">Description</label>
        </FloatLabel>
        <button
          className="start_btn modal_btn"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          <i className="pi pi-check"></i>Add
        </button>
        <button className="stop_btn modal_btn" onClick={handleModalCLose}>
          <i className="pi pi-times"></i>Cancel
        </button>
      </Dialog>
    </div>
  );
}

export default CreateTracker;
