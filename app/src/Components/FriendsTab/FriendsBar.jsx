import React from "react";
import PropTypes from "prop-types";

import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ThemeProvider, useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import shadows from "@mui/material/styles/shadows";

export function FriendsBar(props) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
	if (newValue === 0) {
		props.toggle((prev) => {
		  return (prev = false);
		});
	  } else if (newValue === 1) {
		props.toggle((prev) => {
		  return (prev = true);
		});
	  }
  };

  /*  function a11yProps(index) {
	return {
	  id: `action-tab-${index}`,
	  'aria-controls': `action-tabpanel-${index}`,
	};
  } */

  const handleChangeIndex = (index) => {
    setValue(index);
	console.log(index);
    if (index === 0) {
      props.toggle((prev) => {
        return (prev = false);
      });
    } else if (index === 1) {
      props.toggle((prev) => {
        return (prev = true);
      });
    }
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };
  return (
    <ThemeProvider theme={props.theme}>
      <Box sx={{ bgcolor: "#fffefa" }}>
        <AppBar position="static" color="transparent" elevation={0}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            variant="fullWidth"
          >
            <Tab
              label={<span className="normal-case font-semibold">Friends</span>}
            />
            <Tab
              label={
                <span className="normal-case font-semibold">Requests</span>
              }
            />
          </Tabs>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
