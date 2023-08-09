import { CircularProgress, DialogContent } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Detailsdialog from "./Detailsdialog";
import DeleteDialog from "./DeleteDialog";
import DeactiveDialog from "./DeactiveDialog";
import ShareDialog from "./ShareDialog";
import RenameDialog from "./RenameDialog";
import { queryRequest } from "@/requests-body/queries";
import { IDetailData, IProfileData } from "~/types/types";
import { ContentContextServiceList } from "@/context/ServiceListContext";
interface IProfileDataContent {
  profile?: IProfileData;
}

const AllContent = ({ profile }: IProfileDataContent) => {
  const [dataInfo, setDataInfo] = useState<IDetailData>();
  const value = useContext(ContentContextServiceList);

  const {
    data: detailData,
    isSuccess: successdetail,
    isLoading,
  } = queryRequest({
    url: `/${value?.url}/${value?.amenityId}`,
    method: "get",
    key: value?.amenityId + "deactiveKey",
  });
  useEffect(() => {
    if (successdetail) {
      setDataInfo(detailData.data);
    }
  }, [successdetail, detailData?.data]);

  if (!isLoading) {
    return (
      <DialogContent>
        {value?.openContent === 6 ? (
          <DeleteDialog
            title={value?.titleheader || ""}
            dataInfo={dataInfo}
            profile={profile}
          />
        ) : value?.openContent === 5 ? (
          <DeactiveDialog
            dataInfo={dataInfo}
            title={value?.titleheader || ""}
            url={value?.url || ""}
          />
        ) : value?.openContent === 1 ? (
          <ShareDialog dataInfo={dataInfo} />
        ) : value?.openContent === 4 ? (
          <Detailsdialog dataInfo={dataInfo} />
        ) : value?.openContent === 2 ? (
          <RenameDialog url={value?.url || ""} dataInfo={dataInfo} />
        ) : (
          <div></div>
        )}
      </DialogContent>
    );
  } else {
    return <CircularProgress disableShrink className="circle circledialog" />;
  }
};

export default AllContent;
