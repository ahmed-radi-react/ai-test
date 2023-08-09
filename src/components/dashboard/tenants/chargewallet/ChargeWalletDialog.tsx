import { useEffect, useState } from "react";
import { Input, Typography } from "@mui/material";
import { ReactComponent as BalanceAddedIcon } from "@/assets/icons/balanceAdded.svg";
import { ReactComponent as NotifyTenantIcon } from "@/assets/icons/notifyTenant.svg";
import { useNavigate } from "react-router-dom";
import { IChargeWalletDialogProp } from "~/types/types";
import { queryRequest } from "@/requests-body/queries";

const ChargeWalletDialog = ({
  handleConfirmAddBalance,
  handleNotifyTalent,
  confirmStepTwo,
  handleConfirmStepTwo,
  handleCancel,
  handleBalance,
  handleConfirmStepOne,
  confirmStepOne,
  balance,
  setPassword,
  password,
  tenantIdrow,
}: IChargeWalletDialogProp) => {
  const [tenantInfo, setTenantInfo] = useState<{
    image?: { url: string };
    firstName?: string;
  }>({});
  const { data, isSuccess } = queryRequest({
    url: `/tenant/${tenantIdrow}`,
    method: "get",
    key: "tenantId" + tenantIdrow,
  });
  useEffect(() => {
    setTenantInfo(data?.data);
  }, [isSuccess]);
  const navigate = useNavigate();
  const handleChangeWalletNav = () => {
    navigate("/tenants/chargewallet", { state: { tenantInfo } });
  };
  const [disable, setDisable] = useState(false);
  const [confirm, setConfirm] = useState(false);
  useEffect(() => {
    if (balance.length) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [balance]);

  useEffect(() => {
    if (password.length) {
      setConfirm(true);
    } else {
      setConfirm(false);
    }
  }, [password]);
  return (
    <div>
      {confirmStepTwo ? (
        <>
          <div className="charge_wallet_success">
            <div className="charge_wallet_success__image_container">
              <BalanceAddedIcon />
            </div>
            <p className="charge_wallet_success__header">Balance added</p>
            <div className="charge_wallet_success__details">
              <div className="charge_wallet_success__details-personal">
                <div className="image-container">
                  <img src={tenantInfo?.image?.url} alt="tenantInfo" />
                </div>
                <div className="content-container">
                  <Typography
                    className="charge_wallet_success__client-name"
                    variant="h6"
                  >
                    {tenantInfo?.firstName}
                  </Typography>
                  <button
                    className="charge_wallet_success__client-notify"
                    onClick={handleNotifyTalent}
                  >
                    <NotifyTenantIcon />
                    <span>Notify Tenant</span>
                  </button>
                </div>
              </div>
              <div className="charge_wallet_success__details-balance">
                <Typography className="balance-header" variant="h6">
                  Balance Added:
                </Typography>
                <div className="balance-info">
                  <span className="balance-info__mount">{balance}</span>
                  <span className="balance-info__currency">QAR</span>
                </div>
              </div>
            </div>
            <button
              className="charge_wallet_success__button"
              onClick={handleChangeWalletNav}
            >
              Add Another Deposit
            </button>
          </div>
        </>
      ) : (
        <div className="charge_wallet">
          <p className="charge_wallet__header">Charge Wallet of</p>
          <div className="charge_wallet__image_container">
            <img src={tenantInfo?.image?.url} alt="tenant image" />
          </div>
          <Typography
            className="charge_wallet__client_name"
            align="center"
            variant="h6"
          >
            {tenantInfo?.firstName}
          </Typography>
          <div className="charge_wallet__balance_container">
            <Input
              className="charge_wallet__balance-input"
              placeholder="Enter Amount in QAR"
              onChange={(e) => handleBalance(e.target.value)}
              type="number"
            />
            {balance ? (
              <span className="charge_wallet__balance-icon">QAR</span>
            ) : (
              ""
            )}
          </div>
          {confirmStepOne ? (
            <div className="charge_wallet__confirm">
              <Input
                className="charge_wallet__confirm-input"
                placeholder="Enter Your Admin Password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
              <span className="charge_wallet__confirm-button">
                <button
                  className={`charge_wallet__confirm-button-confirm ${
                    confirm ? "confirm" : ""
                  }`}
                  onClick={handleConfirmStepTwo}
                >
                  Confirm
                </button>
                <button
                  className="charge_wallet__confirm-button-cancel"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </span>
            </div>
          ) : (
            <button
              className={`charge_wallet__charge_button ${
                disable ? "charge" : ""
              }`}
              onClick={handleConfirmStepOne}
            >
              Charge
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ChargeWalletDialog;
