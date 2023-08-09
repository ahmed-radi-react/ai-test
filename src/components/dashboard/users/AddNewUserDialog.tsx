import { Button, Checkbox, Link } from "@mui/material";
import { ReactComponent as SingleIcon } from "@/assets/icons/SingleUser.svg";
import { ReactComponent as MultipleIcon } from "@/assets/icons/MultipleUser.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Checkbtn } from "@/assets/icons/checkbox_round.svg";
import { ReactComponent as InfoIcon } from "@/assets/icons/information.svg";
import { ReactComponent as MultiIcon } from "@/assets/icons/multidoc.svg";
import { FileUploader } from "react-drag-drop-files";
import uploadImage from "@/assets/images/frameupload.png";

const AddNewUserDialog = () => {
  const [addMultiple, setAddMultiple] = useState(false);
  const [checked, setChecked] = useState("");
  const navigate = useNavigate();
  const handleChange = () => {
    if(checked==="single"){
      navigate("/users/adduser")
    }
    else{

      setAddMultiple(true);
    }
  };
  const handleNavigate = () => {
    navigate("/home/adduser");
  };
  const handleChangeCheck = (val: string) => {
    setChecked(val);
  };
  const [file, setFile] = useState<File[]>([]);
  const handleChangeUpload = (file: File[]) => {
    setFile(file);
  };
  const handleDelete = () => {
    setFile([]);
  };

  return (
    <div className="addnew-user-dialog">
      <span className="addspan">
        Add {!addMultiple ? "New User" : "Multiple Users"}
      </span>
      {!addMultiple ? (
        <div>
          <div className="single_multi_user">
            <div
              className="user_div"
              onClick={() => handleChangeCheck("single")}
            >
              <Checkbox
                className="checkbox"
                icon={<div className="checkincon"></div>}
                checkedIcon={
                  <div className="checkincon">
                    <Checkbtn />
                  </div>
                }
                checked={checked === "single" ? true : false}
                // onChange={() => handleChangeCheck('single')}
              />
              <div className="single_user">
                <SingleIcon />
              </div>
              <span>Single User</span>
            </div>
            <div
              className="user_div"
              onClick={() => handleChangeCheck("multi")}
            >
              <Checkbox
                className="checkbox"
                icon={<div className="checkincon"></div>}
                checkedIcon={
                  <div className="checkincon">
                    <Checkbtn />
                  </div>
                }
                checked={checked === "multi" ? true : false}
                // onChange={() => handleChangeCheck('multi')}
              />
              <div className="multi_user">
                <MultipleIcon />
              </div>
              <span>Multiple User</span>
            </div>
          </div>
          <Button
            variant="contained"
            className="continue"
            onClick={handleChange}
            disabled={checked.length ? false : true}
          >
            Continue
          </Button>
        </div>
      ) : (
        <div>
          {!file[0] ? (
            <div className="upload_doc_user_multiple">
              <InfoIcon />
              <span className="add_text">
                To add multiple users, please <b>download</b> the provided file
                and fill out the necessary information. Once completed, please
                upload the file in the next step to complete the process.
              </span>
              <div className="multi_div">
                <MultiIcon />
                <span>multiple users.CSV</span>
                <Link href="#" className="down">
                  Download
                </Link>
              </div>
              <div className="file_upload_csv">
                <img src={uploadImage} alt="upload image" />
                <FileUploader
                  multiple={true}
                  handleChange={handleChangeUpload}
                  name="file"
                  types={["CSV"]}
                />
              </div>
            </div>
          ) : (
            <div className="added">
              <span className="span_upload">Uploaded File</span>
              <div className="uploaded">
                <div className="div_uploaded">
                  <MultiIcon />
                  <span>{file && file[0]?.name}</span>
                </div>
                <Button className="remove" onClick={handleDelete}>
                  Remove
                </Button>
              </div>
              <span className="info">
                We will proceed With this file to make A table for all your
                Users
              </span>
            </div>
          )}
          <Button
            variant="contained"
            className="continue file"
            disabled={file[0] ? false : true}
            onClick={() => navigate("/users/adduser")}
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddNewUserDialog;
