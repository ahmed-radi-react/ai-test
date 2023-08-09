import { Box, Button, Input } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import UploadImage from "~/reusable/UploadImage";
import dropImage from "@/assets/images/dropimage.png";
import { ReactComponent as EditIcon } from "@/assets/icons/edit.svg";
import MakeActive from "~/reusable/MakeActive";
import { mutationRequest } from "@/requests-body/queries";
import { useNavigate } from "react-router-dom";
import BackNavigate from "~/reusable/BackNavigate";
import MessageAlert from "~/reusable/MessageAlert";
import { ReactComponent as Canceled } from "@/assets/icons/CanceledIcon.svg";
import { imageFormats, maintenance, timeAvailable } from "@/utils/constant";
import { FileUploader } from "react-drag-drop-files";

const addTime = Object.entries(timeAvailable).flatMap(([day, times]) =>
  times?.state.map((val) => ({
    from: val.from,
    to: val.to,
    day,
    hour: times.hour,
    time: times.time,
    id: val.id,
  }))
);

const AddNewMaintenance = () => {
  const { mutate } = mutationRequest({
    url: `/service/${maintenance}`,
    method: "post",
    isAuth: true,
  });
  const navigate = useNavigate();
  const [hideMessage, setHideMessage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>({});
  const [addService, setAddService] = useState<
    { id: number; isActive: boolean }[]
  >([{ id: 0, isActive: true }]);
  const [edit, setEdit] = useState(false);
  const [base64, setBase64] = useState<{
    [key: string]: string | ArrayBuffer | null;
  }>({});
  const imageChange = (file: File, id: number) => {
    const FR = new FileReader();
    FR.addEventListener("load", function (evt: ProgressEvent<FileReader>) {
      if (evt.target) {
        const thumb = `thumb_${id}`;
        setBase64((prev) => {
          return {
            ...prev,
            [thumb]: (evt?.target?.result as string)?.split(",")[1],
          };
        });

        if (file) {
          setSelectedImage((prev: { [key: string]: any }) => {
            if (file) {
              const thumb = `thumb_${id}`;
              return { ...prev, [thumb]: file };
            }
          });
          setEdit(true);
        }
      }
    });
    file && FR.readAsDataURL(file);
  };

  const handleAddService = () => {
    setAddService((prev) => {
      return [...prev, { id: prev[prev.length - 1]?.id + 1, isActive: true }];
    });
    setAvailabiliySlotSub((prev) => {
      return [...prev, addTime];
    });
  };

  const handleDeleteService = (id: number) => {
    setAddService((prev) => prev.filter((item) => item.id !== id));
    setAvailabiliySlotSub((prev) =>
      prev.filter((item, index) => id - 1 !== index)
    );
  };
  const [value, setValue] = useState<{ [key: string]: any }>({});
  const handleChangeInput = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    id: number
  ) => {
    setValue((prev: { [key: string]: any }) => {
      const thumb = `thumb_${id}`;
      return {
        ...prev,
        [thumb]: { ...prev[thumb], [e.target.name]: e.target.value },
      };
    });
    if (e.target.name === "maintenance__name_input") {
      if (e.target.value.length > 20) {
        setValid((prev) => {
          return {
            ...prev,
            name: "Maintenance Name length must be less than 20",
          };
        });
      } else {
        setValid((prev) => {
          return { ...prev, name: "" };
        });
      }
    }
    if (e.target.name === "maintenance__desc_input") {
      if (e.target.value.length > 50) {
        setValid((prev) => {
          return {
            ...prev,
            description: "Maintenance description length must be less than 50",
          };
        });
      } else {
        setValid((prev) => {
          return { ...prev, description: "" };
        });
      }
    }
  };
  const [availabilitySlotSub, setAvailabiliySlotSub] = useState<{}[][]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formTarget = e.target as HTMLFormElement;
    mutate.mutate({
      buildings: [],
      subCategories: [
        ...addService.map((el, index) => {
          const thumb = `thumb_${el.id}`;
          return {
            buildings: [],
            subCategories: [],
            showingSeverityLevel: false,
            name: value[thumb]?.maintenance__name_input,
            description: value[thumb]?.maintenance__desc_input,
            maximumBooking: 100,
            maximumBookingPer: "week",
            status: "active",
            availabilitySlots: availabilitySlotSub[index - 1],
            images: [
              {
                name: selectedImage[thumb]?.name,
                base64: base64[thumb],
                alt: selectedImage[thumb]?.name,
                description: selectedImage[thumb]?.name,
              },
            ],
            icon: {
              name: selectedImage[thumb]?.name,
              base64: base64[thumb],
              alt: selectedImage[thumb]?.name,
              description: selectedImage[thumb]?.name,
            },
            bookable: false,
            bookingLimitation: false,
            requireManualApproval: false,
            banners: [],
            hasSubCategories: true,
          };
        }),
      ].filter((_, i) => i > 0),
      showingSeverityLevel: formTarget.active_severity?.checked,
      name: value?.thumb_0?.maintenance__name_input,
      description: value?.thumb_0?.maintenance__desc_input,
      maximumBooking: 100,
      maximumBookingPer: "week",
      status: formTarget.active_input[0]?.checked ? "active" : "active",
      availabilitySlots: [],
      images: [
        {
          name: selectedImage?.thumb_0?.name,
          base64: base64?.thumb_0,
          alt: selectedImage?.thumb_0?.name,
          description: selectedImage?.thumb_0?.name,
        },
      ],
      icon: {
        name: selectedImage?.thumb_0?.name,
        base64: base64?.thumb_0,
        alt: selectedImage?.thumb_0?.name,
        description: selectedImage?.thumb_0?.name,
      },
      bookable: addService.length >= 2 ? false : true,
      bookingLimitation: false,
      requireManualApproval: false,
      banners: [],
      hasSubCategories: addService.length >= 2 ? true : false,
    });
  };

  const [message, setMessage] = useState("");
  useEffect(() => {
    let time: ReturnType<typeof setTimeout>;
    if (mutate.isSuccess) {
      navigate(`/${maintenance}/maintenancelist`, {
        state: { data: "success", message: "Maintenance" },
      });
    }
    if (mutate.isError) {
      setHideMessage(true);
      setMessage((mutate.error as { message: string }).message);
      time = setTimeout(() => {
        setHideMessage(false);
      }, 3000);
    }
    return () => {
      clearTimeout(time);
    };
  }, [mutate.isSuccess, mutate.isError]);
  const [valid, setValid] = useState({ name: "", description: "" });
  const validation = (): boolean =>
    !!base64?.thumb_0 &&
    !!value?.thumb_0?.maintenance__name_input?.trim() &&
    !!value?.thumb_0?.maintenance__desc_input?.trim();

  const handleSwitchChange = (id: number | undefined) => {
    setAddService((prev) =>
      prev.map((val) => {
        return val?.id === id
          ? { ...val, isActive: !val?.isActive }
          : { ...val };
      })
    );
  };

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!(addService.length === 1)) {
      scrollRef?.current?.scrollTo({
        behavior: "smooth",
        top: scrollRef?.current?.scrollHeight,
      });
    }
  }, [addService.length]);

  return (
    <>
      {hideMessage && (
        <div className="content content_alert">
          <MessageAlert
            error={true}
            messagesort={{
              icon: Canceled,
              message: message,
              title: "Canceled",
              style: "delete",
            }}
          />
        </div>
      )}
      <Container className="addnewmaintenance">
        <BackNavigate title={"Maintenance"} />
        <form onSubmit={handleSubmit}>
          <div className="add_maintenanve_header">
            <span>Add Maintenance</span>
            <div className="btn">
              <Button
                variant="contained"
                className={`btn ${!validation() ? "add_disabled" : "add"} `}
                type="submit"
              >
                {mutate.isLoading ? "Loading..." : "Add Service"}
              </Button>
            </div>
          </div>
          <Box
            ref={scrollRef}
            display="flex"
            flexDirection={"column"}
            margin="auto"
            borderRadius="6px"
            boxShadow={"0px 0px 40px 2px rgba(0, 0, 0, 0.08)"}
            maxWidth="1153px"
            width="100%"
            bgcolor="white"
            className="maintainance_cont_scrolled"
          >
            {addService.map((elem, key) => {
              return (
                <div
                  key={elem.id + key}
                  className={`new_service_cont ${
                    elem.id !== 0 ? "more_service" : ""
                  } ${key === addService.length - 1 ? "last_service" : ""}`}
                >
                  <div className={`${key < 1 ? "sub_categores" : ""}`}>
                    {elem.id > 0 && <h3>Sub Categories</h3>}
                    <div className="img_info_div">
                      <div className="dropimage_div">
                        <div>
                          {!selectedImage[`thumb_${elem.id}`] ? (
                            <UploadImage
                              handleChange={(e: File) =>
                                imageChange(e, elem.id)
                              }
                              dropImage={dropImage}
                              small={elem.id > 0 ? true : false}
                              className={`upload_image ${
                                elem.id > 0 ? "other_maintenance" : ""
                              }`}
                              name="maintenance_image"
                            />
                          ) : !selectedImage[`thumb_${elem.id}`] && key >= 1 ? (
                            <UploadImage
                              handleChange={(e: File) =>
                                imageChange(e, elem.id)
                              }
                              dropImage={dropImage}
                              small={elem.id > 0 ? true : false}
                              className={`upload_image ${
                                elem.id > 0 ? "other_maintenance" : ""
                              }`}
                              name="maintenance_image"
                            />
                          ) : (
                            <div
                              className={`uploadimage ${
                                elem.id > 0 ? "other_maintenance" : ""
                              }`}
                            >
                              {key < 1 && (
                                <img
                                  src={
                                    selectedImage[`thumb_${elem.id}`]
                                      ? URL.createObjectURL(
                                          selectedImage[`thumb_${elem.id}`]
                                        )
                                      : ""
                                  }
                                  alt="Thumb"
                                />
                              )}
                              {key >= 1 && (
                                <img
                                  src={
                                    selectedImage[`thumb_${elem.id}`]
                                      ? URL.createObjectURL(
                                          selectedImage[`thumb_${elem.id}`]
                                        )
                                      : ""
                                  }
                                  alt="Thumb"
                                />
                              )}
                              <label className="editdiv">
                                <FileUploader
                                  handleChange={(e: File) =>
                                    imageChange(e, elem.id)
                                  }
                                  name="file"
                                  types={imageFormats}
                                  classes="fileinput display_upload"
                                />
                                <EditIcon className="edit_icon" />
                              </label>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="input_">
                        <div className="input_with_valid">
                          <Input
                            placeholder={
                              elem.id <= 0
                                ? "Maintenance Service Name"
                                : "Sub category Name"
                            }
                            name="maintenance__name_input"
                            onChange={(
                              e: React.ChangeEvent<HTMLTextAreaElement>
                            ) => {
                              handleChangeInput(e, elem.id);
                            }}
                            value={value.maintenance__name_input}
                          />
                          <span className="valid_div">{valid.name}</span>
                        </div>
                        <div className="input_with_valid">
                          <Input
                            className="service_descreption"
                            placeholder="Service Descreption"
                            name="maintenance__desc_input"
                            onChange={(
                              e: React.ChangeEvent<HTMLTextAreaElement>
                            ) => handleChangeInput(e, elem.id)}
                            value={value.maintenance__desc_input}
                          />
                          <span className="valid_div">{valid.description}</span>
                        </div>

                        {key < 1 && (
                          <Button
                            variant="contained"
                            className="addSub"
                            onClick={handleAddService}
                          >
                            {" "}
                            Add Service Sub category
                          </Button>
                        )}
                      </div>
                    </div>
                    <span className="note">
                      Note: this image will reflect to the mobile app.
                    </span>
                    <div className="make_active_div">
                      <MakeActive
                        width={40}
                        height={20}
                        bullerWidth={16}
                        bullerHeight={16}
                        translate={"translateX(20px)"}
                        // subClass={true}
                        text={"Maintenance"}
                      />
                      <MakeActive
                        width={40}
                        height={20}
                        bullerWidth={16}
                        bullerHeight={16}
                        translate={"translateX(20px)"}
                        // subClass={true}
                        title1={"Severity"}
                      />
                    </div>
                  </div>
                  <div className="time_cont">
                    {elem.id > 0 && (
                      <>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Button
                            variant="text"
                            className="del_service"
                            onClick={() => handleDeleteService(elem.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </Box>
        </form>
      </Container>
    </>
  );
};

export default AddNewMaintenance;
