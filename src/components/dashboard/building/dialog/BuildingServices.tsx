import { Button } from "@mui/material";
import { IDetailData } from "~/types/types";
import { useNavigate } from "react-router-dom";
import { FC } from "react";

type TBuildingServiceProps = {
  dataInfo?: IDetailData;
};

const BuildingServices: FC<TBuildingServiceProps> = ({ dataInfo }) => {
  const navigation = useNavigate();
  return (
    <div className="building_details">
      {dataInfo?.images && (
        <section className="image_container">
          <img src={dataInfo?.images[0]?.url} alt="BuildingImage" />
        </section>
      )}
      <section className="content services_dialog">
        <div className="content__header">
          <span className="content__header-title">{dataInfo?.name}</span>
          <Button
            className="content__header-button"
            onClick={() =>
              navigation(`/building/addbuilding`, {
                state: dataInfo,
              })
            }
          >
            Edit Building
          </Button>
        </div>
      </section>
      <section className="services services_dialog">
        <div className="services__header">
          <span className="services__header-title">Services</span>
          <Button className="services__header-button">Edit</Button>
        </div>
        <span className="services__description">
          The covered services in this Building.
        </span>
        <div className="services__allow">
          {dataInfo?.services?.map((item, index) => {
            return (
              <span className="services__allow-item" key={index}>
                {item?.name}
              </span>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default BuildingServices;
