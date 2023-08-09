import { useEffect, useState } from "react";
import { Button, FormControl, MenuItem, Select } from "@mui/material";
import { ReactComponent as ArrowIcon } from "@/assets/icons/arrow.svg";
import { IValidation } from "~/types/types";

const Validation = ({
  setFileType,
  fileType,
  setSelectedDocument,
  selectedDocument,
}: IValidation) => {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const documentChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedDocument(e.target.files[0]);
    }
  };
  useEffect(() => {
    let uploadFileType =
      selectedDocument && selectedDocument?.type.includes(fileType);
    if (!uploadFileType) {
      setSelectedDocument(undefined);
      setShowErrorMessage(true);
    } else {
      setShowErrorMessage(false);
    }
  }, [fileType, selectedDocument]);

  return (
    <div className="documnetdiv">
      <div className="validdiv">
        <span className="validspan">Validation document</span>
        {/* {selectedDocument && (
        <div className="uploaddoc">
          <div>
            <Button
              variant="contained"
              className="btn document docbtn"
            >
              Upload Another
            </Button>
          </div>
        </div>
      )} */}
        <FormControl sx={{ width: 390 }} className="formcontrol">
          <ArrowIcon />
          <Select
            value={fileType ? fileType : "default-FileType"}
            onChange={(e) => setFileType(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className="select"
          >
            <MenuItem value={"default-FileType"} disabled>
              Select Document Type{" "}
            </MenuItem>
            {/* {fileTypes?.map((fileType, index) => (
              <MenuItem value={fileType} key={index}>{fileType}</MenuItem>
            ))} */}
            <MenuItem value={"pdf"}>{"pdf"}</MenuItem>
            <MenuItem value={"image"}>{"image"}</MenuItem>
          </Select>
        </FormControl>
      </div>
      {!selectedDocument ? (
        <div className="uploadbtn">
          <div className="uploadbtn file">
            <Button
              variant="contained"
              className="btn upload"
              disabled={
                fileType && fileType === "default-FileType" ? true : false
              }
            >
              Upload{" "}
            </Button>
            <input
              type="file"
              accept="image/gif, image/jpeg, image/png"
              className="fileupload"
              onChange={documentChange}
              disabled={
                fileType && fileType === "default-FileType" ? true : false
              }
            />
          </div>
          <Button variant="contained" className="btn document">
            Scan Document
          </Button>
        </div>
      ) : (
        <div>
          <span>{selectedDocument["name"]}</span>
          <button
            className="btn_remove_document"
            onClick={() => setSelectedDocument(undefined)}
          >
            Remove
          </button>
        </div>
      )}
      {showErrorMessage && (
        <span className="error_message">Please upload a valid document</span>
      )}
    </div>
  );
};

export default Validation;
