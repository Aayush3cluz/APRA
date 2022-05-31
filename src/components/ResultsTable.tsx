import { ApolloError } from "@apollo/client";
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { PhotosData } from "../hooks/types";

interface ResultsTableProps {
  error: ApolloError | undefined;
  loading: boolean;
  data: PhotosData | undefined;
  openModal: (url: string) => void;
}

export const ResultsTable: React.FC<ResultsTableProps> = ({
  error,
  loading,
  data,
  openModal,
}) => {
  if (error) {
    return <Box>Error - Apollo Error</Box>;
  }
  if (loading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <TableContainer sx={{ maxHeight: 700 }} component={Paper}>
        <Table role="table" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right"> Title </TableCell>
              <TableCell align="right">Thumbnail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.photos.data.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="right" padding={"normal"}>
                  {row.id}
                </TableCell>
                <TableCell align="right" padding={"normal"}>
                  {row.title}
                </TableCell>
                <TableCell align="right" padding={"normal"}>
                  <Box
                    component="img"
                    src={row.thumbnailUrl}
                    alt={row.title}
                    onClick={() => openModal(row.url)}
                    sx={{ cursor: "pointer", maxWidth: "7rem" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
