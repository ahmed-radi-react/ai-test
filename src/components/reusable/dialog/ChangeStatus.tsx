import { Button, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React, { useState } from 'react'
import { ReactComponent as HoldIcon } from "@/assets/icons/holdProperty.svg";
import { ReactComponent as AlliableIcon } from "@/assets/icons/Icons-active.svg";
import { ReactComponent as NotAlliableIcon } from "@/assets/icons/NotAvailable.svg";

type Props = {}
const options = [
  {
    option: 'Available',
    icon: AlliableIcon
  },
  {
    option: 'Not Available',
    icon: NotAlliableIcon
  }
]
function ChangeStatus({}: Props) {
  const [optionStatus, setOptionStatus] = useState('');
  const selectStyle = {
    '& .MuiSelect-root': {
      padding: "0",
    },
    '& .MuiSelect-select.MuiSelect-select': {
      height: '31px',
      border: "1px solid #DBDBDB",
      display: "flex",
      alignItems: "center",
      gap: "3px",
      padding: '0 10px',
      fontSize: "12px",
      fontWeight: 500,
      backgroundColor: 'white',
      '&:focus': {
        backgroundColor: 'white',
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
      outline: 'none',
    },
    '& .MuiSelect-icon': {
      top: 'calc(50% - 12px)',
      right: 0,
      width: 24,
      height: 24,
    },
    '& .MuiMenuItem-root:hover': {
      backgroundColor: 'transparent',
    },
  };
  return (
    <div className="change_status">
      <div className='change_status__header'>
        <p>Change Property Status</p>
        <span className='build_type'>A 120 Type A</span>
        <span className='build_name'>Building A</span>
      </div>
      <div className="change_status__form">
        <span className="change_status__form-header">Current Status</span>
        <div className="change_status__form-status">
          <HoldIcon />Wait Housekeeping
        </div>
        <span className="change_status__form-header">Change it to be</span>
        <Select
          labelId="select-option-label"
          id="select-option"
          value={optionStatus ? optionStatus : 'default-value'}
          sx={selectStyle}
          onChange={(e: SelectChangeEvent<string>) => setOptionStatus(e.target.value)}
        >
          <MenuItem value="default-value" disabled>
            Select option
          </MenuItem>
          {
            options.map((item, index) => {
              return (
                <MenuItem value={item.option} key={index}>{<item.icon className='change_status__form_svg_icon' />} &nbsp; {item.option}</MenuItem>
              )
            })
          }
        </Select>
      </div>
      <Button className={`change_status__button ${optionStatus===''?"disabled":""}`} disabled={!optionStatus}>Save</Button>
    </div>
  )
}

export default ChangeStatus