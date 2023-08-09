import { useEffect, useState } from "react";
import { queryRequest } from "@/requests-body/queries";
import { CircularProgress } from "@mui/material";
import { IAttachment } from "~/types/types";
import { maintenance } from "@/utils/constant";

const AttachmentDialog = ({ index, togglePlay, isPlaying }: IAttachment) => {
  const { data, isLoading } = queryRequest({
    url: `/service-request/${maintenance}/${index}`,
    method: "get",
    key: `${index}+maintenance`,
  });

  const [downloaded, setDownloaded] = useState(false);
  function downloadImages() {
    const images = document.querySelectorAll(".image_content__images img");
    images.forEach((image: any) => {
      const link = document.createElement("a");
      link.href = image?.src;
      link.download = image?.alt;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  useEffect(() => {
    if (downloaded) {
      downloadImages();
    }
  }, [downloaded]);

  if (!isLoading) {
    return (
      <div className="attachment_content">
        <p>Attachments</p>
        <div className="attachment_content__details">
          <span className="attachment_content__details-text">
            5 Attachments
          </span>
          <div className="attachment_content__details-number">
            <span>{data?.data?.images?.length} Pictures</span>
            <span>{[data?.data?.voiceNote].length} Voice</span>
          </div>
        </div>
        <div className="container__attachment_data">
          {!!data?.data?.images?.length && (
            <div className="image_content_attachment">
              <div className="image_content_attachment__header">
                <span className="image_content_attachment__header-title">
                  Pictures ({data?.data?.images?.length})
                </span>
                <span
                  className="image_content_attachment__header-download"
                  // onClick={() => setDownloaded(true)}
                >
                  view All
                </span>
              </div>
              <div className="image_content_attachment__images">
                {data?.data?.images?.map(
                  (image: { url?: string }, index: number) => {
                    return (
                      <img src={image?.url} alt={"attachment"} key={index} />
                    );
                  }
                )}
              </div>
            </div>
          )}
          {!!data?.data?.voiceNote?.url && (
            <div className="voice_content">
              <span className="voice_content__header">Voice</span>
              <div className="voice">
                <audio controls onPlay={togglePlay}>
                  <source src={data?.data?.voiceNote?.url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          )}
        </div>
        {data?.data?.description && (
          <div className="description_attachment">
            <div className="description_attachment_title_container">
              <span className="description_attachment__title">description</span>
            </div>
            <div className="description_attachment_content_container">
              <div className="description_attachment__content">
                {data?.data?.description}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return <CircularProgress disableShrink className="circle" />;
  }
};

export default AttachmentDialog;
