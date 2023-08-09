import { Box, Button, SelectChangeEvent } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import UploadImage from "~/reusable/UploadImage";
import dropImage from "@/assets/images/dropfourimage.png";
import dropfourimage from "@/assets/images/dropfourimage.png";
import AddAmenityInformation from "./AddAmenityInformation";
import TimeAvailability from "~/reusable/TimeAvailability";
import AmenityBuildingSetting from "./AmenityBuildingSetting";
import AddAmenitySubCategory from "./AddAmenitySubCategory";
import { ReactComponent as EditIcon } from "@/assets/icons/edit.svg";
import { ReactComponent as DeleteIcon } from "@/assets/icons/deleteIconImage.svg";
import { ReactComponent as AddIcon } from "@/assets/icons/UploadIcon.svg";
import {
  IValue,
  IbuidlingData,
  TsettingBookableAndPayment,
  TbannersFromLocation,
} from "~/types/types";
import { useLocation, useNavigate } from "react-router-dom";
import { mutationRequest, queryRequest } from "@/requests-body/queries";
import BackNavigate from "~/reusable/BackNavigate";
import { ReactComponent as CloseIcon } from "@/assets/icons/close.svg";
import { ReactComponent as Elipse } from "@/assets/icons/elipse.svg";
import CarouselDialog from "~/reusable/dialog/CarouselDialog";
import MessageAlert from "~/reusable/MessageAlert";
import { ReactComponent as Canceled } from "@/assets/icons/CanceledIcon.svg";

import { FileUploader } from "react-drag-drop-files";
import { addTime, amenities, handleChange, imageFormats } from "@/utils/constant";

const AddNewAmenity = () => {
  const { state: stateFromLocation, pathname } = useLocation();
  const navigate = useNavigate();
  const [slotsDataBuilding, setSlotsDataBuilding] = useState<string[]>([]);
  const [availabilitySlot, setAvailabiliySlot] = useState<{}[]>(addTime);
  const [availabilitySlotSub, setAvailabiliySlotSub] = useState<{}[][]>([]);
  const { data: building, isSuccess: isSuccessBuilding } = queryRequest({
    url: "/building?organizationId=63a8b4cfaf1b0c19ca045a06&offset=0&limit=100",
    method: "get",
    key: "buildingKey",
  });

  useEffect(() => {
    if (stateFromLocation?.name) {
      setCapacity(stateFromLocation?.capacity);
      setSlotsDataBuilding((prev) => {
        if (stateFromLocation?.buildings[0]?._id) {
          return stateFromLocation?.buildings.map((item: any) => {
            return item._id;
          });
        }
        return [...prev];
      });
      setAllowMultipleSlots(stateFromLocation?.allowToSelectMultipleSlots);
      setImageFromLocation(stateFromLocation?.images);
      setBannersFromLocation(stateFromLocation?.banners);
      setMaximumBookingFor(stateFromLocation?.maximumBookingFor);
      setSettingBookableAndPayment((prev) => {
        if (stateFromLocation?.maximumBookingFor === "apartment") {
          return { ...prev, bookingLimitationPerAprt: true };
        } else if (stateFromLocation?.maximumBookingFor === "apartment") {
        }
        return { ...prev };
      });
    }
  }, []);
  const [buidlingData, setBuildingData] = useState<IbuidlingData[]>([]);
  useEffect(() => {
    if (isSuccessBuilding) {
      setBuildingData(building?.data?.items);
    }
  }, [isSuccessBuilding]);
  const [slotsData, setSlotsData] = useState<
    {
      day: string;
      from: string;
      to: string;
    }[]
  >([]);

  const [value, setValue] = useState<IValue>({
    name_input: stateFromLocation?.name ? stateFromLocation?.name : "",
    description_input: stateFromLocation?.description
      ? stateFromLocation?.description
      : "",
    instraction_input: stateFromLocation?.guideLinesAndInstructions
      ? stateFromLocation?.guideLinesAndInstructions
      : "",
  });
  const [selectVal, setSelectVal] = useState<string>("month");
  const [selectedImage, setSelectedImage] = useState<File[]>([]);
  const [selectedAppBanner, setSAelectedAppBanner] = useState<
    {
      alt: string;
      base64: string;
      description: string;
      name: string;
      url: File;
    }[]
  >([]);

  const [addService, setAddService] = useState<number[]>([]);
  const [editimage, setEditImage] = useState(false);
  const [editbanner, setEditBanner] = useState(false);
  const [base64, setBase64] = useState<(string | ArrayBuffer | null)[]>([]);
  const { mutate } = mutationRequest({
    url: "/service/amenity",
    method: "post",
    isAuth: true,
  });
  const [activeBtn, setActiveBtn] = useState(false);
  const [convertedData, setConvertedData] = useState<
    { from: string; to: string; day: string }[][]
  >([]);

  const [subTime, setSubTime] = useState<{}[]>([]);
  const [count, setCount] = useState<number | undefined>(
    stateFromLocation?.maximumBooking
      ? stateFromLocation?.maximumBooking
      : undefined
  );
  const [capacity, setCapacity] = useState<number | undefined>(undefined);
  const [valid, setValid] = useState({
    name: "",
    description: "",
    count: "",
    capacity: "",
  });

  const [settingBookableAndPayment, setSettingBookableAndPayment] =
    useState<TsettingBookableAndPayment>({
      bookable: stateFromLocation?.bookable
        ? stateFromLocation.bookable
        : false,
      requireManualApproval: stateFromLocation?.requireManualApproval
        ? stateFromLocation?.requireManualApproval
        : false,
      bookingLimitationPerAprt: false,
      bookingLimitationPerTenant: false,
      requirePeyment: false,
    });

  const { mutate: editMutate } = mutationRequest({
    url: `/service/amenity/${stateFromLocation?._id}`,
    method: "PUT",
    isAuth: true,
  });

  const [bannersFromLocation, setBannersFromLocation] = useState<
    TbannersFromLocation[]
  >([]);

  const [maximumBookingFor, setMaximumBookingFor] = useState("");

  useEffect(() => {
    if (stateFromLocation?.name) {
      setAvailabiliySlot(stateFromLocation?.availabilitySlots);
    }
  }, [pathname]);
  const [allowMultipleSlots, setAllowMultipleSlots] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formTarget = e.target as HTMLFormElement;
    const formData = new FormData(formTarget);
    if (!stateFromLocation?.name) {
      mutate.mutate({
        facilities: [],
        guideLinesAndInstructions: formTarget.instraction_input.value,
        maximumBooking: count && +count,
        maximumBookingPer: selectVal,
        capacity: capacity ? +capacity : null,
        notes: "string",
        subCategories: [
          ...addService.map((el: number, index) => {
            return {
              facilities: [],
              guideLinesAndInstructions: formTarget.instraction_input.value,
              maximumBooking: count,
              maximumBookingPer: selectVal,
              capacity: formData.get(`sub_capacity${index + 1}`),
              notes: "string",
              subCategories: [],
              name: formData.get(`sub_name_input${index + 1}`),
              description: formData.get(`sub_desc_input${index + 1}`),
              status:
                formData.get(`active_input${el}`) !== null ? "active" : "off",
              availabilitySlots: availabilitySlotSub[index],
              images: [
                {
                  name: selectedImage[el]?.name,
                  base64: base64[el],
                  alt: selectedImage[el]?.name,
                  description: selectedImage[el]?.name,
                },
              ],
              icon: {
                name: selectedImage[el]?.name,
                base64: base64[el],
                alt: selectedImage[el]?.name,
                description: selectedImage[el]?.name,
              },
              bookable: false,
              bookingLimitation: formTarget.amenity2.checked,
              requireManualApproval: formTarget.amenity3.checked,
              banners: selectedAppBanner,
              buildings: slotsDataBuilding,
              hasSubCategories: true,
            };
          }),
        ],
        name: formTarget.name_input.value,
        description: formTarget.description_input.value,
        status: "active",
        availabilitySlots: availabilitySlot,
        images: [
          {
            name: selectedImage[0]?.name,
            base64: base64[0],
            alt: selectedImage[0]?.name,
            description: selectedImage[0]?.name,
          },
        ],
        icon: {
          name: selectedImage[0]?.name,
          base64: base64[0],
          alt: selectedImage[0]?.name,
          description: selectedImage[0]?.name,
        },
        bookable:
          addService.length >= 1 ? false : settingBookableAndPayment.bookable,
        bookingLimitation: settingBookableAndPayment.bookingLimitationPerAprt,
        requireManualApproval: settingBookableAndPayment.requireManualApproval,
        banners: selectedAppBanner,
        buildings: slotsDataBuilding,
        hasSubCategories: addService.length >= 1 ? true : false,
        maximumBookingFor: maximumBookingFor,
        allowToSelectMultipleSlots: allowMultipleSlots,
      });
    } else {
      if (selectedImage[0]?.name) {
        editMutate.mutate({
          _id: stateFromLocation?._id,
          facilities: [],
          guideLinesAndInstructions: formTarget.instraction_input.value,
          maximumBooking: count,
          maximumBookingPer: selectVal,
          capacity: 0,
          notes: "string",
          subCategories: [
            ...addService.map((el: number, index) => {
              return {
                facilities: [],
                guideLinesAndInstructions: formTarget.instraction_input.value,
                maximumBooking: count,
                maximumBookingPer: selectVal,
                capacity: 0,
                notes: "string",
                subCategories: [],
                name: formData.get(`sub_name_input${index + 1}`),
                description: formData.get(`sub_desc_input${index + 1}`),
                status:
                  formData.get(`active_input${el}`) !== null ? "active" : "off",
                availabilitySlots: availabilitySlotSub[index],
                images: [
                  {
                    name: selectedImage[el]?.name,
                    base64: base64[el],
                    alt: selectedImage[el]?.name,
                    description: selectedImage[el]?.name,
                  },
                ],
                icon: {
                  name: selectedImage[el]?.name,
                  base64: base64[el],
                  alt: selectedImage[el]?.name,
                  description: selectedImage[el]?.name,
                },
                bookable: false,
                bookingLimitation: formTarget.amenity2.checked,
                requireManualApproval: formTarget.amenity3.checked,
                banners: selectedAppBanner,
                buildings: slotsDataBuilding,
                hasSubCategories: true,
              };
            }),
          ],
          name: formTarget.name_input.value,
          description: formTarget.description_input.value,
          status: "active",
          availabilitySlots: availabilitySlot,
          images: [
            {
              name: selectedImage[0]?.name,
              base64: base64[0],
              alt: selectedImage[0]?.name,
              description: selectedImage[0]?.name,
            },
          ],
          icon: {
            name: selectedImage[0]?.name,

            base64: base64[0],
            alt: selectedImage[0]?.name,

            description: selectedImage[0]?.name,
          },
          bookable:
            addService.length >= 1 ? false : settingBookableAndPayment.bookable,
          bookingLimitation: settingBookableAndPayment.bookingLimitationPerAprt,
          requireManualApproval:
            settingBookableAndPayment.requireManualApproval,
          banners: selectedAppBanner,
          buildings: slotsDataBuilding,
          hasSubCategories: addService.length >= 1 ? true : false,
          maximumBookingFor: maximumBookingFor,
          allowToSelectMultipleSlots: allowMultipleSlots,
        });
      } else {
        editMutate.mutate({
          _id: stateFromLocation?._id,
          facilities: [],
          guideLinesAndInstructions: formTarget.instraction_input.value,
          maximumBooking: count,
          maximumBookingPer: selectVal,
          capacity: 0,
          notes: "string",
          subCategories: [
            ...addService.map((el: number, index) => {
              return {
                facilities: [],
                guideLinesAndInstructions: formTarget.instraction_input.value,
                maximumBooking: count,
                maximumBookingPer: selectVal,
                capacity: 0,
                notes: "string",
                subCategories: [],
                name: formData.get(`sub_name_input${index + 1}`),
                description: formData.get(`sub_desc_input${index + 1}`),
                status:
                  formData.get(`active_input${el}`) !== null ? "active" : "off",
                availabilitySlots: availabilitySlotSub[index],
                images: [
                  {
                    name: selectedImage[el]?.name,
                    base64: base64[el],
                    alt: selectedImage[el]?.name,
                    description: selectedImage[el]?.name,
                  },
                ],
                icon: {
                  name: selectedImage[el]?.name,
                  base64: base64[el],
                  alt: selectedImage[el]?.name,
                  description: selectedImage[el]?.name,
                },
                bookable: false,
                bookingLimitation: formTarget.amenity2.checked,
                requireManualApproval: formTarget.amenity3.checked,
                banners: selectedAppBanner,
                buildings: slotsDataBuilding,
                hasSubCategories: true,
              };
            }),
          ],
          name: formTarget.name_input.value,
          description: formTarget.description_input.value,
          status: "active",
          availabilitySlots: availabilitySlot,
          bookable:
            addService.length >= 1 ? false : settingBookableAndPayment.bookable,
          bookingLimitation: settingBookableAndPayment.bookingLimitationPerAprt,
          requireManualApproval:
            settingBookableAndPayment.requireManualApproval,
          banners: selectedAppBanner,
          buildings: slotsDataBuilding,
          hasSubCategories: addService.length >= 1 ? true : false,
          maximumBookingFor: maximumBookingFor,
          allowToSelectMultipleSlots: allowMultipleSlots,
        });
      }
    }
  };
  const handleSelect = (e: SelectChangeEvent<string>) => {
    setSelectVal(e.target.value);
  };
  useEffect(() => {
    if (mutate.isSuccess || editMutate.isSuccess) {
      navigate(`/${amenities}/amenitieslist`);
    }
  }, [mutate.isSuccess, editMutate.isSuccess]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleAddService = () => {
    setAddService((prev) => {
      return [...prev, prev?.length + 1];
    });
    setAvailabiliySlotSub((prev) => [...prev, addTime]);
  };

  useEffect(() => {
    if (!(addService.length === 0)) {
      scrollRef?.current?.scrollTo({
        behavior: "smooth",
        top: scrollRef?.current?.scrollHeight,
      });
    }
  }, [addService.length]);

  const handleDeleteService = (id: number) => {
    setAddService((prev) => prev.filter((item) => item !== id));
  };
  const [message, setMessage] = useState("");
  const [hideMessage, setHideMessage] = useState(false);
  useEffect(() => {
    let time: ReturnType<typeof setTimeout>;
    if (mutate.isSuccess) {
      navigate(`/${amenities}/amenitieslist`, {
        state: { data: "success", message: "Amenity" },
        replace: true,
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
  useEffect(() => {
    if (
      value.name_input.length &&
      value.description_input.length &&
      value.instraction_input.length &&
      count &&
      count > 0 &&
      count < 1000
    ) {
      setActiveBtn(true);
    } else {
      setActiveBtn(false);
    }
  }, [value, convertedData, count]);
  const [addedbanner, SetAddedBanner] = useState(false);
  const handleClickBanner = () => {
    SetAddedBanner(true);
  };
  const handleClose = () => {
    SetAddedBanner(false);
  };
  const [imageFromLocation, setImageFromLocation] = useState<
    {
      alt: string;
      description: string;
      url: string;
      name: string;
    }[]
  >([]);

  const handleDelete = () => {
    setSelectedImage([]);
    setImageFromLocation([]);
  };

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
      <Container className="addAmenity">
        <BackNavigate title={"Amenities"} />
        <form onSubmit={handleSubmit}>
          <div className="addamenity_header">
            <span className="addamenityspan">Add Amenity</span>
            <div className="addamenity_btn_div">
              <Button
                className={`btn ${activeBtn ? "add_button" : "deactive"} `}
                type="submit"
              >
                {!stateFromLocation?.name ? "Add Amenity" : "Save"}
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
          >
            <div className="boxdiv_addamenity">
              <div>
                <div className="dropimage_div">
                  <div>
                    {!selectedImage[0] && !imageFromLocation.length ? (
                      <UploadImage
                        handleChange={handleChange({
                          status: "add",
                          isBanner: false,
                          el: 0,
                          setBase64,
                          setSelectedImage,
                          selectedImage,
                          setEditBanner,
                        })}
                        dropImage={dropImage}
                        className="upload_image"
                        name="image_1"
                      />
                    ) : (
                      <div className="uploadimage">
                        {!editbanner && imageFromLocation?.length ? (
                          <div className="opacity_divs">
                            <div className="opacity"></div>
                            <img
                              src={stateFromLocation?.images[0]?.url}
                              alt="Thumb"
                            />
                          </div>
                        ) : (
                          <>
                            {editbanner ? (
                              <div className="opacity_divs">
                                <div className="opacity"></div>
                                <img
                                  src={URL.createObjectURL(selectedImage[0])}
                                  alt="Thumb"
                                />
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </>
                        )}

                        <label className="editdiv">
                          <FileUploader
                            handleChange={handleChange({
                              status: "edit",
                              isBanner: false,
                              el: 0,
                              setBase64,
                              setSelectedImage,
                              selectedImage,
                              setEditBanner,
                            })}
                            name="file"
                            types={imageFormats}
                            classes="fileinput display_upload"
                          />
                          <EditIcon />
                        </label>
                        <div
                          className="delete_amenity_image"
                          onClick={handleDelete}
                        >
                          <DeleteIcon />
                        </div>
                      </div>
                    )}

                    <span className="photo_span">Amenity Photo</span>
                  </div>
                  <div>
                    {(!selectedAppBanner || !selectedAppBanner?.length) &&
                    !bannersFromLocation.length ? (
                      <UploadImage
                        handleChange={handleChange({
                          status: "add",
                          isBanner: true,
                          el: 0,
                          selectedImage,
                          setSAelectedAppBanner,
                          setEditImage,
                        })}
                        className="upload_app_banner"
                        dropImage={dropfourimage}
                        name="image_3"
                        banner={true}
                      />
                    ) : (
                      <div className="uploadimage uploadimagebanner">
                        {selectedAppBanner?.length !== 4 && (
                          <div className="add_new">
                            <FileUploader
                              handleChange={handleChange({
                                status: "add",
                                isBanner: true,
                                el: 0,
                                selectedImage,
                                setSAelectedAppBanner,
                                setEditImage,
                              })}
                              name="file"
                              types={imageFormats}
                              classes="fileinput"
                              multiple={true}
                            />
                            <AddIcon />
                          </div>
                        )}
                        {!editimage && stateFromLocation?.name ? (
                          <div className="opacity_divs">
                            <div className="opacity"></div>
                            <img
                              src={bannersFromLocation[0]?.url}
                              alt="Thumb"
                            />
                          </div>
                        ) : (
                          <>
                            {editimage ? (
                              <div className="opacity_divs">
                                <div className="opacity"></div>
                                <img
                                  src={URL.createObjectURL(
                                    selectedAppBanner[
                                      selectedAppBanner.length - 1
                                    ]?.url
                                  )}
                                  alt="Thumb"
                                />
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </>
                        )}
                        <label className="editdiv">
                          <FileUploader
                            handleChange={handleChange({
                              status: "edit",
                              isBanner: true,
                              el: 0,
                              selectedImage,
                              setSAelectedAppBanner,
                            })}
                            types={imageFormats}
                            classes="fileinput display_upload "
                            name="image_4"
                            multiple={true}
                          />
                          <EditIcon />
                        </label>
                        <div
                          className="delete_amenity_image"
                          onClick={() => {
                            if (
                              stateFromLocation?.name &&
                              bannersFromLocation.length
                            ) {
                              return setBannersFromLocation((prev) => {
                                if (prev) {
                                  return prev.slice(0, -1);
                                } else {
                                  return [];
                                }
                              });
                            }
                            return setSAelectedAppBanner((prev) => {
                              if (prev) {
                                return prev.slice(0, -1);
                              } else {
                                return [];
                              }
                            });
                          }}
                        >
                          <DeleteIcon />
                        </div>
                        <div
                          className="imagebanner"
                          onClick={handleClickBanner}
                        >
                          {selectedAppBanner?.length < 4 ? (
                            <span>
                              +{4 - selectedAppBanner?.length} more Images added{" "}
                            </span>
                          ) : (
                            "4 images are added"
                          )}
                        </div>
                      </div>
                    )}
                    <span className="fourimage_span">
                      Add 4 Images or less to be displayed on the app banner
                    </span>
                  </div>
                </div>
                <AddAmenityInformation
                  handleAddService={handleAddService}
                  value={value}
                  setValue={setValue}
                  setValid={setValid}
                  valid={valid}
                />
              </div>
              <div>
                <TimeAvailability
                  setConvertedData={setConvertedData}
                  convertedData={convertedData[0]}
                  slotsData={slotsData[0]}
                  setSlotsData={setSlotsData}
                  el={0}
                  setAvailabiliySlot={setAvailabiliySlot}
                  availabilitySlots={
                    stateFromLocation?.name
                      ? stateFromLocation?.availabilitySlots
                      : availabilitySlot
                  }
                  setAllowMultipleSlots={setAllowMultipleSlots}
                  allowMultipleSlots={allowMultipleSlots}
                />
                <AmenityBuildingSetting
                  count={count}
                  handleSelect={handleSelect}
                  buidlingData={buidlingData}
                  slotsDataBuilding={slotsDataBuilding}
                  setSlotsDataBuilding={setSlotsDataBuilding}
                  setCount={setCount}
                  setValid={setValid}
                  valid={valid}
                  capacity={capacity}
                  setCapacity={setCapacity}
                  addService={addService}
                  setSettingBookableAndPayment={setSettingBookableAndPayment}
                  bookable={settingBookableAndPayment?.bookable}
                  requireManualApproval={
                    settingBookableAndPayment?.requireManualApproval
                  }
                  bookingLimitationPerTenant={
                    settingBookableAndPayment?.bookingLimitationPerTenant
                  }
                  bookingLimitationPerAprt={
                    settingBookableAndPayment?.bookingLimitationPerAprt
                  }
                  requirePeyment={settingBookableAndPayment?.requirePeyment}
                  maximumBookingPer={stateFromLocation?.maximumBookingPer}
                  setMaximumBookingFor={setMaximumBookingFor}
                />
              </div>
            </div>
            {addService.map((el, index) => {
              return (
                <AddAmenitySubCategory
                  key={index}
                  el={el}
                  availabilitySlot={availabilitySlot}
                  handleDeleteService={handleDeleteService}
                  addService={addService}
                  setConvertedData={setConvertedData}
                  convertedData={convertedData[el]}
                  slotsData={slotsData[el]}
                  setSlotsData={setSlotsData}
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                  availabilitySlotSub={availabilitySlotSub}
                  setAvailabiliySlotSub={setAvailabiliySlotSub}
                  setSubTime={setSubTime}
                  subTime={subTime}
                  handleChange={handleChange}
                />
              );
            })}
          </Box>
        </form>
        {!!addedbanner && selectedAppBanner && selectedAppBanner.length ? (
          <div className="close" onClick={handleClose}>
            <Elipse />
            <CloseIcon />
          </div>
        ) : null}
        {selectedAppBanner && selectedAppBanner.length ? (
          <CarouselDialog addedbanner={addedbanner} data={selectedAppBanner} />
        ) : null}
      </Container>
    </>
  );
};

export default AddNewAmenity;
