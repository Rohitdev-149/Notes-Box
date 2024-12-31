import { toast } from "react-hot-toast";
import { deleteFromPastes } from "../redux/pasteSlice";

export const handleDelete = (pasteId, dispatch) => {
  if (window.confirm("Are you sure you want to delete this note?")) {
    dispatch(deleteFromPastes(pasteId));
  }
};

export const handleSelectPaste = (
  pasteId,
  selectedPastes,
  setSelectedPastes
) => {
  setSelectedPastes((prev) =>
    prev.includes(pasteId)
      ? prev.filter((id) => id !== pasteId)
      : [...prev, pasteId]
  );
};

export const handleDeleteSelected = (
  selectedPastes,
  dispatch,
  setSelectedPastes
) => {
  if (selectedPastes.length === 0) {
    toast.error("No notes selected");
    return;
  }

  if (
    window.confirm(
      `Are you sure you want to delete ${selectedPastes.length} selected notes?`
    )
  ) {
    selectedPastes.forEach((pasteId) => {
      dispatch(deleteFromPastes(pasteId));
    });
    setSelectedPastes([]);
  }
};

export const filterAndSortPastes = (pastes, searchTerm) => {
  return pastes
    .filter(
      (paste) =>
        paste.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paste.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
};
