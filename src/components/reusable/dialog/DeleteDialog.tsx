import { Button, Input } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import deleteImage from "@/assets/images/deleteImage.png";
import { ReactComponent as DeleteSvg } from "@/assets/icons/DeleteSvg.svg";
import { mutationRequest } from "@/requests-body/queries";
import { IDeleteDialog, IProfileData } from "~/types/types";
import { ContentContextServiceList } from "@/context/ServiceListContext";

const DeleteDialog = ({ title, dataInfo, profile }: IDeleteDialog) => {
  const value = useContext(ContentContextServiceList);
  const { mutate } = mutationRequest({
    url: `/${value?.url}/${dataInfo?._id}`,
    method: "delete",
    isAuth: true,
  });
  const [deleteamenity, setDeleteAmenity] = useState(false);
  const handleClick = () => {
    setDeleteAmenity(true);
  };
  const handleDelete = () => {
    value?.setOpenContent(0);
  };
  const handleDeleteReq = () => {
    loginMutate.mutate({
      login: profile?.email,
      password: pass,
      organizationId: "63a8b4cfaf1b0c19ca045a06",
    });
    if (loginMutate.isSuccess) {
      mutate.mutate({});
    }
  };
  useEffect(() => {
    if (mutate.isSuccess && value?.setData) {
      value?.setData((prev) => {
        const deleteItem = prev?.findIndex(
          (item) => item._id === dataInfo?._id
        );

        return prev?.filter((item, idx) => idx !== deleteItem);
      });
      value?.setOpenContent(0);
      if (value?.setHideMessage) {
        value?.setHideMessage(true);
      }
      if (value?.setMessageSort) {
        value?.setMessageSort({
          icon: DeleteSvg,
          message: `${title} link has been Deactivated!`,
          title: "Deleted",
          style: "delete",
        });
        setTimeout(() => {
          if (value?.setHideMessage) {
            value?.setHideMessage(false);
          }
        }, 3000);
      }
    }
  }, [mutate.isSuccess]);
  const [pass, setPass] = useState("");
  const { mutate: loginMutate } = mutationRequest({
    url: "/auth/login",
    method: "post",
  });
  const handleChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
  };
  const [valid, setValid] = useState(false);
  useEffect(() => {
    if (loginMutate.isSuccess) {
      setValid(false);
      mutate.mutate({});
    }
    if (loginMutate.isError) {
      setValid(true);
    }
  }, [loginMutate.isSuccess, loginMutate.isError]);

  return (
    <div className="deleteamenity">
      <img src={deleteImage} alt="delete amenitie" />
      <span className="delete_span">Delete This {title}?</span>
      <div className="div_span">
        <span>You are about to Deactivate</span>
        <span>{dataInfo?.name}</span>
      </div>
      {!deleteamenity ? (
        <div className="btn">
          <Button
            variant="contained"
            className="delete_btn"
            onClick={handleClick}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            className="cancel_btn"
            onClick={handleDelete}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <div className="delete_pass">
          <span>Enter Your Password</span>
          <Input
            required
            placeholder="Write Password"
            className="input_pass"
            type="password"
            onChange={handleChangePass}
          />
          {valid && <span className="error">You are not allowed</span>}
          <Button
            variant="contained"
            className="btn_delete"
            onClick={handleDeleteReq}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default DeleteDialog;
