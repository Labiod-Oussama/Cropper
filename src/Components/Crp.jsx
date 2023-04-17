import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { CircleStencil, Cropper, CropperPreview, RectangleStencil, CropperPreviewRef } from 'react-advanced-cropper'
import 'react-advanced-cropper/dist/style.css'
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import FlipIcon from '@mui/icons-material/Flip';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
function Crp() {
  const cropperRef = useRef(null);
  const previewRef = useRef(null);
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);

  //get image from upload btn
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
  /* fill the image*/
  const defaultSize = ({ imageSize, visibleArea }) => {
    return {
      width: (visibleArea || imageSize).width,
      height: (visibleArea || imageSize).height,
    };
  }
  //zoom
  const zoom = (e) => {
    if (cropperRef.current) {
      cropperRef.current.zoomImage(e); // zoom-in 2x
    }
  };
  //rotate
  const rotate = (angle) => {
    if (cropperRef.current) {
      cropperRef.current.rotateImage(angle);
    }
  };
  //flip
  const flip = (horizontal, vertical) => {
    if (cropperRef.current) {
      cropperRef.current.flipImage(horizontal, vertical);
    }
  };
  //reset
  const reset = () => {
    if (cropperRef.current) {
      cropperRef.current.reset();
    }

  };
  const actions = [
    { icon: <ClearIcon />, name: 'Reset', key: '1', fct: reset },
    { icon: <ZoomInIcon />, name: 'Zoom in', key: '2', fct: () => zoom(2) },
    { icon: <ZoomOutIcon />, name: 'Zoom out', key: '3', fct: () => zoom(0.5) },
    { icon: <RotateRightIcon />, name: 'Rotate', key: '4', fct: () => rotate(90) },
    { icon: <RotateLeftIcon />, name: 'Rotate', key: '5', fct: () => rotate(-90) },
    { icon: <FlipIcon />, name: 'FlipRight', key: '6', fct: () => flip(true, false) },
    { icon: <FlipIcon sx={{ transform: 'rotate(90deg)' }} />, name: 'FlipDown', key: '7', fct: () => flip(false, true) },
  ];
  //preview
  const onUpdate = () => {
    previewRef.current?.refresh();
  };

  //download the cropper
  const downloadImage = () => {
    if (!cropperRef.current) {
      return;
    }
    const canvas = cropperRef.current.getCanvas();
    if (!canvas) {
      return;
    }
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'cropped-image.jpg';
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    });
  };
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Box sx={{ position: 'relative', width: '50%', height: '80%', margin: '0 auto', border: (image && image.src) ? 'dotted 2px #90caf9' : 'dotted 3px #90caf9' }}>
        <Cropper
          ref={cropperRef}
          src={image && image.src}
          className='cropper'
          stencilComponent={RectangleStencil}
          stencilProps={{
            aspectRatio: 1,
            grid: true,
          }}
          onUpdate={onUpdate}
              defaultSize={defaultSize}

          // defaultCoordinates={{
          //   left: 200,
          //   top: 200,
          //   width: 300,
          //   height: 300,
          // }}
        />

        {
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: "absolute", bottom: 20, right: 20 }}
            icon={<SpeedDialIcon openIcon={<EditIcon />} />}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.key}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={action.fct}
              />
            ))}
          </SpeedDial>
        }
        <CropperPreview
          ref={previewRef}
          cropper={cropperRef}
          style={{ width: 100, height: 100, position: 'absolute', top: 20, left: 20, borderRadius: '50%' }}
          className='preview'
        />
      </Box>
      <Button variant='contained' component='label' color='primary' sx={{ mt: 2, fontWeight: 'bold', letterSpacing: '2px' }} >
        Upload photo
        <input
          ref={inputRef}
          type="file"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={onLoadImage}
        />
      </Button>
      {
        (image && image.src) &&
        <Button variant='contained' color='primary' onClick={downloadImage} sx={{ mt: 2, fontWeight: 'bold', letterSpacing: '2px' }}>Download</Button>
      }

    </Box>
    // defaultSize={defaultSize}

    //  defaultPosition={{
    //         left: 100,
    //         top: 100,
    // }}
  )
}

export default Crp