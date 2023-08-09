import React, { useEffect } from "react";
import { ReactComponent as SearchIcon } from "@/assets/icons/search.svg";
import { ReactComponent as SettingIcon } from "@/assets/icons/parcelSetIcon.svg";
import { Input } from "@mui/material";
import apartment from "@/assets/images/apartment.png";
interface IShowApartment {
  data: { name: string; status: string }[];
  setSearchVal: React.Dispatch<React.SetStateAction<string>>;
}

const ShowApartmentList = ({ data, setSearchVal }: IShowApartment) => {
  let time: ReturnType<typeof setTimeout>;
  useEffect(() => {
    return () => {
      clearTimeout(time);
    };
  }, []);
  return (
    <>
      <div className="select_apart_search_section">
        <div className="select_apart_search">
          <Input
            type="text"
            className="search__input"
            placeholder="Search"
            onChange={(e) => {
              time = setTimeout(() => {
                setSearchVal(e.target.value);
              }, 3000);
            }}
          />
          <SearchIcon />
        </div>
        <SettingIcon />
        <SettingIcon />
      </div>
      <div className="apartments_container">
        {data?.map((items, index: number) => (
          <div className="apartment_content" key={index}>
            <img
              src={apartment}
              alt={apartment}
              className="apartment_content-image"
            />
            <div className="apartment_content-info">
              <span className="apartment_number">{items?.name}</span>
              <span className="apartment_size">Size 120 m / 3 rooms..etc</span>
              <span className="apartment_status">
                Status <span>{items?.status}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ShowApartmentList;
