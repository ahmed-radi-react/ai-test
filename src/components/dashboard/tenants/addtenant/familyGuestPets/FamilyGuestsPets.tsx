import { Button, Dialog, DialogContent } from "@mui/material";
import { useState } from "react";
import AddGuest from "./AddGuest";
import AddNewFamilyMember from "./AddNewFamilyMember";
import AddPets from "./AddPets";
import AddCar from "./AddCar";
import { parsePhoneNumber } from "libphonenumber-js";
import { IFamilyGuestPets } from "~/types/types";

const FamilyGuestsPets = ({
  guestPhone,
  setguestPhone,
  setData,
  data,
  guestNumber,
  setFamily,
  family,
}: IFamilyGuestPets) => {
  const [value, setValue] = useState({
    addFamilyMember: false,
    addGuest: false,
    addpets: false,
    addcar: false,
  });

  const [openDialog, setOpenDialog] = useState(false);
  const handleClose = () => {
    setOpenDialog(false);
  };
  const [editIndex, setEditIndex] = useState<number>(0);
  const [petType, setPetType] = useState<string>("");
  const [carBrandName, setCarBrandName] = useState<string>("");
  const [carName, setCarName] = useState({
    name: "",
    model: "",
    id: 1,
  });
  const handleClickFamily = (name: string) => {
    if (name === "family") {
      setValue(() => ({
        addGuest: false,
        addpets: false,
        addFamilyMember: true,
        addcar: false,
      }));
    } else if (name === "guest") {
      setValue(() => ({
        addFamilyMember: false,
        addpets: false,
        addGuest: true,
        addcar: false,
      }));
    } else if (name === "car") {
      setValue(() => ({
        addFamilyMember: false,
        addpets: false,
        addGuest: false,
        addcar: true,
      }));
    } else {
      setValue(() => ({
        addFamilyMember: false,
        addGuest: false,
        addpets: true,
        addcar: false,
      }));
    }
    setEditIndex(-1);
    setOpenDialog((prev) => !prev);
  };

  const [guestsVal, setGuestsVal] = useState<{
    firstName: string;
    email: string;
    proffesion: string;
    id: number;
  }>({
    firstName: "",
    email: "",
    proffesion: "",
    id: 1,
  });
  const [petsVal, setPetsVal] = useState<{
    name: string;
    id: number;
    age: string;
  }>({
    name: "",
    age: "",
    id: 1,
  });
  const [phoneFamily, setPhoneFamily] = useState("+966");
  const handleClick = (type: string, id?: number) => {
    let obj = {};
    if (type === "family") {
      if (!id) {
        obj = {
          id: data.family.length + 1,
          firstName: family?.firstName,
          lastName: family?.firstName,
          email: family?.email,
          age: family?.age,
          relation: family?.relationship,
          phoneNumber: parsePhoneNumber(phoneFamily).nationalNumber,
          countryCode: "+" + parsePhoneNumber(phoneFamily).countryCallingCode,
          password: "123456",
        };
      } else {
        obj = {
          firstName: family?.firstName,
          lastName: family?.firstName,
          email: family?.email,
          age: family?.age,
          relation: family?.relationship,
          password: "123456",
        };
      }
    }
    if (type === "guests") {
      if (!id) {
        obj = {
          id: data.guests.length + 1,
          proffesion: guestsVal?.proffesion,
          email: guestsVal?.email,
          firstName: guestsVal?.firstName,
          lastName: guestsVal?.firstName,
          phoneNumber: parsePhoneNumber(phoneFamily).nationalNumber,
          countryCode: "+" + parsePhoneNumber(phoneFamily).countryCallingCode,
        };
      } else {
        obj = {
          proffesion: guestsVal?.proffesion,
          email: guestsVal?.email,
          firstName: guestsVal?.firstName,
          lastName: guestsVal?.firstName,
        };
      }
    }
    if (type === "pets") {
      if (!id) {
        obj = {
          id: data.pets.length + 1,
          name: petsVal.name,
          type: petType,
          age: petsVal.age,
        };
      } else {
        obj = {
          name: petsVal.name,
          type: petType,
          age: petsVal.age,
        };
      }
    }

    if (type === "car") {
      if (!id) {
        obj = {
          id: data.car.length + 1,
          name: carName.name,
          model: "aaa",
        };
      } else {
        obj = {
          name: carName.name,
          model: "aaa",
        };
      }
    }

    if (id) {
      setData((prev: any) => {
        const updatedData = prev[type].map((item: any) => {
          if (item.id === id) {
            if (type === "family" || type === "guests") {
              if (phoneFamily) {
                return {
                  ...item,
                  ...obj,
                  phoneNumber: parsePhoneNumber(phoneFamily).nationalNumber,
                  countryCode:
                    "+" + parsePhoneNumber(phoneFamily).countryCallingCode,
                };
              } else {
                return {
                  ...item,
                  ...obj,
                  phoneNumber: item.phoneNumber,
                  countryCode: item.countryCode,
                };
              }
            } else {
              return {
                ...item,
                ...obj,
              };
            }
          }
          return item;
        });
        return { ...prev, [type]: updatedData };
      });
    } else {
      setData((prev: any) => {
        return { ...prev, [type]: [...prev[type], obj] };
      });
    }
    setPhoneFamily("");
  };

  const handleEdit = (label: string, idx: number) => {
    handleClickFamily(label);
    setEditIndex(idx);
  };

  const handleRemove = (type: string, id?: number) => {
    setData((prev: any) => {
      return {
        ...prev,
        [type]: prev[type].filter((el: any) => {
          return el.id !== id;
        }),
      };
    });
  };

  return (
    <div className="family_guest_pets_tenant">
      <div className="btnguestfamily">
        <Button
          variant="contained"
          className="btnaddtenant"
          onClick={() => {
            handleClickFamily("family");
          }}
        >
          Add Family Members
        </Button>
        <Button
          variant="contained"
          className="btnaddtenant"
          onClick={() => {
            handleClickFamily("guest");
          }}
        >
          Add Guest
        </Button>
        <Button
          variant="contained"
          className="btnaddtenant"
          onClick={() => {
            handleClickFamily("pets");
          }}
        >
          Add Pets
        </Button>
        <Button
          variant="contained"
          className="btnaddtenant"
          onClick={() => {
            handleClickFamily("car");
          }}
        >
          Add Car
        </Button>
      </div>
      <div className="family_guest_pets_divs">
        {data.family.map((item, index) => {
          return (
            <div key={index}>
              <span>{item.firstName} Family Member added</span>
              <Button
                variant="contained"
                className="btn_edit"
                onClick={() => {
                  handleEdit("family", item.id);
                }}
              >
                Edit
              </Button>
            </div>
          );
        })}
        {data.guests.map((item: { id: number }, index) => {
          return (
            <div key={index}>
              <span> Guest added</span>
              <Button
                variant="contained"
                className="btn_edit"
                onClick={() => {
                  handleEdit("guest", item.id);
                }}
              >
                Edit
              </Button>
            </div>
          );
        })}
        {data.pets.map((item: { id: number; name: string }, index) => {
          return (
            <div key={index}>
              <span>1 Pet added {item.name}</span>
              <Button
                variant="contained"
                className="btn_edit"
                onClick={() => {
                  handleEdit("pets", item.id);
                }}
              >
                Edit
              </Button>
            </div>
          );
        })}
        {data.car.map((item: { id: number; name: string }, index) => {
          return (
            <div key={index}>
              <span>1 Car added {item.name}</span>
              <Button
                variant="contained"
                className="btn_edit"
                onClick={() => {
                  handleEdit("car", item.id);
                }}
              >
                Edit
              </Button>
            </div>
          );
        })}
      </div>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        className="tenant_dialog_add_new"
      >
        <DialogContent>
          {value.addFamilyMember && (
            <AddNewFamilyMember
              handleRemove={handleRemove}
              handleClick={handleClick}
              setOpenDialog={setOpenDialog}
              family={family}
              setFamily={setFamily}
              phoneFamily={phoneFamily}
              setPhoneFamily={setPhoneFamily}
              data={data.family}
              editIndex={editIndex}
            />
          )}
          {value.addGuest && (
            <AddGuest
              handleRemove={handleRemove}
              handleClick={handleClick}
              setguestPhone={setguestPhone}
              guestPhone={guestPhone}
              guestsVal={guestsVal}
              setGuestsVal={setGuestsVal}
              setOpenDialog={setOpenDialog}
              phoneFamily={phoneFamily}
              editIndex={editIndex}
              data={data.guests}
              setPhoneFamily={setPhoneFamily}
            />
          )}
          {value.addpets && (
            <AddPets
              handleRemove={handleRemove}
              handleClick={handleClick}
              setPetType={setPetType}
              setOpenDialog={setOpenDialog}
              petType={petType}
              petsVal={petsVal}
              data={data.pets}
              editIndex={editIndex}
              setPetsVal={setPetsVal}
            />
          )}
          {value.addcar && (
            <AddCar
              handleRemove={handleRemove}
              handleClick={handleClick}
              setCarBrandName={setCarBrandName}
              setOpenDialog={setOpenDialog}
              carName={carName}
              data={data.car}
              editIndex={editIndex}
              setCarName={setCarName}
              carBrandName={carBrandName}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FamilyGuestsPets;
