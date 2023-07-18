import React from "react";
import {
  FormControl,
  InputAdornment,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import * as icon from "react-feather";


export function SearchInput(props) {

  const [inputValue, setInputValue] = useState("");
 
  const theme = createTheme({
    typography: {
      fontSize: 14,
    },
    palette: {
      primary: {
        main: "#dd7421",
      },
      secondary: {
        main: "#dd7421",
      },
    },
  });
  return (
    <FormControl
      sx={{
        label: {
          fontWeight: "bold",
          fontSize: "12px",
        },
        outlineColor: "red",
      }}
    >
      <ThemeProvider theme={theme}>
        <TextField
          value={inputValue}
          onChange={(val) => {
            setInputValue((prev) => {
              return val.target.value;
            });
          }}
          color="primary"
          placeholder="Find friend"
          size="small"
          className="mx-2"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {inputValue === "" ? (
                  <button
                    onClick={() => {
                      props.state((prev) => {
                        return false;
                      });
                    }}
                  >
                    <icon.Search size={20} />
                  </button>
                ) : (
                  <button
                    onClick={async () => {
						setInputValue((prev)=>{
							return "";
						})
                    }}
                  >
                    <icon.X size={20} />
                  </button>
                )}
              </InputAdornment>
            ),
          }}
          inputProps={{ style: { fontSize: 20, lineHeight: 1 }, maxLength: 14 }}
          variant="outlined"
        />
      </ThemeProvider>
    </FormControl>
  );
}
