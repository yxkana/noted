import React from "react";
import * as icon from "react-feather";
import { axiosPrivate } from "../../../api/axios";
import axios from "../../../api/axios";
import { Priority } from "./priority";
import { ItemDropdown } from "./itemDropDown";
import { ItemTag } from "./item_tag";

export function TaskItem(props) {
  const _index = props.index;

  const deleteItem = async () => {
    try {
      const respone = await axiosPrivate.post(
        "/notes/deletenote",
        JSON.stringify({ index: _index }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      props.state(function (prev) {
        const _prev = [...prev];
        _prev.splice(_index, 1);
        return _prev;
      });
    } catch (err) {
      console.log(err);
    }
  };

  const moveToProgress = async () => {
    const _id = props.item.id;
    try {
      const respone = await axiosPrivate.patch(
        "/notes/movetoprogress",
        JSON.stringify({ index: _index, id: _id }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };


  const moveToComplete = async () => {
    const _id = props.item.id;
    try {
      const respone = await axiosPrivate.patch(
        "/notes/movetocomplete",
        JSON.stringify({ index: _index, id: _id }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };




  return (
    <div className="bg-color-truewhite relative pt-4 px-5 rounded-md text-left flex-row shadow-md shadow-color-shadow text-lg">
      <ItemDropdown
        delete={deleteItem}
        move={props.move}
        progressMove={moveToProgress}
		completeMove={moveToComplete}
        index={_index}
		status={props.item.status}
      />
      <div className="flex-grow p-3">
        <h2 className="font-bold text-color-primary text-2xl pb-4 underline">
          {props.item.title}
        </h2>
        <p className="pb-3">{props.item.content}</p>
      </div>
      <hr className="border-b-1 border-t-0 h-2 shadow-md" />
      <div className="flex items-center my-5">
        <div className="flex-auto flex tags items-center overflow-x-auto scroll-m-4">
          <div className="flex flex-auto gap-4">
            {[...props.item.tags].map((tag, index) => {
              return <ItemTag name={tag} key={index} />;
            })}
          </div>
        </div>
        <Priority name={props.item.priority} />
      </div>
    </div>
  );
}
/ */;
