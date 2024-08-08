import { useMemo, useState } from "react";

import "./App.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import reversalRequestData from "./assets/reversalRequestData.json";
import { ColDef } from "ag-grid-community";
import { shouldApproveRefundRequest } from "./shouldApproveRefundRequest";
import { RequestType } from "./getRequestTimeLimit";

interface RequestData {
  name: string;
  timezone: string;
  signUpDate: string;
  requestSource: string;
  investmentDate: string;
  investmentTime: string;
  refundRequestDate: string;
  refundRequestTime: string;
}

function App() {
  const [rowData] = useState<RequestData[]>(reversalRequestData);

  const [colDefs] = useState<ColDef<RequestData>[]>([
    { field: "name" },
    {
      headerName: "Approved",
      valueGetter: (p) =>
        p.data &&
        shouldApproveRefundRequest(
          p.data?.timezone,
          p.data?.signUpDate,
          p.data?.requestSource as RequestType,
          p.data?.investmentDate,
          p.data?.investmentTime,
          p.data?.refundRequestDate,
          p.data?.refundRequestTime
        ),
    },
    { field: "timezone" },
    { field: "signUpDate" },
    { field: "requestSource" },
    { field: "investmentDate" },
    { field: "investmentTime" },
    { field: "refundRequestDate" },
    { field: "refundRequestTime" },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      width: 150,
      cellStyle: { fontWeight: "bold" },
    };
  }, []);
  return (
    <div className="ag-theme-quartz" style={{ height: 600, width: 1360 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
}

export default App;
