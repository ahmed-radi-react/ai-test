import { DialogContent } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import BuildingUser from "./dialog/BuildingUser";
import ShareDialog from "~/reusable/dialog/ShareDialog";
import RenameDialog from "~/reusable/dialog/RenameDialog";
import Detailsdialog from "~/reusable/dialog/Detailsdialog";
import DeactiveDialog from "~/reusable/dialog/DeactiveDialog";
import DeleteDialog from "~/reusable/dialog/DeleteDialog";
import { IDetailData } from "~/types/types";
import { queryRequest } from "@/requests-body/queries";
import AddBuildingApartmentDialog from "~/reusable/dialog/AddBuildingApartmentDialog";
import BuildingServices from "./dialog/BuildingServices";
import { ContentContextServiceList } from "@/context/ServiceListContext";

const BuildingDialog = () => {
  const [dataInfo, setDataInfo] = useState<IDetailData>();
  const value = useContext(ContentContextServiceList);
  const { data: detailData, isSuccess: successdetail } = queryRequest({
    url: `/${value?.url}/${value?.amenityId}`,
    method: "get",
    key: value?.amenityId + "deactiveKey",
  });
  useEffect(() => {
    if (successdetail) {
      setDataInfo(detailData.data);
    }
  }, [successdetail, detailData?.data]);
  return (
    <DialogContent
      className={`dialog_container ${
        value?.openContent === 4 || value?.openContent === 6 ? "details" : ""
      }`}
    >
      {value?.openContent === 1 ? (
        <ShareDialog />
      ) : value?.openContent === 2 ? (
        <RenameDialog
          url={value?.url || ""}
          dataInfo={dataInfo}
          classname={"building"}
        />
      ) : value?.openContent === 4 ? (
        <Detailsdialog
          dataInfo={dataInfo}
          setOpenAddApartment={value.setOpenAddApartment}
          handleClose={value.handleClose}
          classname={"building"}
        />
      ) : value?.openContent === 5 ? (
        <Detailsdialog
          dataInfo={dataInfo}
          classname={"building"}
          serviceBuilding={"servicebuilding"}
        />
      ) : value?.openContent === 6 ? (
        <BuildingUser />
      ) : value?.openContent === 8 ? (
        <AddBuildingApartmentDialog
          dataInfo={dataInfo}
          // title={value?.titleheader || ""}
          // url={value?.url || ""}
        />
      ) : value?.openContent === 7 ? (
        <BuildingServices dataInfo={dataInfo} />
      ) : value?.openContent === 9 ? (
        <DeactiveDialog
          title={value?.titleheader || ""}
          url={value?.url || ""}
        />
      ) : value?.openContent === 10 ? (
        <DeleteDialog title={value?.titleheader || ""} />
      ) : (
        <div></div>
      )}
    </DialogContent>
  );
};

export default BuildingDialog;
