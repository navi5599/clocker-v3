import moment from "moment";
import "./Dashboard.css";
import { useMemo, useRef, useState, useCallback, useEffect } from "react";
import CreateTracker from "../../components/CreateTracker/CreateTracker";
import { Toast } from "primereact/toast";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";
import {
  useDeleteTrackerMutation,
  useGetTrackersQuery,
} from "../../store/api/firebaseApi";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tooltip } from "primereact/tooltip";
import { Tracker } from "../../utils/types/Tracker";
import { Timestamp } from "firebase/firestore";
import { useTimer } from "../../hooks/useTimer";

type TrackerRow = Omit<Tracker, "startedAt" | "finishedAt" | "createdAt"> & {
  id: string;
  startedAt?: Timestamp | null;
  finishedAt?: Timestamp | null;
  createdAt?: Timestamp | null;
};

type TimerControls = {
  start: () => void;
  pause: () => void;
  stop: () => void;
};

function Dashboard() {
  const [visible, setVisible] = useState(false);
  const toast: any = useRef(null);
  const user = useSelector(selectUser);
  const {
    data: trackers,
    isLoading: isTrackersLoading,
    error: trackersError,
  } = useGetTrackersQuery({ skip: !user });
  const [deleteTracker, { isLoading: isDeleting }] = useDeleteTrackerMutation();
  const timerRegistry = useRef<Record<string, TimerControls>>({});

  const registerTimer = useCallback((id: string, controls: TimerControls) => {
    timerRegistry.current[id] = controls;
  }, []);

  const unregisterTimer = useCallback((id: string) => {
    delete timerRegistry.current[id];
  }, []);

  const startTrackerTimer = useCallback((id: string) => {
    timerRegistry.current[id]?.start();
  }, []);

  const pauseTrackerTimer = useCallback((id: string) => {
    timerRegistry.current[id]?.pause();
  }, []);

  const stopTrackerTimer = useCallback((id: string) => {
    timerRegistry.current[id]?.stop();
  }, []);

  const stopAllTrackers = useCallback(() => {
    Object.values(timerRegistry.current).forEach((controls) => {
      controls.stop();
    });
  }, []);

  const activeTrackers = useMemo(() => {
    const typedTrackers = (trackers ?? []) as TrackerRow[];
    return typedTrackers.filter((tracker) => !tracker.finishedAt);
  }, [trackers]);

  const durationTemplate = useCallback(
    (rowData: TrackerRow) => (
      <TrackerDurationCell
        tracker={rowData}
        registerTimer={registerTimer}
        unregisterTimer={unregisterTimer}
      />
    ),
    [registerTimer, unregisterTimer]
  );

  const handleDelete = async (id: string) => {
    try {
      await deleteTracker({ id }).unwrap();
      stopTrackerTimer(id);
      unregisterTimer(id);
      toast.current?.show({
        severity: "success",
        summary: "Sucesfully deleted",
        detail: "Tracker removed",
        life: 3000,
      });
    } catch (_error) {
      toast.current?.show({
        severity: "error",
        summary: "Delete failed",
        detail: "Please try again",
        life: 3000,
      });
    }
  };

  const actionsTemplate = (rowData: TrackerRow) => (
    <div className="tracker-actions">
      <button
        type="button"
        className="tracker-action-btn tracker-action-btn--play"
        aria-label="Play"
        onClick={() => startTrackerTimer(rowData.id)}
        disabled={isDeleting}
      >
        <i className="pi pi-play" />
      </button>
      <button
        type="button"
        className="tracker-action-btn tracker-action-btn--pause"
        aria-label="Pause"
        onClick={() => pauseTrackerTimer(rowData.id)}
        disabled={isDeleting}
      >
        <i className="pi pi-pause" />
      </button>
      <button
        type="button"
        className="tracker-action-btn tracker-action-btn--stop"
        aria-label="Stop"
        onClick={() => stopTrackerTimer(rowData.id)}
        disabled={isDeleting}
      >
        <i className="pi pi-stop" />
      </button>
      <button
        type="button"
        className="tracker-action-btn tracker-action-btn--delete"
        aria-label="Delete"
        onClick={() => handleDelete(rowData.id)}
        disabled={isDeleting}
      >
        <i className="pi pi-trash" />
      </button>
    </div>
  );

  const date = new Date();
  const formattedDate = moment(date).format("MM/DD/YY");

  return (
    <>
      <Tooltip
        target=".tracker-action-btn--play"
        content="Start tracker"
        position="top"
      />
      <Tooltip
        target=".tracker-action-btn--pause"
        content="Pause tracker"
        position="top"
      />
      <Tooltip
        target=".tracker-action-btn--stop"
        content="Stop tracker"
        position="top"
      />
      <Tooltip
        target=".tracker-action-btn--delete"
        content="Delete tracker"
        position="top"
      />
      <CreateTracker
        visible={visible}
        setVisible={setVisible}
        toastRef={toast}
      />
      <Toast ref={toast} />
      <div className="wrapper">
        <div className="header_wrapper">
          <h2 className="date_header">
            <i className="pi pi-calendar"></i>
            {`Today(${formattedDate})`}
          </h2>
          <button className="start_btn" onClick={() => setVisible(true)}>
            <i className="pi pi-stopwatch"></i>Add tracker
          </button>
          <button className="stop_btn" onClick={stopAllTrackers}>
            <i className="pi pi-stop-circle"></i>Stop all
          </button>
        </div>
        <div className="dashboard-table">
          {trackersError ? (
            <div className="dashboard-table-state">
              Unable to load trackers.
            </div>
          ) : (
            <DataTable
              value={activeTrackers}
              dataKey="id"
              loading={isTrackersLoading}
              paginator
              rows={10}
              emptyMessage="No active trackers yet."
              responsiveLayout="stack"
            >
              <Column field="title" header="Title" sortable />
              <Column field="description" header="Description" />
              <Column
                header="Duration"
                body={durationTemplate}
                bodyClassName="tracker-duration-cell"
                headerClassName="tracker-duration-cell"
              />
              <Column
                header=""
                body={actionsTemplate}
                bodyClassName="tracker-actions-cell"
                headerClassName="tracker-actions-cell"
              />
            </DataTable>
          )}
        </div>
      </div>
    </>
  );
}

function TrackerDurationCell({
  tracker,
  registerTimer,
  unregisterTimer,
}: {
  tracker: TrackerRow;
  registerTimer: (id: string, controls: TimerControls) => void;
  unregisterTimer: (id: string) => void;
}) {
  const { timePassed, startTimer, stopTimer, resetTimer } = useTimer(
    tracker.duration ?? 0
  );

  const controls = useMemo(
    () => ({
      start: startTimer,
      pause: stopTimer,
      stop: () => resetTimer(0),
    }),
    [startTimer, stopTimer, resetTimer]
  );

  useEffect(() => {
    registerTimer(tracker.id, controls);

    return () => {
      unregisterTimer(tracker.id);
    };
  }, [tracker.id, controls, registerTimer, unregisterTimer]);

  return (
    <span className="tracker-duration">{formatDuration(timePassed)}</span>
  );
}

function formatDuration(seconds: number) {
  const totalSeconds = Math.max(0, Math.floor(seconds));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  const segments = [hours, minutes, secs].map((value) =>
    String(value).padStart(2, "0")
  );

  return segments.join(":");
}

export default Dashboard;
