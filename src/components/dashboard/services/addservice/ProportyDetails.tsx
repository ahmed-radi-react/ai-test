import { useState } from "react";
import { ReactComponent as ArrowIcon } from "@/assets/icons/selescticon.svg";
import { proportyDetailSelect } from "@/utils/constant";
import { IPropertyDetails } from "~/types/types";

const ProportyDetails = ({
  selectProperty,
  setSelectProperty,
}: IPropertyDetails) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="detail_proport_services">
      <span className="span">
        This Service Will be available on Which Property
      </span>
      <div className="select_div" onClick={handleOpen}>
        <span
          className={selectProperty !== "Select property" ? "selected" : ""}
        >
          {selectProperty}
        </span>
        {open ? (
          <ArrowIcon className="down_svg" />
        ) : (
          <ArrowIcon className="down_svg arrow_up" />
        )}
      </div>
      {open && (
        <div className="options">
          {proportyDetailSelect.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => {
                  if (setSelectProperty) {
                    setSelectProperty(item.label);
                  }
                  setOpen(false);
                }}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProportyDetails;
