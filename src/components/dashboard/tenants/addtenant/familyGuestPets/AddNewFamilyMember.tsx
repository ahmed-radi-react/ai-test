import { Button, Input } from "@mui/material";
import { useEffect, useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { IAddNewFamilyMember, ITarget } from "~/types/types";

const AddNewFamilyMember = ({
  handleClick,
  setOpenDialog,
  family,
  setFamily,
  phoneFamily,
  setPhoneFamily,
  data,
  editIndex,
  handleRemove,
}: IAddNewFamilyMember) => {
  const [open, setOpen] = useState(false);
  const [disable, setDisable] = useState(false);
  const item = data.find((elem) => elem.id === editIndex);
  const handleChangeFamily = ({ target: { value, name } }: ITarget) => {
    setFamily((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    if (
      family?.firstName.length &&
      family?.email.length &&
      family?.age.length &&
      family?.relationship.length &&
      phoneFamily?.length > 4
    ) {
      setDisable(true);
    } else if (item?.firstName) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [family, phoneFamily]);

  const [phoneNumberError, setPhoneNumberError] = useState("");
  const handleValidate = (value: any) => {
    if (typeof value == "string") {
      const isValid = isValidPhoneNumber(value);
      setPhoneFamily(value);
      if (!isValid) {
        setPhoneNumberError("Please enter valid phone number");
      } else {
        setPhoneNumberError("");
      }
      return isValid;
    }
  };

  return (
    <div className="addfamilymember">
      {!open ? <span className="familyspan">Add Family Members</span> : ""}
      {!open ? (
        <div className="familydiv">
          <div className="familymamber">
            <div className="familyinput">
              <Input
                placeholder="Full Name"
                className="familydate"
                name="firstName"
                onChange={handleChangeFamily}
                defaultValue={(item && item?.firstName) || ""}
              />
              {phoneNumberError && (
                <span className="error">{phoneNumberError}</span>
              )}
              <PhoneInput
                value={
                  item
                    ? item?.countryCode + item?.phoneNumber + ""
                    : phoneFamily
                }
                onChange={(value: string) => handleValidate(value)}
                defaultCountry="SA"
                limitMaxLength
                international
                name="phoneNum"
                className="input"
              />
              <Input
                placeholder="Email"
                className="familydate"
                name="email"
                onChange={handleChangeFamily}
                defaultValue={item?.email ? item?.email : ""}
              />
              <Input
                placeholder="Age"
                className="familydate"
                name="age"
                onChange={handleChangeFamily}
                defaultValue={item?.age ? item?.age : ""}
              />
              <Input
                placeholder="Relationship"
                className="familydate"
                name="relationship"
                onChange={handleChangeFamily}
                defaultValue={item?.relation ? item?.relation : ""}
              />
            </div>
            <div className="btn">
              <Button
                variant="contained"
                className={`deletebtn savebtn ${disable ? "activeAdd" : ""}`}
                onClick={() => {
                  if (item) {
                    handleClick("family", editIndex);
                  } else {
                    handleClick("family");
                  }
                  setOpen(true);
                  setOpenDialog(false);
                }}
              >
                {item ? "Edit" : "Add"}
              </Button>
            </div>
            {item && (
              <div className="btn btnDelete">
                <Button
                  variant="contained"
                  className={`deletebtn savebtn ${disable ? "activeAdd" : ""}`}
                  onClick={() => {
                    if (item) {
                      handleRemove("family", editIndex);
                    }
                    setOpen(true);
                    setOpenDialog(false);
                  }}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AddNewFamilyMember;
