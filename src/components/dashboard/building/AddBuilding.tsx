import React, { useEffect, useState } from "react";
import BackNavigate from "~/reusable/BackNavigate";
import { Button, Container, Input, TextField } from "@mui/material";
import UploadImage from "~/reusable/UploadImage";
import dropImage from "@/assets/images/buildingDropImage.png";
import { ReactComponent as EditIcon } from "@/assets/icons/edit.svg";
import MakeActiveSwitch from "~/reusable/MakeActiveSwitch";
import { mutationRequest, queryRequest } from "@/requests-body/queries";
import { useLocation, useNavigate } from "react-router-dom";
import MessageAlert from "~/reusable/MessageAlert";
import { ReactComponent as Canceled } from "@/assets/icons/CanceledIcon.svg";
import { IDetailData, ITarget } from "~/types/types";
import { InputStyleBuilding, handleChange, isEmail } from "@/utils/constant";

const AddBuilding = () => {
  const { state: stateFromLcoation } = useLocation();

  const [editBuilding, setEditBuilding] = useState<IDetailData>();

  useEffect(() => {
    if (stateFromLcoation?.name) {
      setEditBuilding(stateFromLcoation);
      setInfo((prev) => ({
        name: stateFromLcoation?.name,
        desc: stateFromLcoation?.description
          ? stateFromLcoation?.description
          : "",
        email: stateFromLcoation?.organization?.adminEmail
          ? stateFromLcoation?.organization?.adminEmail
          : "",
      }));
      setOptionSwitchOption(stateFromLcoation?.status === "active");
    }
  }, []);

  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<File[]>([]);
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
      setEditBuilding(undefined);
    });
    e.target.files && FR.readAsDataURL(e.target.files[0]);
  };
  // description section
  const [info, setInfo] = useState({
    name: "",
    desc: "",
    email: "", //  email: editBuilding?.email ? editBuilding?.email :
  });

  const [errorTitle, setErrorTitle] = useState("");
  const [errorDesc, setErrorDesc] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const handleChangeInfo = ({ target: { value, name } }: ITarget) => {
    if (name === "name") {
      // name field cannot be longer than 20 characters
      if (value.length > 20) {
        setErrorTitle("Building name must be less than 20 characters");
      } else {
        setErrorTitle("");
      }
    } else if (name === "desc") {
      // description field cannot be longer than 20 characters
      if (value.length > 50) {
        setErrorDesc("Building description must be less than 50 characters");
      } else {
        setErrorDesc("");
      }
    }
    setInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };
  console.log(selectedImage);
  

  // switch
  const [optionSwitchOption, setOptionSwitchOption] = useState(false);
  const { mutate } = mutationRequest({
    url: "/building",
    method: "post",
    isAuth: true,
  });
  const { data, isSuccess } = queryRequest({
    url: "/service?offset=0&limit=100",
    method: "get",
    key: "serviceKey",
  });
  const { data: apartamentsReq, isSuccess: apartamentsIsSuccessReq } =
    queryRequest({
      url: `/apartment?buildingId=${
        stateFromLcoation?._id ? stateFromLcoation?._id : ""
      }&offset=0&limit=1000`,
      method: "get",
      key: "serviceKey+apartament",
    });
  const [apartaments, setApartaments] = useState<any>({});
  useEffect(() => {
    if (apartamentsIsSuccessReq) {
      setApartaments({
        numberOfApartaments: apartamentsReq?.data?.count,
        apartaments: apartamentsReq?.data?.items.map(
          (val: { _id: string }) => val._id
        ),
      });
    }
  }, [apartamentsIsSuccessReq]);

  const [serviceData, setServiceData] = useState<{ _id: string }[]>([]);
  useEffect(() => {
    if (isSuccess || stateFromLcoation?.name) {
      // data?.data?.items.map((item: { _id: string }) => {
      //   return item._id;
      // });
      setServiceData(
        data?.data?.items.map((item: { _id: string }) => {
          return item._id;
        })
      );
    }
  }, [isSuccess]);
  const { mutate: editMutate } = mutationRequest({
    url: "/building",
    method: "PUT",
    isAuth: true,
  });
  const handleSaveEdit = (id: string) => {
    if (selectedImage[0]?.name) {
      editMutate.mutate({
        adminEmail: info.email,
        name: info.name,
        description: info.desc,
        numberOfApartments: apartaments?.numberOfApartaments,
        status: optionSwitchOption ? "active" : "",
        countryCode: "+974",
        phoneNumber: stateFromLcoation?.organization?.phoneNumber
          ? stateFromLcoation?.organization?.phoneNumber
          : "77766652",
        apartments: apartaments?.apartaments,
        services: serviceData,
        images: [
          {
            name: selectedImage[0]?.name,
            base64: base64[0],
            alt: selectedImage[0]?.name,
            description: selectedImage[0]?.name,
          },
        ],
        _id: id,
      });
    } else {
      editMutate.mutate({
        adminEmail: info.email,
        name: info.name,
        description: info.desc,
        numberOfApartments: apartaments?.numberOfApartaments,
        status: optionSwitchOption ? "active" : "",
        countryCode: "+974",
        phoneNumber: stateFromLcoation?.organization?.phoneNumber
          ? stateFromLcoation?.organization?.phoneNumber
          : "77766652",
        apartments: apartaments?.apartaments,
        services: serviceData,
        _id: id,
      });
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stateFromLcoation?.name) {
      mutate.mutate({
        name: info.name,
        description: info.desc,
        numberOfApartments: 0,
        status: optionSwitchOption ? "active" : "",
        countryCode: "+974",
        phoneNumber: "77766652",
        adminEmail: info.email,
        services: serviceData,
        images: [
          {
            name: selectedImage[0]?.name,
            base64: base64[0],
            alt: selectedImage[0]?.name,
            description: selectedImage[0]?.name,
          },
        ],
      });
    } else {
      handleSaveEdit(stateFromLcoation?._id);
    }
    navigate("/building/buildinglist");
  };
  const [disable, setDisable] = useState(false);
  useEffect(() => {
    if (
      (selectedImage[0] || stateFromLcoation?.images[0]) &&
      info.email.length &&
      // optionSwitchOption === true &&
      info.name.length &&
      info.desc.length
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [info, selectedImage[0], optionSwitchOption]);
  const [message, setMessage] = useState("");
  const [hideMessage, setHideMessage] = useState(false);
  useEffect(() => {
    let time: ReturnType<typeof setTimeout>;
    if (mutate.isSuccess) {
      navigate("/building/buildinglist", {
        state: { data: "success", message: "Building" },
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

  const handleInvite = () => {
    if (!isEmail(info.email)) {
      setErrorEmail("Not a valid email address");
    } else {
      setErrorEmail("");
    }
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
      <Container className="addBuilding">
        <BackNavigate title={"Building"} />
        <form onSubmit={handleSubmit}>
          <section className="addBuildingHeader">
            <span className="addBuildingSpan">Add Building</span>
            <div className="btnSettingAdd">
              {stateFromLcoation?.name ? (
                <Button
                  variant="contained"
                  className={`addBuildingBtn ${
                    disable ? "addbuildingactive" : ""
                  }`}
                  type="submit"
                  // onClick={() => {
                  //   handleSaveEdit(stateFromLcoation?._id);
                  // }}
                >
                  Save Building
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className={`addBuildingBtn ${
                    disable ? "addbuildingactive" : ""
                  }`}
                  type="submit"
                >
                  Add Building
                </Button>
              )}
            </div>
          </section>
          <section className="building_form">
            <section className="building_top">
              <div className="building_top__left">
                <div className="image_container">
                  {!selectedImage[0] && !editbanner && !editBuilding?.name ? (
                    <UploadImage
                      handleChange={handleChange({
                        status: "add",
                        isBanner: false,
                        setBase64,
                        setSelectedImage,
                        selectedImage,
                      })}
                      dropImage={dropImage}
                      className="upload_image"
                      name="image_1"
                    />
                  ) : (
                    <div className="uploadimage">
                      {editBuilding?.name ? (
                        <div className="opacity ">
                          <img
                            src={
                              editBuilding?.images &&
                              editBuilding?.images[0].url
                            }
                            alt="Thumb"
                          />
                        </div>
                      ) : (
                        <img
                          src={
                            selectedImage[0] &&
                            URL.createObjectURL(selectedImage[0])
                          }
                          alt="Thumb"
                        />
                      )}
                      <label className="editdiv">
                        <input
                          type="file"
                          accept="image/gif, image/jpeg, image/png"
                          className="fileinput display_upload"
                          // onChange={imageChange}
                          name="image_2"
                          onChange={(e) => imageChange(e, "edit")}
                        />
                        <EditIcon />
                      </label>
                    </div>
                  )}
                </div>
                <p className="note_text">
                  Add at least 4 Images to be displayed on the app banner
                </p>
              </div>
              <div className="building_top__right">
                <p className="title">Building Information</p>
                {errorTitle && <p className="error">{errorTitle}</p>}
                <Input
                  type="text"
                  className="building_top__right-input_header"
                  placeholder="Building Name "
                  name="name"
                  onChange={handleChangeInfo}
                  value={info.name}
                />
                {errorDesc && <p className="error">{errorDesc}</p>}
                <TextField
                  // id="my-textarea"
                  // label="Enter text here"
                  multiline
                  placeholder="Building Description"
                  rows={6} //7
                  sx={InputStyleBuilding}
                  className="description-input building_desc"
                  onChange={handleChangeInfo}
                  name="desc"
                  value={info.desc}
                />
              </div>
            </section>
            <section className="building_bottom">
              <p className="building_bottom__header">
                Assign Admins to this Building
              </p>
              {errorEmail && <p className="error">{errorEmail}</p>}
              <div className="invite_section">
                <Input
                  type="email"
                  className="building_bottom__input"
                  placeholder="Add email"
                  onChange={handleChangeInfo}
                  name="email"
                  value={info.email}
                />
                <Button
                  variant="contained"
                  className="inviteBtn"
                  onClick={handleInvite}
                >
                  Send Invitation
                </Button>
              </div>
              <hr />
              <div className="active_section">
                <p className="active_section__title">Make It Active </p>
                <MakeActiveSwitch
                  setOptionSwitchOption={setOptionSwitchOption}
                  optionSwitchOption={optionSwitchOption}
                  width={40}
                  height={20}
                  bulletWidth={17}
                  bulletHeight={16}
                  bgOff={"#939393"}
                />
                <p className="active_section__note">
                  Turn On to activate the Building after adding it
                </p>
              </div>
            </section>
          </section>
        </form>
      </Container>
    </>
  );
};

export default AddBuilding;
