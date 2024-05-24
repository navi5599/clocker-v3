import moment from "moment";
import "./Dashboard.css";
import { useState } from "react";
import CreateTracker from "../../components/CreateTracker/CreateTracker";

function Dashboard() {
  const [visible, setVisible] = useState(false);

  const date = new Date();
  const formattedDate = moment(date).format("MM/DD/YY");

  return (
    <>
      <CreateTracker visible={visible} setVisible={setVisible} />
      <div className="wrapper">
        <div className="header_wrapper">
          <h2 className="date_header">
            <i className="pi pi-calendar"></i>
            {`Today(${formattedDate})`}
          </h2>
          <button className="start_btn" onClick={() => setVisible(true)}>
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
