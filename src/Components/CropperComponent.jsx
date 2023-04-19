import { Box } from '@mui/material'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import FlipIcon from '@mui/icons-material/Flip';
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect, useRef, useState } from 'react';
import Crp from './Crp';
import ButtonUpload from './ButtonUpload';
function CropperComponent() {
  const [image, setImage] = useState(null); // image we will pass as prop to crop it
  const inputRef = useRef(null); // ref of upload input
  //dialog
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  const actions = [
    { icon: <ClearIcon />, name: 'Reset', key: '1', fct: 'reset' },
    { icon: <ZoomInIcon />, name: 'Zoom in', key: '2', fct: '() => zoom(2)' },
    { icon: <ZoomOutIcon />, name: 'Zoom out', key: '3', fct: ' () => zoom(0.5)' },
    { icon: <RotateRightIcon />, name: 'Rotate', key: '4', fct: '() => rotate(90)' },
    { icon: <RotateLeftIcon />, name: 'Rotate', key: '5', fct: '() => rotate(-90)' },
    { icon: <FlipIcon />, name: 'FlipRight', key: '6', fct: '() => flip(true, false)' },
    { icon: <FlipIcon sx={{ transform: 'rotate(90deg)' }} />, name: 'FlipDown', key: '7', fct: '() => flip(false, true) ' },
  ];
  const imageUploaded = (img) => {
    setImage(img)
  }
  useEffect(() => {
    return () => {
      if (image && image.src) {
        URL.revokeObjectURL(image.src);
      }
    };
  }, [image]);
  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Crop your photo
      </Button>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        maxWidth='lg'
        sx={{ textAlign: 'center' }}
      >
        <Crp image={image} showDownload={true} showCropperPreview={true} showShapeOfSpencil={true} customProcess={actions} />
        <ButtonUpload imageUploaded={imageUploaded} />
      </Dialog>
    </Box>
  )
}

export default CropperComponent