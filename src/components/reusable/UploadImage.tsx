import { FileUploader } from "react-drag-drop-files";
import { ReactComponent as ImgIcon } from "@/assets/icons/img.svg";
import { IUploadImageProps } from "~/types/types";
import { imageFormats } from "@/utils/constant";

const UploadImage = ({
  className,
  dropImage,
  small,
  name,
  banner,
  handleChange,
}: IUploadImageProps) => {
  return (
    <div className={className ? className : "uploadimage"}>
      <FileUploader
        handleChange={handleChange}
        name="file"
        types={imageFormats}
        classes="fileinput"
        multiple={banner}
      />
      <img src={dropImage} alt="drop your image" className="dropimage" />
      {name !== "addLogo" && (
        <div className="dropspan">
          <ImgIcon className="imgicon" />
          {!small && (
            <span className="drop_span_amenity">Drop your image </span>
          )}
          <div>
            {!small && <span className="drop_span_amenity"> here</span>}{" "}
            <span className="clickspan">Click to Browse</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
