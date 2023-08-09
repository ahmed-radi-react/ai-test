import { Button, Dialog, DialogContent } from "@mui/material";
import { Container } from "@mui/system";
import { ReactComponent as AddIcon } from "@/assets/icons/addIconWhite.svg";
import { useContext, useEffect, useState } from "react";
import { ReactComponent as CloseIcon } from "@/assets/icons/close.svg";
import { ReactComponent as Elipse } from "@/assets/icons/elipse.svg";
import BackNavigate from "~/reusable/BackNavigate";
import { queryRequest } from "@/requests-body/queries";
import {
  IAddVisitorDialog,
  IParcelManagementTable,
  IValetData,
  ParcelContextType,
} from "~/types/types";
import { ReactComponent as CopyIcon } from "@/assets/icons/CopySvg.svg";
import { ReactComponent as SettingsIcon } from "@/assets/icons/settingsicon.svg";
import MessageAlert from "~/reusable/MessageAlert";
import VisitorRequestDialog from "./VisitorRequestDialog";
import VisitorsReqData from "./VisitorsReqData";
import { ContentContext } from "@/context/ParcelContext";
import useControlPagination from "@/hooks/useControlPagination";

let toggle = false;

// export const ContentContext = createContext<ParcelContextType | null>(null);
const AddVisitorsRequests = ({ open, setOpen, visitorOTP, setVisitorOTP }: IAddVisitorDialog) => {
  const {
    setOpenListTableContent,
    openListTableContent,
    setTableIndex,
    tableIndex,
    setMessageSort,
    messagesort,
    handleShowAlert,
    hideMessage,
  }: any = useContext(ContentContext);
  const [totalRows, setTotalRows] = useState(0);
  const { currentPage, handlePageChange } = useControlPagination();
  const [visitorData, setVisitorData] = useState<
    IParcelManagementTable[] | IValetData[]
  >([]);
  const [searchVal, setSearchVal] = useState("");
  const [sorttable, setSorttable] = useState("All");
  const handleMenuClick = (listIndex: number, rowIndex: number) => {
    setTableIndex(rowIndex);
    setOpenListTableContent(listIndex);
  };
  const handleCloseOpenTableListDialog = () => {
    setOpenListTableContent(0);
  };
  const [limitPerPage, setLimitPerPage] = useState(10);
  const changePageLimit = (limit: number) => {
    setLimitPerPage(limit);
    handlePageChange(event, 1);
  };

  const {
    data: sortData,
    isLoading,
    isSuccess,
    refetch,
  } = queryRequest({
    url: `/service-request/visitor?offset=${currentPage}&limit=${limitPerPage}${
      searchVal.length ? `&searchKey=${searchVal}` : ""
    }${sorttable !== "All" ? `&status=${sorttable}` : ""}`,
    method: "get",
    key: "requestKey" + searchVal + sorttable + currentPage,
    cb: success,
  });
  useEffect(() => {
    refetch();
  }, [limitPerPage]);
  useEffect(() => {
    if (isSuccess) {
      setTotalRows(sortData.data.count);
    }
  }, [isSuccess]);
  function success(data: any) {
    setVisitorData(data);
    setChangeData(!changeData);
    if (data && !toggle) {
      toggle = true;
      let newdata = [...data];
      const array = newdata?.map((item) => {
        return item.status;
      });
      const result = [...new Set(array)].reduce((obj: any, itemobj, index) => {
        const sortreqdata = newdata.filter((item) => {
          return item.status === itemobj;
        });
        obj.push({ id: index + 1, label: itemobj, data: sortreqdata });
        return obj;
      }, []);
      setSortedData([{ id: 0, label: "All", data: data.length }, ...result]);
    }
  }

  const [openVisitor, setOpenVisitor] = useState(false);
  const handleClick = (label: string) => {
    setSorttable(label);
  };
  const handleAddRequest = () => {
    setOpenVisitor(true);
  };
  const handleClose = () => {
    setOpenVisitor(false);
  };
  const handleCopy = (element: any) => {
    navigator.clipboard.writeText(element); //? need to set correct element want to copy
    handleShowAlert(CopyIcon, "Parcel link has been Copied!", "Copied", "copy");
  };
  const [changeData, setChangeData] = useState(false);
  const [sortedData, setSortedData] = useState<any[]>([]);
  return (
    <>
      {hideMessage && (
        <div className="content content_alert">
          <MessageAlert messagesort={messagesort} />
        </div>
      )}
      <Container className="visitor_management">
        <BackNavigate title="Visitors" />
        <div className="header">
          <span className="span">Visitors Requests</span>
          <div className="btn_container">
            <Button variant="contained" className="btn setting">
              <SettingsIcon />
              Setting
            </Button>
            <Button
              variant="contained"
              className="btn add"
              onClick={handleAddRequest}
            >
              <AddIcon />
              Add visitor request
            </Button>
          </div>
        </div>
        <div className="sortdiv">
          <div className="filter">
            {sortedData.map((item, index) => {
              return (
                <Button
                  variant="contained"
                  key={item.id}
                  className={`sort ${
                    sorttable?.length
                      ? sorttable === item.label
                        ? "activesort"
                        : ""
                      : index === 0
                      ? "activesort"
                      : ""
                  }`}
                  onClick={() => handleClick(item.label)}
                >
                  <span className="sort_filter_item">
                    {item.label.replace(/_/g, " ").charAt(0).toUpperCase() +
                      item.label.replace(/_/g, " ").slice(1)}
                  </span>
                  <div>
                    {item.label === "All"
                      ? sortedData[0]?.data
                      : item.data.length}
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
        <VisitorsReqData
          visitorData={visitorData}
          open={open}
          setOpen={setOpen}
          setSearchVal={setSearchVal}
          data={sortData}
          setVisitorData={setVisitorData}
          isLoading={isLoading}
          searchVal={searchVal}
          sorttable={sorttable}
          totalRows={totalRows}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          limitPerPage={limitPerPage}
          changePageLimit={changePageLimit}
          visitorOTP={visitorOTP}
          setVisitorOTP={setVisitorOTP}
        />
        {!!openVisitor && (
          <div className="close" onClick={handleClose}>
            <Elipse />
            <CloseIcon />
          </div>
        )}
        <Dialog open={openVisitor} onClose={handleClose} className="action">
          <DialogContent>
            <VisitorRequestDialog
              handleClose={handleClose}
              handleShowAlert={handleShowAlert}
              setOpenVisitor={setOpenVisitor}
            />
          </DialogContent>
        </Dialog>

        {/*  */}
        {!!openListTableContent && (
          <div className="close" onClick={handleCloseOpenTableListDialog}>
            <Elipse />
            <CloseIcon />
          </div>
        )}
        <Dialog open={!!openListTableContent} className="action">
          <ContentContext.Provider
            value={{
              setOpenListTableContent,
              openListTableContent,
              tableIndex,
              setMessageSort,
            }}
          >
            {/* <AllParcelListContent /> */}
          </ContentContext.Provider>
        </Dialog>
      </Container>
    </>
  );
};

export default AddVisitorsRequests;
