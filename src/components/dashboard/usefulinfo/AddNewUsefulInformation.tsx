import React, { useEffect, useState } from "react";
import BackNavigate from "~/reusable/BackNavigate";
import {
  Box,
  Button,
  Container,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { ReactComponent as EditIcon } from "@/assets/icons/edit.svg";
import { ReactComponent as UploadIcon } from "@/assets/icons/UploadIcon.svg";
import { ReactComponent as PDFBlueIcon } from "@/assets/icons/PDFBlueIcon.svg";
import { ReactComponent as XIcon } from "@/assets/icons/XIcon.svg";
import UploadImage from "~/reusable/UploadImage";
import dropImage from "@/assets/images/dropImageWhite.png";
import { InputStyleParcel, handleChange, imageFormats } from "@/utils/constant";
import { FileUploader } from "react-drag-drop-files";

type Props = {};

const data = [
  { name: "All", id: 1 },
  { name: "john", id: 2 },
  { name: "jane", id: 3 },
  { name: "alex", id: 4 },
  { name: "sara", id: 5 },
  { name: "peter", id: 6 },
];

function AddNewUsefulInformation({}: Props) {
  const [activeBtn, setActiveBtn] = useState(false);
  /* upload Image */
  const [selectedImage, setSelectedImage] = useState<File[]>([]);
  const [editbanner, setEditBanner] = useState(false);
  const [base64, setBase64] = useState<(string | ArrayBuffer | null)[]>([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  /* upload file */
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && !isImageFile(selectedFile)) {
      setFile(selectedFile);
    } else {
      setFile(null);
      setError("Please select files with the following extensions: .doc, .pdf");
    }
  };
  const isImageFile = (file: File) => {
    return file.type.startsWith("image/");
  };
  /* upload file */

  /* selected user */
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const handleUserClick = (user: any) => {
    if (user.name === "All") {
      if (selectedUsers.includes("All")) {
        // "All" option already selected, clear the selectedUsers array
        setSelectedUsers([]);
      } else {
        // "All" option selected, add all users to selectedUsers array
        setSelectedUsers(data.map((user) => user.name));
      }
    } else {
      // Check if the user's name is already in the selectedUsers array
      const index = selectedUsers.indexOf(user.name);
      if (index === -1) {
        // User is not yet selected, add to the array
        setSelectedUsers([...selectedUsers, user.name]);
      } else {
        // User is already selected, remove from the array
        const updatedUsers = [...selectedUsers];
        updatedUsers.splice(index, 1);
        setSelectedUsers(updatedUsers);
      }
    }
  };
  /* selected user */

  const [email, setEmail] = useState(false);

  useEffect(() => {
    if (
      selectedImage[0] &&
      title &&
      content &&
      file &&
      selectedUsers.length > 0
    ) {
      setActiveBtn(true);
    } else {
      setActiveBtn(false);
    }
  }, [selectedImage[0], title, content, file, selectedUsers]);
  return (
    <form>
      <Container className="add_useful_info_container">
        <BackNavigate title={"Useful Information"} />
        <Box className="header">
          <Box className="header__info">
            <Typography variant="h6" className="header__info-header">
              Add Useful Information
            </Typography>
          </Box>
          <Button
            className={`btn ${activeBtn ? "add_button" : "deactive"} `}
            type="submit"
            disabled={!activeBtn}
          >
            Add Useful Information
          </Button>
        </Box>
        <div className="content_container">
          <section className="info-section">
            <p className="info-header">Add Information</p>
            <div className="info-section__info">
              <Box className="info-image">
                {!selectedImage[0] ? (
                  <UploadImage
                    handleChange={handleChange({
                      status: "add",
                      isBanner: false,
                      setBase64,
                      setSelectedImage,
                      selectedImage,
                      setEditBanner,
                    })}
                    dropImage={dropImage}
                    className="upload_image"
                    name="image_1"
                  />
                ) : (
                  <div className="uploadimage">
                    {editbanner && selectedImage ? (
                      <img
                        src={URL.createObjectURL(selectedImage[0])}
                        alt="Thumb"
                      />
                    ) : (
                      <div></div>
                    )}
                    <label className="editdiv">
                      <FileUploader
                        handleChange={handleChange({
                          status: "edit",
                          isBanner: false,
                          setBase64,
                          setSelectedImage,
                          selectedImage,
                        })}
                        name="file"
                        types={imageFormats}
                        classes="fileinput display_upload"
                      />
                      <EditIcon />
                    </label>
                  </div>
                )}
                <span className="note">
                  These images will reflect to the mobile app.
                </span>
              </Box>
              <div className="info-inputs">
                <Input
                  type="text"
                  onChange={(
                    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                  ) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="info-inputs__title"
                  name="name"
                />
                <TextField
                  multiline
                  placeholder="Content"
                  rows={4}
                  sx={InputStyleParcel}
                  className="info-inputs__content"
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                  ) => setContent(e.target.value)}
                  name="enterText"
                />
              </div>
            </div>
          </section>
          <section className="doc-section">
            <p className="info-header">Add file</p>
            <div className="doc-section__content">
              <div
                className={`doc-section__content-input ${
                  file?.name ? "uploaded" : ""
                }`}
              >
                <input
                  type="file"
                  name="file"
                  accept=".pdf, .doc"
                  className="input_file"
                  onChange={handleFileChange}
                  onFocus={() => setError(null)}
                />
                {file?.name ? (
                  <div className="file_upload">
                    <div className="file_upload__name">
                      {file.type.includes("pdf") ? <PDFBlueIcon /> : "icon"}
                      {file?.name}
                    </div>
                    <XIcon
                      onClick={() => setFile(null)}
                      className="file_upload__remove_file"
                    />
                  </div>
                ) : (
                  <>
                    <UploadIcon />
                    <span className="note">Upload File</span>
                  </>
                )}
              </div>
              {file?.name ? (
                ""
              ) : (
                <p className="doc-section__content-type">DOC, PDF</p>
              )}
            </div>
            <span className="error_note">{error}</span>
          </section>
          <section className="send-section">
            <p className="info-header">Send to</p>
            <div className="send-section__users">
              {data?.map((user: any) => {
                return (
                  <span
                    key={user.id}
                    onClick={() => handleUserClick(user)}
                    className={`user ${
                      selectedUsers.includes(user.name) ? " selected" : ""
                    }`}
                  >
                    {user.name}
                  </span>
                );
              })}
            </div>
            <div className="send-section__email">
              <input
                type="checkbox"
                checked={email}
                onChange={() => setEmail(!email)}
              />
              <label onClick={() => setEmail(!email)}>Send by email</label>
            </div>
          </section>
        </div>
      </Container>
    </form>
  );
}

export default AddNewUsefulInformation;
