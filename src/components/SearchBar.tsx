import { Box, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
interface SearchBarProps {
  doSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  doSearch,
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <Box
      sx={{
        width: "70%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <TextField
        fullWidth
        id="SearchBar"
        label="Search"
        role={"searchbox"}
        variant="outlined"
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
              onClick={() => doSearch(searchQuery)}
              sx={{ cursor: "pointer" }}
            >
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};
