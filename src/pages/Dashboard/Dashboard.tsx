import moment from "moment";
import "./Dashboard.css";
import { useRef, useState } from "react";
import CreateTracker from "../../components/CreateTracker/CreateTracker";
import { Toast } from "primereact/toast";
// import { useGetTrackersQuery } from "../../store/api/firebaseApi";

function Dashboard() {
  const [visible, setVisible] = useState(false);
  const toast: any = useRef(null);
  // const { data: trackers, error, isLoading } = useGetTrackersQuery({});
  // console.log("trackers", trackers);
  // console.log("error", error);
  // console.log("isLoading", isLoading);

  const showSuccess = () => {
    setVisible(true);
    toast.current.show({
      severity: "success",
      summary: "Registered",
      detail: "fk you",
      life: 3000,
    });
  };

  const showError = (msg: string) => {
    toast.current.show({
      severity: "error",
      summary: msg,
      detail: "message",
      life: 3000,
    });
  };

  const date = new Date();
  const formattedDate = moment(date).format("MM/DD/YY");

  return (
    <>
      <CreateTracker visible={visible} setVisible={setVisible} />
      <Toast ref={toast} />
      <div className="wrapper">
        <div className="header_wrapper">
          <h2 className="date_header">
            <i className="pi pi-calendar"></i>
            {`Today(${formattedDate})`}
          </h2>
          <button className="start_btn" onClick={showSuccess}>
            <i className="pi pi-stopwatch"></i>Add new timer
          </button>
          <button className="stop_btn">
            <i className="pi pi-stop-circle"></i>Stop all
          </button>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
