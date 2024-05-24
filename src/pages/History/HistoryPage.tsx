import moment from "moment";
import "./HistoryPage.css";

function HistoryPage() {
  const date = new Date();
  const formattedDate = moment(date).format("MM/DD/YY");

  return (
    <div className="wrapper">
      <div className="header_wrapper">
        <h2 className="date_header">
          <i className="pi pi-calendar"></i>
          {`Today(${formattedDate})`}
        </h2>
      </div>
    </div>
  );
}

export default HistoryPage;
