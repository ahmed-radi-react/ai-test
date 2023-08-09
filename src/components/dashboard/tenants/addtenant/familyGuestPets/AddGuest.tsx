import { Button, Input } from "@mui/material";
import { useEffect, useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { IAddGuest, ITarget } from "~/types/types";

const AddGuest = ({
  handleClick,
  setOpenDialog,
  setGuestsVal,
  guestsVal,
  phoneFamily,
  setPhoneFamily,
  data,
  editIndex,
  handleRemove,
}: IAddGuest) => {
  const [disable, setDisable] = useState(false);
  const [open, setOpen] = useState(false);
  const handleChangeGuests = ({ target: { value, name } }: ITarget) => {
    setGuestsVal((prev) => ({ ...prev, [name]: value }));
  };
  const item = data.find((elem) => elem.id === editIndex);

  useEffect(() => {
    if (
      guestsVal.firstName.length &&
      guestsVal.email.length &&
      guestsVal.proffesion.length
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [guestsVal, phoneFamily]);

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
    <div className="addguest_tenant">
      {!open && <span className="guestspan">Add Guest</span>}
      {!open ? (
        <div className="guestdiv">
          <div className="guestmamber">
            <div className="guestinput">
              <Input
                placeholder="Guest name"
                className="guestdate"
                name="firstName"
                onChange={handleChangeGuests}
                defaultValue={(item && item?.firstName) || ""}
              />
              <Input
                placeholder="Guest email"
                className="guestdate"
                name="email"
                onChange={handleChangeGuests}
                defaultValue={(item && item?.email) || ""}
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
                name="phone_number_guest"
              />
              <Input
                placeholder="Profession"
                className="guestdate"
                name="proffesion"
                onChange={handleChangeGuests}
                defaultValue={(item && item?.proffesion) || ""}
              />
            </div>
            <div className="btn">
              <Button
                variant="contained"
                className={`deletebtn savebtn ${disable ? "activeAdd" : ""}`}
                onClick={() => {
                  if (item) {
                    handleClick("guests", editIndex);
                  } else {
                    handleClick("guests");
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
                  className={`deletebtn savebtn ${disable ? "" : ""}`}
                  onClick={() => {
                    if (item) {
                      handleRemove("guests", editIndex);
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

export default AddGuest;
