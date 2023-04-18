import { Box } from '@mui/material'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useRef, useState } from 'react';
import Crp from './Crp';
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
  //  get image from upload btn
  const onLoadImage = (event) => {
    const { files } = event.target;
    if (files && files[0]) {
      const blob = URL.createObjectURL(files[0]);
      setImage({
        src: blob,
        type: files[0].type
      })
    }
    event.target.value = '';
  };
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
        <Crp image={image} />
        <Button variant='outlined' component='label' color='primary' sx={{ margin: '0px auto 20px', fontWeight: 'bold', letterSpacing: '2px' }} >
          Upload photo
          <input
            ref={inputRef}
            type="file"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={onLoadImage}
          />
        </Button>
      </Dialog>
    </Box>
  )
}

export default CropperComponent