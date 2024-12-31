import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateToPastes, addToPastes } from "../redux/pasteSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function Home() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPaste = useSelector((state) => state.pastes);
  useEffect(() => {
    if (pasteId) {
      const paste = allPaste?.pastes?.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);
  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Math.random().toString(36).substring(2, 15),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (pasteId) {
      //update
      dispatch(updateToPastes(paste));
    } else {
      //create
      dispatch(addToPastes(paste));
    }
    //after creating or updating the paste, reset the title and value and the search params
    setTitle("");
    setValue("");
    setSearchParams({});
  }
  return (
    <div>
      <div className="flex flex-row gap-7 place-content-center">
        <input
          className="p-2 rounded-2xl mt-2 w-[77%]"
          type="text"
          placeholder="enter the title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={createPaste} className="flex flex-row gap-7">
          {pasteId ? "Update" : "Create"}
        </button>
      </div>
      <div className="mt-5">
        <textarea
          className="p-2 rounded-2xl mt-2 min-w-[500px] min-h-[500px]"
          value={value}
          placeholder="enter the content"
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Home;
