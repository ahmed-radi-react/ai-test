import React, { useEffect, useState } from "react";
import { ReactComponent as ArrowIcon } from "@/assets/icons/selescticon.svg";
import {
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormGroup,
  TextField,
  Input,
} from "@mui/material";
import UploadImage from "~/reusable/UploadImage";
import dropImage from "@/assets/images/noticedropImage.png";
import { ReactComponent as EditIcon } from "@/assets/icons/edit.svg";
import { checkItemNotice, handleChange, imageFormats } from "@/utils/constant";
import { ReactComponent as Checkbtn } from "@/assets/icons/checkbtn.svg";
import BackNavigate from "~/reusable/BackNavigate";
import { mutationRequest, queryRequest } from "@/requests-body/queries";
import moment from "moment-timezone";
import { useNavigate } from "react-router-dom";
import MessageAlert from "~/reusable/MessageAlert";
import { ReactComponent as Canceled } from "@/assets/icons/CanceledIcon.svg";
import { ITarget } from "~/types/types";
import { ReactComponent as CloseIcon } from "@/assets/icons/XIcon.svg";
import { ReactComponent as PDFIcon } from "@/assets/icons/PDFBlueIcon.svg";
import { getCookie } from "@/utils/cookies";
import axios from "axios";
import { FileUploader } from "react-drag-drop-files";
function AddNewNotice() {
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState({ name: "Select building", id: "" });
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  const navigate = useNavigate();
  const [descriptionArabic, setDescriptionArabic] = useState("");
  const [showLayout, setShowLayout] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File[]>([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [editbanner, setEditBanner] = useState(false);
  const [base64, setBase64] = useState<(string | ArrayBuffer | null)[]>([]);
  const imageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    status?: string
  ) => {
    const FR = new FileReader();
    FR.addEventListener("load", function (evt: ProgressEvent<FileReader>) {
      if (evt.target) {
        setBase64([(evt.target.result as string)?.split(",")[1]]);
      }
      if (e.target.files && e.target.files.length > 0) {
        if (status) {
          setSelectedImage([e.target.files[0]]);
        } else {
          setSelectedImage([e.target.files[0]]);
          setEditBanner(true);
        }
      }
    });
    e.target.files && FR.readAsDataURL(e.target.files[0]);
  };
  const fileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    status?: string
  ) => {
    const FR = new FileReader();
    FR.addEventListener(
      "load",
      async function (evt: ProgressEvent<FileReader>) {
        const formData = new FormData();
        if (e.target.files) {
          const file = e.target.files[0];
          formData.append("file", file);
        }
        const response = await axios.post(
          "https://tenx-backen-testing.e-butler.com/v1/media/voice",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + " " + getCookie("token"),
            },
          }
        );

        const data = await response.data;
        setSelectedFile(data.data);
      }
    );
    e.target.files && FR.readAsDataURL(e.target.files[0]);
  };
  const handleChangeSelect = (item: { name: string; _id: string }) => {
    setSelect((prev) => {
      return { ...prev, name: item.name, id: item._id };
    });
    setOpen(false);
  };

  const InputStyle = {
    marginTop: "15px",
    backgroundColor: "#F5F5F5",
    width: "100%",
    borderRadius: "10px",
    "& .MuiOutlinedInput-root": {
      padding: "10px",
      fontSize: "14px",
      // background: "red",
      "&:hover .MuiOutlinedInput-notchedOutline": {
        border: "none",
        outline: "none",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "none",
        outline: "none",
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
      outline: "none",
    },
    "& .MuiMenuItem-root:hover": {
      backgroundColor: "transparent",
    },
  };

  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const handleCheckboxChange = (
    event: { target: { checked: boolean } },
    item: { id: number }
  ) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setCheckedItems([...checkedItems, item.id]);
    } else {
      setCheckedItems(checkedItems.filter((id: number) => id !== item.id));
    }
  };
  const [inputVal, setInputVal] = useState({
    title: "",
    desc: "",
    arTitle: "",
    arDesc: "",
  });

  const [errorTitle, setErrorTitle] = useState("");
  const [errorDesc, setErrorDesc] = useState("");
  const [errorTitleAr, setErrorTitleAr] = useState("");
  const [errorDescAr, setErrorDescAr] = useState("");
  const handleInputChange = ({ target: { value, name } }: ITarget) => {
    if (name === "title") {
      if (value.length > 20) {
        setErrorTitle("Notice title must less than 20 characters");
      } else {
        setErrorTitle("");
      }
    } else if (name === "desc") {
      if (value.length > 50) {
        setErrorDesc("Notice description must less than 50 characters");
      } else {
        setErrorDesc("");
      }
    } else if (name === "arTitle") {
      if (value.length > 20) {
        setErrorTitleAr("Notice title must less than 20 characters");
      } else {
        setErrorTitleAr("");
      }
    } else if (name === "arDesc") {
      if (value.length > 50) {
        setErrorDescAr("Notice description must less than 50 characters");
      } else {
        setErrorDescAr("");
      }
    }
    setInputVal((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const { mutate: mutationReqFunction } = mutationRequest({
    url: "/service-request/notices",
    method: "post",
    isAuth: true,
  });
  const { data: building, isSuccess: isSuccessBuilding } = queryRequest({
    url: "/building?offset=0&limit=10000",
    method: "get",
    key: "buildingKey",
  });
  const [buildingData, setBuildingData] = useState<
    { name: string; _id: string }[]
  >([]);
  useEffect(() => {
    if (isSuccessBuilding) {
      setBuildingData(building?.data?.items);
    }
  }, [isSuccessBuilding]);
  const [tenant, setTenant] = useState<{ _id: string; firstName: string }[]>(
    []
  );
  const { data: tenantdata, isSuccess: successTenant } = queryRequest({
    url: "/tenant?offset=0&limit=10000",
    method: "get",
    key: "requsetKeytenant",
  });
  useEffect(() => {
    if (successTenant) {
      setTenant(tenantdata?.data?.items);
    }
  }, [successTenant]);
  const formatString = "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)";
  const momentObj = moment
    .tz(new Date() + "", formatString, "Asia/Yerevan")
    .toISOString();
  const [search, setSearch] = useState(false);
  const [selectTenant, setSelectTenant] = useState({ name: "", id: "" });
  const handleSelectTenant = (item: { firstName: string; _id: string }) => {
    setSelectTenant((prev) => {
      return { ...prev, name: item.firstName, id: item._id };
    });
    setSearch(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutationReqFunction.mutate({
      scheduleDateFrom: momentObj,
      scheduleDateTo: momentObj,
      title: inputVal.title,
      content: inputVal.desc,
      fileUrl: selectedFile,
      isNew: true,
      sendByEmail: checkedItems.includes(2),
      sendTo: "allTenant",
      tenantId: selectTenant.id,
      description: inputVal.desc,
      serviceId: "63b4173142916b799adf2ac3",
      buildingId: select.id,
      requestedBy: "admin",
      actorId: "",
      paymentInfo: {
        paymentMethod: "cash",
        amount: 0,
        prePaidAmount: 0,
      },
      mandatory: checkedItems.includes(1),
      images: [
        {
          name: selectedImage[0]?.name,
          base64: base64[0],
          alt: selectedImage[0]?.name,
          description: selectedImage[0]?.name,
        },
      ],
      timeToServe: "later",
    });
  };
  const validValues = [
    selectedImage[0],
    inputVal.title.length,
    inputVal.desc.length,
    // selectTenant.id.length,
    // select.id,
  ];
  const [disable, setDisable] = useState(false);
  useEffect(() => {
    if (validValues.every((item) => item)) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [selectedImage[0], inputVal.title, inputVal.desc, selectTenant, select]);
  const [message, setMessage] = useState("");
  const [hideMessage, setHideMessage] = useState(false);
  useEffect(() => {
    let time: ReturnType<typeof setTimeout>;
    if (mutationReqFunction.isSuccess) {
      navigate("/notices", {
        state: { data: "success", message: "Building" },
        replace: true,
      });
    }
    if (mutationReqFunction.isError) {
      setHideMessage(true);
      setMessage((mutationReqFunction.error as { message: string }).message);
      time = setTimeout(() => {
        setHideMessage(false);
      }, 3000);
    }
    return () => {
      clearTimeout(time);
    };
  }, [mutationReqFunction.isSuccess, mutationReqFunction.isError]);

  if (!false) {
    return (
      <form onSubmit={handleSubmit}>
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
        <Container className="add_new_notice_container">
          <BackNavigate title={"Notices"} />
          <div className="page_content">
            <div className="page_content__header">
              <h2>Add New Notice</h2>
              <div className="button_container">
                {/* <Button className="btn_save">Draft Notice</Button> */}
                <Button
                  className={`btn_add ${disable ? "submit" : ""}`}
                  type="submit"
                >
                  Add Notice
                </Button>
              </div>
            </div>
            <div className="notice_top_buttom">
              {" "}
              <div className="notice_top">
                <div className="notice_top__left">
                  <div className="image_container">
                    {!selectedImage[0] ? (
                      <UploadImage
                        handleChange={handleChange({
                          status: "add",
                          isBanner: false,
                          setBase64,
                          setSelectedImage,
                          selectedImage,
                          setEditBanner,
                          el: 0,
                        })}
                        dropImage={dropImage}
                        className="upload_image"
                        name="image_1"
                      />
                    ) : (
                      <div className="uploadimage">
                        {editbanner ? (
                          <img
                            src={URL.createObjectURL(selectedImage[0])}
                            alt="Thumb"
                          />
                        ) : (
                          <div></div>
                        )}
                        <label className="editdiv">
                          <FileUploader
                            handleChange={handleChange({
                              status: "edit",
                              isBanner: false,
                              setBase64,
                              setSelectedImage,
                              selectedImage,
                              el: 0,
                            })}
                            name="file"
                            types={imageFormats}
                            classes="fileinput display_upload"
                          />
                          <EditIcon />
                        </label>
                      </div>
                    )}
                  </div>
                  <p className="note_text">
                    Note: this image will reflect to the mobile app.
                  </p>
                </div>
                <div className="notice_top__right">
                  {errorTitle && <p className="error">{errorTitle}</p>}
                  <Input
                    type="text"
                    className="notice_top__right-input_header"
                    placeholder="Notice Title*"
                    onChange={handleInputChange}
                    name="title"
                    value={inputVal.title}
                  />
                  {errorDesc && <p className="error">{errorDesc}</p>}
                  <TextField
                    // id="my-textarea"
                    // label="Enter text here"
                    multiline
                    placeholder="Notice Content"
                    rows={6} //7
                    sx={InputStyle}
                    className="description-input notices"
                    //onChange={(e) => setDescriptionEnglish(e.target.value)}
                    onChange={handleInputChange}
                    name="desc"
                    value={inputVal.desc}
                  />
                </div>
              </div>
              <div className="notice_bottom">
                <div className="notice_bottom__left">
                  <h3 className="notice_bottom__left-header">Notice Setting</h3>
                  <div className="notice_bottom__left-content">
                    <FormGroup>
                      {checkItemNotice.map((item) => {
                        return (
                          <div className="check_div" key={item.id}>
                            <div className="item">
                              <Checkbox
                                className="checkbox"
                                icon={<div className="checkincon false"></div>}
                                checkedIcon={
                                  <div className="checkincon">
                                    <Checkbtn />
                                  </div>
                                }
                                checked={checkedItems.includes(item.id)}
                                onChange={(event) =>
                                  handleCheckboxChange(event, item)
                                }
                              />
                              <div className="span_div">
                                <span>{item.label}</span>
                                <span>{item?.span}</span>
                              </div>
                            </div>
                            {checkedItems.includes(3) && item.id === 3 && (
                              <div className="detail_proport_notices notice">
                                <div
                                  className="select_div"
                                  onClick={handleOpen}
                                >
                                  <span
                                    className={
                                      select.name !== "Select building"
                                        ? "selected"
                                        : ""
                                    }
                                  >
                                    {select.name}
                                  </span>
                                  {open ? (
                                    <ArrowIcon className="down_svg arrow_up" />
                                  ) : (
                                    <ArrowIcon className="down_svg" />
                                  )}
                                </div>
                                {open && (
                                  <div className="options">
                                    {buildingData?.map((item) => {
                                      return (
                                        <div
                                          key={item._id}
                                          onClick={() =>
                                            handleChangeSelect(item)
                                          }
                                        >
                                          {item.name}
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            )}
                            {checkedItems.includes(4) && item.id === 4 && (
                              <div className="searchnoticetenant">
                                <Input
                                  placeholder="Search Tenant"
                                  className="searchTenant"
                                  onFocus={() => setSearch(true)}
                                  value={selectTenant.name}
                                />
                                {search && (
                                  <div className="searchTenant_result">
                                    {tenant?.map((item) => {
                                      return (
                                        <div
                                          key={item._id}
                                          onClick={() =>
                                            handleSelectTenant(item)
                                          }
                                        >
                                          <span>{item?.firstName}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </FormGroup>
                  </div>
                  <hr
                    style={{ border: "1px solid #D9D9D9", marginTop: "10px" }}
                  />
                  <div className="notice_bottom__left-attachment">
                    <div className="attachment-info">
                      <h5>Upload document</h5>
                      <p className="attachment-info__subtitle">
                        Please upload any of documents you want to share it as
                        an attachment
                      </p>
                    </div>
                    {!selectedFile?.length && (
                      <Button
                        variant="contained"
                        component="label"
                        className="btn_upload"
                      >
                        Upload
                        <input
                          type="file"
                          hidden
                          onChange={fileChange}
                          accept="image/gif, image/jpeg, image/png, application/pdf"
                        />
                      </Button>
                    )}
                    {selectedFile?.length ? (
                      <div className="upload_div">
                        <div className="pdf_div">
                          <PDFIcon />
                          <span>{selectedFile?.length}</span>
                        </div>
                        <div
                          onClick={() => setSelectedFile("")}
                          className="svg_div"
                        >
                          <CloseIcon />
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="notice_bottom__right">
                  <div className="notice_bottom__right-add_layout">
                    <button
                      className={`${
                        errorTitle && errorDesc
                          ? "mt-20"
                          : !errorTitle && !errorDesc
                          ? ""
                          : "mt-5"
                      }`}
                      onClick={() => setShowLayout((prev: boolean) => !prev)}
                    >
                      {showLayout ? "Remove" : "+ Add"} Arabic Layout
                    </button>
                  </div>
                  {showLayout && (
                    <div className="notice_bottom__right-layout">
                      {errorTitleAr && <p className="error">{errorTitleAr}</p>}
                      <Input
                        type="text"
                        className="notice_bottom__right-layout_input"
                        placeholder="عنوان الملحوظة*"
                        onChange={handleInputChange}
                        name="arTitle"
                        value={inputVal.arTitle}
                      />
                      {errorDescAr && <p className="error">{errorDescAr}</p>}
                      <TextField
                        // id="my-textarea"
                        // label="Enter text here"
                        multiline
                        placeholder="محتوي الملحوظة"
                        rows={6} //7
                        sx={InputStyle}
                        dir="rtl"
                        className="notice_bottom__right-layout_description"
                        onChange={handleInputChange}
                        name="arDesc"
                        value={inputVal.arDesc}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </form>
    );
  } else {
    return <CircularProgress disableShrink className="circle" />;
  }
}

export default AddNewNotice;
