import { ChangeEvent, FC, useState } from "react";
import ShowApartmentList from "./AddApartmentDialog/ShowApartmentList";
import SelectApartmentType from "./AddApartmentDialog/SelectApartmentType";
import UploadDocument from "./AddApartmentDialog/UploadDocument";
import SubmitDocuments from "./AddApartmentDialog/SubmitDocuments";
import { queryRequest } from "@/requests-body/queries";
import SkeltonLoad from "../loader/SkeltonLoad";
import nodata from "@/assets/icons/nodata.png";
import { IDetailData } from "~/types/types";

type TBuildingServiceProps = {
  dataInfo?: IDetailData;
};

const AddBuildingApartmentDialog: FC<TBuildingServiceProps> = ({
  dataInfo,
}) => {
  const [searchVal, setSearchVal] = useState("");
  const success = (data: []) => {
    setDataApartment(data);
  };
  const [dataApartment, setDataApartment] = useState([]);
  const { data, isLoading } = queryRequest({
    url: `/apartment?buildingId=${dataInfo?._id}&offset=0&limit=10000${
      searchVal.length ? `&searchKey=${searchVal}` : ""
    }`,
    method: "get",
    key: "building" + dataInfo?._id + searchVal,
    cb: success,
  });

  const [addApartment, setApartment] = useState(false);
  let disable = true;

  const [selectedOption, setSelectedOption] = useState("");
  const handleDivClick = (optionValue: string) => {
    setSelectedOption(optionValue);
  };
  if (selectedOption) disable = false;
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const [downloadExcelStep, setDownloadExcelStep] = useState(false);

  const [file, setFile] = useState<File[]>([]);

  const [openLastStep, setOpenLastStep] = useState(false);

  return (
    <div className="add_building_apartment_dialog">
      {!addApartment && !downloadExcelStep && (
        <p>{dataInfo?.name} Apartments</p>
      )}
      {addApartment && !downloadExcelStep && <p>Add Apartments</p>}
      {addApartment && downloadExcelStep && (
        <p>
          Add {selectedOption === "single" ? "Single " : "Multiple "}
          Apartment{selectedOption === "single" ? "" : "s"}
        </p>
      )}
      {!downloadExcelStep && (
        <div className="selected_building">
          <div className="selected_building__details">
            {dataInfo?.images && (
              <img
                src={dataInfo?.images[0]?.url}
                alt="building"
                className="selected_building__details-image"
              />
            )}
            <div className="selected_building__details-info">
              <span className="info__building_name">{dataInfo?.name}</span>
              <span className="info__apartment_name">
                {data?.data?.count} Apartment
              </span>
            </div>
          </div>
          <button
            className="selected_building__button"
            onClick={() => setApartment((prev) => !prev)}
          >
            {addApartment ? "Show Apartments" : "Add Apartment"}
          </button>
        </div>
      )}
      {addApartment ? (
        <div>
          {downloadExcelStep ? (
            <>
              {openLastStep ? (
                <SubmitDocuments
                  file={file}
                  setFile={setFile}
                  setDownloadExcelStep={setDownloadExcelStep}
                  setOpenLastStep={setOpenLastStep}
                />
              ) : (
                <UploadDocument
                  file={file}
                  setFile={setFile}
                  setOpenLastStep={setOpenLastStep}
                />
              )}
            </>
          ) : (
            <SelectApartmentType
              selectedOption={selectedOption}
              handleDivClick={handleDivClick}
              handleInputChange={handleInputChange}
              setDownloadExcelStep={setDownloadExcelStep}
              disable={disable}
            />
          )}
        </div>
      ) : !isLoading ? (
        dataApartment.length >= 1 ? (
          <ShowApartmentList data={dataApartment} setSearchVal={setSearchVal} />
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

export default AddBuildingApartmentDialog;
