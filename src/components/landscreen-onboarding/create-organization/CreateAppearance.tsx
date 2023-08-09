import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { ReactComponent as ArrowIcon } from "@/assets/icons/selescticon.svg";
import { ReactComponent as CheckBtn } from "@/assets/icons/checkbtn.svg";
import addCompanyLogo from "@/assets/images/addCompanyLogo.png";
import { handleChange, imageFormats, themeColorDiv } from "@/utils/constant";
import UploadImage from "~/reusable/UploadImage";
import { ReactComponent as CameraIcon } from "@/assets/icons/camera.svg";
import { ReactComponent as EditIcon } from "@/assets/icons/edit.svg";
import { FileUploader } from "react-drag-drop-files";
import { IsetSubmit } from "@/components/types/types";

const CreateAppearance = ({
  setSubmit,
  setOpenContent,
  setData,
  data,
  mutate,
}: IsetSubmit) => {
  const [theme, setTheme] = useState<{ color: string; id: number }>({
    color: "",
    id: 0,
  });
  const [selectVal, setSelectVal] = useState("");
  const [editbanner, setEditBanner] = useState(false);
  const handleChangeIn = (event: SelectChangeEvent) => {
    setSelectVal(event.target.value);
  };
  const handleCheckTheme = (item: { color: string; id: number }) => {
    setTheme(item);
  };
  const [base64, setBase64] = useState<(string | ArrayBuffer | null)[]>([]);

  const [selectedImage, setSelectedImage] = useState<File[]>([]);
  const handleBack = () => {
    setOpenContent("services");
  };
  const [submitNext, setSubmitNext] = useState(false);
  useEffect(() => {
    if (setData) {
      setData((prev: any) => {
        if (prev) {
          if (selectVal.length && selectedImage[0] && theme.color.length) {
            return {
              ...prev,
              file: [selectVal, selectedImage[0], theme.color],
            };
          } else {
            return { ...prev };
          }
        }
      });
    }
  }, [submitNext]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmit(true);

    mutate.mutate({
      services: data.checkedItems,
      name: data.info.name,
      description: "",
      privacyPolicy: "",
      termsConditions: "",
      countryCode: "+" + data.info.countryCode,
      phoneNumber: data.info.number.slice(
        data.info.countryCode.length + 1,
        data.info.number.length
      ),
      adminEmail: data.info.email,
      country: data.info.select,
      language: selectVal,
      configuration: {
        color: data.file && data.file[2],
        integrationConfig: {
          novuApiKey: "string",
        },
      },
      image: {
        name: selectedImage[0]?.name,
        base64: base64[0],
        alt: selectedImage[0]?.name,
        description: selectedImage[0]?.name,
      },
      banners: [
        {
          name: selectedImage[0]?.name,
          base64: base64[0],
          alt: selectedImage[0]?.name,
          description: selectedImage[0]?.name,
        },
      ],

      //   services: data.checkedItems,
      //   name: data.info.name,
      //   description: "string",
      //   countryCode:"+20",
      //   //countryCode: data.info.select==="Qatar" ? "+974" :"+971",
      //  // phoneNumber: data.info.number,
      //   phoneNumber: "1017931092",
      //   adminEmail: data.info.email,
      //   country: data.info.select,
      //   configuration: {
      //     color: data.file[2],
      //   },
      //   image: {
      //        name: selectedImage?.name,
      //        base64: base64,
      //        alt: selectedImage?.name,
      //        description: selectedImage?.name,
      //   },
    });
    localStorage.removeItem("signup");
    localStorage.removeItem("signup-services");
    //setCookie("token", "true");
  };
  useEffect(() => {
    if (
      theme &&
      selectVal.length &&
      selectedImage[0] &&
      selectVal !== "Language"
    ) {
      setSubmitNext(true);
    }
  }, [theme, selectVal, selectedImage[0]]);

  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="create_appearance">
        <div className="header_div" onClick={handleBack}>
          <ArrowIcon />
          <span>Services</span>
        </div>
        <span className="title">Appearance</span>
        <div className="add_logo">
          <span>Add Company Logo</span>
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
              dropImage={addCompanyLogo}
            />
          ) : (
            <div className="uploadLogo">
              {editbanner && (
                <div className="divs_upload">
                  <img
                    src={URL.createObjectURL(selectedImage[0])}
                    alt="Thumb"
                  />
                  <div className="cameraDiv">
                    <CameraIcon />
                  </div>
                </div>
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
        <span className="color_span">Your color theme</span>
        <div className="theme">
          {themeColorDiv.map((item, idx) => {
            return (
              <div
                key={idx}
                onClick={() => handleCheckTheme(item)}
                className={`theme_item ${
                  theme.id === item.id ? "activesort" : ""
                }`}
              >
                {theme.id === item.id && (
                  <CheckBtn className="checkbtn_theme" />
                )}
              </div>
            );
          })}
        </div>
        <div className="select_lan">
          <ArrowIcon className="down_svg" />
          {selectVal === "" && <span className="country lan">Language</span>}
          <Select
            className="select_country_with_option lan"
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={selectVal}
            onChange={handleChangeIn}
            autoWidth
          >
            <ArrowIcon className="arrow-up" />
            <MenuItem value={"10"} className="countryfirst lan">
              Language
            </MenuItem>
            <MenuItem value={"en"} className="country lan">
              English
            </MenuItem>
            <MenuItem value={"ar"}>Arabic</MenuItem>
          </Select>
        </div>
        <Button
          variant="contained"
          className={`btn_next ${submitNext ? "next" : ""}`}
          type="submit"
        >
          <span>Submit</span>
        </Button>
      </div>
    </form>
  );
};

export default CreateAppearance;
