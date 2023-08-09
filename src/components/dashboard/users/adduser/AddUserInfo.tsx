import React, { useState } from "react";
import UploadImage from "~/reusable/UploadImage";
import { ReactComponent as EditIcon } from "@/assets/icons/edit.svg";
import dropImage from "@/assets/images/dropimage.png";
import { Input, TextField } from "@mui/material";
import PhoneInput from "react-phone-number-input";
import parsePhoneNumberFromString from "libphonenumber-js";
import {
  handleChange,
  imageFormats,
  isEmail,
  isUnderage,
} from "@/utils/constant";
import { IAddUserInfo } from "~/types/types";
import { FileUploader } from "react-drag-drop-files";

const AddUserInfo = ({
  setSelectedImage,
  selectedImage,
  value,
  setValue,
  infoInput,
  setInfoInput,
  info,
  setInfo,
}: IAddUserInfo) => {
  const [errorName, setErrorName] = useState("");
  const [errorDate, setErrorDate] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const handleChangeIn = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "name") {
      if (value.length > 20) {
        setErrorName("Name must be less than 20 characters");
      } else {
        setErrorName("");
      }
    } else if (name === "birthday") {
      if (isUnderage(value)) {
        setErrorDate("Tenant should be 18 years old or above");
      } else {
        setErrorDate("");
      }
    } else if (name === "email") {
      if (!isEmail(value)) {
        setErrorEmail("Email must be valid");
      } else {
        setErrorEmail("");
      }
    }
    if (setInfoInput) {
      setInfoInput((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }
  };
  const [editbanner, setEditBanner] = useState(false);
  const [base64, setBase64] = useState<(string | ArrayBuffer | null)[]>([]);

  return (
    <div className="select_info_withupload">
      {!selectedImage ? (
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
          {!editbanner ? (
            ""
          ) : editbanner ? (
            <img src={URL.createObjectURL(selectedImage[0])} alt="Thumb" />
          ) : (
            <div></div>
          )}
          <label className="editdiv">
            <FileUploader
              handleChange={handleChange({
                status: "edit",
                isBanner: false,
                setBase64,
                selectedImage,
                setSelectedImage,
              })}
              name="file"
              types={imageFormats}
              classes="fileinput display_upload"
            />
            <EditIcon />
          </label>
        </div>
      )}
      <div className="info_add_user_info">
        <div className="error_container">
          {<p className="error">{errorName}</p>}
          {<p className="error">{errorDate}</p>}
        </div>
        <div className="input__container">
          <Input
            placeholder="User Name"
            className="input"
            onChange={handleChangeIn}
            name="name"
          />
          <Input
            placeholder="Birthday"
            type="date"
            className="input"
            onChange={handleChangeIn}
            name="birthday"
          />
        </div>
        <div className="error_container">
          {<p className="error">{errorEmail}</p>}
        </div>
        <div className="input__container">
          <Input
            placeholder="Email"
            className="input"
            onChange={handleChangeIn}
            name="email"
          />
          <PhoneInput
            value={info?.number}
            onChange={(value: string) => {
              let parsedNumber;
              if (value) {
                parsedNumber = parsePhoneNumberFromString(value.toString());
              }
              const countryCode = parsedNumber
                ? parsedNumber.countryCallingCode
                : null;
              if (countryCode) {
                setInfo((prev) => {
                  return { ...prev, number: value, countryCode: countryCode };
                });
              }
            }}
            defaultCountry="SA"
            limitMaxLength
            international
            name="phone_number_guest"
          />
        </div>
      </div>
    </div>
  );
};

export default AddUserInfo;
