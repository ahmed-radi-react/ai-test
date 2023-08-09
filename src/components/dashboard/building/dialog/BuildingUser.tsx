import { useContext, useEffect, useState } from "react";
import { Input } from "@mui/material";
import { NavLink } from "react-router-dom";
import { ReactComponent as SearchIcon } from "@/assets/icons/search.svg";
import { queryRequest } from "@/requests-body/queries";
import SkeltonLoad from "~/reusable/loader/SkeltonLoad";
import nodata from "@/assets/icons/nodata.png";
import { ContentContextServiceList } from "@/context/ServiceListContext";

const BuildingUser = () => {
  const [searchVal, setSearchVal] = useState("");
  const [userData, setUserData] = useState([]);
  const value = useContext(ContentContextServiceList);
  const success = (data: []) => {
    setUserData(data);
  };
  const { isLoading } = queryRequest({
    url: `/user?buildingId=${value?.amenityId}&offset=0&limit=10000${
      searchVal.length ? `&searchKey=${searchVal}` : ""
    }`,
    method: "get",
    key: value?.amenityId + "deactiveKey" + searchVal,
    cb: success,
  });
  let time: ReturnType<typeof setTimeout>;
  useEffect(() => {
    return () => {
      clearTimeout(time);
    };
  }, []);

  return (
    <div>
      <section className="header">
        <span className="header__title">Building Users</span>
        <NavLink to={"/users/usermanagement"} className="header__link">
          Open User management
        </NavLink>
      </section>
      <div className="search">
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
      {!isLoading ? (
        userData?.length >= 1 ? (
          <section className="users">
            {userData?.map(
              (
                item: {
                  image: { url: string };
                  firstName: string;
                  email: string;
                  role: { name: string };
                },
                index: number
              ) => {
                return (
                  <div className="user_container" key={index}>
                    <div className="user__content">
                      <div className="user__content-image">
                        <img src={item?.image?.url} />
                      </div>
                      <div className="user__content-info">
                        <span className="info__name">{item?.firstName}</span>
                        <span className="info__email">{item?.email}</span>
                      </div>
                    </div>
                    <span className="user__role">{item?.role?.name}</span>
                  </div>
                );
              }
            )}
          </section>
        ) : (
          <div className="no_data">
            <img src={nodata} alt="no data" />
          </div>
        )
      ) : (
        <SkeltonLoad />
      )}
    </div>
  );
};

export default BuildingUser;
