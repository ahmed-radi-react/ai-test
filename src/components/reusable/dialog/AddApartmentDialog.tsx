import { Button, TextField } from "@mui/material";
import ApartmentPng from "@/assets/icons/apartment.png";
import { useEffect, useState } from "react";
import { ReactComponent as CongratsIcon } from "@/assets/icons/CongratsSvg.svg";
import { IApartmentDialog } from "~/types/types";
import { mutationRequest } from "@/requests-body/queries";

const AddApartmentDialog = ({
  setOpenAddApartment,
  setHideMessage,
  setMessageSort,
  amenityId,
}: IApartmentDialog) => {
  const { mutate } = mutationRequest({
    url: "/apartment",
    method: "post",
    isAuth: true,
  });
  const [disable, setDisable] = useState(false);
  const [addApartmentNumber, setAddApartmentNumber] = useState<string>("");
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    mutate.mutate({
      buildingId: amenityId,
      name: addApartmentNumber,
      status: "active",
    });
  };

  function handleShowAlert(
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
    message: string,
    title: string,
    style: string
  ) {
    setHideMessage(true);
    setMessageSort({
      icon,
      message,
      title,
      style,
    });
    setTimeout(() => {
      if (setHideMessage) {
        setHideMessage(false);
      }
    }, 3000);
  }
  useEffect(() => {
    if (addApartmentNumber) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [addApartmentNumber]);
  useEffect(() => {
    if (mutate.isSuccess) {
      setOpenAddApartment(false);
      handleShowAlert(
        CongratsIcon,
        "Apartment has been added Successfully",
        "Done",
        "done"
      );
    }
  }, [mutate.isSuccess]);
  return (
    <form className="form_add_apartment_dialog" onSubmit={handleSubmit}>
      <p className="header_dialog">Add Apartment</p>
      <div className="apartmentNumber_container">
        <img
          src={ApartmentPng}
          alt="ApartmentPng"
          className="apartment_iamge"
        />
        <TextField
          id="apartment-number"
          variant="filled"
          placeholder="Apartment Number"
          onChange={(e) => setAddApartmentNumber(e.target.value)}
          className={`info-inputs__content`}
          name="ApartmentNumber"
          value={addApartmentNumber}
        />
      </div>
      <div className="btn_container">
        <Button
          className={`add_apart_btn ${disable ? "active" : ""}`}
          type="submit"
          disabled={!disable}
        >
          Add Apartment
        </Button>
        <Button
          variant="contained"
          className="cancel_apartment"
          onClick={() => setOpenAddApartment(false)}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AddApartmentDialog;
