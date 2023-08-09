import { Button, CircularProgress, Container, TextField } from "@mui/material";
import BackNavigate from "~/reusable/BackNavigate";
import GourmetWebsite from "@/assets/images/GourmetWebsite.png";
import { InputStyleW } from "@/utils/constant";

const AddWebsite = () => {
  if (!false) {
    return (
      <Container className="gourmet_Add_website">
        <BackNavigate title={"Gourmet"} />
        <div className="gourmet_header">
          <span className="header_span">Add Gourmet Website</span>
        </div>
        <div className="content_container">
          <div className="content_container__user">
            <div className="content_container__user-image">
              <img src={GourmetWebsite} alt={GourmetWebsite} />
            </div>
            <h3 className="content_container__user-header">Gourmet Website</h3>
          </div>
          <form className="content_container__form">
            <TextField
              // id="my-textarea"
              // label="Enter text here"
              placeholder="Enter URL"
              sx={InputStyleW}
              className="content_container__form-url"
              // onChange={handleInputAmountChange}
              name="enterText"
            />
            <Button className="content_container__form-submit">Save</Button>
          </form>
        </div>
      </Container>
    );
  } else {
    return <CircularProgress disableShrink className="circle" />;
  }
};

export default AddWebsite;
