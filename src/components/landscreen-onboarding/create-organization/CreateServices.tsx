import { Button, Checkbox } from "@mui/material";
import { ReactComponent as ArrowIcon } from "@/assets/icons/selescticon.svg";
import { servicesLandScreen } from "@/utils/constant";
import { ISetOpenContent } from "~/types/types";
import { ReactComponent as CheckedIcon } from "@/assets/icons/checkbox_round.svg";
import { useEffect, useState } from "react";
import { queryRequest } from "@/requests-body/queries";
interface AllService {
  _id: string;
  name: string;
  icon?: { url: string };
}

const CreateServices = ({
  setOpenContent,
  setData,
  data: serviceData,
}: ISetOpenContent) => {
  const { data, isSuccess, isLoading } = queryRequest({
    url: "/service/public",
    method: "get",
    key: "serviceAll",
  });
  const [allService, setAllService] = useState<AllService[]>([]);
  useEffect(() => {
    if (isSuccess) {
      setAllService(data?.data.items);
    }
  }, [isSuccess]);
  const handleBack = () => {
    setOpenContent("general");
  };
  const handleNext = () => {
    setOpenContent("appearance");
    if (setData) {
      setData((prev: any) => {
        return { ...prev, checkedItems: [...checkedItems] };
      });
    }
    localStorage.setItem("signup-services", JSON.stringify(checkedItems));
  };
  const [next, setNext] = useState(false);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  function handleCheckboxChange(
    event: { target: { checked: boolean } },
    item: { _id: string }
  ) {
    const isChecked = event.target.checked;
    if (isChecked) {
      setCheckedItems([...checkedItems, item._id]);
    } else {
      setCheckedItems(checkedItems.filter((id: string) => id !== item._id));
    }
  }
  useEffect(() => {
    if (checkedItems.length) {
      setNext(true);
    } else {
      setNext(false);
    }
  }, [checkedItems]);

  useEffect(() => {
    var storedData = localStorage.getItem("signup-services");
    if (storedData) {
      var storedServices = JSON.parse(storedData);
      if (setData) {
        setCheckedItems(storedServices);
      }
    }
  }, []);

  return (
    <div className="create_service">
      <div className="header_div" onClick={handleBack}>
        <ArrowIcon />
        <span>General Information</span>
      </div>
      <span className="title">Services</span>
      {!isSuccess ? (
        <div className="sign_up-loading-text">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="allservices">
          {allService?.map((item) => {
            return (
              <div key={item._id} className="service_item">
                <div className="check_div">
                  <Checkbox
                    className="checkbox"
                    icon={<div className="checkincon"></div>}
                    checkedIcon={
                      <div className="checked">
                        <CheckedIcon className="checked_icon" />
                      </div>
                    }
                    checked={checkedItems.includes(item._id)}
                    onChange={(event) => handleCheckboxChange(event, item)}
                  />
                  <span>{item.name}</span>
                </div>
                <div className="service_icons_div">
                  {item?.icon && (
                    <img src={item?.icon.url} alt={item?.icon.url + "image"} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <Button
        variant="contained"
        className={`btn_next ${next ? "next" : ""}`}
        onClick={handleNext}
      >
        <span>Next, Appearance</span>
        <ArrowIcon />
      </Button>
    </div>
  );
};

export default CreateServices;
