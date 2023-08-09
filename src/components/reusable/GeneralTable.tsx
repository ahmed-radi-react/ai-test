import {FC, useEffect, useRef, useState} from "react";
import { Pagination, Table, TableContainer } from "@mui/material";
import { IGeneralTable } from "~/types/types";
import GeneralTableHead from "./GeneralTableComponents/GeneralTableHead";
import GeneralTableBody from "./GeneralTableComponents/GeneralTableBody";
import CalendarTable from "./CalendarTable";
import SkeltonLoad from "./loader/SkeltonLoad";
import Dropdown from "react-multilevel-dropdown";
import { rowsPerPageOptions } from "@/utils/constant";

const GeneralTable: FC<IGeneralTable> = ({
  rows,
  columns,
  additionalInfo,
  totalRows,
  currentPage,
  handlePageChange,
  title,
  limitPerPage,
  changePageLimit,
}) => {
  const dropdownRef = useRef<any>();
  const closeDropdown = () => {
    const dropdownElement = dropdownRef.current;
    if (dropdownElement && dropdownElement?.toggle) {
      dropdownElement?.toggle();
    }
  };

  // Function to handle the dropdown item
  const handleDropdownItemClick = (limit: number) => {
    closeDropdown();
    changePageLimit(limit);
  };

  return (
    <>
      {!additionalInfo.isLoadingServicesReq &&
      rows.length &&
      (limitPerPage === rows.length)  ? (
        <TableContainer className="tables">
          {!additionalInfo.changeCalendar ? (
            <Table
              className="tableSimple homeTable_simple"
              stickyHeader
              style={{ borderTop: "1px solid #dcdcdc" }}
              aria-label="simple table"
            >
              <GeneralTableHead columns={columns} title={title} />
              <GeneralTableBody
                rows={rows}
                additionalInfo={additionalInfo}
                columns={columns}
                title={title}
              />
            </Table>
          ) : (
            <CalendarTable
              reqData={rows}
              setRequestid={additionalInfo.setRequestid}
              handleMenuClick={additionalInfo.handleMenuClick}
              title={title}
            />
          )}
        </TableContainer>
      ) : (
        <SkeltonLoad />
      )}
      <div className="table_pagination">
        <div>
          <Dropdown
            title={
              <label className="table_pagination__label">
                Rows per page:
                <span className="table_pagination__label-select">
                  {limitPerPage}
                </span>
              </label>
            }
            buttonClassName="button_dropdown_list_multi_levels_status"
            menuClassName="menu_dropdown_list_multi_levels_status"
            wrapperClassName="wrapper_dropdown_list_multi_levels_status"
            position="top-left"
            ref={dropdownRef}
          >
            {rowsPerPageOptions?.map((limit: number, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => handleDropdownItemClick(limit)}
              >
                <span>{limit}</span>
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div>
        <Pagination
          count={Math.ceil(totalRows / limitPerPage)}
          variant="outlined"
          color="primary"
          page={currentPage + 1}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default GeneralTable;
