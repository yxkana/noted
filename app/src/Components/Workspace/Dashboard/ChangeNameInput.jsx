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
import { UserInfo } from "../../../api/UserData";

export function ChangeNameInput(props) {
  const _userData = new UserInfo();
  const queryClient = useQueryClient();

  const [inputValue, setInputValue] = useState("");
  const createChangeNameMutation = useMutation({
    mutationFn: () => {
      return _userData.renameProfile(inputValue);
    },
    onSuccess: data => {
      queryClient.invalidateQueries("userInfo");
	  console.log("sssss");
      props.state((prev) => {
        return false;
      });
    },
  });

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
          fontSize: "48px",
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
          placeholder={props.oldName}
          size="medium"
          className="w-[75%]"
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
                    <icon.SkipBack size={20} />
                  </button>
                ) : (
                  <button
                    onClick={async () => {
                      return createChangeNameMutation.mutate();
                    }}
                  >
                    <icon.Save size={20} />
                  </button>
                )}
              </InputAdornment>
            ),
          }}
          inputProps={{ style: { fontSize: 40, lineHeight: 1 }, maxLength: 14 }}
          variant="standard"
        />
      </ThemeProvider>
    </FormControl>
  );
}
