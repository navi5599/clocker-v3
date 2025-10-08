import moment from "moment";
import "./Dashboard.css";
import { useMemo, useRef, useState } from "react";
import CreateTracker from "../../components/CreateTracker/CreateTracker";
import { Toast } from "primereact/toast";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";
import { useGetTrackersQuery } from "../../store/api/firebaseApi";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tooltip } from "primereact/tooltip";
import { Tracker } from "../../utils/types/Tracker";
import { Timestamp } from "firebase/firestore";

function Dashboard() {
  const [visible, setVisible] = useState(false);
  const toast: any = useRef(null);
  const user = useSelector(selectUser);
  const {
    data: trackers,
    isLoading: isTrackersLoading,
    error: trackersError,
  } = useGetTrackersQuery({ skip: !user });

  type TrackerRow = Omit<Tracker, "startedAt" | "finishedAt" | "createdAt"> & {
    id: string;
    startedAt?: Timestamp | null;
    finishedAt?: Timestamp | null;
    createdAt?: Timestamp | null;
  };

  const activeTrackers = useMemo(() => {
    const typedTrackers = (trackers ?? []) as TrackerRow[];
    return typedTrackers.filter((tracker) => !tracker.finishedAt);
  }, [trackers]);

  const durationTemplate = (rowData: TrackerRow) => {
    const duration = rowData.duration ?? 0;
    if (!duration) {
      return "0s";
    }

    const totalSeconds = Math.floor(duration);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const parts: string[] = [];
    if (hours) parts.push(`${hours}h`);
    if (minutes) parts.push(`${minutes}m`);
    if (seconds) parts.push(`${seconds}s`);

    return parts.join(" ") || "0s";
  };

  const actionsTemplate = (_rowData: TrackerRow) => (
    <div className="tracker-actions">
      <button
        type="button"
        className="tracker-action-btn tracker-action-btn--play"
        aria-label="Play"
      >
        <i className="pi pi-play" />
      </button>
      <button
        type="button"
        className="tracker-action-btn tracker-action-btn--pause"
        aria-label="Pause"
      >
        <i className="pi pi-pause" />
      </button>
      <button
        type="button"
        className="tracker-action-btn tracker-action-btn--stop"
        aria-label="Stop"
      >
        <i className="pi pi-stop" />
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
          <button className="stop_btn">
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
                body={(rowData: TrackerRow) => durationTemplate(rowData)}
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

export default Dashboard;
