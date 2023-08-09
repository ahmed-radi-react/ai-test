import { Box, Container } from "@mui/material";
import LandScreenHeader from "../LandScreenHeader";
import LandScreenHelp from "../LandScreenHelp";
import organizationImage from "@/assets/images/organizationImage.png";
import { landScreenCreateOrg } from "@/utils/constant";
import { ReactComponent as ArrowIcon } from "@/assets/icons/selescticon.svg";
import { useEffect, useState } from "react";
import GeneralInformation from "./GeneralInformation";
import CreateServices from "./CreateServices";
import CreateAppearance from "./CreateAppearance";
import { getCookie } from "@/utils/cookies";
import { useNavigate } from "react-router-dom";
import { mutationRequest } from "@/requests-body/queries";
const CreateOrganization = () => {
  const [data, setData] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [openContent, setOpenContent] = useState("");
  const handleOpenContent = (label: string) => {
    setOpenContent(label);
  };
  const { mutate } = mutationRequest({
    url: `/organization/public`,
    method: "post",
  });
  const [welcomeSec, setWelcomeSec] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("success", mutate.isSuccess);
    if (mutate.isSuccess) {
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  }, [mutate, mutate.isSuccess]);
  useEffect(() => {
    setWelcomeSec(0);
    // const time = setTimeout(() => {
    //   setWelcomeSec(1);
    // }, 2000);
    setTimeout(() => {
      if (getCookie("token")) {
        navigate("/services");
      }
    }, 5000);
    // return () => {
    //   clearTimeout(time);
    // };
  }, [submit]);
  if (!submit) {
    return (
      <Container className="create_organization_landscrenn">
        <LandScreenHeader />
        <Box
          maxWidth={"547px"}
          width={"100%"}
          bgcolor="#F9F9F9"
          className="createOrg_box"
        >
          {openContent === "general" ? (
            <GeneralInformation
              setOpenContent={setOpenContent}
              setData={setData}
            />
          ) : openContent === "service" ? (
            <CreateServices
              setOpenContent={setOpenContent}
              setData={setData}
              data={data}
            />
          ) : openContent === "appearance" ? (
            <CreateAppearance
              setSubmit={setSubmit}
              setOpenContent={setOpenContent}
              setData={setData}
              data={data}
              mutate={mutate}
            />
          ) : (
            <div className="content_create">
              <img
                src={organizationImage}
                alt="organization Image "
                className="image_org"
              />
              <span className="create">Create Organization</span>
              <div className="steps_div">
                {landScreenCreateOrg.map((item) => {
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleOpenContent(item.open)}
                      className="step_item"
                    >
                      <span>{item.label}</span>
                      <ArrowIcon />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </Box>
        <LandScreenHelp />
      </Container>
    );
  } else {
    return (
      <Container className="create_organization_landscrenn welcome">
        {welcomeSec === 0 ? (
          <span>Welcome to your new organization workplace</span>
        ) : (
          <span>Just a few seconds..</span>
        )}
      </Container>
    );
  }
};

export default CreateOrganization;
