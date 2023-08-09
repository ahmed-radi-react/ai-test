import {
  Box,
  Chip,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Theme,
  useTheme,
} from "@mui/material";
import {
  MenuProps,
  getStyles,
  interestaddtebnant,
  selectStyleInterests,
} from "@/utils/constant";
import { IInterests } from "~/types/types";

const Interests = ({ setInterestArray, interestsArray }: IInterests) => {
  // search input style
  const theme = useTheme();
  const handleChange = (event: SelectChangeEvent<typeof interestsArray>) => {
    const {
      target: { value },
    } = event;
    setInterestArray(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div className="interest_tenant">
      <FormControl sx={{ m: 1, width: "53%" }}>
        {/* {!interestsArray.length ? <InputLabel sx={{ fontSize: "12px", top: "-12px" }}>Search</InputLabel> : ""} */}
        <Select
          // shrink={false}
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          className="search_interest"
          value={interestsArray}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" />}
          // renderValue={(selected) => (
          //   <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          //     {selected.map((value) => (
          //       <Chip key={value} label={value} />
          //     ))}
          //   </Box>
          // )}
          sx={selectStyleInterests}
          MenuProps={MenuProps}
        >
          {interestaddtebnant.map((name) => (
            <MenuItem
              key={name.id}
              value={name.label}
              style={getStyles(name.label, interestsArray, theme)}
            >
              {name.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box
        sx={{
          width: "53%",
          paddingLeft: "8px",
          display: "flex",
          flexWrap: "wrap",
          gap: 0.5,
        }}
      >
        {interestsArray.map((value, index) => (
          <Chip
            key={index}
            label={value}
            sx={{
              border: "1px solid #8C8C8C",
              backgroundColor: "#fff!important",
              color: "#8C8C8C",
              borderRadius: "4px",
            }}
          />
        ))}
      </Box>
    </div>
  );
};

export default Interests;
