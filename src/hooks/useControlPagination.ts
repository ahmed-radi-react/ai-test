import { useState } from "react";

const useControlPagination = (): {
  currentPage: number;
  handlePageChange: (event: any, page: number) => void;
} => {
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageChange = (event: any, page: number) => {
    setCurrentPage(page - 1);
  };
  return { currentPage, handlePageChange };
};

export default useControlPagination;
