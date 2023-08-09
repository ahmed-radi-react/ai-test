import React, { useState } from 'react'
import { Button } from '@mui/material';
import { ReactComponent as NotAlliableIcon } from "@/assets/icons/NotAvailable.svg";
import manImage from "@/assets/images/manimage.png";
import Rent from './Rent';

type Props = {}

function PropertyDetails({ }: Props) {
  const [optionStatus, setOptionStatus] = useState(true);
  const [nextStep, setNextStep] = useState(true);
  return (
    nextStep ? (
      <>
        <div className="property_details">
          <div className='property_details__header'>
            <p>Property Details</p>
            <span className='build_type'>A 120 Type A</span>
            <span className='build_name'>Building A</span>
            <div className="property_details__header-status">
              <NotAlliableIcon /> Not Available
            </div>
          </div>
          <div className="property_details__form">
            <span className="property_details__form-header">Guests</span>
            <div className="property_details__form-users">
              <div className="users-image">
                <img src={manImage} alt={manImage} />
              </div>
              <div className="user-info">
                <h3>Everett Mante</h3>
                <span>2 Adult, 1 Children </span>
              </div>
            </div>
          </div>
          <Button
            className={`property_details__button ${optionStatus ? "" : "disabled"}`}
            disabled={!optionStatus}
            onClick={() => setNextStep(!nextStep)}
          >
            Rent Now
          </Button>
        </div>
      </>
    ) : <Rent />
  )
}

export default PropertyDetails