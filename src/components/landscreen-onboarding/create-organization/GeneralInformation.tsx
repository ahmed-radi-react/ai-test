import { Button, Input, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { ReactComponent as ArrowIcon } from "@/assets/icons/selescticon.svg";
import { IErrorSignUp, ISetOpenContent, ITarget } from "~/types/types";
import PhoneInput, {
  isValidPhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";
import { isEmail } from "@/utils/helpers";

const GeneralInformation = ({ setOpenContent, setData }: ISetOpenContent) => {
  const [info, setInfo] = useState({
    name: "",
    email: "",
    number: "",
    select: "",
    countryCode: "",
  });
  const handleBack = () => {
    setOpenContent("");
  };
  const handleNext = () => {
    setOpenContent("service");
    if (setData) {
      setData((prev: any) => {
        return { ...prev, info };
      });
    }
  };
  const [next, setNext] = useState(false);
  //const [selectVal, setSelectVal] = useState("");
  const [inputError, setInputError] = useState<IErrorSignUp>({
    organizationName: false,
    adminEmail: false,
    phoneNumber: false,
    country: false,
  });
  const handleChangeInput = ({ target: { value, name } }: ITarget) => {
    setInfo((prev) => ({ ...prev, [name]: value }));
    // setSelectVal(event.target.value);
    const validationMap: any = {
      name: () => {
        setInputError((prev) => ({
          ...prev,
          organizationName: value.length > 20,
        }));
      },
      email: () => {
        setInputError((prev) => ({
          ...prev,
          adminEmail: !isEmail(value) && value !== "",
        }));
      },
      phone_number_guest: () => {
        const isValid = isValidPhoneNumber(value);
        setInputError((prev) => ({
          ...prev,
          phoneNumber: !isValid,
        }));
      },
      select: () => {
        setInputError((prev) => ({
          ...prev,
          country: !value,
        }));
      },
    };
    if (validationMap.hasOwnProperty(name)) {
      validationMap[name]();
    }
  };
  const handlePhoneNumberChange = (value: string) => {
    const parsedNumber = parsePhoneNumber(value + "");
    const countryCode = parsedNumber ? parsedNumber.countryCallingCode : null;
    const isValid = isValidPhoneNumber(value ? value : "");
    if (countryCode) {
      setInfo((prev) => {
        if (!isValid) {
          setInputError((prev) => ({
            ...prev,
            phoneNumber: true,
          }));
        } else {
          setInputError((prev) => ({
            ...prev,
            phoneNumber: false,
          }));
        }
        return { ...prev, number: value, countryCode: countryCode };
      });
    }
  };
  useEffect(() => {
    if (
      info.name.length &&
      !inputError.organizationName &&
      info.email.length &&
      !inputError.adminEmail &&
      info.number.length > 4 &&
      !inputError.phoneNumber &&
      info.select.length &&
      !inputError.country
    ) {
      setNext(true);
      localStorage.setItem("signup", JSON.stringify(info));
    } else {
      setNext(false);
    }
  }, [info]);

  useEffect(() => {
    var storedData = localStorage.getItem("signup");
    if (storedData) {
      var storedPerson = JSON.parse(storedData);
      setInfo(storedPerson);
    }
  }, []);

  return (
    <div className="generalInfo">
      <div className="header_div" onClick={handleBack}>
        <ArrowIcon />
        <span>Create Organization</span>
      </div>
      <span className="title">General Information</span>
      <div className="inputs">
        <div className="input_container">
          <Input
            placeholder="Organization Name"
            className="input"
            value={info.name}
            onChange={handleChangeInput}
            name="name"
          />
          {inputError.organizationName && (
            <p className="error">Please, enter name less than 20 characters</p>
          )}
        </div>
        <div className="input_container">
          <Input
            placeholder="Admin Email"
            className="input"
            value={info.email}
            onChange={handleChangeInput}
            name="email"
            type="email"
          />
          {inputError.adminEmail && (
            <p className="error">Please, Enter valid email</p>
          )}
        </div>
        {/* <Input
          placeholder="Phone Number"
          className="input"
          type="number"
          value={info.number}
          onChange={handleChangeInput}
          name="number"
        /> */}
        <div>
          <PhoneInput
            value={info.number}
            onChange={(value: string) => handlePhoneNumberChange(value)}
            defaultCountry="SA"
            limitMaxLength
            international
            name="phone_number_guest"
          />
          {inputError.phoneNumber && (
            <p className="error">Please, Enter valid phone number</p>
          )}
        </div>
        <div className="select_country">
          <ArrowIcon className="down_svg" />
          {info.select === "" && <span className="country">Country</span>}
          <Select
            className="select_country_with_option"
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={info.select}
            onChange={handleChangeInput}
            autoWidth
            name="select"
          >
            <ArrowIcon className="arrow-up" />
            <MenuItem value={"Country"} className="countryfirst">
              Country
            </MenuItem>
            <MenuItem value={"Qatar"} className="country">
              Qatar
            </MenuItem>
            <MenuItem value={"Dubai"}>Dubai</MenuItem>
          </Select>
        </div>
      </div>
      <Button
        variant="contained"
        className={`btn_next ${next ? "next" : ""}`}
        onClick={handleNext}
      >
        <span>Next, Services</span>
        <ArrowIcon />
      </Button>
    </div>
  );
};

export default GeneralInformation;
