import { Button, Input } from "@mui/material";
import { useState } from "react";
import { ReactComponent as ArrowIcon } from "@/assets/icons/selescticon.svg";
import { proportyDetailSelect } from "@/utils/constant";
import { IActor } from "~/types/types";

const AddServiceActor = ({ setSelectActor, selectActor }: IActor) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  const [addactor, setAddActor] = useState(false);
  const handleAddActor = () => {
    setAddActor(true);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const isValidName = (name: string): boolean => {
    return name.trim().length >= 20;
  };

  const handleChangeName = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    inputField: string
  ) => {
    if (inputField === "name") {
      if (e.target.value?.length <= 20) {
        setName(e.target.value);
      }
    } else {
      if (e.target.value?.length <= 50) {
        setEmail(e.target.value);
      }
    }
  };

  return (
    <div className="add_service_admin">
      <div className="detail_proport_services">
        <div className="select_div" onClick={handleOpen}>
          <span className={selectActor !== "Select Existing" ? "selected" : ""}>
            {selectActor}
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
                    setSelectActor(item.label);
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
      <div>
        {!addactor ? (
          <button className="addactor" onClick={handleAddActor}>
            Add new Actor
          </button>
        ) : (
          <div className="input_add_actor">
            <Input
              placeholder="Name"
              onChange={(e) => handleChangeName(e, "name")}
              className="inputs_actor"
              value={name}
            />
            {isValidName(name) && (
              <span
                style={{
                  color: "red",
                  fontSize: "12px",
                  fontWeight: "400",
                }}
              >
                Actor name Should be less than 20
              </span>
            )}
            <Input
              placeholder="Email"
              onChange={(e) => handleChangeName(e, "desc")}
              className="inputs_actor"
              value={email}
            />
            {email.length >= 50 && (
              <span
                style={{
                  color: "red",
                  fontSize: "12px",
                  fontWeight: "400",
                }}
              >
                Actor name Should be less than 50
              </span>
            )}
            <Button variant="contained" className="addcancel_actor add">
              Add New Actor
            </Button>
            <Button variant="contained" className="addcancel_actor cancel">
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddServiceActor;
