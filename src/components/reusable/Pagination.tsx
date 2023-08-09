import { ReactComponent as RightIcon } from "@/assets/icons/BlueRightArrow.svg";
import { ReactComponent as LeftIcon } from "@/assets/icons/BlueLeftArrow.svg";
import { Button } from "@mui/material";
import { IPaginationinterface } from "~/types/types";
import { handleChangePage } from "@/utils/constant";

const Pagination = ({
  currentPage,
  setCurrentPage,
  data,
  limit,
}: IPaginationinterface) => {
  return (
    <div className="pagination">
      <Button
        className="btn"
        onClick={() => handleChangePage("prev",setCurrentPage)}
        disabled={currentPage === 0}
      >
        <LeftIcon />
      </Button>
      <span>
        {currentPage + 1}/{Math.ceil(data?.data?.count / limit)}
      </span>
      <Button
        className="btn"
        onClick={() => handleChangePage("next",setCurrentPage)}
        disabled={currentPage + 1 === Math.ceil(data?.data?.count / limit)}
      >
        <RightIcon />
      </Button>
    </div>
  );
};

export default Pagination;
