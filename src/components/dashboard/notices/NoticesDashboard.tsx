import { Container } from "@mui/system";
import { noticesOverview } from "@/utils/constant";
import Overview from "~/reusable/Overview";
import { ReactComponent as MoreIcon } from "@/assets/icons/moreWhite.svg";
import { ReactComponent as ViewsIcon } from "@/assets/icons/viewsIcon.svg";
import { Button, CircularProgress } from "@mui/material";
import { mutationRequest, queryRequest } from "@/requests-body/queries";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { ReactComponent as AddIcon } from "@/assets/icons/add.svg";
import MessageAlert from "~/reusable/MessageAlert";
import { ReactComponent as CongratsIcon } from "@/assets/icons/CongratsSvg.svg";
import Dropdown from "react-multilevel-dropdown";
import { INoticeData } from "~/types/types";
import Pagination from "~/reusable/Pagination";
import { queryClient } from "../../../main";
import { StatusCounterCard } from "@/_helpers/StatusCounterCard";

const NoticesDashboard = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const success = (data: INoticeData[]) => {
    setNoticeData(data);
  };
  const { state } = useLocation();
  const { data, isSuccess, isLoading, refetch } = queryRequest({
    url: `/service-request/notices?offset=${currentPage}&limit=6`,
    method: "get",
    key: "noticeKey + 10000" + currentPage,
    cb: success,
  });
  const [noticeData, setNoticeData] = useState<INoticeData[]>([]);
  const [noticesOverViewReq, setNoticesOverViewReq] = useState(noticesOverview);
  useEffect(() => {
    if (isSuccess && data?.data?.items) {
      const countByStatus: { [key: string]: number } = {};
      data.data.items.forEach((val: { status: string }) => {
        if (countByStatus[val.status] === undefined) {
          countByStatus[val.status] = 0;
        }
        countByStatus[val.status]++;
      });
      setNoticesOverViewReq((prev: any) =>
        StatusCounterCard({
          prev,
          data,
        })
      );
    }
  }, [isSuccess, data?.data?.items]);

  const navigate = useNavigate();
  const [hideMessageReq, setHideMessageReq] = useState(false);
  useEffect(() => {
    let time: ReturnType<typeof setTimeout>;
    if (state?.data === "success") {
      setHideMessageReq(true);
    }
    time = setTimeout(() => {
      setHideMessageReq(false);
    }, 3000);
    window.history.replaceState({}, document.title);
    return () => {
      clearTimeout(time);
    };
  }, [state?.data]);
  const [noticesID, setNoticesId] = useState("");
  const {
    mutate: {
      mutate: deleteNoticeRequest,
      isSuccess: deleteNoticeRequestIsSuccess,
    },
  } = mutationRequest({
    url: `/service-request/notices/${noticesID}`,
    method: "delete",
    isAuth: true,
  });
  const hanldeDelete = () => {
    deleteNoticeRequest(
      {
        id: noticesID,
      },
      {
        onSuccess: () => {
          // queryClient.invalidateQueries(["noticeKey + 10000"]);
          refetch();
        },
      }
    );
  };

  if (!isLoading) {
    return (
      <>
        {hideMessageReq && (
          <div className="content content_alert">
            <MessageAlert
              messagesort={{
                icon: CongratsIcon,
                message: "Notice has been added Successfully",
                title: "Done",
                style: "done notice",
              }}
            />
          </div>
        )}
        <Container className="notice_dashboard">
          <div className="notice_dashboard__header">
            <h2 className="notice_title">Notice</h2>
            <div className="button_container">
              <Button
                className="btn_add notice"
                onClick={() => navigate("addnewnotice")}
              >
                <AddIcon />
                Add New Notice
              </Button>
            </div>
          </div>
          <Overview title={"Notices"} data={noticesOverViewReq} />
          <div className="notice_header">
            <span className="span_notice">Notices</span>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              data={data}
              limit={6}
            />
          </div>
          <div className="notices_divs">
            {noticeData?.map((item) => {
              return (
                <div key={item._id} className="notice_item">
                  <div className="image_div">
                    <div className="opacity_div"></div>
                    {item?.images && (
                      <img src={item?.images[0]?.url} alt="notices image" />
                    )}

                    <Dropdown
                      title={<MoreIcon />}
                      buttonClassName="button_dropdown_list_multi_levels_home_notices"
                      menuClassName="menu_dropdown_list_multi_levels_home_notices"
                      position="left"
                      wrapperClassName="wrapper_notices_dropdown"
                      onClick={() => setNoticesId(item._id)}
                    >
                      <Dropdown.Item onClick={hanldeDelete}>
                        Delete Notice
                      </Dropdown.Item>
                    </Dropdown>
                    <span>
                      {moment(item?.scheduleDateFrom).format("ddd MMM DD")}{" "}
                    </span>
                  </div>
                  <div className="info_div">
                    <div className="description_div">
                      <span className="span_desc">{item.title}</span>
                      <div>
                        <ViewsIcon />
                        <span>{item.views} views</span>
                      </div>
                    </div>
                    <span className="detail">{item.description}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </>
    );
  } else {
    return <CircularProgress disableShrink className="circle" />;
  }
};

export default NoticesDashboard;
