import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { useEffect, useRef, useState } from "react";
import Crp from "./Crp";
import ButtonUpload from "./ButtonUpload";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import DownloadIcon from "@mui/icons-material/Download";
import StorageIcon from "@mui/icons-material/Storage";
function CropperComponent() {
  const [image, setImage] = useState(null); // image we will pass as prop to crop it
  //get the cropper from the Crp
  const [cropper, setCropper] = useState(null);
  const handleCropper = (e) => {
    setCropper(e);
  };
  //dialog
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  const actions = [
    { icon: <ClearIcon />, name: "Reset", key: "1", fct: "reset" },
    { icon: <ZoomInIcon />, name: "Zoom in", key: "2", fct: "() => zoom(2)" },
    {
      icon: <ZoomOutIcon />,
      name: "Zoom out",
      key: "3",
      fct: " () => zoom(0.5)",
    },
    {
      icon: <RotateRightIcon />,
      name: "Rotate",
      key: "4",
      fct: "() => rotate(90)",
    },
    {
      icon: <RotateLeftIcon />,
      name: "Rotate",
      key: "5",
      fct: "() => rotate(-90)",
    },
    {
      icon: <FlipIcon />,
      name: "FlipRight",
      key: "6",
      fct: "() => flip(true, false)",
    },
    {
      icon: <FlipIcon sx={{ transform: "rotate(90deg)" }} />,
      name: "FlipDown",
      key: "7",
      fct: "() => flip(false, true) ",
    },
  ];
  const imageUploaded = (img) => {
    setImage(img);
  };
  useEffect(() => {
    return () => {
      if (image && image.src) {
        URL.revokeObjectURL(image.src);
      }
    };
  }, [image]);
  return (
    <Box sx={{ textAlign: "center", mt: 5 }}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Crop your photo
      </Button>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        maxWidth="lg"
        sx={{ textAlign: "center" }}
      >
        <Crp
          image={image}
          showDownload={true}
          showCropperPreview={true}
          showShapeOfSpencil={true}
          customProcess={actions}
        />
        <ButtonUpload imageUploaded={imageUploaded} />
      </Dialog>
    </Box>
  );
}

export default CropperComponent;
