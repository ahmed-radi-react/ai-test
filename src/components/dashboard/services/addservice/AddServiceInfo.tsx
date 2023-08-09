import { useState } from "react";
import UploadImage from "~/reusable/UploadImage";
import DropImageService from "@/assets/images/dropImageService.png";
import { Input } from "@mui/material";
import { Textarea } from "@mui/joy";
import { IComponeneService } from "~/types/types";

const AddServiceInfo = ({
  selectedImage,
  setSelectedImage,
  infoInput,
  setInfoInput,
}: IComponeneService) => {
  const [editbanner, setEditBanner] = useState(false);
  const imageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    status?: string
  ) => {
    const FR = new FileReader();
    FR.addEventListener("load", function (evt: ProgressEvent<FileReader>) {
      if (evt.target) {
        // setBase64((evt.target.result as string)?.split(",")[1]);
      }
      if (e.target.files && e.target.files.length > 0) {
        if (status) {
          if (setSelectedImage) {
            setSelectedImage(e.target.files[0]);
          }
        } else {
          if (setSelectedImage) {
            setSelectedImage(e.target.files[0]);
          }
          setEditBanner(true);
        }
      }
    });
    e.target.files && FR.readAsDataURL(e.target.files[0]);
  };

  const [isValidName, setIsValidName] = useState(true);
  const [isValidDesc, setIsValidDesc] = useState(true);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string
  ) => {
    if (fieldName === "name") {
      if (e.target.value?.length >= 20) {
        setIsValidName(false);
      } else {
        setIsValidName(true);
        setInfoInput((prev: { name: string; des: string }) => {
          return { ...prev, [e.target.name]: e.target.value };
        });
      }
    } else {
      if (e.target.value?.length >= 50) {
        setIsValidDesc(false);
      } else {
        setIsValidDesc(true);
        setInfoInput((prev: { name: string; des: string }) => {
          return { ...prev, [e.target.name]: e.target.value };
        });
      }
    }
  };

  return (
    <div className="service-add_info">
      <div className="image_div">
        {!selectedImage ? (
          <UploadImage
            dropImage={DropImageService}
            imageChange={imageChange}
            className={"dropimageservice uploadimage"}
          />
        ) : (
          <div className="">
            {editbanner && (
              <div className="addServiceimage">
                <img src={URL.createObjectURL(selectedImage)} alt="Thumb" />
              </div>
            )}
            {/* <div className="editdiv">
              <input
                type="file"
                className="fileinput"
                // onChange={imageChange}
                name="image_2"
                onChange={(e) => imageChange(e, "edit")}
              />
              <EditIcon />
            </div> */}
          </div>
        )}
        <Input
          placeholder="Service Name"
          className="info_service_add"
          onChange={(e) => handleChange(e, "name")}
          name="name"
          value={infoInput?.name}
        />
        {!isValidName && (
          <span style={{ color: "red", fontWeight: "400", fontSize: "12px" }}>
            Service Name should be elss than 20
          </span>
        )}
      </div>
      <div className="text_area">
        <Textarea
          placeholder="Descreption"
          onChange={(e) => handleChange(e, "desc")}
          name="des"
          value={infoInput?.des}
        />
        {!isValidDesc && (
          <span>Service Description should be elss than 50</span>
        )}
      </div>
    </div>
  );
};

export default AddServiceInfo;
