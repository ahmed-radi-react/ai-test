import React, { useEffect } from "react";
import dropimage from "@/assets/images/dropimage.png";
import { ReactComponent as EditIcon } from "@/assets/icons/edit.svg";
import { Input, TextField } from "@mui/material";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { IGeneralInfo, ITarget } from "~/types/types";

const GeneralInformation = ({
  imageChange,
  selectedImage,
  setValue,
  value,
  handleGeneralInfoValidation,
  setErrorName,
  errorName,
  setErrorEmail,
  errorEmail,
  setErrorDate,
  errorDate,
  generalInfo,
  setGeneralInfo,
  fullNumber,
  image,
}: IGeneralInfo) => {
  return (
    <div className="general_info_tenants">
      <div className="droptenant">
        {image?.url ? (
          <>
            <div className="uploadimage">
              <img src={image?.url} alt="Thumb" />
              <label className="editdiv">
                <input
                  type="file"
                  accept="image/gif, image/jpeg, image/png"
                  className="fileinput display_upload"
                  name="image_2"
                  onChange={(e) => imageChange(e, "edit")}
                />
                <EditIcon />
              </label>
            </div>
          </>
        ) : (
          <>
            {selectedImage ? (
              <div className="uploadimage">
                <img src={URL.createObjectURL(selectedImage)} alt="Thumb" />
                <label className="editdiv">
                  <input
                    type="file"
                    accept="image/gif, image/jpeg, image/png"
                    className="filfileinput display_uploadeinput"
                    name="image_2"
                    onChange={(e) => imageChange(e, "edit")}
                  />
                  <EditIcon />
                </label>
              </div>
            ) : null}
          </>
        )}

        <div className="notediv">
          <span className="notespan">
            Note: this image will reflect to the mobile app.
          </span>
        </div>
      </div>
      <div className="input_tenant">
        {errorName && <span className="error">{errorName}</span>}
        <div className="input_div">
          <Input
            placeholder="Tenant Name"
            className="input_info"
            name="tenant_name"
            onChange={handleGeneralInfoValidation}
            value={generalInfo.tenant_name}
          />
          <div className="phone_div">
            <span>WhatsApp Number </span>
            <PhoneInput
              value={value}
              onChange={(value: string) => setValue(value)}
              defaultCountry={"SA"}
              limitMaxLength
              international
              name="phoneNum"
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ width: "300px" }}>
            {errorEmail && <span className="error">{errorEmail}</span>}
          </div>
          <div style={{ width: "300px" }}>
            {errorDate && (
              <span
                style={{ display: "block", width: "300px" }}
                className="error"
              >
                {errorDate}
              </span>
            )}
          </div>
        </div>
        <div className="input_div">
          <Input
            placeholder="Email"
            className="input_info"
            name="tenant_email"
            onChange={handleGeneralInfoValidation}
            value={generalInfo.tenant_email}
          />
          <TextField
            id="date"
            name="date_birth"
            type="date"
            // defaultValue={moment(new Date()).format("YYYY-MM-DD")}
            sx={{ width: 220 }}
            onChange={handleGeneralInfoValidation}
            value={generalInfo.date_birth}
            InputLabelProps={{
              shrink: true,
            }}
            className="date_birth_field"
            // name="date"
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralInformation;
