import { Container } from "@mui/material";
import ValetDashboardTable from "./ValetDashboardTable";
import { useState } from "react";

const ValetRequests = () => {
  const [hideMessage, setHideMessage] = useState(false);

  return (
    <div>
      {hideMessage && (
        <div className="message_div request req_list">
          <span>Car link has been copied</span>
        </div>
      )}
      <Container className="valet_requests">
        <div className="header">
          <div className="span_div">
            <span>Valet Requests</span>
            <div>05</div>
          </div>
        </div>
        <ValetDashboardTable
          setHideMessage={setHideMessage}
          url={"valet?offset=0&limit=10000"}
        />
      </Container>
    </div>
  );
};

export default ValetRequests;
