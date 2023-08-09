import { useState } from "react";
import { ReactComponent as ArrowIcon } from "@/assets/icons/selescticon.svg";
import { AvailableSelect } from "@/utils/constant";
import { ISelect } from "~/types/types";

const SelectAvailable = ({ select, setSelect }: ISelect) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div className="detail_proport_services">
      <div className="select_div" onClick={handleOpen}>
        <span className={select !== "Select Availability" ? "selected" : ""}>
          {select}
        </span>
        {open ? (
          <ArrowIcon className="down_svg" />
        ) : (
          <ArrowIcon className="down_svg arrow_up" />
        )}
      </div>
      {open && (
        <div className="options">
          {AvailableSelect.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => {
                  setSelect(item.label);
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

export default SelectAvailable;
