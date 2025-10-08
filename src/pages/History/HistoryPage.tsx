import moment from "moment";
import "./HistoryPage.css";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";
import { useGetTrackersQuery } from "../../store/api/firebaseApi";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tracker } from "../../utils/types/Tracker";
import { Timestamp } from "firebase/firestore";

type TrackerRow = Omit<Tracker, "startedAt" | "finishedAt" | "createdAt"> & {
  id: string;
  startedAt?: Timestamp | null;
  finishedAt?: Timestamp | null;
  createdAt?: Timestamp | null;
};

function HistoryPage() {
  const user = useSelector(selectUser);
  const {
    data: trackers,
    isLoading: isTrackersLoading,
    error: trackersError,
  } = useGetTrackersQuery({ skip: !user });

  const finishedTrackers = useMemo(() => {
    const typedTrackers = (trackers ?? []) as TrackerRow[];
    return typedTrackers.filter((tracker) => Boolean(tracker.finishedAt));
  }, [trackers]);

  const formatTimestamp = (value?: Timestamp | null) => {
    if (!value) {
      return "-";
    }

    const dateValue = typeof value.toDate === "function" ? value.toDate() : value;
    return moment(dateValue).format("MMM DD, YYYY HH:mm");
  };

  const durationTemplate = (rowData: Tracker) => {
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

  const date = new Date();
  const formattedDate = moment(date).format("MM/DD/YY");

  return (
    <div className="history-wrapper">
      <div className="history-header">
        <h2 className="history-date">
          <i className="pi pi-calendar"></i>
          {`Today(${formattedDate})`}
        </h2>
        <h1 className="history-title">Finished trackers</h1>
      </div>
      <div className="history-table">
        {trackersError ? (
          <div className="history-table-state">Unable to load trackers.</div>
        ) : (
          <DataTable
            value={finishedTrackers}
            dataKey="id"
            loading={isTrackersLoading}
            paginator
            rows={10}
            emptyMessage="No finished trackers yet."
            responsiveLayout="stack"
          >
            <Column field="title" header="Title" sortable />
            <Column field="description" header="Description" />
            <Column
              header="Created"
              body={(rowData: TrackerRow) => formatTimestamp(rowData.createdAt)}
              sortable
            />
            <Column
              header="Started"
              body={(rowData: TrackerRow) => formatTimestamp(rowData.startedAt)}
            />
            <Column
              header="Finished"
              body={(rowData: TrackerRow) => formatTimestamp(rowData.finishedAt)}
              sortable
            />
            <Column
              header="Duration"
              body={(rowData: Tracker) => durationTemplate(rowData)}
            />
          </DataTable>
        )}
      </div>
    </div>
  );
}

export default HistoryPage;
