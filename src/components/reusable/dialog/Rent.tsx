import React, { useState } from 'react'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { Box, Button, TextField } from '@mui/material';
import { ReactComponent as NotAlliableIcon } from "@/assets/icons/NotAvailable.svg";

type Props = {}

function Rent({}: Props) {
  const [checkedDate, setCheckedDate] = useState(null);
  const [count, setCount] = useState(0);

  const InputStyle = {
    marginTop: "0",
    backgroundColor: "transparent",
    width: "50px",
    borderRadius: "10px",
    padding: "0",
    "& .MuiOutlinedInput-root": {
      padding: "0",
      fontSize: "14px",
      "&:hover .MuiOutlinedInput-notchedOutline": {
        border: "none",
        outline: "none",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "none",
        outline: "none",
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
      outline: "none",
    },
    "& .MuiMenuItem-root:hover": {
      backgroundColor: "transparent",
    },
  };

  return (
    <div className="property_rent">
      <div className='change_status__header'>
        <p>Add Property Request</p>
        <span className='build_type'>A 120 Type A</span>
        <span className='build_name'>Building A</span>
        <div className="property_details__header-status">
          <NotAlliableIcon /> Not Available
        </div>
      </div>
      <div className="select-time">
        <span className=''>Select the tour time:</span>
      </div>
      <div className='property_rent__date'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            onChange={setCheckedDate}
            renderInput={() => <TextField />}
            value={checkedDate}
            disablePast
            showDaysOutsideCurrentMonth
          />
        </LocalizationProvider>
      </div>
      <Button className='property_rent-button' variant="contained" disabled={!checkedDate}>Schedule This Time</Button>
      {/* <div className="property_rent__guest">
        <span className="property_rent__guest-header">Guests</span>
        <div className='property_rent__guest-adults'>
          <span>Adults</span>
          <Box display="flex" alignItems="center" className='adults__counter_content'>
            <Button onClick={handleIncrement} className='property_rent__guest-button'>+</Button>
            <TextField sx={InputStyle} type="number" value={count} inputProps={{ min: 0 }} />
            <Button onClick={handleDecrement} className='property_rent__guest-button'>-</Button>
          </Box>
        </div>
        <div className='property_rent__guest-children'>
          <TextField type="text" />
          <Box display="flex" alignItems="center">
            <Button onClick={handleIncrement}>+</Button>
            <TextField type="number" value={count} inputProps={{ min: 0 }} />
            <Button onClick={handleDecrement}>-</Button>
          </Box>
        </div>
      </div> */}
    </div>
  )
}

export default Rent