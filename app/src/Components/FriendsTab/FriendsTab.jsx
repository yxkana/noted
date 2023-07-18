import React, { useEffect, useState } from "react";
import * as icon from "react-feather";
import TextField from "@mui/material/TextField";
import {
  FormControl,
  InputAdornment,
  ThemeProvider,
  createTheme,
  Fab,
} from "@mui/material";
import { useFormControl } from "@mui/material/FormControl";
import useAxiosPrivate from "../../hooks/usePrivateAxios";

import List from "@mui/material/List";

import { RequestItem } from "./RequestItem";
import { FriendsBar } from "./FriendsBar";
import { FriendItem } from "./FriendItem";
import { add } from "lodash";
import { useQuery } from "react-query";
import { UserFriends } from "../../api/UserData";

export function FriendsTab() {
  const [friendsList, setFriendsList] = useState([]);
  const [friendRequestsList, setFriendsRequestList] = useState([]);

  //If its false Friends List is Active,when true Friends Request is active
  const [friendsToggle, setFriendsToggle] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [addSearchValue, setAddSearchValue] = useState("");
  const [addUser, setAddUser] = useState(false);
  const axiosPrivate = useAxiosPrivate();

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

  const user = new UserFriends();

  const fetchFriends = useQuery({
    queryKey: ["fetchFriends"],
    queryFn: () => user.fetchFriends(),
    onSuccess: (data) => {
      [...data.data].map((item) => {
        if (item.accepted) {
          setFriendsList((prev) => {
            return [...prev, item];
          });
        } else {
          console.log("sss");
          setFriendsRequestList((prev) => {
            return [...prev, item];
          });
        }
      });
    },
  });

  

  const handleAddFriend = async () => {
    try {
      const respone = await axiosPrivate.post(
        "/notes/addfriend",
        JSON.stringify({
          id: addSearchValue,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const _activeAddFriendButton =
    "rounded-md bg-color-tercelary text-color-white hover:bg-color-tercelary2";

  /*  useEffect(() => {
    async function getFriends() {
      try {
		console.log("sss");
        await axiosPrivate.get("notes/getfriends").then(function (respone) {
          console.log("sss");
          [...respone.data].map((item) => {
            if (item.accepted) {
              setFriendsList((prev) => {
                return [...prev, item];
              });
            } else {
              setFriendsRequestList((prev) => {
                return [...prev, item];
              });
            }
          });
        });
      } catch (err) {
        console.log(err);
      }
    }
    getFriends();
  }, [1]); */

  return (
    <div className="absolute right-5 bottom-[20px] w-[250px] bg-color-tercelary border border-color-grey rounded-md shadow-[0px_0px_15px_2px_rgba(0,0,0,0.2)]">
      <div className="flex relative top-1 z-10 justify-between bg-color-tercelary text-color-white font-semibold text-xl px-5 py-4 rounded-md">
        <h1 className="relative bottom-[1px]">Friends list</h1>
      </div>
      <div className="z-0 w-full justify-center flex flex-col h-[45vh] bg-color-truewhite rounded-b-md relative ">
        <div className="justify-center gap-3 flex items-center pt-5 pb-2 px-5">
          <div
            className={
              addUser
                ? "rounded-md bg-color-tercelary2 text-color-white hover:bg-color-tercelary2"
                : _activeAddFriendButton
            }
          >
            <button
              className="p-0 m-[10px]"
              onClick={() => {
                setAddUser((prev) => {
                  return !prev;
                });
              }}
            >
              <icon.UserPlus size={20} strokeWidth={2.5} />
            </button>
          </div>
          <FormControl
            sx={{
              label: {
                fontWeight: "bold",
                fontSize: "17px",
              },
              outlineColor: "red",
            }}
          >
            <ThemeProvider theme={theme}>
              <TextField
                value={searchValue}
                onChange={(val) => {
                  setSearchValue((prev) => {
                    return val.target.value;
                  });
                }}
                color="primary"
                placeholder="Find User"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {searchValue === "" ? (
                        <icon.Search size={20} strokeWidth={2.5} />
                      ) : (
                        <button
                          onClick={() => {
                            setSearchValue((prev) => {
                              return "";
                            });
                          }}
                        >
                          <icon.X size={20} strokeWidth={2.5} />
                        </button>
                      )}
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </ThemeProvider>
          </FormControl>
        </div>
        <div className="mx-2">
          <FriendsBar theme={theme} toggle={setFriendsToggle} />
        </div>

        <div className="flex-col py-2 flex flex-auto overflow-auto bg-color-white rounded-md shadow-[inset_0px_15px_10px_-9px_rgba(0,0,0,0.1)]">
          {addUser ? (
            <>
              <div className="px-5 flex-col absolute top-[45%]">
                <div className="text-2xl font-semibold text-color-tercelary2 text-center mb-6">
                  <h1>Add user</h1>
                </div>
                <div className="flex items-center">
                  <ThemeProvider theme={theme}>
                    <TextField
                      value={addSearchValue}
                      onChange={(val) => {
                        setAddSearchValue((prev) => {
                          return val.target.value;
                        });
                      }}
                      color="primary"
                      placeholder="UserTag"
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {addSearchValue === "" ? (
                              <icon.Search size={20} strokeWidth={2.5} />
                            ) : (
                              <button
                                onClick={() => {
                                  setAddSearchValue((prev) => {
                                    return "";
                                  });
                                }}
                              >
                                <icon.X size={20} strokeWidth={2.5} />
                              </button>
                            )}
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                    />
                  </ThemeProvider>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 m-6">
                <Fab
                  sx={{ bgcolor: "#A27B5C", "&:hover": { bgcolor: "#dd7421" } }}
                  color="secondary"
                  onClick={handleAddFriend}
                >
                  <icon.Plus />
                </Fab>
              </div>
            </>
          ) : (
            <>
              {friendsToggle
                ? [...friendRequestsList].map((item, index) => {
                    return <RequestItem item={item} key={index} />;
                  })
                : [...friendsList].map((item, index) => {
                    return <FriendItem item={item} key={index} />;
                  })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
