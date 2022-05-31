import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface PhotoModalProps {
  url: string;
  open: boolean;
  closeModal: () => void;
}
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

export const PhotoModal: React.FC<PhotoModalProps> = ({
  url,
  open,
  closeModal,
}: PhotoModalProps) => {
  return (
    <Modal open={open} onClose={closeModal}>
      <Box sx={style}>
        <img src={url} alt="full-size" />
      </Box>
    </Modal>
  );
};
