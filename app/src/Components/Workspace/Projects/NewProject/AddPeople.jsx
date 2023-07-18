import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import * as icon from "react-feather";
import { inputLabelClasses } from "@mui/material/InputLabel";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250 + 8,
    },
    sx: {
      "&& .Mui-selected": {
        backgroundColor: "#DCD7C9",
      },

      "&& .MuiMenuItem-root": {
        borderRadius: "5px",
        padding: "5px",
        margin: "5px 5px",
      },
    },
  },
};

export function AddPeopleMenu(props) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      (prev) => {
        return typeof value === "string" ? value.split(",") : value;
      }
      // On autofill we get a stringified value.
    );
    props.addToTeam((prev) => {
      return value
    });
  };

  return (
    <div>
      <FormControl
        sx={{
          width: 240,
          color: "#fffefa",
          height: 45,
          bgcolor: "#fffefa",
        }}
      >
        <InputLabel
          id="demo-multiple-chip-label"
          sx={{
            [`&.${inputLabelClasses.shrink}`]: {
              // set the color of the label when shrinked (usually when the TextField is focused)
              color: "#dd7421",
            },
          }}
        >
          Team
        </InputLabel>

        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          placeholder="Select team"
          multiple
          sx={{
            color: "white",
			height: "auto",
			
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "#A27B5C",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#dd7421",
              borderWidth: 3,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#dd7421",
            },
          }}
          value={personName}
          input={<OutlinedInput label="Team" />}
          onChange={handleChange}
          renderValue={(selected) => (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0.5,
                bgcolor: "#fffefa",
                overflow: "auto",
                maxHeight: 80,
				
				
              }}
            >
              {selected.map((value) => (
                <Chip key={value} label={value} sx={{ bgcolor: "#DCD7C9" }} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {[...props.friends].map((name, index) => (
            <MenuItem
              key={index}
              value={name.userId}
              sx={{
                "&& .Mui-selected": {
                  backgroundColor: "pink",
                },
              }}
            >
              {name.userId}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
