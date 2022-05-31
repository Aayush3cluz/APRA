import React from "react";

import { ResultsTable } from "../components/ResultsTable";
import { SearchBar } from "../components/SearchBar";
import { usePhotos } from "../hooks/usePhotosHook";
import { Paginator } from "../components/Paginator";
import { PhotoModal } from "../components/PhotoModal";

import { Stack } from "@mui/material";

import { getmaxPages } from "../utility/get-max-pages";

import "./SearchPage.css";
function SearchPage() {
  const {
    state,
    doSearch,
    changePage,
    closeModal,
    openModal,
    data,
    error,
    loading,
  } = usePhotos();

  return (
    <Stack spacing={2} alignItems="center" p={2}>
      <SearchBar doSearch={doSearch} />
      <ResultsTable
        data={data}
        error={error}
        loading={loading}
        openModal={openModal}
      />
      <PhotoModal
        open={state.modalOpen}
        url={state.modalUrl}
        closeModal={closeModal}
      />
      <Paginator
        page={state.page}
        maxPages={getmaxPages(data?.photos.meta.totalCount)}
        changePage={changePage}
      />
    </Stack>
  );
}

export default SearchPage;
