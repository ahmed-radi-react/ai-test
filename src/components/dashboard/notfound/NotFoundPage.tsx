import notfoundImage from "@/assets/images/404Page.png";
const NotFoundPage = () => {
  return (
    <div className="not_found_page">
      <img src={notfoundImage} alt="not found Image" className="image_not"/>
    </div>
  );
};

export default NotFoundPage;
