import { useQuery } from "@apollo/client";
import { useReducer } from "react";
import { GET_PHOTOS } from "../api/Query";
import { Action, PhotosData, PhotosVars, StateType } from "./types";

export const usePhotos = () => {
  const initialState = {
    query: "",
    page: 1,
    totalPages: 1,
    modalUrl: "",
    modalOpen: false,
  };
  function reducer(state: StateType, action: Action) {
    switch (action.type) {
      case "search":
        return { ...state, query: action.query, page: 1 };
      case "changePage":
        return { ...state, page: action.payload };
      case "openModal":
        return { ...state, modalUrl: action.payload, modalOpen: true };
      case "closeModal":
        return { ...state, modalOpen: false };
      default: {
        return state;
      }
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  function doSearch(query: string) {
    dispatch({ type: "search", query });
  }
  function changePage(payload: number) {
    dispatch({ type: "changePage", payload });
  }
  function openModal(payload: string) {
    console.log("hre");
    dispatch({ type: "openModal", payload });
  }
  function closeModal() {
    dispatch({ type: "closeModal" });
  }

  const { error, loading, data } = useQuery<PhotosData, PhotosVars>(
    GET_PHOTOS,
    {
      variables: {
        query: state.query,
        page: state.page,
      },
    }
  );
  return {
    state,
    doSearch,
    changePage,
    openModal,
    closeModal,
    error,
    loading,
    data,
  };
};
