import React from "react";
import { ReactComponent as ExcelGreenIcon } from "@/assets/icons/ExcelGreenIcon.svg";
import { Button } from "@mui/material";
import { ISubmitDocuments } from "~/types/types";

function SubmitDocuments({
  file,
  setFile,
  setDownloadExcelStep,
  setOpenLastStep,
}: ISubmitDocuments) {
  return (
    <div>
      <div className="submit_section-add_apart">
        <span className="submit_section-add_apart__header">Uploaded File</span>
        <div className="submit__add_apart-file">
          <div className="file_content-file">
            <ExcelGreenIcon />
            <span className="file_content-file-text" title={file[0]?.name}>
              {file[0]?.name}
            </span>
          </div>
          <span
            className="file_content-remove"
            onClick={() => {
              setFile([]);
              setDownloadExcelStep(true);
              setOpenLastStep(false);
            }}
          >
            Remove
          </span>
        </div>
        <span className="submit__add_apart-info">
          We will proceed With this file to make A table for all your Users
        </span>
      </div>
      <Button variant="contained" className={`btn step`} type="submit">
        Continue
      </Button>
    </div>
  );
}

export default SubmitDocuments;
