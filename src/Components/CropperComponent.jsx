import { Box } from '@mui/material'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { useEffect, useRef, useState } from 'react';
import Crp from './Crp';
import ButtonUpload from './ButtonUpload';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import DownloadIcon from '@mui/icons-material/Download';
import StorageIcon from '@mui/icons-material/Storage';
function CropperComponent() {
  const [image, setImage] = useState(null); // image we will pass as prop to crop it
  const img = image?.img; //to get the image objet to send as a props
  const [arrayOfImages, setArrayOfImages] = useState([])
  useEffect(() => {
    if (img) {
      setArrayOfImages([...arrayOfImages, img])
    }
  }, [img])
  //get the cropper from the Crp 
  const [cropper, setCropper] = useState(null)
  const handleCropper = (e) => {
    setCropper(e);
  }
  //to get the image uploaded
  const imageUploaded = (image) => {
    setImage(image)
  }
  // useEffect(() => {
  //   return () => {
  //     if (img && img.src) {
  //       URL.revokeObjectURL(img.src);
  //     }
  //   };
  // }, [img]);
  //dialog
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  // open the cropper in blank page
  const handleOpen = (cropper) => {
    if (!cropper) {
      return;
    }
    const canvas = cropper.getCanvas();
    const imageData = canvas.toDataURL('image/png');
    const newWindow = window.open();
    newWindow.document.write(`<img src="${imageData}" alt="Cropped Image" />`);
  };
  //download the cropper 
  const downloadImage = (cropper) => {
    if (!cropper) {
      return;
    }
    const canvas = cropper.getCanvas();
    const width = (canvas.getAttribute('width'));
    const height = (canvas.getAttribute('height'));
    if (!canvas) {
      return;
    }
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `cropped[${width}x${height}].jpg`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    });
  };
  // send the cropper to the server
  const handleFetch = async (cropper) => {
    if (!cropper) {
      return;
    }
    const canvas = cropper.getCanvas();
    const imageData = canvas.toDataURL('image/png');
    const response = await fetch('adresss', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image: imageData
      })
    });
    const data = await response.json()
    console.log(data);
  }
  //btnSpecils (download,openInBlank,sendtoServer) 
  const btnSpecials = [
    {
      key: 1, label: 'Download', icon: <DownloadIcon />, fct: () => downloadImage(cropper)
    },
    {
      key: 2, label: 'Open', icon: <OpenWithIcon />, fct: () => handleOpen(cropper)
    },
    {
      key: 3, label: 'Send', icon: <StorageIcon />, fct: () => handleFetch(cropper)
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
        <Crp
          image={arrayOfImages.length === 0 ? undefined : arrayOfImages}
          uploadedOrDefault={arrayOfImages.length === 0 ? false : true}
          showCropperPreview={true}
          showShapeOfSpencil={true}
          btnSpecials={btnSpecials}
          handleCropper={handleCropper}
        />
        <ButtonUpload imageUploaded={imageUploaded} />
      </Dialog>
    </Box>
  )
}

export default CropperComponent