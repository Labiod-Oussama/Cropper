import { Box } from '@mui/material'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
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
  //btnSpecils (download,openInBlank,sendtoServer) i make name of fct in string and call it by eval
  const btnSpecials = [
    {
      show: true, fct: 'DownloadImage'
    },
    {
      show: true, fct: 'OpenImage'
    },
    {
      show: true, fct: 'Servering'
    }
  ]
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
        <Crp image={image} showCropperPreview={true} showShapeOfSpencil={true} btnSpecials={btnSpecials} />
        <ButtonUpload imageUploaded={imageUploaded} />
      </Dialog>
    </Box>
  )
}

export default CropperComponent