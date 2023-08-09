import {
  Button,
  IconButton,
  Input,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ISetPass } from "~/types/types";

const SetPassword = ({ values, setValues, fullNumber }: ISetPass) => {
  const togglePasswordHide = () => {
    setValues({
      ...values,
      showPass: !values.showPass,
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const [save, setSave] = useState(false);

  return (
    <div className="setpass_tenant">
      {!save ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <TextField
            name="pass"
            type={values.showPass ? "text" : "password"}
            fullWidth
            label="Password"
            placeholder="Password"
            variant="outlined"
            required
            InputProps={{
              style: { backgroundColor: "#fffbe3" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password"
                    edge="end"
                    onClick={togglePasswordHide}
                  >
                    {values.showPass ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={handleChange}
          />
          {fullNumber?.length ? (
            <>
              {/* <TextField
                name="pass"
                type={values.showPass ? "text" : "password"}
                fullWidth
                label="Password"
                placeholder="New Password"
                variant="outlined"
                required
                InputProps={{
                  style: { backgroundColor: "#fffbe3" },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password"
                        edge="end"
                        onClick={togglePasswordHide}
                      >
                        {values.showPass ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={handleChange}
              />
              <TextField
                name="pass"
                type={values.showPass ? "text" : "password"}
                fullWidth
                label="Password"
                placeholder="New Password"
                variant="outlined"
                required
                InputProps={{
                  style: { backgroundColor: "#fffbe3" },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password"
                        edge="end"
                        onClick={togglePasswordHide}
                      >
                        {values.showPass ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={handleChange}
              /> */}
            </>
          ) : null}
        </div>
      ) : (
        <span className="message_pass">Tenant Password saved</span>
      )}
      <Button
        variant="contained"
        className="save_pass"
        onClick={() => {
          setSave((prev) => !prev);
        }}
      >
        {!save ? "Save" : "Edit"} Password
      </Button>
    </div>
  );
};

export default SetPassword;
