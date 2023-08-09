import { TableBody, TableCell, TableRow } from "@mui/material";
import { FC, Fragment } from "react";
import { TGeneralTableBodyProps } from "~/types/types";
import { generateRandomId } from "@/utils/constant";

const GeneralTableBody: FC<TGeneralTableBodyProps> = ({
  columns,
  rows,
  additionalInfo,
  title,
}) => {
  return (
    <TableBody>
      {rows?.map((row, index) => {
        return (
          <TableRow
            key={generateRandomId()}
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            {!(
              title === "parcels" ||
              title === "visitors" ||
              title === "bellboy" ||
              title === "other_properties"
            ) ? (
              <TableCell
                padding="checkbox"
                style={{ borderBottom: "none" }}
              ></TableCell>
            ) : null}

            {columns?.map(({ cellIn }) => (
              <Fragment key={generateRandomId()}>
                {cellIn({ row, ...additionalInfo, index })}
              </Fragment>
            ))}
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default GeneralTableBody;
