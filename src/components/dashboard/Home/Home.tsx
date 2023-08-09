import { Box, Container, Dialog } from "@mui/material";
import sliderTourImage from "@/assets/images/sliderTowerImage.png";
import volanteLogo from "@/assets/images/HomeLogo.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Parallax } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Card from "./Card";
import { cardData, handleChangeStatus } from "@/utils/constant";
import "react-circular-progressbar/dist/styles.css";

import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { mutationRequest, queryRequest } from "@/requests-body/queries";
import HomePageHeader from "~/reusable/RequestListComponents/HomePageHeader";
import { SortHeader } from "~/reusable/RequestListComponents/SortHeader";
import { IData, TEachService, TService } from "~/types/types";
import useControlPagination from "@/hooks/useControlPagination";
import GeneralTable from "~/reusable/GeneralTable";
import { ReactComponent as CopySvg } from "@/assets/icons/CopySvg.svg";
import { columnsHome } from "@/utils/tableColumn";
import MessageAlert from "~/reusable/MessageAlert";
import { ContentContextServiceList } from "@/context/ServiceListContext";
import AllAmenityListContent from "~/reusable/dialog/AllListContent";

const Home = () => {
  const {
    setOpenContent,
    openContent,
    setHideMessage,
    hideMessage,
    setMessageSort: setMessageSortList,
    messagesort: messagesortList,
    setTitle,
    setIndex,
    index,
    setChangeCalendar,
    changeCalendar,
  }: any = useContext(ContentContextServiceList);
  const [viewChart, setViewChart] = useState(cardData);

  const { data: buildings, isSuccess: isSuccessBuilding } = queryRequest({
    url: "/building?offset=0&limit=1",
    method: "get",
    key: "buildingKey",
  });

  const { data: users, isSuccess: isSuccessUsers } = queryRequest({
    url: "/user?offset=0&limit=1",
    method: "get",
    key: "userKey",
  });
  const [servicedData, setServicesData] = useState<TEachService[] | IData[]>(
    []
  );

  const { data: tenants, isSuccess: isSuccessTenants } = queryRequest({
    url: "/tenant?offset=0&limit=1",
    method: "get",
    key: "tenantgKey",
  });
  const [services, setServices] = useState<TService[] | IData[]>();
  const { data: servicesData, isSuccess: isSuccessServices } = queryRequest({
    url: `/service?offset=0&limit=15`,
    method: "get",
    key: `serviceskeyreq`,
    cb: setServices,
  });

  useEffect(() => {
    if (isSuccessBuilding) {
      setViewChart((prev) =>
        prev.map((item) => {
          if (item.header === "Buildings") {
            return { ...item, number: buildings?.data?.count };
          }
          return { ...item };
        })
      );
    }
    if (isSuccessUsers) {
      setViewChart((prev) =>
        prev.map((item) => {
          if (item.header === "Users") {
            return { ...item, number: users?.data?.count };
          }
          return { ...item };
        })
      );
    }
    if (isSuccessTenants) {
      setViewChart((prev) =>
        prev.map((item) => {
          if (item.header === "Tenants") {
            return { ...item, number: tenants?.data?.count };
          }
          return { ...item };
        })
      );
    }
    if (isSuccessServices) {
      setViewChart((prev) =>
        prev.map((item) => {
          if (item.header === "Services") {
            return { ...item, number: servicesData?.data?.count };
          }
          return { ...item };
        })
      );
    }
  }, [isSuccessBuilding, isSuccessTenants, isSuccessUsers, isSuccessServices]);

  // const handleClick = (label: string) => {
  //   setSorttable(label);
  //   if (label === "All") {
  //     setRequests(requestData?.data?.count);
  //   } else {
  //     setRequests(
  //       sortedData.filter((item) => {
  //         return item.label === label;
  //       })[0].data
  //     );
  //   }
  // };
  useEffect(() => {
    setTitle("Home");
  }, []);
  const { currentPage, handlePageChange } = useControlPagination();
  const [searchValue, setSearchValue] = useState("");
  const [homePageSorttable, setHomePageSorttable] = useState<
    string | undefined
  >("All");
  const [checkedItems, setCheckedItems] = useState({
    status: "",
    building: "",
  });
  const [totalRows, setTotalRows] = useState(0);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const changePageLimit = (limit: number) => {
    setLimitPerPage(limit);
    handlePageChange(event, 1);
  };
  const {
    data: servicesReq,
    isSuccess: isSuccessServicesReq,
    isLoading: isLoadingServicesReq,
    refetch: refetchData,
  } = queryRequest({
    url: `/service-request/general?offset=${currentPage}&limit=${limitPerPage}${
      !(homePageSorttable === "All") ? `&flow=${homePageSorttable}` : ""
    }&searchKey=${searchValue}${
      checkedItems.status && `&status=${checkedItems.status}`
    }${
      !!checkedItems?.building?.length
        ? `&buildingId=${checkedItems.building}`
        : ""
    }`,
    method: "get",
    key: `amenitieskeyreq${
      homePageSorttable === "+All" ? "All" : `+&flow=${homePageSorttable}+`
    }+${searchValue}+${checkedItems.status}+${currentPage}+${
      checkedItems.building
    }`,
  });
  useEffect(() => {
    refetchData();
  }, [limitPerPage]);
  useEffect(() => {
    if (isSuccessServicesReq) {
      setServicesData(servicesReq?.data?.items);
      setTotalRows(servicesReq?.data?.count);
    }
  }, [isSuccessServicesReq, servicesReq]);
  const handleRemoveService = () => {
    setHomePageSorttable("All");
  };
  const handleClickCalendar = () => {
    setChangeCalendar((prev: boolean) => !prev);
  };
  const [checkedDate, setCheckedDate] = useState(null);
  const [_, setOpenReq] = useState(false);
  const [buildingsName, setBuildingsName] = useState<
    { name: string; id: string }[]
  >([]);

  useEffect(() => {
    const buildingNames = [
      ...new Set(
        servicedData?.map((item: any) => {
          return { name: item?.building?.name, id: item?.building?._id };
        })
      ),
    ];

    const uniqueAuthors = buildingNames.filter((item, index, self) => {
      return item.name && index === self.findIndex((t) => t.id === item.id);
    });

    setBuildingsName(uniqueAuthors);
  }, [servicedData]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [requestId, setRequestid] = useState<any>();
  const [loadingStatus, setLoadingStatus] = useState("");

  const handleMenuClick = (index: number) => {
    if (index === 5) {
      setHideMessage(true);
      setMessageSortList({
        icon: CopySvg,
        message: "Amenity link has been Copied!",
        title: "Copied",
        style: "copy",
      });
      setTimeout(() => {
        setHideMessage(false);
      }, 3000);
      return;
    } else if (index !== 6) {
      setOpenContent(index);
    } else {
      setOpenContent(index);
    }
  };
  const { mutate } = mutationRequest({
    url: `/service-request/general/status`,
    method: "post",
    isAuth: true,
  });

  return (
    <Container className="home_container">
      <div className="header">
        <h2 className="header__title">Home</h2>
      </div>
      <div className="view">
        <div className="view__content">
          <Swiper
            style={
              {
                "--swiper-pagination-color": "#fff",
              } as React.CSSProperties
            }
            speed={600}
            parallax={true}
            pagination={{
              clickable: true,
            }}
            loop={true}
            modules={[Parallax, Pagination]}
            className="main-dashboard-slider"
          >
            <div
              slot="container-start"
              className="parallax-bg"
              style={{
                backgroundImage: `url('${sliderTourImage}')`,
              }}
              data-swiper-parallax="-23%"
            ></div>
            <SwiperSlide>
              <div className="content_container">
                <div className="logo_container">
                  <img src={volanteLogo} alt={volanteLogo} />
                </div>
                <p className="text">WELCOME TO VOLANTE</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="title" data-swiper-parallax="-300">
                Slide 2
              </div>
              <div className="subtitle" data-swiper-parallax="-200">
                Subtitle
              </div>
              <div className="text" data-swiper-parallax="-100">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam dictum mattis velit, sit amet faucibus felis iaculis
                  nec. Nulla laoreet justo vitae porttitor porttitor.
                  Suspendisse in sem justo. Integer laoreet magna nec elit
                  suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at
                  elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula
                  nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean
                  feugiat non eros quis feugiat.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="title" data-swiper-parallax="-300">
                Slide 3
              </div>
              <div className="subtitle" data-swiper-parallax="-200">
                Subtitle
              </div>
              <div className="text" data-swiper-parallax="-100">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam dictum mattis velit, sit amet faucibus felis iaculis
                  nec. Nulla laoreet justo vitae porttitor porttitor.
                  Suspendisse in sem justo. Integer laoreet magna nec elit
                  suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at
                  elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula
                  nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean
                  feugiat non eros quis feugiat.
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="view__chart">
          {viewChart.map((item, index) => {
            return (
              <Card
                key={index}
                header={item.header}
                number={item.number}
                color={item.color}
                gradient={item.gradient}
                Icon={item.Icon}
                percentage={item.percentage}
              />
            );
          })}
        </div>
      </div>
      <Container className={`requestlist_container req_dashboard`}>
        <Box
          boxShadow={" 0px 0px 40px 2px rgba(0, 0, 0, 0.08)"}
          borderRadius="10px"
          className="box_calendar"
        >
          <HomePageHeader
            index={index}
            services={services}
            // handleClick={handleClick}
            servicedData={servicedData as TEachService[]}
            homePageSorttable={homePageSorttable}
            handleRemoveService={handleRemoveService}
            setHomePageSorttable={setHomePageSorttable}
            count={servicesReq?.data?.count}
          />
          <SortHeader
            changeCalendar={changeCalendar}
            url={"home"}
            handleClickCalendar={handleClickCalendar}
            setOpenReq={setOpenReq}
            title={"Home"}
            buildingsName={buildingsName}
            setCheckedDate={setCheckedDate}
            checkedDate={checkedDate}
            setSearchValue={setSearchValue}
            refetchData={refetchData}
            servicedData={servicedData}
            setServicesData={
              setServicesData as Dispatch<SetStateAction<TEachService[]>>
            }
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
          />
          <GeneralTable
            columns={columnsHome}
            totalRows={totalRows}
            rows={servicedData as IData[]}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            additionalInfo={{
              setRequestid,
              loadingStatus,
              setLoadingStatus,
              handleChangeStatus: handleChangeStatus({
                data: services,
                setLoadingStatus,
                requestId,
                mutate,
                setRequestid,
                refetch: refetchData,
              }),
              setHideMessage,
              hideMessage,
              changeCalendar,
              requestId,
              handleMenuClick,
              openContent,
              setOpenContent,
              isLoadingServicesReq,
              setIndex,
              index,
              showTooltip,
              setShowTooltip,
              contextTitle: "Home",
            }}
            limitPerPage={limitPerPage}
            changePageLimit={changePageLimit}
            title="home"
          />
        </Box>
      </Container>
      <Dialog
        open={!!openContent}
        //onClose={() => handleClose(false)}
        className="action"
      >
        <AllAmenityListContent
          requestId={requestId}
          handleChangeStatus={handleChangeStatus({
            data: services,
            setLoadingStatus,
            requestId,
            mutate,
            setRequestid,
            key: `amenitieskeyreq${
              homePageSorttable === "+All"
                ? "All"
                : `+&flow=${homePageSorttable}+`
            }+${searchValue}+${checkedItems.status}+${currentPage}+${
              checkedItems.building
            }`,
          })}
        />
      </Dialog>
      {hideMessage && <MessageAlert messagesort={messagesortList} />}
    </Container>
  );
};

export default Home;
