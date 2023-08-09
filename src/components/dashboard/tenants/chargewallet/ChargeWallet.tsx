import { Dialog, DialogContent, Input, Typography } from "@mui/material";
import { ReactComponent as ArrowLeftIcon } from "@/assets/icons/arrow_left_black.svg";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ReactComponent as CloseIcon } from "@/assets/icons/close.svg";
import { ReactComponent as Elipse } from "@/assets/icons/elipse.svg";
import WalletInvoice from "./WalletInvoice";
import { timeLineData } from "@/utils/constant";

const ChargeWallet = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const tenantInfo = location?.state?.tenantInfo || "";

  const [chargeAmount, setChargeAmount] = useState("");
  const [confirmStepOne, setConfirmStepOne] = useState(false);
  const [confirmStepTwo, setConfirmStepTwo] = useState(false);

  const handleNavigate = () => {
    window.history.back();
  };
  // first step
  const handleCharge = () => {
    setConfirmStepOne(true);
  };
  const handleBalance = (balance: string) => {
    setChargeAmount(balance);
  };
  const handleConfirmStepOne = () => {
    setConfirmStepTwo(true);
  };
  const handleConfirmStepTwo = () => {
    setOpen(true);
    setConfirmStepOne(false);
  };
  const handleCancel = () => {
    setChargeAmount("");
    setConfirmStepOne(false);
    setConfirmStepTwo(false);
  };
  const [charge, setCharge] = useState(false);
  useEffect(() => {
    setCharge(!!chargeAmount.length);
  }, [chargeAmount]);
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState(false);
  useEffect(() => {
    setConfirm(!!pass.length);
  }, [pass]);
  return (
    <>
      {!tenantInfo ? (
        <Navigate to={"/tenants"} />
      ) : (
        <div className="charge_wallet_container">
          <div className="charge_wallet_header" onClick={handleNavigate}>
            <ArrowLeftIcon />
            <h4 className="charge_wallet_header__head">Charge Wallet</h4>
          </div>
          <div className="charge_wallet_body">
            <div className="charge_wallet_body__image_container">
              <img src={tenantInfo?.image?.url} alt="tenant  image" />
            </div>
            <Typography
              className="charge_wallet_body__client_name"
              align="center"
              variant="h6"
            >
              {tenantInfo?.firstName}
            </Typography>
            {confirmStepOne ? (
              <div className="charge_wallet_body__charge_wallet">
                <h3 className="charge_wallet-header">Charge Wallet</h3>
                <p className="charge_wallet-subheader">Enter Charge amount</p>
                <div className="charge_wallet-input-container">
                  <Input
                    className="charge_wallet-confirm_input"
                    type="text"
                    placeholder="0"
                    onChange={(e) => handleBalance(e.target.value)}
                  />
                  <span>QAR</span>
                </div>
                {confirmStepTwo ? (
                  <div className="charge_wallet_body__confirm">
                    <Input
                      className="charge_wallet_body__confirm-input"
                      type="password"
                      placeholder="Enter Your Admin Password"
                      onChange={(e) => setPass(e.target.value)}
                    />
                    <span className="charge_wallet_body__confirm-button">
                      <button
                        className={`charge_wallet_body__confirm-button-confirm ${
                          confirm ? "charge" : ""
                        }`}
                        onClick={handleConfirmStepTwo}
                      >
                        Confirm
                      </button>
                      <button
                        className="charge_wallet_body__confirm-button-cancel"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </span>
                  </div>
                ) : (
                  <button
                    className={`charge_wallet_body__charge_button ${
                      charge ? "charge" : ""
                    }`}
                    onClick={handleConfirmStepOne}
                  >
                    Charge
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="charge_wallet_body__current_balance_content">
                  <h6 className="current_balance_content-header">
                    Current Balance:
                  </h6>
                  <span className="current_balance_content-amount">
                    {chargeAmount.length ? chargeAmount : 0}
                  </span>
                  <span className="current_balance_content-currency">QAR</span>
                </div>
                <div className="charge_wallet_body__button">
                  <button onClick={handleCharge}>Charge</button>
                  <button>Deduct</button>
                </div>
                <div className="charge_wallet_body__activity">
                  <p className="activity-header">Activity:</p>
                  <div className="activity-time_line-container">
                    {timeLineData.map((item, index) => (
                      <div className="activity-time_line" key={index + 1}>
                        <div className="activity-time_line-left">
                          <p className="activity-time_line-left-date">
                            {item.createdAt}
                          </p>
                          <p>{item.whatYouBuy}</p>
                        </div>
                        <div className="activity-time_line-right">
                          <p className="activity-time_line-right-amount">
                            {item.amount} QAR
                          </p>
                          <button className="activity-time_line-right-button">
                            Get invoice
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
          {!!open && (
            <div className="close" onClick={handleClose}>
              <Elipse />
              <CloseIcon />
            </div>
          )}
          <Dialog open={open} className="dialog_request">
            <DialogContent>
              <WalletInvoice />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
};

export default ChargeWallet;
