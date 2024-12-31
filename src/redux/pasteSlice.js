import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};
const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      // toast.success("Paste created successfully");
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((p) => p._id === paste._id);
      if (index !== -1) {
        state.pastes[index] = paste;
        // localStorage.setItem("pastes", JSON.stringify(state.pastes));
        // toast.success("Paste updated successfully");
      }
    },
    resetToPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("All notes deleted successfully");
    },
    deleteFromPastes: (state, action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex((p) => p._id === pasteId);

      if (index !== -1) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Notes deleted successfully");
      }
    },
  },
});

export const { addToPastes, updateToPastes, resetToPastes, deleteFromPastes } =
  pasteSlice.actions;
export default pasteSlice.reducer;
