import { TableCell, TableHead, TableRow } from "@mui/material";
import { FC, Fragment } from "react";
import { TGeneralTableHeadProps } from "~/types/types";
import { generateRandomId } from "@/utils/constant";

const renderFirstCell = (title: string): JSX.Element => {
  switch (title) {
    case "Tenants": {
      return <></>;
    }
    case "visitors": {
      return <TableCell padding="checkbox" className="checkbox"></TableCell>;
    }
    case "bellboy": {
      return (
        <>
          <TableCell></TableCell>
          <TableCell padding="checkbox"></TableCell>
        </>
      );
    }
    case "other_properties": {
      return <TableCell padding="checkbox"></TableCell>;
    }
    default: {
      return (
        <TableCell
          padding="checkbox"
          style={{ borderBottom: "none", width: "40px" }}
        ></TableCell>
      );
    }
  }
};

const GeneralTableHead: FC<TGeneralTableHeadProps> = ({ columns, title }) => {
  return (
    <TableHead style={{ position: "relative" }}>
      <TableRow>
        {renderFirstCell(title)}
        {columns?.map(
          ({ align, headerName, renderCell, field }, index: number) => {
            return (
              <Fragment key={generateRandomId()}>
                {renderCell({ align, headerName, index })}
              </Fragment>
            );
          }
        )}
      </TableRow>
    </TableHead>
  );
};

export default GeneralTableHead;
