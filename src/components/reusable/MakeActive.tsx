import { Switch } from "@mui/material";
import { AntSwitch, newTime } from "@/utils/constant";
import { IMakeActiveInterface } from "~/types/types";

const MakeActive = ({
  width,
  height,
  bullerWidth,
  bullerHeight,
  translate,
  title1,
  el = undefined,
  subClass,
  active,
  setActive,
  setAvailabiliySlotSub,
  handleSwitchChange,
  maintainceActive,
  id,
  text,
}: IMakeActiveInterface) => {
  const handleToggle = () => {
    if (setAvailabiliySlotSub) {
      setAvailabiliySlotSub((prev: any) => {
        const copyPrev = [...prev];
        if (el) {
          copyPrev[el - 1] = newTime;
        }
        return copyPrev;
      });
    }

    if (setActive) {
      setActive!((prev) => !prev);
    }
  };

  return (
    <div
      className={`make_active_amenity ${subClass && "subClassactive"} ${
        (title1 === "Off" || title1 === "On") && title1
      }`}
    >
      <span className="makeactive_span">
        {title1 ? title1 : "Make It Active"}{" "}
      </span>
      <Switch
        sx={{
          ...AntSwitch({ width, height, bullerHeight, bullerWidth, translate }),
        }}
        value={maintainceActive ? maintainceActive : active}
        defaultChecked
        inputProps={{ "aria-label": "ant design" }}
        name={
          el
            ? `active_input${el}`
            : title1 === "Severity"
            ? `active_severity`
            : `active_input`
        }
        onChange={(e) => {
          if (handleSwitchChange) {
            handleSwitchChange(id);
          } else {
            handleToggle();
          }
        }}
      />
      {!(title1 === "Off" || title1 === "On") && (
        <>
          <span className="turnon_span">
            {!title1 && !subClass
              ? ` Turn On to activate the ${
                  text === "Maintenance" ? "Maintenance" : "Amenity"
                } after adding it`
              : subClass
              ? ""
              : "Turn On to activate the service severity "}
          </span>
          <span className="turnon_span">
            {subClass && "Use parent category availabiloity"}
          </span>
        </>
      )}
    </div>
  );
};

export default MakeActive;
