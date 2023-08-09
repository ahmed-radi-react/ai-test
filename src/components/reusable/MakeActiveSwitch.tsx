import React from "react";
import { styled, Switch, SwitchProps } from "@mui/material";
interface IMakeActive {
  width: number;
  height: number;
  bulletWidth?: number;
  bulletHeight?: number;
  bgOff?: string;
  setOptionSwitchOption: React.Dispatch<React.SetStateAction<boolean>>;
  optionSwitchOption: boolean;
}
const MakeActiveSwitch = ({
  width = 42,
  height = 26,
  bulletWidth = 20,
  bulletHeight = 20,
  bgOff = "#E9E9EA",
  setOptionSwitchOption,
  optionSwitchOption,
}: IMakeActive) => {
  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width,
    height,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#34C759",
        "& + .MuiSwitch-track": {
          backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#fff",
          opacity: 1,
          border: "1px solid #ddd",
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: bulletWidth,
      height: bulletHeight,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? bgOff : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  return (
    <IOSSwitch
      checked={optionSwitchOption}
      onChange={(e) => setOptionSwitchOption(e.target.checked)}
      inputProps={{ "aria-label": "ant design" }}
      name="active_input"
    />
  );
};

export default MakeActiveSwitch;
