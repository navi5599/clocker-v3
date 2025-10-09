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
  const [errors, setErrors] = useState<{
    title?: boolean;
    description?: boolean;
  }>({});

  const handleModalCLose = () => {
    setVisible(false);
    setTitle("");
    setDescription("");
    setErrors({});
  };

  const showSucess = (msg: string) => {
    toastRef?.current?.show({
      severity: "success",
      summary: msg,
      detail: "Success",
      life: 3000,
    });
  };

  const showError = (msg: string) => {
    toastRef?.current?.show({
      severity: "error",
      summary: msg,
      detail: "Error",
      life: 3000,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const nextErrors: { title?: boolean; description?: boolean } = {};

    if (!title.trim()) {
      nextErrors.title = true;
      showError("Title is required");
    }

    if (!description.trim()) {
      nextErrors.description = true;
      showError("Description is required");
    }

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

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
      setErrors({});
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
        onHide={handleModalCLose}
      >
        <FloatLabel>
          <InputText
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title && e.target.value.trim()) {
                setErrors((prev) => ({ ...prev, title: undefined }));
              }
            }}
            className={`create_tracker_input ${
              errors.title ? "input-error" : ""
            }`}
            aria-invalid={Boolean(errors.title)}
          />
          <label htmlFor="title">Title</label>
        </FloatLabel>
        <FloatLabel>
          <InputText
            id="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description && e.target.value.trim()) {
                setErrors((prev) => ({ ...prev, description: undefined }));
              }
            }}
            className={`create_tracker_input ${
              errors.description ? "input-error" : ""
            }`}
            aria-invalid={Boolean(errors.description)}
          />
          <label htmlFor="description">Description</label>
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
