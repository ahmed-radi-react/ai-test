import uploadImage from "@/assets/images/frameupload.png";
import { ReactComponent as VerificationIcon } from "@/assets/icons/VerificationIcon.svg";
import { ReactComponent as ExcelDarkIcon } from "@/assets/icons/ExcelDarkIcon.svg";
import { FileUploader } from "react-drag-drop-files";
import { Button } from "@mui/material";
import { IUploadDocument } from "~/types/types";

const UploadDocument = ({
  file,
  setFile,
  setOpenLastStep,
}: IUploadDocument) => {
  const handleChangeUpload = (file: File[]) => {
    setFile(file);
    if (file[0].name) {
      setOpenLastStep(true);
    }
  };

  return (
    <div>
      <div>
        <div className="first_section__add_apart">
          <div className="first_section__add_apart-text">
            <VerificationIcon />
            <span className="add_apart-text__notify">
              To add multiple apartments, please download the provided file and
              fill out the necessary information. Once completed, please upload
              the file in the next step to complete the process.
            </span>
          </div>
          <div className="first_section__add_apart-file">
            <div className="file_content-file">
              <ExcelDarkIcon />
              <span className="file_content-file-name" title={"file name"}>
                file name
              </span>
            </div>
            <a
              className="file_content-download"
              href="/apartment.xlsx"
              download
            >
              Download
            </a>
          </div>
        </div>
        <div className="file_upload_csv">
          <img src={uploadImage} alt="upload image" />
          <FileUploader
            multiple={true}
            handleChange={handleChangeUpload}
            name="file"
            types={["XLSX"]}
          />
        </div>
      </div>
      <Button
        variant="contained"
        className={`btn  step`}
        disabled={!file.length}
        type="button"
        onClick={() => setOpenLastStep(true)}
      >
        Continue
      </Button>
    </div>
  );
};

export default UploadDocument;
