import { TableCell, TableHead, TableRow } from "@mui/material";
import { FC } from "react";

export type TTableHeade = {
  sorttable: string;
  columns?: any[];
};

const RequestListTableHead: FC<TTableHeade> = ({ sorttable, columns }) => {
  return (
    <TableHead className="head">
      <TableRow>
        <TableCell
          padding="checkbox"
          style={{ borderBottom: "none", width: "40px" }}
        ></TableCell>
        {sorttable === "All"
          ? columns?.map((col, index) => (
              <TableCell
                key={index}
                align={col.align || "center"}
                style={{
                  borderBottom: "none",
                  color: "black",
                  textAlign: "center",
                }}
              >
                <span>{col.headerName}</span>
              </TableCell>
            ))
          : columns
              ?.filter((item) => item.headerName !== "Service")
              .map((col, index) => (
                <TableCell
                  key={index}
                  align={col.align || "center"}
                  style={{ borderBottom: "none", color: "black" }}
                >
                  {col.headerName}
                </TableCell>
              ))}
      </TableRow>
    </TableHead>
  );
};

export default RequestListTableHead;
